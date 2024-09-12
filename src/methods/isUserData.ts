import type { Session } from "@auth/sveltekit";
import type { AdapterUser } from "@auth/core/adapters";
export function isUserData(
	session: Session | undefined | null
): session is Session & { user: AdapterUser } {
	if (session?.user != null) return true;
	return false;
}
