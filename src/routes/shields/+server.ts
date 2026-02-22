import pkg from "../../../package.json";

export async function GET({ url }) {
	switch (url.searchParams.get("param")) {
		case "version":
			return GETVersion();

		default:
			break;
	}
}

function GETVersion() {
	return new Response(
		JSON.stringify({
			label: "Live Version",
			message: pkg.version
		})
	);
}
