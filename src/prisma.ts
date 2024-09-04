import { type DiscordUsers, type GuildUsers, PrismaClient } from "@prisma/client";
import { error } from "@sveltejs/kit";
import type { User } from "@auth/sveltekit";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function getUserFromDb(userId: string): Promise<UserDBData> {
	const UserId = BigInt(userId);

	const [user, guildMemberships] = await Promise.all([prisma.discordUsers.findUnique({
		where: {
			UserId
		}
	}),
		await prisma.guildUsers.findMany({
			where: {
				UserId
			}
		})
	]);

	if (!user) throw new Error("User not found");

	return {
		user,
		guildMemberships
	};
}

export async function getUserCache(userId: string): Promise<UserCacheData> {
	const res = await fetch(
		`${process.env.USERCACHE_URL}:${process.env.USERCACHE_PORT}/API/UserCache/140788173885276160`,
		{
			method: "POST",
			body: JSON.stringify({
				token: process.env.TOKEN
			}),
			headers: {
				"content-type": "application/json"
			}
		});

	if (!res.ok) throw error(res.status, res.statusText);

	return res.json();
}

export type UserDBData = {
	user: DiscordUsers;
	guildMemberships: GuildUsers[];
};

export type UserCacheData = {
	user: User,
	guilds: { id: string, name: string }[]
}
