<script lang="ts">
	import { Button, P, Toggle } from "flowbite-svelte";
	import { FileCheckSolid, TrashBinSolid,  } from "flowbite-svelte-icons";

	interface Props {
		Anniversary: boolean;
		DadBot: boolean;
		StickyRoles: boolean;
		Action: string;
	}

	let {
		Anniversary = $bindable(),
		DadBot = $bindable(),
		StickyRoles = $bindable(),
		Action
	}: Props = $props();

	const savedToggles = { DadBot, Anniversary, StickyRoles };
	let toggleState = $derived(
		JSON.stringify(savedToggles) === JSON.stringify({ DadBot, Anniversary, StickyRoles })
	);

	function resetAll() {
		DadBot = savedToggles.DadBot;
		Anniversary = savedToggles.Anniversary;
		StickyRoles = savedToggles.StickyRoles;
	}
</script>

<div class="indent flex flex-col justify-between items-center">
	<form class="flex flex-col justify-between h-full p-4" method="POST" action="{Action}?/toggles">
		<!-- Heading -->
		<h3 class="text-center text-xl font-semibold mb-4">Toggles</h3>

		<!-- Toggles Section -->
		<div class="flex-grow flex flex-col gap-4 items-start pb-6">
			<div class="flex items-center gap-2">
				<Toggle bind:checked={DadBot}><P color="">Dad-mode</P></Toggle>
				<input type="hidden" name="dadbot" value={DadBot} />
			</div>
			<div class="flex items-center gap-2">
				<Toggle name="Anniversary" bind:checked={Anniversary}
					><P color="">Anniversary roles</P></Toggle
				>
				<input type="hidden" name="anniversary" value={Anniversary} />
			</div>
			<div class="flex items-center gap-2">
				<Toggle name="StickyRoles" bind:checked={StickyRoles}
					><P color="">Sticky roles</P></Toggle
				>
				<input type="hidden" name="stickyroles" value={StickyRoles} />
			</div>
		</div>

		<!-- Submit Button Section -->
		<div class="flex justify-center space-x-1 mt-4">
			<Button
				type="submit"
				color="primary"
				class="px-4 py-2 rounded-md enabled:cursor-pointer border-transparent"
				disabled={toggleState}><FileCheckSolid class="shrink-0 h-6 w-6" />
				Save</Button
			>
			<Button
				type="button"
				on:click={resetAll}
				color="dark"
				class="px-4 py-2 rounded-md enabled:cursor-pointer border-transparent"
				disabled={toggleState}><TrashBinSolid class="shrink-0 h-6 w-6" />Reset</Button
			>
		</div>
	</form>
</div>
