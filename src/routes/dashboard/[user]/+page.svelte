<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { error } from "@sveltejs/kit";
	import type { User } from "@auth/sveltekit";
	import type { UserDBData } from "../../../prisma.js";

	const user = <undefined | (User & { data: UserDBData })>$page.data.session?.user;
	if (!user || user.data) throw error(500, "User does not exist");
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
			<p>{guild.GuildId}</p>
		{/each}
	</div>
	<button on:click={() => goto("/auth/signout")}>Logout</button>
</main>
