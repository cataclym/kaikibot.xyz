<script>
	import { Button, Heading, Input, Toggle } from "flowbite-svelte";
	import { FileCheckSolid } from "flowbite-svelte-icons";
	import { error } from "@sveltejs/kit";
	import IntColorToHex from "../../../../../methods/IntColorToHex";
	import ColorPicker from "svelte-awesome-color-picker";
	import ClickToCopy from "../../../../../components/ClickToCopy.svelte";

	export let data;

	const { isAdmin } = data;
	if (!isAdmin) error(401, "Not authorized");

	let {
		DadBot,
		Anniversary,
		Prefix,
		OkColor,
		ErrorColor,
		StickyRoles,
		ExcludeRole
	} = data.guild;

	const savedPrefix = Prefix;
	$: prefixState = savedPrefix === Prefix;

	const savedToggles = { DadBot, Anniversary, StickyRoles };
	$: toggleState =
		JSON.stringify(savedToggles) === JSON.stringify({ DadBot, Anniversary, StickyRoles });

	let hexOkColor = OkColor ? IntColorToHex(Number(OkColor)) : "#00ff00";
	let hexErrorColor = ErrorColor
		? IntColorToHex(ErrorColor)
		: "#ff0000";
	const savedColors = {
		hexOkColor,
		hexErrorColor
	};
	$: colorState = JSON.stringify(savedColors) === JSON.stringify({ hexOkColor, hexErrorColor });

	let savedExcludeRole = ExcludeRole
		? {
			name: ExcludeRole?.name,
			color: IntColorToHex(ExcludeRole.color),
			icon: ExcludeRole?.icon,
		} : null;
	$: excludeRoleState = ExcludeRole
		? JSON.stringify(savedExcludeRole) === JSON.stringify({
		name: ExcludeRole?.name,
		color: IntColorToHex(ExcludeRole.color),
		icon: ExcludeRole?.icon,
	}) : null;
</script>
	<h2 class="text-center">Edit server configuration</h2>
	<div
		id="guildSettings"
		class="flex-row mt-2 flex-wrap gap-2 flex justify-center w-full row-start-1"
	>
		<div class="indent flex flex-col items-center justify-between">
			<h3>Server prefix</h3>
			<Input
				id="prefix"
				type="text"
				placeholder={Prefix}
				bind:value={Prefix}
				style="width: 4rem; border-radius: 0.5rem;"
			/>
			<Button
				color="primary"
				class="self-end ml-auto mr-auto enabled:cursor-pointer border-transparent"
				disabled={prefixState}><FileCheckSolid />Save</Button
			>
		</div>

		<div class="indent flex flex-col justify-between items-center">
			<h3>Toggles</h3>
			<div>
				<Toggle bind:checked={DadBot}><p>Dad-mode</p></Toggle>
				<Toggle bind:checked={Anniversary}><p>Anniversary roles</p></Toggle>
				<Toggle bind:checked={StickyRoles}><p>Sticky roles</p></Toggle>
			</div>
			<Button
				color="primary"
				class="self-end ml-auto mr-auto enabled:cursor-pointer border-transparent"
				disabled={toggleState}><FileCheckSolid />Save</Button
			>
		</div>

		{#if savedExcludeRole}
			<div class="indent flex flex-col justify-between items-center">
				<h3 class="mb-0">Excluded-role</h3>
				<div class="flex flex-row justify-around w-full">
					<h3>Role name</h3>>
					<h3>Role color</h3>
				</div>
				<div class="flex flex-row justify-between gap-16 w-full text-gray-100">
					<Input type="text" bind:value={savedExcludeRole.name}></Input>
					<ColorPicker bind:hex={savedExcludeRole.color} />
				</div>
				<ClickToCopy>{ExcludeRole?.id}</ClickToCopy>
				<Button
					color="primary"
					class="self-end ml-auto mr-auto enabled:cursor-pointer border-transparent"
					disabled={!!excludeRoleState}><FileCheckSolid />Save</Button
				>
			</div>
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
