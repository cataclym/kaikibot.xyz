<script lang="ts">
	import { Button, InfoBadge, TextBox, ToggleSwitch } from "fluent-svelte";

	export let data;
	const { guildData } = data;
	let { DadBot, Anniversary, Name, Prefix, OkColor, ErrorColor, ByeChannel, ByeMessage, ByeTimeout, WelcomeTimeout, WelcomeMessage, WelcomeChannel StickyRoles } = guildData;
</script>

<main>
	<h2>{Name || guildData.GuildId}</h2>

	<h4>Prefix</h4> <InfoBadge severity="information"/> <p>Prefix</p>
	

	<h3>Toggles</h3>
	<div class="indent">
		<h4>Dadbot</h4> <InfoBadge severity="information"/> <p>Dadbot</p>
		<ToggleSwitch bind:DadBot />

		<h4>Anniversary roles</h4> <InfoBadge severity="information"/> <p>Anniversary</p>
		<ToggleSwitch bind:Anniversary />

		<h4>Sticky-roles</h4> <InfoBadge severity="information"/> <p>Sticky-roles</p>
		<ToggleSwitch bind:StickyRoles />
	</div>

	<h3>Command embed colors</h3>
	<h4>Ok color</h4> <InfoBadge severity="information"/> <p>Explain</p>
	<TextBox bind:OkColor />

	<h4>Error color</h4> <InfoBadge severity="information"/> <p>Explain</p>
	<TextBox bind:Anniversary />

	<Button variant="accent">Save changes</Button>
</main>
