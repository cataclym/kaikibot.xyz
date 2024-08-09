import { LINKS } from "../CONSTANTS";
import fs from "fs";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const docs = await new Promise((resolve) => {
		fs.readdir(
			"./src/routes/(docs)/docs",
			{ encoding: "utf-8", withFileTypes: true },
			(err, data) => {
				return err ? resolve([]) : resolve(data.map((d) => d.name));
			}
		);
	});

	return { LINKS, docs };
}
