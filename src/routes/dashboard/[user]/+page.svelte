<script lang="ts">
	import { page } from "$app/state";
	import { error } from "@sveltejs/kit";
	import { Avatar, Button } from "flowbite-svelte";
	import GuildCard from "../../../components/GuildCard.svelte";
	import type OAuthGuildData from "../../../interfaces/OAuthGuildData";
	import NaGuildCard from "../../../components/NAGuildCard.svelte";

	const session = page.data.session;

	if (session?.user == null) throw error(500, "User does not exist");

	const { user } = session;

	let { data } = $props();

	const { responseData } = data;
	const mappedIdSet = new Set(responseData?.guildDb.map((guild) => guild.Id));

	const availableCachedGuilds: OAuthGuildData[] = [];
	const unavailableCachedGuilds: OAuthGuildData[] = [];

	for (const guild of responseData!.guilds) {
		if (mappedIdSet.has(guild.id)) {
			availableCachedGuilds.push(guild);
		} else {
			unavailableCachedGuilds.push(guild);
		}
	}
</script>

<main>
	<div class="">
		<div>
			<Avatar size="lg" src={user.image || ""} alt="Avatar" />
		</div>
		<h1 class="text-accent3">Hi {user.name || "User"}</h1>
		<Button class="text-gray-800" href="./{user.id}/profile">Profile</Button>
		<h2 class="text-accent3 text-lg">Available guilds</h2>
		<div class="w-full flex flex-row gap-2 mb-12 flex-wrap justify-center content-center">
			{#each availableCachedGuilds as guild}
				<GuildCard {guild} {user} />
			{/each}
		</div>
		<h2 class="text-accent3 text-lg">Other guilds</h2>
		<div class="w-full flex flex-row gap-2 mb-12 flex-wrap justify-center content-center">
			{#each unavailableCachedGuilds as guild}
				<NaGuildCard {guild} />
			{/each}
		</div>
	</div>
</main>
