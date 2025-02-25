<script lang="ts">
	import { Button, Toggle } from "flowbite-svelte";
	import { FileCheckSolid } from "flowbite-svelte-icons";

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
</script>

<div class="indent flex flex-col justify-between items-center">
	<form method="POST" action="{Action}?/toggles">
		<h3>Toggles</h3>
		<div>
			<Toggle bind:checked={DadBot}><p>Dad-mode</p></Toggle>
			<input type="hidden" name="dadbot" value={DadBot} />
			<Toggle name="Anniversary" bind:checked={Anniversary}><p>Anniversary roles</p></Toggle>
			<input type="hidden" name="anniversary" value={DadBot} />
			<Toggle name="StickyRoles" bind:checked={StickyRoles}><p>Sticky roles</p></Toggle>
			<input type="hidden" name="stickyroles" value={DadBot} />
		</div>
		<Button
			type="submit"
			color="primary"
			class="self-end ml-auto mr-auto enabled:cursor-pointer border-transparent"
			disabled={toggleState}><FileCheckSolid />Save</Button
		>
	</form>
</div>
