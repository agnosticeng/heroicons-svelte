import parse_args from 'minimist';
import fs from 'node:fs';
import path from 'node:path';

let { version } = parse_args(process.argv.slice(2));

if (typeof version !== 'string') {
	throw new TypeError('Invalid version provided');
}

if (version.at(0) === 'v') version = version.slice(1);

const pkg_path = path.resolve(process.cwd(), './package.json');

const pkg_raw = fs.readFileSync(pkg_path, 'utf-8');
const pkg = JSON.parse(pkg_raw);

pkg.version = version;

fs.writeFileSync(pkg_path, JSON.stringify(pkg, null, '\t'));
