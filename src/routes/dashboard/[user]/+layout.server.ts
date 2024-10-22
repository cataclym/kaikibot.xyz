import type { LayoutServerLoad } from "../../$types";
import UserData from "../../../UserData";
import { error } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ params, locals }) => {
	if (!params.user) throw error(500, "user not found");
	const session = await locals.auth();

	console.log(session);
	// @ts-ignore
	const responseData = await new UserData(params.user, session.accessToken).getData();

	return {
		session,
		responseData
	};
};
