import { error, json } from "@sveltejs/kit";
import fs from "fs/promises";
import { env } from "$env/dynamic/private";
const { TOKEN } = env;

export async function POST(event) {
	const { list = [], token = "defaultTokenValue" } = await event.request.json();

	if (token !== TOKEN) {
		throw error(401, "Unauthorized");
	}

	try {
		await fs.writeFile("data/commands.json", JSON.stringify(list));
	} catch (err) {
		console.log(err);
		throw error(500, "Failed to write file");
	}

	return json("Success", {
		status: 201
	});
}

export async function GET() {
	const text = await fs.readFile("data/commands.json", "utf-8");
	return new Response(text, { status: 200 });
}
