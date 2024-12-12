<script lang="ts">
	import { Button, Input } from "flowbite-svelte";
	import { FileCheckSolid } from "flowbite-svelte-icons";

	export let prefix: string;

	let isLoading = false;

	const savedPrefix = Prefix;
	$: prefixState = savedPrefix === Prefix;

</script>

<div class="indent flex flex-col items-center justify-between">
			<h3>Server prefix</h3>
	<form method="POST" action="/dashboard/[user]/[guild]/config?/prefix">
			<label for="prefix">Prefix</label>
			<Input
				id="prefix"
				type="text"
				placeholder={savedPrefix}
				bind:value={Prefix} required
				style="width: 4rem; border-radius: 0.5rem;"
			/>
			<Button
				type="submit"
				color="primary"
				class="self-end ml-auto mr-auto enabled:cursor-pointer border-transparent"
				disabled={isLoading || prefixState}><FileCheckSolid />Save</Button
			>
	</form>
</div>