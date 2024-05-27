import "dotenv/config";
import { LINKS } from "../../CONSTANTS";

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
	const url = LINKS.JSON;

	if (!url) throw new Error("Missing commandlist URL!");

	const res = await fetch(url);
	const commands = (await res.json()).sort();

	return {
		commands
	};
}
