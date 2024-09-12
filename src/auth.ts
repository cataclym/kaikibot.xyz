import { type Session, SvelteKitAuth, type SvelteKitAuthConfig } from "@auth/sveltekit";
import Discord from "@auth/sveltekit/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserCache, getUserFromDb, prisma, type BotResData, type UserDBData } from "./UserData";
import type { AdapterUser } from "@auth/core/adapters";
import type { Account, Awaitable, DefaultSession, Profile, User } from "@auth/core/types";
import type { CredentialInput } from "@auth/core/providers";
import type { AdapterSession } from "@auth/core/adapters";
import type { JWT } from "@auth/core/jwt";
import { error } from "@sveltejs/kit";

// Hack, but who is gonna judge me?
export const { handle, signIn, signOut } = SvelteKitAuth(<KaikiSvelteKitAuthConfig>{
	adapter: PrismaAdapter(prisma),
	providers: [Discord],
	callbacks: {
		async jwt({ token, user, account, profile }) {
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

export interface KaikiSvelteKitAuthConfig extends Omit<SvelteKitAuthConfig, "callbacks"> {
	callbacks: {
		signIn?: (params: {
			user: User | AdapterUser;
			account: Account | null;
			profile?: Profile;
			email?: {
				verificationRequest?: boolean;
			};
			/** If Credentials provider is used, it contains the user credentials */
			credentials?: Record<string, CredentialInput>;
		}) => Awaitable<boolean | string>;
		redirect?: (params: { url: string; baseUrl: string }) => Awaitable<string>;
		session?: (
			params: ({
				session: CustomSession;
				user: AdapterUser;
			} & {
				session: Session;
				token: CustomJWT;
			}) & {
				newSession: any;
				trigger?: "update";
			}
		) => Awaitable<Session | DefaultSession>;
		jwt?: (params: {
			token: CustomJWT;
			user: User | AdapterUser;
			account: Account | null;
			profile?: Profile;
			trigger?: "signIn" | "signUp" | "update";
			isNewUser?: boolean;
			session?: any;
		}) => Awaitable<CustomJWT | null>;
	};
}

type CustomJWT = JWT & { discordSnowflake?: string; cache?: BotResData; dbData?: UserDBData };
export type CustomSession = AdapterSession & {
	user?: AdapterUser & { id?: string; data?: UserDBData; cache?: BotResData };
};
