import type { CustomSession } from "../auth";
import type { AdapterSession, AdapterUser } from "@auth/core/adapters";
import type { UserCacheData, UserDBData } from "../prisma";

export function isUserData(session: CustomSession | undefined): session is AdapterSession & { user: AdapterUser & { id: string, data: UserDBData, cache: UserCacheData } } {
	if (session?.user?.data) return true;
	return false;
}
