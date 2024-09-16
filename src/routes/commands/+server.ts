import { error, json } from "@sveltejs/kit";
import fs from "fs";
import { TOKEN } from "$env/static/private";

export async function POST(event) {
	const { list = [], token = "defaultTokenValue" } = await event.request.json();

	if (token !== TOKEN) {
		throw error(401, "Unauthorized");
	}

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
