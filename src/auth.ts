import { SvelteKitAuth, type SvelteKitAuthConfig } from "@auth/sveltekit";
import { type JWT } from "@auth/core/jwt";
import Discord from "@auth/sveltekit/providers/discord";
import { error } from "@sveltejs/kit";

function refreshTokenExists(token: JWT): token is JWT & { refresh_token: string } {
	return "refresh_token" in token;
}

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
			if (profile && account) {
				return {
					...token,
					discordSnowflake: profile.id,
					access_token: account.access_token,
					refresh_token: account.refresh_token,
					expires_at: account.expires_at
				}
			}

			else if (Date.now() < (token.exp || 0) * 1000) {
				return token;
			}

			else {
				if (!refreshTokenExists(token)) throw error(500, "Missing refresh_token")

				try {
					const res = await fetch("https://discord.com/api/v10", {
						method: "POST",
						body: new URLSearchParams({
							grant_type: 'refresh_token',
							refresh_token: token.refresh_token,
						}),
						headers: {
							"Content-Type": "application/x-www-form-urlencoded"
						}
					});

					if (!res.ok) throw res;

					const newToken = await res.json() as {
						access_token: string,
						expires_in: number,
						refresh_token?: string
					}

					return {
						...token,
						access_token: newToken.access_token,
						expires_at: Math.floor(Date.now() / 1000 + newToken.expires_in),
						refresh_token: newToken.refresh_token
							? newToken.refresh_token
							: token.refresh_token,
					}
				}
				catch (error) {
					console.error("Error refreshing access_token", error);
					token.error = "RefreshTokenError"
					return token;
				}
			}
		},
		async session({ session, token }) {
			// Send properties to the client, like an access_token and user id from a provider.
			if (!session.user) throw error(500, "Missing session data!");

			return {
				...{
					...session,
					error: token.error
				},
				accessToken: token.access_token,
				user: {
					...session.user,
					id: token.discordSnowflake
				}
			}
		}
	}
});
