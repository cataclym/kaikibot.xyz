import { redirect, type Handle, error } from "@sveltejs/kit";
import { handle as authenticationHandle } from "./auth";
import { sequence } from "@sveltejs/kit/hooks";

const authorizationHandle: Handle = async ({ event, resolve }) => {
	// Protect any routes under /dashboard/*
	// /.+/ allows for an optional trailing slash and any characters
	if (/^\/dashboard(\/.*)?$/.test(event.url.pathname)) {
		const session = await event.locals.auth();

		if (!session?.user?.id) {
			return redirect(303, "/auth/signin");
		}

		// If a user is trying to access someone else's dashboard, throw 401 Unauthorized
		if (session.user?.id !== event.url.pathname.split("/")[2]) {
			return error(401, "Unauthorized?");
		}
	}

	// If the request is still here, just proceed as normally
	return resolve(event);
};

// First handle authentication, then authorization
// Each function acts as a middleware, receiving the request handle
// And returning a handle which gets passed to the next function
export const handle: Handle = sequence(authenticationHandle, authorizationHandle);
