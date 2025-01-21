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
	let colorState = $derived(JSON.stringify(savedColors) === JSON.stringify({ hexOkColor, hexErrorColor }));

</script>
<div class="indent flex flex-col justify-between items-center text-gray-100 text-left">
	<h3 class="mb-0">Command embed colors</h3>
	<form method="POST" action={Action}?/embedcolors>
		<div class="pb-6">
			<h4 class="text-gray-100">Ok-Color</h4>
			<ColorPicker name="hexOkColor" bind:hex={hexOkColor} />
			<h4 class="text-gray-100">Error-color</h4>
			<ColorPicker name="hexErrorColor" bind:hex={hexErrorColor} />
		</div>
		<Button
			color="primary"
			class="self-end ml-auto mr-auto enabled:cursor-pointer border-transparent"
			disabled={colorState}>
			<FileCheckSolid />
			Save
		</Button
		>
	</form>
</div>
