import copy
import importlib.util
import unittest
from jsonschema import ValidationError
from pathlib import Path
spec = importlib.util.spec_from_file_location('lab', Path(__file__).resolve().parents[1] / 'scripts/lab.py')
lab = importlib.util.module_from_spec(spec)
spec.loader.exec_module(lab)

class RegistryBoundaryTests(unittest.TestCase):
    def setUp(self):
        self.entry = {'id': 'team-test', 'repository': 'https://github.com/example/team', 'revision': 'a' * 40, 'manifest': 'hackday/project.yaml', 'level': 'registered'}
    def data(self):
        return {'schemaVersion': 1, 'projects': [copy.deepcopy(self.entry)]}
    def test_valid_pinned_entry_structure(self):
        lab.validate_registry(self.data(), allow_pending=True)
    def test_empty_registry(self):
        lab.validate_registry({'schemaVersion': 1, 'projects': []})
    def test_pending_remote_checks_fail_closed(self):
        with self.assertRaisesRegex(ValueError, 'Registration disabled'):
            lab.validate_registry(self.data())
    def test_duplicate_ids(self):
        data = self.data(); data['projects'].append(copy.deepcopy(self.entry))
        with self.assertRaisesRegex(ValueError, 'Duplicate'):
            lab.validate_registry(data, allow_pending=True)
    def test_unsafe_or_mutable_inputs(self):
        for key, value in [('repository', 'http://127.0.0.1/private'), ('repository', 'https://github.com/a/b/../../c'), ('revision', 'main'), ('manifest', '../secrets'), ('level', 'reproducible')]:
            with self.subTest(key=key, value=value):
                data = self.data(); data['projects'][0][key] = value
                with self.assertRaises(ValidationError):
                    lab.validate_registry(data, allow_pending=True)
    def test_unknown_claims(self):
        data = self.data(); data['projects'][0]['runtimeVerified'] = True
        with self.assertRaises(ValidationError):
            lab.validate_registry(data, allow_pending=True)

class StartingStateTests(unittest.TestCase):
    def test_every_pinned_upstream_state_can_parent_a_lab_state(self):
        from unittest.mock import patch
        original_read = lab.read_json
        upstream = original_read('upstream/traderX/catalog/state-catalog.json')['states']
        for upstream_state in upstream:
            with self.subTest(starting_state=upstream_state['id']):
                catalog = copy.deepcopy(original_read('catalog/state-catalog.json'))
                catalog['states'][0]['previous'] = [upstream_state['id']]
                with patch.object(lab, 'read_json', side_effect=lambda path: catalog if path == 'catalog/state-catalog.json' else original_read(path)):
                    lab.check()

    def test_unknown_starting_state_is_rejected(self):
        from unittest.mock import patch
        original_read = lab.read_json
        catalog = copy.deepcopy(original_read('catalog/state-catalog.json'))
        catalog['states'][0]['previous'] = ['999-unknown-state']
        with patch.object(lab, 'read_json', side_effect=lambda path: catalog if path == 'catalog/state-catalog.json' else original_read(path)):
            with self.assertRaisesRegex(ValueError, 'Unknown or non-topological'):
                lab.check()
