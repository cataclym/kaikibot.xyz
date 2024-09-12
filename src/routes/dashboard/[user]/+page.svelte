<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { error } from "@sveltejs/kit";
	import type { CustomSession } from "../../../auth";
	import { isUserData } from "../../../methods/isUserData";
	import { Button } from "fluent-svelte";

	const session = <undefined | CustomSession>$page.data.session;
	if (!isUserData(session)) throw error(500, "User does not exist");
	const { user } = session;

</script>

<main>
	<div>
		<img src={user.image} alt="Avatar" />
	</div>
	<h1 class="text-accent3">Hi {user?.name || "User"}</h1>
	<div class="text-accent3">
		<p>You have 💴 {user.data.user.Amount}</p>
	</div>
	<div>
		<h3>Guilds</h3>
		{#each user.data.guildMemberships as guild}
			<h4>
				{user.cache.guilds.find((g) => BigInt(g.id) === guild.GuildId)?.name || ""} | {guild.GuildId}
			</h4>
			<Button href="/dashboard/{user.id}/{guild.GuildId}">Edit settings</Button>
		{/each}
	</div>
	<button on:click={() => goto("/auth/signout")}>Logout</button>
</main>
