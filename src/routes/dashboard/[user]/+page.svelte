<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { error } from "@sveltejs/kit";
	import { Avatar, Button } from "flowbite-svelte";

	const session = $page.data.session;

	if (session?.user == null) throw error(500, "User does not exist");

	const { user } = session;

	export let data;

	const { userData } = data;
</script>

<main>
	<div>
		<Avatar src={user.image || ""} alt="Avatar" />
	</div>
	<h1 class="text-accent3">Hi {user.name}</h1>
	<div class="text-accent3">
		<p>You have 💴 {userData.data.user.Amount}</p>
	</div>
	<div>
		<h3>Guilds</h3>
		{#each userData.data.guildMemberships as guild}
			<h4>
				{userData.guilds.find((g) => g.id === String(guild.GuildId))?.name || "N/A"} | {guild.GuildId}
			</h4>
			<Button href="/dashboard/{user.id}/{guild.GuildId}">Edit settings</Button>
		{/each}
	</div>
	<button on:click={() => goto("/auth/signout")}>Logout</button>
</main>
