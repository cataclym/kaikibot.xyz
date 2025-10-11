import { type Handle, error, redirect } from "@sveltejs/kit";
import { handle as authenticationHandle } from "./auth";
import { sequence } from "@sveltejs/kit/hooks";

const authorizationHandle: Handle = async ({ event, resolve }) => {
	// Protect any routes under /dashboard/[user] because there is always a parameter
	if (event.params.user) {		
		const session = await event.locals.auth();
		const userId = session?.user?.id;
		
		if (!userId) {
			throw redirect(303, '/auth');
		}

		// If a user is trying to access someone else's dashboard, throw 401 Unauthorized
		if (userId !== event.params.user) {
			return error(401, "Unauthorized");
		}
	}

	// If the request is still here, just proceed as normally
	return resolve(event);
};

// First handle authentication, then authorization
// Each function acts as a middleware, receiving the request handle
// And returning a handle which gets passed to the next function
export const handle: Handle = sequence(authenticationHandle, authorizationHandle);
