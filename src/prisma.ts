import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export function getUserFromDb(userId: string): PrismaClient {
	const data = {};

	data["user"] = prisma.discordUsers.findUnique({
		where: {
			UserId: userId
		}
	});

	data["guilds"] = prisma.guildUsers.findMany({
		where: {
			UserId: userId
		}
	})

	return data;
}