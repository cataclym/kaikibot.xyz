import "dotenv/config";
import fs from "fs";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	// Reads commands.json if it exists, otherwise return empty object
	const commands = await new Promise((resolve) => {
		fs.readFile("./static/commands/commands.json", "utf8", (err, data) => {
			return err ? resolve({}) : resolve(JSON.parse(data).sort());
		});
	});

	return {
		commands
	};
}
