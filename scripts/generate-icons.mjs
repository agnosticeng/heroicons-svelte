import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import SVG from 'svgson';
import { toPascalCase } from './utils/string.mjs';
import { base64SVG } from './utils/svg.mjs';
import { groupBy } from './utils/array.mjs';

const ICONS_DIR = url.fileURLToPath(import.meta.resolve('heroicons/24'));
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
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
<script lang="ts">
		import type { SvelteHTMLElements } from 'svelte/elements';

		type $$Props = Omit<SvelteHTMLElements['svg'], 'width' | 'height'> & {
			size?: string | number | null
		}

		export let size: $$Props['size'] = 24
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

	const grouped = groupBy(icons, 'type');

	for (const group in grouped) {
		const grouped_icons = grouped[group];

		const export_path = path.join(OUTPUT_DIR, group, 'index.ts');

		const exports_ = grouped_icons.map(
			(i) => `export { default as ${i.componentName} } from './${i.componentName}.svelte'`
		);

		fs.writeFileSync(export_path, exports_.join('\n'));
	}
}

build();
