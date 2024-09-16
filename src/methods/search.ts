import type { Cmd, Cmds } from "../ICommand";

export default function search(
	commands: Cmds,
	input: Event & { currentTarget: EventTarget & HTMLInputElement },
	category: { [key: string]: boolean }
): [string, [string, Cmd[]]][] {
	const cats = Object.entries(commands);

	/**
	 * Get input value in both firefox and chrome
	 */
	const inputText = input.currentTarget.value?.toLowerCase()?.trim();

	let mapped = cats.map((cm) => cm[1]);

	const cat = Object.keys(category)?.shift();

	// Filter based on enabled category??
	if (cat) {
		mapped = mapped.filter((a) => a[0] === cat);
	}

	const filtered = mapped
		.map((cb) => cb[1])
		.flat()
		.filter((a) => a.id.toLowerCase().includes(inputText || ""));

	return filtered.map((res): [string, [string, Cmd[]]] => {
		const cat = cats.map((a) => a[1]).find((a) => a[1].find((b) => b.id === res.id));

		return [cats.findIndex((a) => a[0] === cat![0]).toString(), [cat![0], [res]]];
	});
}
