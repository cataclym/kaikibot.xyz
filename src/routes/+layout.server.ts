import { LINKS } from "../CONSTANTS";
import type { LayoutServerLoad } from "./$types";
import fs from "fs";

export async function load(event): Promise<LayoutServerLoad> {
	const docs = await new Promise((resolve) => {
		fs.readdir(
			"./src/routes/(docs)/docs",
			{ encoding: "utf-8", withFileTypes: true },
			(err, data) => {
				return err ? resolve([]) : resolve(data.map((d) => d.name));
			}
		);
	});

	const session = await event.locals.auth();
	return { LINKS, docs, session };
}
