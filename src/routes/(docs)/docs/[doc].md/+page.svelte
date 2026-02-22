<script lang="ts">
	let { data } = $props();
	let { doc } = $state(data);

	$effect(() => {
		doc = data.doc;
	});
</script>

<div class="text-accent1 m-auto w-11/12">
	<article class="prose">
		{#if doc}
			{@html doc}
		{:else}
			<span>Error loading document</span>
		{/if}
	</article>
</div>
