<script lang="ts">
	import { page } from "$app/state";
	import { error } from "@sveltejs/kit";
	import { Avatar, Button, Heading } from "flowbite-svelte";
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

	for (const guild of responseData?.guilds || []) {
		if (mappedIdSet.has(guild.id)) {
			availableCachedGuilds.push(guild);
		} else {
			unavailableCachedGuilds.push(guild);
		}
	}
</script>

<main class="p-4 space-y-8">
	<div class="">
		<div class="inline-block space-y-4 p-2">
			<Avatar class="content-center" size="lg" src={user.image || ""} alt="Avatar" />
		</div>
		<Heading tag="h2" class="text-accent3">Hi {user.name || "User"}!</Heading>
		<div class="my-8"></div>
		<Button class="text-white m-1 text-md px-4 py-2.5" href="./{user.id}/profile">Profile</Button>
		<div class="my-8"></div>
		<Heading tag="h3" class="text-accent3  mb-4">Available guilds</Heading>
		<div class="w-full flex flex-row gap-2 flex-wrap justify-center content-center">
			{#each availableCachedGuilds as guild}
				<GuildCard {guild} {user} />
			{/each}
		</div>
		<div class="my-8"></div>
		<Heading tag="h3" class="text-accent3 mb-4">Other guilds</Heading>
		<div class="w-full flex flex-row gap-2 flex-wrap justify-center content-center">
			{#each unavailableCachedGuilds as guild}
				<NaGuildCard {guild} />
			{/each}
		</div>
	</div>
</main>
