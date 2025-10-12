import type { Session } from "@auth/sveltekit";
import type { LayoutServerLoad } from "../../$types";
import UserData from "../../../UserData";
import { error, redirect } from "@sveltejs/kit";
import { allowList } from "$lib";
import { signIn } from "../../../auth";

function accessTokenExists(session: Session): session is Session & { accessToken: string } {
	return "accessToken" in session;
}

export const load: LayoutServerLoad = async ({ params, locals }) => {

	const session = await locals.auth();

	if (!session?.user?.id || !accessTokenExists(session)) {
		throw redirect(303, "/auth/signin");
	}

	else if (!allowList.has(BigInt(session.user.id || 0))) {
		console.log(`User logged into dashboard: ${session.user.name} [${session.user.id}]`);
		// throw error(401, { "message": "Unauthenticated. Only testers are able to access the dashboard at this moment." })
	}

	else {
		const responseData = await new UserData(params.user!, session.accessToken).getData();

		return {
			session,
			responseData
		};
	}
};