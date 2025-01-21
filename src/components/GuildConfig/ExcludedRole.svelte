<script lang="ts">
	import { Button, Input } from "flowbite-svelte";
	import ColorPicker from "svelte-awesome-color-picker";
	import ClickToCopy from "../ClickToCopy.svelte";
	import { FileCheckSolid } from "flowbite-svelte-icons";
	import IntColorToHex from "../../methods/IntColorToHex.js";

	interface Props {
		ExcludeRole: undefined | null | { color: number; id: string; name: string; };
		Action: string;
	}

	let { ExcludeRole, Action }: Props = $props();

	let savedExcludeRole = $state(ExcludeRole
		? {
			name: ExcludeRole?.name,
			color: IntColorToHex(ExcludeRole.color),
			icon: ExcludeRole?.icon
		} : null);
	let excludeRoleState = $derived(ExcludeRole
		? JSON.stringify(savedExcludeRole) === JSON.stringify({
		name: ExcludeRole?.name,
		color: IntColorToHex(ExcludeRole.color),
		icon: ExcludeRole?.icon
	}) : null);

</script>
{#if savedExcludeRole}
	<div class="indent flex flex-col justify-between items-center">
		<h3 class="mb-0">Excluded-role</h3>
		<div class="flex flex-row justify-around w-full">
			<h3>Role name</h3>>
			<h3>Role color</h3>
		</div>
		<form method="POST" action="{Action}?/excludedrole">
			<div class="flex flex-row justify-between gap-16 w-full text-gray-100">
				<Input name="excluderolename" type="text" bind:value={savedExcludeRole.name}></Input>
				<ColorPicker name="excluderolecolor" bind:hex={savedExcludeRole.color} />
				<Input type="hidden" name="excluderole" value={ExcludeRole?.id}></Input>
			</div>
			<ClickToCopy>{ExcludeRole?.id}</ClickToCopy>
			<Button
				type="submit"
				color="primary"
				class="self-end ml-auto mr-auto enabled:cursor-pointer border-transparent"
				disabled={!!excludeRoleState}>
				<FileCheckSolid />
				Save
			</Button
			>
		</form>
	</div>
{/if}
