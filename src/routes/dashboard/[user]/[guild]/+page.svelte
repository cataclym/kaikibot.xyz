<script lang="ts">
	import type { CustomSession } from "../../../../auth";
	import { isUserData } from "../../../../methods/isUserData";
	import { error } from "@sveltejs/kit";
	import { page } from "$app/stores";
	import { Button, InfoBadge, ToggleSwitch } from "fluent-svelte";

	const session = <undefined | CustomSession> $page.data.session;
	if (!isUserData(session)) throw error(500, "User does not exist");
	const { user } = session;

	const guildData = user.data.guildMemberships.find(g => g.GuildId === BigInt($page.params.guild))
	if (!guildData) throw error(500, "Failed retrieving guild data!");

	let { DadBot, Anniversary,  } = guildData.Guilds;
</script>

<main>
	<h2>{user.cache.guilds.find(g => g.id === $page.params.guild)?.name || $page.params.guild}</h2>

	<h4>Dadbot</h4> <InfoBadge severity="information"/>
	<ToggleSwitch bind:DadBot />

	<h4>Anniversary roles</h4> <InfoBadge severity="information"/>
	<ToggleSwitch bind:Anniversary />

	<Button variant="accent">Save changes</Button>
</main>
