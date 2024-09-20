import fs from 'node:fs';
import path from 'node:path';
import SVG from 'svgson';
import { toPascalCase } from './utils/string.mjs';
import { base64SVG } from './utils/svg.mjs';

const ICONS_DIR = new URL(import.meta.resolve('heroicons/24')).pathname;
const OUTPUT_DIR = path.resolve(process.cwd(), './src/lib');

/**
 * @param {string} directory SVG directory path
 * @returns {string[]}
 */
function readSvgDirectory(directory) {
	return fs
		.readdirSync(directory, { recursive: true })
		.filter((file) => path.extname(file) === '.svg');
}

function build() {
	const svgFilePaths = readSvgDirectory(ICONS_DIR);

	const icons = svgFilePaths.map((file_path) => {
		const content = fs.readFileSync(path.join(ICONS_DIR, file_path), 'utf-8');
		const {
			children,
			// eslint-disable-next-line no-unused-vars
			attributes: { xmlns, 'data-slot': slot, ...attrs }
		} = SVG.parseSync(content);
		let [type, name] = file_path.split('/');
		name = name.replace(/.svg$/, '');

		return {
			path: file_path,
			type,
			name,
			componentName: toPascalCase(name),
			children: SVG.stringify(children),
			attributes: attrs,
			base64: base64SVG(content)
		};
	});

	icons.forEach((icon) => {
		const component = `
<script>
		/** @type {string | number | null | undefined} */
		export let size = 24
</script>

<!--
 @component @name ${icon.componentName}
 @description Heroicon component
 
 @preview ![img](data:image/svg+xml;base64,${icon.base64})
 @see https://heroicons.com/ - Heroicons official website
 -->
 
<svg
		${Object.entries(icon.attributes)
			.map(([key, value]) => `${key}="${value}"`)
			.join('\n')}
		width={size}
		height={size}
		{...$$restProps}
		data-name="${icon.name}"
>
	${icon.children}
</svg>`;

		fs.writeFileSync(path.join(OUTPUT_DIR, icon.type, icon.componentName + '.svelte'), component);
	});
}

build();
