/**
 * @param {string} svgContents
 */
export function base64SVG(svgContents) {
	return Buffer.from(
		svgContents
			.replace('\n', '')
			.replace('stroke="currentColor"', 'stroke="#000" style="background-color: #fff"')
	).toString('base64');
}
