import type { Session } from "@auth/sveltekit";
import type { LayoutServerLoad } from "../../$types";
import UserData from "../../../UserData";
import { error, fail } from "@sveltejs/kit";

function accessTokenExists(session: Session): session is Session & { accessToken: string } {
	return "accessToken" in session;
}

export const load: LayoutServerLoad = async ({ params, locals }) => {

	const session = await locals.auth();

	if (!session?.user?.id || !accessTokenExists(session)) {
		return fail(401, { type: "error", error: "Unauthenticated" })
	}

	const responseData = await new UserData(params.user!, session.accessToken).getData();

	return {
		session,
		responseData
	};
};