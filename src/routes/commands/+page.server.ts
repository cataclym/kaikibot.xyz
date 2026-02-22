export async function load({ fetch }) {
	const res = await fetch("/commands");
	const commands = await res.json();
	return { commands };
}
