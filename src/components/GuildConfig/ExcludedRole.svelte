<script lang="ts">
	import { Button, Input } from "flowbite-svelte";
	import ColorPicker from "svelte-awesome-color-picker";
	import ClickToCopy from "../ClickToCopy.svelte";
	import { FileCheckSolid } from "flowbite-svelte-icons";
	import IntColorToHex from "../../methods/IntColorToHex.js";

	interface Props {
		ExcludeRole: undefined | null | { color: number; id: string; name: string, icon: string };
		Action: string;
	}

	let { ExcludeRole, Action }: Props = $props();

	let savedExcludeRole = $state(
		ExcludeRole
			? {
					name: ExcludeRole?.name,
					color: IntColorToHex(ExcludeRole.color),
					icon: ExcludeRole?.icon
				}
			: null
	);
	let excludeRoleState = $derived(
		ExcludeRole
			? JSON.stringify(savedExcludeRole) ===
					JSON.stringify({
						name: ExcludeRole?.name,
						color: IntColorToHex(ExcludeRole.color),
						icon: ExcludeRole?.icon
					})
			: null
	);
</script>

{#if savedExcludeRole}
	<div class="indent flex flex-col justify-between items-center">
		<h3 class="text-center text-xl font-semibold mb-4">Excluded-role</h3>
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
					<Input name="excluderolename" type="text" bind:value={savedExcludeRole.name} />
					<ColorPicker name="excluderolecolor" bind:hex={savedExcludeRole.color} />
				</div>
			</div>
			<div class="flex justify-center mt-4">
				<ClickToCopy>{ExcludeRole?.id}</ClickToCopy>
			</div>

			<!-- Submit Button Section -->
			<div class="flex justify-center mt-4">
				<Button
					type="submit"
					color="primary"
					class="px-4 py-2 rounded-md enabled:cursor-pointer border-transparent"
					disabled={!!excludeRoleState}
				>
					<FileCheckSolid />
					Save
				</Button>
			</div>
		</form>
	</div>
{/if}
