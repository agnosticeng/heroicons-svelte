/**
 * @template {Record} Item
 * @template {keyof Item} Key
 * @param {Item[]} array
 * @param {Key} key
 * @returns {Record<Item[Key], Item[]>}
 */
export function groupBy(array, key) {
	return array.reduce((acc, item) => {
		const group = item[key];

		if (!acc[group]) acc[group] = [];

		acc[group].push(item);

		return acc;
	}, {});
}
