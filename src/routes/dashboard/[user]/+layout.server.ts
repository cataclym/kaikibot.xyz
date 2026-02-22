import type { Session } from "@auth/sveltekit";
import type { LayoutServerLoad } from "../../$types";
import UserData from "../../../UserData";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ params, locals }) => {

	const session = await locals.auth();

	if (!session?.user?.id || !accessTokenExists(session)) {
		throw redirect(303, "/auth/signin");
	}
	
	else {
		const responseData = await new UserData(params.user!, session.accessToken).getData();

		return {
			session,
			responseData
		};
	}
};
function accessTokenExists(session: Session): session is Session & { accessToken: string } {
	return "accessToken" in session && typeof session.accessToken === "string";
}
