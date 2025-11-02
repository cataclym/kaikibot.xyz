<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { Tween } from "svelte/motion";
	import { cubicOut } from "svelte/easing";
	import { navigationState } from "$lib/stores/navigationState";

	const progress = new Tween(0, {
		duration: 3500,
		easing: cubicOut
	});

	const unsubscribe = navigationState.subscribe((state) => {
		if (state === "loaded") {
			progress.set(1, { duration: 1000 });
		}
	});

	onMount(() => {
		progress.set(0.7);
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<div class="progress-bar">
	<div class="progress-sliver" style={`--width: ${progress.current * 100}%`}></div>
</div>

<style>
	.progress-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 0.5rem;
	}

	.progress-sliver {
		width: var(--width);
		background-color: var(--accent4);
		height: 100%;
	}
</style>
