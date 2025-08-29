<script lang="ts">
	import { Button, Input } from "flowbite-svelte";
	import { FileCheckSolid, TrashBinSolid } from "flowbite-svelte-icons";

	interface Props {
		Prefix: string;
		Action: string;
	}

	let { Prefix = $bindable(), Action }: Props = $props();

	const savedPrefix = Prefix;
	let prefixState = $derived(savedPrefix === Prefix);

	function resetAll() {
		Prefix = savedPrefix;
	}
</script>

<div class="indent flex flex-col justify-between items-center">
	<form class="flex flex-col justify-between h-full p-4" method="POST" action="{Action}?/prefix">
		<!-- Heading -->
		<h3 class="text-center text-xl font-semibold mb-4">Server Prefix</h3>

		<!-- Input Field -->
		<div class="flex-grow w-full max-w-xs">
			<Input
				id="prefix"
				type="text"
				name="prefix"
				maxlength={10}
				placeholder={savedPrefix}
				bind:value={Prefix}
				required
				class="w-full p-2 border rounded-md shadow-sm"
			/>
		</div>

		<!-- Submit Button -->
		<div class="flex justify-center space-x-1 mt-4">
			<Button
				type="submit"
				color="primary"
				class="px-4 py-2 rounded-md enabled:cursor-pointer border-transparent"
				disabled={prefixState}><FileCheckSolid class="shrink-0 h-6 w-6" />Save</Button
			>
			<Button
				type="button"
				on:click={resetAll}
				color="dark"
				class="px-4 py-2 rounded-md enabled:cursor-pointer border-transparent"
				disabled={prefixState}><TrashBinSolid class="shrink-0 h-6 w-6" />Reset</Button
			>
		</div>
	</form>
</div>
