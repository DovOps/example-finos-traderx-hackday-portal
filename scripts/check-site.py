#!/usr/bin/env python3
"""Check that emitted local links/assets stay within the deployment path and exist."""
import argparse
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit

class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
    def handle_starttag(self, tag, attrs):
        self.links.extend(v for k, v in attrs if k in ('href', 'src') and v)

parser = argparse.ArgumentParser()
parser.add_argument('directory', type=Path)
parser.add_argument('--base-url', required=True)
args = parser.parse_args()
root = args.directory.resolve()
errors = []
pages = list(root.rglob('*.html'))
if not pages:
    raise SystemExit('No HTML pages to check')
for page in pages:
    links = Links()
    links.feed(page.read_text())
    current = 'https://portal.invalid' + args.base_url + page.relative_to(root).as_posix()
    for link in links.links:
        if link.startswith('#'):
            continue
        target = urlsplit(urljoin(current, link))
        if target.netloc != 'portal.invalid' or target.scheme not in ('http', 'https'):
            continue
        path = unquote(target.path)
        if not path.startswith(args.base_url):
            errors.append(f'{page.relative_to(root)}: escapes base URL: {link}')
            continue
        file = root / path[len(args.base_url):]
        if not file.is_file() and not (file / 'index.html').is_file():
            errors.append(f'{page.relative_to(root)}: missing: {link}')
for link in re.findall(r'\]\((/[^)]+)\)', (root / 'llms.txt').read_text()):
    if not link.startswith(args.base_url) or not (root / link[len(args.base_url):]).is_file():
        errors.append(f'llms.txt: invalid source link: {link}')
if errors:
    raise SystemExit('\n'.join(sorted(set(errors))))
print(f'PASS: {len(pages)} HTML pages, local links/assets and llms.txt under {args.base_url}')
