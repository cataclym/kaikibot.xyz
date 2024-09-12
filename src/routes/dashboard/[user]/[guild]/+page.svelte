<script lang="ts">
	import { isUserData } from "../../../../methods/isUserData";
	import { error } from "@sveltejs/kit";
	import { page } from "$app/stores";
	import { Button, InfoBadge, ToggleSwitch } from "fluent-svelte";

	const session = $page.data.session;
	if (!isUserData(session)) throw error(500, "User does not exist");

	const { user } = session;
	export let data;
	const { guildData } = data;
	let { DadBot, Anniversary,  } = guildData;
</script>

<main>
	<h2>{user.cache.guilds.find(g => g.id === $page.params.guild)?.name || $page.params.guild}</h2>

	<h4>Dadbot</h4> <InfoBadge severity="information"/>
	<ToggleSwitch bind:DadBot />

	<h4>Anniversary roles</h4> <InfoBadge severity="information"/>
	<ToggleSwitch bind:Anniversary />

	<Button variant="accent">Save changes</Button>
</main>
