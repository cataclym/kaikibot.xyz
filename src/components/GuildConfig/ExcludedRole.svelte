<script lang="ts">
	import { Button, Input } from "flowbite-svelte";
	import ColorPicker from "svelte-awesome-color-picker";
	import ClickToCopy from "../ClickToCopy.svelte";
	import { FileCheckSolid, TrashBinSolid } from "flowbite-svelte-icons";
	import IntColorToHex from "../../methods/IntColorToHex.js";

	interface Props {
		ExcludeRole: undefined | null | { color: number; id: string; name: string, icon: string | null };
		Action: string;
	}

	let { ExcludeRole, Action }: Props = $props();
	let excludeRoleObject = $state(ExcludeRole
		? {
			name: ExcludeRole.name,
			color: IntColorToHex(ExcludeRole.color),
			icon: ExcludeRole.icon
		}
		: null
	);

	// Save initial state once
	const savedExcludeRole = ExcludeRole
		? {
			name: ExcludeRole.name,
			color: IntColorToHex(ExcludeRole.color),
			icon: ExcludeRole.icon
		}
		: null;

	// Derived state to check if current role differs from saved one
	let excludeRoleState = $derived(
		JSON.stringify(savedExcludeRole) === JSON.stringify(excludeRoleObject)
	);

	// Reset handler
	function resetAll() {
		if (savedExcludeRole) {
		excludeRoleObject = { ...savedExcludeRole }; // clone to trigger reactivity
		} else {
		excludeRoleObject = null;
		}
	}
</script>

{#if excludeRoleObject}
	<div class="indent flex flex-col justify-between items-center overflow-visible!">
		<h3 class="text-center text-xl font-semibold mb-4">DadBot Excluded Role</h3>
		<div class="flex flex-row justify-around w-full">
			<h3>Role name</h3>
			<h3>Role color</h3>
		</div>
		<form
			class="flex flex-col justify-between h-full p-4"
			method="POST"
			action="{Action}?/excludedrole"
		>
			<!-- Exclude Role Form Content -->
			<div class="flex flex-col flex-grow gap-4">
				<div class="flex flex-row justify-between gap-16 w-full text-gray-100">
					<Input minlength={1} maxlength={100} name="excluderolename" type="text" bind:value={excludeRoleObject.name} />
					<ColorPicker isAlpha={false} name="excluderolecolor" bind:hex={excludeRoleObject.color} />
				</div>
			</div>
			<div class="flex justify-center mt-4">
				<ClickToCopy>{ExcludeRole?.id}</ClickToCopy>
			</div>

			<!-- Submit Button Section -->
			<div class="flex justify-center space-x-1 mt-4">
				<Button
					type="submit"
					color="primary"
					class="px-4 py-2 rounded-md enabled:cursor-pointer border-transparent"
					disabled={excludeRoleState}
				>
					<FileCheckSolid class="shrink-0 h-6 w-6" />
					Save
				</Button>
				<Button
					type="button"
					onclick={resetAll}
					color="dark"
					class="px-4 py-2 rounded-md enabled:cursor-pointer border-transparent"
					disabled={excludeRoleState}><TrashBinSolid class="shrink-0 h-6 w-6" />Reset</Button
				>
			</div>
		</form>
	</div>
{/if}
