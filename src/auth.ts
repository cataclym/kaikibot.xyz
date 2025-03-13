import { SvelteKitAuth, type SvelteKitAuthConfig } from "@auth/sveltekit";
import Discord from "@auth/sveltekit/providers/discord";
import { error } from "@sveltejs/kit";

export const { handle, signIn, signOut } = SvelteKitAuth(<SvelteKitAuthConfig>{
	debug: process.env.NODE_ENV === "development",
	trustHost: process.env.AUTH_TRUST_HOST,
	providers: [
		Discord({
			authorization: "https://discord.com/api/oauth2/authorize?scope=identify+guilds"
		})
	],
	callbacks: {
		async jwt({ token, profile, account }) {
			// This callback is called whenever a JWT is created (i.e. at sign in)
			// or updated (i.e whenever a session is accessed in the client)
			if (profile?.id && account?.access_token) {
				token.discordSnowflake = profile.id;
				token.accessToken = account.access_token;
			}

			return token;
		},
		async session({ session, token }) {
			// Send properties to the client, like an access_token and user id from a provider.
			if (!session.user) throw error(500, "Missing session data!");

			console.log(token);
			if (token.discordSnowflake != null && token.accessToken) {
				// @ts-ignore
				session.user.id = token.discordSnowflake;
				// @ts-ignore
				session.accessToken = token.accessToken;
			}

			return session;
		}
	}
});
