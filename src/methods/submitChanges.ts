export async function submitChanges(guildData: RecapturedGuildData, GuildId: bigint, url: string, port:string): Promise<void> {
	const req = fetch(`${url}:${port}/API/Guild/${GuildId}`, {
		method: "POST",
		body: JSON.stringify({
			token: process.env.TOKEN,
			data: guildData
		}),
		headers: {
			"content-type": "application/json"
		}
	})
}
