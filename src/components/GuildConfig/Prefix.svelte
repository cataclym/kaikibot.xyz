<script lang="ts">
	import { Button, Input } from "flowbite-svelte";
	import { FileCheckSolid } from "flowbite-svelte-icons";

	interface Props {
		Prefix: string;
		Action: string;
	}

	let { Prefix = $bindable(), Action }: Props = $props();

	let isLoading = false;

	const savedPrefix = Prefix;
	let prefixState = $derived(savedPrefix === Prefix);
</script>

<div class="indent flex flex-col items-center justify-between">
	<h3>Server prefix</h3>
	<form method="POST" action="{Action}?/prefix">
		<div>
			<Input
				id="prefix"
				type="text"
				name="prefix"
				placeholder={savedPrefix}
				bind:value={Prefix}
				required
				style="width: 4rem; border-radius: 0.5rem;"
			/>
		</div>
		<Button
			type="submit"
			color="primary"
			class="self-end ml-auto mr-auto enabled:cursor-pointer border-transparent"
			disabled={isLoading || prefixState}><FileCheckSolid />Save</Button
		>
	</form>
</div>
