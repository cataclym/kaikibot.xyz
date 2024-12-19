<script lang="ts">
	import { Button, Toggle } from "flowbite-svelte";
	import { FileCheckSolid } from "flowbite-svelte-icons";

export let Anniversary: boolean;
export let DadBot: boolean;
export let StickyRoles: boolean;

const savedToggles = { DadBot, Anniversary, StickyRoles };
$: toggleState =
	JSON.stringify(savedToggles) === JSON.stringify({ DadBot, Anniversary, StickyRoles });

</script>
<div class="indent flex flex-col justify-between items-center">
	<form method="POST" action="/dashboard/[user]/[guild]/config?/toggles">
		<h3>Toggles</h3>
		<div>
			<Toggle bind:checked={DadBot}><p>Dad-mode</p></Toggle>
			<Toggle bind:checked={Anniversary}><p>Anniversary roles</p></Toggle>
			<Toggle bind:checked={StickyRoles}><p>Sticky roles</p></Toggle>
		</div>
		<Button
			type="submit"
			color="primary"
			class="self-end ml-auto mr-auto enabled:cursor-pointer border-transparent"
			disabled={toggleState}><FileCheckSolid />Save</Button
		>
	</form>
</div>