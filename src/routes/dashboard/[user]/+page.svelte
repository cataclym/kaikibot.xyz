<script lang="ts">
	import { page } from "$app/stores";
	import { error } from "@sveltejs/kit";
	import { Avatar, Button } from "flowbite-svelte";
	import type { Guild } from "discord.js";

	const session = $page.data.session;

	if (session?.user == null) throw error(500, "User does not exist");

	const { user } = session;

	export let data;

	const { responseData } = data;
	console.log(data);
</script>

<main>
	<div class="">
		<div>
			<Avatar size="lg" src={user.image || ""} alt="Avatar" />
		</div>
		<h1 class="text-accent3">Hi {user.name}</h1>
		<div class="text-accent3">
			<p>You have 💴 {responseData.userData.Amount}</p>
		</div>
		<h3>Guilds</h3>
		<div class="w-full flex flex-row gap-2 mb-12 flex-wrap justify-center content-center">
		{#each responseData.guildDb as guild}
			{@const cacheGuild = responseData.guilds.find((g) => g.id === String(guild.Id))}
			{#if (cacheGuild !== undefined)}
				<div class="indent">
					<Avatar size="lg"
							src={`https://cdn.discordapp.com/icons/${guild.Id}/${cacheGuild?.icon}.webp			` || ""}
							alt="Guild" />
					<h4>
						{cacheGuild?.name || "N/A"}
					</h4>
					<Button href="/dashboard/{user.id}/{guild.Id}">Edit settings</Button>
					<h6>{guild.Id}</h6>
				</div>
			{/if}
		{/each}
		</div>
	</div>
</main>
