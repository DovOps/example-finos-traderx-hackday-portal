#!/usr/bin/env python3
"""Build a local, escaped documentation portal from reviewed repository inputs."""
import argparse
import json
import re
from pathlib import Path
from jsonschema import Draft202012Validator

ROOT = Path(__file__).resolve().parents[1]

def read_json(path):
    return json.loads((ROOT / path).read_text())

def validate_registry(data, allow_pending=False):
    Draft202012Validator(read_json('schemas/registry.schema.json')).validate(data)
    ids = [p['id'] for p in data['projects']]
    if len(ids) != len(set(ids)):
        raise ValueError('Duplicate project IDs')
    for project in data['projects']:
        if project['repository'].rsplit('/', 1)[-1] in ('.', '..'):
            raise ValueError('Invalid repository path')
    if data['projects'] and not allow_pending:
        raise ValueError('Registration disabled: remote revision, manifest, consent and evidence gates are pending')

def check():
    validate_registry(read_json('registry/projects.json'))
    config = read_json('portal/config.json')
    states = read_json('catalog/state-catalog.json')['states']
    ids = [s['id'] for s in states]
    if len(ids) != len(set(ids)):
        raise ValueError('Duplicate state IDs')
    seen = {s['id'] for s in read_json('upstream/traderX/catalog/state-catalog.json')['states']}
    for s in states:
        if not re.fullmatch(r'lab-[a-z0-9-]+', s['id']):
            raise ValueError('Invalid state ID')
        if not s['previous'] or not set(s['previous']) <= seen:
            raise ValueError('Unknown or non-topological predecessor')
        seen.add(s['id'])
        if s['upstreamPin'] != config['upstreamPin']:
            raise ValueError('Inconsistent upstream pin')
        for path in [s['guide']] + [s['featurePack'] + '/' + f for f in ['spec.md', 'plan.md', 'tasks.md', 'system/contract.md']]:
            if not (ROOT / path).is_file():
                raise ValueError('Missing state artifact: ' + path)
    for folder in ['docs', 'specs']:
        for path in (ROOT / folder).rglob('*.md'):
            for link in re.findall(r'\]\(([^)]+)\)', path.read_text()):
                if '://' in link or link.startswith('#'):
                    continue
                target = (path.parent / link.split('#')[0]).resolve()
                if not target.is_relative_to(ROOT) or not target.exists():
                    raise ValueError(f'Broken local link: {path}: {link}')
    print('PASS: registry, state lineage, artifact coverage and local Markdown links')

def build():
    check()
    import subprocess
    subprocess.run(['npm', 'run', 'build'], cwd=ROOT / 'website', check=True)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('command', choices=['check', 'build'])
    args = parser.parse_args()
    {'check': check, 'build': build}[args.command]()
