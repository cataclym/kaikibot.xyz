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
			console.log(token);
			console.log(account);
			// This callback is called whenever a JWT is created (i.e. at sign in)
			// or updated (i.e whenever a session is accessed in the client)
			if (profile && account) {
				return {
					...token,
					discordSnowflake: profile.id,
					accessToken: account.access_token,
					refreshToken: account.refresh_token,
					expiry: account.expires_at
				}
			}

			else if (Date.now() < (token.exp || 0) * 1000) {
				return token;
			}

			else {
				if (!token.refresh_token) throw error(500, "Missing refresh_token")

				try {
					const res = await fetch("", {
						method: "POST",
						body: new URLSearchParams({

						}),
					});
					if (!res.ok) throw res;

					const newToken = await res.json() as {
						access_token: string,
						expires_in: number,
						refresh_token?: string
					}

					return {
						...token,
						accessToken: newToken.access_token,
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

			return token;
		},
		async session({ session, token }) {
			// Send properties to the client, like an access_token and user id from a provider.
			if (!session.user) throw error(500, "Missing session data!");

			return {
				...{ 
					...session,
					error: token.error
				},
				accessToken: token.accessToken,
				user: {
					...session.user,
					id: token.discordSnowflake
				}
			}
		}
	}
});
