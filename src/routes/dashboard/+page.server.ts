import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
    const session = await locals.auth();

    // Show login page when not logged in
    if (!session?.user) {
        return {};
    }

    // Redirect to /dashboard/[user]
    throw redirect(302, `/dashboard/${session.user.id}`);
}
