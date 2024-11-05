<script lang="ts">
	import { page } from "$app/stores";
	import { error } from "@sveltejs/kit";
	import { Avatar } from "flowbite-svelte";
	import GuildCard from "../../../components/GuildCard.svelte";

	const session = $page.data.session;

	if (session?.user == null) throw error(500, "User does not exist");

	const { user } = session;

	export let data;

	const { responseData } = data;
	const mappedIds = responseData.guildDb.map(guild => guild.Id);
	console.log(data);

	const availableCachedGuilds = responseData.guilds.filter(g => mappedIds.includes(g.id));
</script>

<main>
	<div class="">
		<div>
			<Avatar size="lg" src={user.image || ""} alt="Avatar" />
		</div>
		<h1 class="text-accent3">Hi {user.name}</h1>
		<div class="text-accent3">
			<p>You have 💴 {responseData.userData?.Amount || 0}</p>
		</div>
		<h3>Available guilds</h3>
		<div class="w-full flex flex-row gap-2 mb-12 flex-wrap justify-center content-center">
			{#each availableCachedGuilds as guild}
					<GuildCard {guild} {user} />
			{/each}
		</div>
	</div>
</main>
