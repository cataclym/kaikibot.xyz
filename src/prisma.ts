import { type DiscordUsers, type GuildUsers, PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function getUserFromDb(userId: string): Promise<UserDBData> {
	const UserId = BigInt(userId);

	const user = await prisma.discordUsers.findUnique({
		where: {
			UserId
		}
	});

	if (!user) throw new Error("User not found");

	return {
		user,
		guildMemberships: await prisma.guildUsers.findMany({
			where: {
				UserId
			}
		})
	};
}

export async function getUserCache(userId: string) {
	await fetch(
		`${process.env.USERCACHE_URL}:${process.env.USERCACHE_PORT}/API/UserCache/140788173885276160`,
		{
			method: "POST",
			body: JSON.stringify({
				token: process.env.TOKEN
			}),
			headers: {
				"content-type": "application/json"
			}
		}
	);
}

export type UserDBData = {
	user: DiscordUsers;
	guildMemberships: GuildUsers[];
};
