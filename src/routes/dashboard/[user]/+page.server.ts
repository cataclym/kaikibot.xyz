import { error } from "@sveltejs/kit";
import { page } from "$app/stores";

export function load({ params }) {
	const user = page.data.session.user;

	if (user) {
		return {
			title: `Hello ${user.UserId}`,
			content: `You have ${	|| 0} Yen 💴<br>${user.ClaimedDaily ? "You have claimed your daily reward." : "You have not yet claimed your daily reward!"}`
		};
	}

	error(404, "Not found");
}
