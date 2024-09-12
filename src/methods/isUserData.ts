import type { CustomSession } from "../auth";
import type { AdapterSession, AdapterUser } from "@auth/core/adapters";
import type { BotResData, UserDBData } from "../UserData";

export function isUserData(
	session: CustomSession | undefined
): session is AdapterSession & {
	user: AdapterUser & { id: string; data: UserDBData; cache: BotResData };
} {
	if (session?.user?.data) return true;
	return false;
}
