<script lang="ts">
	import ColorPicker from "svelte-awesome-color-picker";
	import { Button } from "flowbite-svelte";
	import { FileCheckSolid } from "flowbite-svelte-icons";
	import IntColorToHex from "../../methods/IntColorToHex";

	interface Props {
		OkColor: any;
		ErrorColor: any;
		Action: string;
	}

	let { OkColor, ErrorColor, Action }: Props = $props();

	let hexOkColor = $state(OkColor ? IntColorToHex(Number(OkColor)) : "#00ff00");
	let hexErrorColor = $state(ErrorColor ? IntColorToHex(Number(ErrorColor)) : "#ff0000");
	const savedColors = {
		hexOkColor,
		hexErrorColor
	};
	let colorState = $derived(
		JSON.stringify(savedColors) === JSON.stringify({ hexOkColor, hexErrorColor })
	);
</script>

<div class="indent flex flex-col justify-between items-center text-gray-100 text-left">
	<form class="flex flex-col justify-between h-full p-4" method="POST" action="{Action}?/embedcolors">
		<!-- Heading -->
		<h3 class="text-center text-xl font-semibold mb-4">Bot Embed Colors</h3>
	
		<!-- Color Pickers Section -->
		<div class="flex-grow pb-6">
			<div class="mb-6">
				<h4 class="text-gray-100 font-semibold">Ok-Color</h4>
				<ColorPicker name="hexokcolor" bind:hex={hexOkColor} />
			</div>
			<div class="mb-6">
				<h4 class="text-gray-100 font-semibold">Error-color</h4>
				<ColorPicker name="hexerrorcolor" bind:hex={hexErrorColor} />
			</div>
		</div>
	
		<!-- Submit Button -->
		<div class="flex justify-center mt-4">
			<Button
				color="primary"
				class="px-4 py-2 rounded-md enabled:cursor-pointer border-transparent"
				disabled={colorState}
			>
				<FileCheckSolid />
				Save
			</Button>
		</div>
	</form>	
</div>
