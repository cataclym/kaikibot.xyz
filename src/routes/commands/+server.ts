import { error, json } from "@sveltejs/kit";
import fs from "fs";
import { TOKEN } from "$lib/server/secrets";

export async function POST(event) {
	const token = event.url.searchParams.get("token");

	if (token !== TOKEN) {
		throw error(401, "Unauthorized");
	}

	const { list } = await event.request.json();

	try {
		fs.writeFile("./static/commands/commands.json", list, (err) =>
			err ? console.log(err) : undefined
		);
	} catch (err) {
		console.log(err);
		throw error(500, "Failed to write file");
	}

	return json("Success", {
		status: 201
	});
}
