<script>
	import { error } from "@sveltejs/kit";
	import Toggles from "../../../../../components/GuildConfig/Toggles.svelte";
	import ExcludedRole from "../../../../../components/GuildConfig/ExcludedRole.svelte";
	import EmbedColors from "../../../../../components/GuildConfig/EmbedColors.svelte";

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

</script>
	<h2 class="text-center">Edit server configuration</h2>
	<div
		id="guildSettings"
		class="flex-row mt-2 flex-wrap gap-2 flex justify-center w-full row-start-1"
	>
		<Prefix />

		<Toggles Anniversary={Anniversary} DadBot={DadBot} StickyRoles={StickyRoles} />

		{#if ExcludeRole}
			<ExcludedRole ExcludeRole={ExcludeRole} />
		{/if}

		<EmbedColors OkColor={OkColor} ErrorColor={ErrorColor} />
	</div>
