<script lang="ts">
	import { error } from "@sveltejs/kit";
	import PrefixComponent from "../../../../../components/GuildConfig/Prefix.svelte";
	import Toggles from "../../../../../components/GuildConfig/Toggles.svelte";
	import ExcludedRole from "../../../../../components/GuildConfig/ExcludedRole.svelte";
	import EmbedColors from "../../../../../components/GuildConfig/EmbedColors.svelte";
	import { page } from '$app/state';

	export let data;

	const { isAdmin } = data;

	if (!isAdmin) error(401, "Not authorized");

	let {
		Anniversary,
		DadBot,
		StickyRoles,
		Prefix,
		OkColor,
		ErrorColor,
		ExcludeRole
	} = data.guild;

	const url = page.url.pathname
</script>
	<h2 class="text-center">Edit server configuration</h2>
	<div
		id="guildSettings"
		class="flex-row mt-2 flex-wrap gap-2 flex justify-center w-full row-start-1"
	>
		<PrefixComponent Prefix={Prefix} Action={url} />

		<Toggles Anniversary={Anniversary} DadBot={DadBot} StickyRoles={StickyRoles} Action={url} />

		{#if ExcludeRole}
			<ExcludedRole ExcludeRole={ExcludeRole} Action={url} />
		{/if}

		<EmbedColors OkColor={OkColor} ErrorColor={ErrorColor} Action={url} />
	</div>
