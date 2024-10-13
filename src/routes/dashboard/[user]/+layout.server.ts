import type { LayoutServerLoad } from "../../$types";
import UserData from "../../../UserData";
import { error } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ params }) => {
	if (!params.user) throw error(500, "user not found");

	const responseData = await new UserData(params.user).getData();

	return {
		responseData
	};
};
