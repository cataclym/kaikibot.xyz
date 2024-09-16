import fs from "fs";

export async function load(event) {
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
	return { docs, session };
}
