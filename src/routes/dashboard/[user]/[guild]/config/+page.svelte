<script lang="ts">
	import { error } from "@sveltejs/kit";
	import PrefixComponent from "../../../../../components/GuildConfig/Prefix.svelte";
	import Toggles from "../../../../../components/GuildConfig/Toggles.svelte";
	import ExcludedRole from "../../../../../components/GuildConfig/ExcludedRole.svelte";
	import EmbedColors from "../../../../../components/GuildConfig/EmbedColors.svelte";
	import { page } from "$app/state";

	let { data } = $props();

	const { isAdmin } = data;

	if (!isAdmin) error(401, "Not authorized");

	let { Anniversary, DadBot, StickyRoles, Prefix, OkColor, ErrorColor, ExcludeRole } = data.guild;

	const url = page.url.pathname;
</script>

<main class="p-4 space-y-8 w-full max-w-6xl mx-auto">
	<div id="guildSettings" class="flex flex-row flex-wrap gap-4 justify-center w-full">
		<PrefixComponent {Prefix} Action={url} />

		<Toggles {Anniversary} {DadBot} {StickyRoles} Action={url} />

		{#if ExcludeRole}
			<ExcludedRole {ExcludeRole} Action={url} />
		{/if}

		<EmbedColors {OkColor} {ErrorColor} Action={url} />
	</div>
</main>
