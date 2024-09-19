/**
 * Convert any case to Pascal case
 *
 * @param {string} str
 * @returns string
 */
export function toPascalCase(str) {
	return str
		.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
		.map((x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
		.join('');
}
