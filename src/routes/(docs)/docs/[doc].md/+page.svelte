<script lang="ts">
	import { afterUpdate, onMount } from "svelte";
	import { writable } from "svelte/store";
	$: fileContent = writable<string | null>(null);

	export let data;

	onMount(() => {
		fileContent.set(data.doc || "");
		console.log($fileContent);
	});

	// Deprecated? I am not in runes mode.
	afterUpdate(() => {
		fileContent.set(data.doc || "");
		console.log($fileContent);
	});
</script>

<div class="text-accent1 m-auto w-11/12">
	<article class="prose">
		{#if $fileContent}
			{@html $fileContent}
		{:else}
			<span>Error loading document</span>
		{/if}
	</article>
</div>