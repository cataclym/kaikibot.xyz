import { SvelteKitAuth } from "@auth/sveltekit";
import Discord from "@auth/sveltekit/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserFromDb, prisma } from "./prisma";

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: PrismaAdapter(prisma),
	providers: [Discord],
	callbacks: {
		async jwt({ token, user, account, profile }) {
			// This callback is called whenever a JWT is created (i.e. at sign in)
			// or updated (i.e whenever a session is accessed in the client)
			if (profile) {
				token.discordSnowflake = profile.id;
				token.dbData = await getUserFromDb(profile.id);
			}
			return token;
		},
		async session({ session, token }) {
			// Send properties to the client, like an access_token and user id from a provider.
			session.user.id = token.discordSnowflake;
			session.user.data = token.dbData;
			return session;
		}
	},
});
