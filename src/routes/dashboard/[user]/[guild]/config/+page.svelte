<script>
	import { Button, Heading, Input, Toggle } from "flowbite-svelte";
	import { FileCheckSolid } from "flowbite-svelte-icons";
	import { error } from "@sveltejs/kit";
	import IntColorToHex from "../../../../../methods/IntColorToHex";
	import ColorPicker from "svelte-awesome-color-picker";
	import Toggles from "../../../../../components/GuildConfig/Toggles.svelte";

	export let data;

	const { isAdmin } = data;

	if (!isAdmin) error(401, "Not authorized");

	let {
		Prefix,
		OkColor,
		ErrorColor,
		ExcludeRole
	} = data.guild;

	let hexOkColor = OkColor ? IntColorToHex(Number(OkColor)) : "#00ff00";
	let hexErrorColor = ErrorColor ? IntColorToHex(Number(ErrorColor)) : "#ff0000";
	const savedColors = {
		hexOkColor,
		hexErrorColor
	};
	$: colorState = JSON.stringify(savedColors) === JSON.stringify({ hexOkColor, hexErrorColor });
</script>
	<h2 class="text-center">Edit server configuration</h2>
	<div
		id="guildSettings"
		class="flex-row mt-2 flex-wrap gap-2 flex justify-center w-full row-start-1"
	>
		<Prefix />

		<Toggles />

		{#if savedExcludeRole}
			<ExcludedRole />
		{/if}

		<div class="indent flex flex-col justify-between items-center text-gray-100 text-left">
			<h3 class="mb-0">Command embed colors</h3>
			<div class="pb-6">
				<h4 class="text-gray-100">Ok-Color</h4>
				<ColorPicker bind:hex={hexOkColor} />
				<h4 class="text-gray-100">Error-color</h4>
				<ColorPicker bind:hex={hexErrorColor} />
			</div>
			<Button
				color="primary"
				class="self-end ml-auto mr-auto enabled:cursor-pointer border-transparent"
				disabled={colorState}><FileCheckSolid />Save</Button
			>
		</div>
	</div>
