import type { Session } from "@auth/sveltekit";
import type { LayoutServerLoad } from "../../$types";
import UserData from "../../../UserData";
import { error, fail } from "@sveltejs/kit";
import { allowList } from "$lib";

function accessTokenExists(session: Session): session is Session & { accessToken: string } {
	return "accessToken" in session;
}

export const load: LayoutServerLoad = async ({ params, locals }) => {

	const session = await locals.auth();

	if (!session?.user?.id || !accessTokenExists(session)) {
		fail(401, { type: "error", error: "Unauthenticated" })
	}

	if (!allowList.has(BigInt(session?.user?.id || 0))) {
		throw error(401, { "message": "Unauthenticated. Only testers are able to access the dashboard at this moment." })

	}

	const responseData = await new UserData(params.user!, session.accessToken).getData();

	return {
		session,
		responseData
	};
};