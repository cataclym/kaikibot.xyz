import CreateHeaders from "./CreateHeaders";

export async function SubmitChanges(
	guildData: Object,
	GuildId: bigint,
	url: string,
	port: string
): Promise<void> {
	const req = fetch(`${url}:${port}/API/Guild/${GuildId}`, {
		method: "PUT",
		body: JSON.stringify(guildData),
		headers: CreateHeaders(),
	});
}
