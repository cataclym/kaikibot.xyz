import { redirect } from "@sveltejs/kit";

export async function load({ parent }) {
    const user = (await parent()).session?.user; // assuming you're setting the user in hooks.server.js

    if (!user) {
        // Not logged in - Show login page
        return {};
    }

    // Redirect to /dashboard/[user]
    throw redirect(302, `/dashboard/${user.id}`);
}
