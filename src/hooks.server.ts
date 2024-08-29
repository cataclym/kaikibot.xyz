import { redirect, type Handle, error, type RequestEvent } from "@sveltejs/kit";
import { handle as authenticationHandle } from "./auth";
import { sequence } from "@sveltejs/kit/hooks";
import type { MaybePromise } from "$app/navigation";

async function authorizationHandle({
	event,
	resolve
}: {
	event: RequestEvent;
	resolve: (event: RequestEvent) => MaybePromise<Response>;
}) {
	// Protect any routes under /authenticated
	if (event.url.pathname.startsWith("/dashboard") && event.url.pathname !== "/dashboard") {
		const session = await event.locals.auth();
		if (!session || !session.user) {
			// Redirect to the signin page
			throw redirect(303, "/auth/signin");
		}
		// If a user is trying to access someone else's dashboard, throw 401 Unauthorized
		if (session.user?.id !== event.url.pathname.split("/")[2]) {
			throw error(401, "Unauthorized");
		}
	}

	// If the request is still here, just proceed as normally
	return resolve(event);
}

// First handle authentication, then authorization
// Each function acts as a middleware, receiving the request handle
// And returning a handle which gets passed to the next function
export const handle: Handle = sequence(authenticationHandle, authorizationHandle);
