import { type Handle, error } from "@sveltejs/kit";
import { handle as authenticationHandle } from "./auth";
import { sequence } from "@sveltejs/kit/hooks";

const authorizationHandle: Handle = async ({ event, resolve }) => {
	// Protect any routes under /dashboard/[user]
	if (event.params.user) {		
		const session = await event.locals.auth();
		
		const userId = session?.user?.id;
		
		if (!userId) {
			return event.locals.signOut();
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
