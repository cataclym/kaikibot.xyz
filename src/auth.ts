import { SvelteKitAuth, type SvelteKitAuthConfig } from "@auth/sveltekit";
import Discord from "@auth/sveltekit/providers/discord";
import { error } from "@sveltejs/kit";

export const { handle, signIn, signOut } = SvelteKitAuth(<SvelteKitAuthConfig> {
	providers: [Discord],
	callbacks: {
		async jwt({ token, profile }) {
			// This callback is called whenever a JWT is created (i.e. at sign in)
			// or updated (i.e whenever a session is accessed in the client)
			if (profile?.id) {
				token.discordSnowflake = profile.id;
			}
			return token;
		},
		async session({ session, token }) {
			// Send properties to the client, like an access_token and user id from a provider.
			if (!session.user) throw error(500, "Missing session data!");

			if (token.discordSnowflake != null) {
				session.user.id = token.discordSnowflake;
			}

			return session;
		}
	}
});
