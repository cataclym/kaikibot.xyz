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
	console.log(data)
</script>

<main>
	<div>
		<Avatar size="lg" src={user.image || ""} alt="Avatar" />
	</div>
	<h1 class="text-accent3">Hi {user.name}</h1>
	<div class="text-accent3">
		<p>You have 💴 {responseData.userData.Amount}</p>
	</div>
	<div>
		<h3>Guilds</h3>
		{#each responseData.data as guild}
			{@const cacheGuild = responseData.guilds.find((g) => g.id === String(guild.GuildId))}
			<div class="indent">
				<Avatar src={`https://cdn.discordapp.com/icons/${guild.GuildId}/${cacheGuild?.icon}.webp			` || ""} alt="Guild" />
			<h4>
				{cacheGuild?.name || "N/A"} | {guild.GuildId}
			</h4>
			<Button href="/dashboard/{user.id}/{guild.GuildId}">Edit settings</Button>
			</div>
		{/each}
	</div>
</main>
