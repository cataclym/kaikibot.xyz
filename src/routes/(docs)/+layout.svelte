<script lang="ts">
	import "../../app.css";
	import PageLoader from "../../components/PageLoader.svelte";
	import { fade } from "svelte/transition";
	import { KaikiNavigationState, navigationState } from "../../stores/navigationState";
	import { page } from "$app/stores";
	import { afterNavigate, beforeNavigate } from "$app/navigation";

	export let data: {
		docs: string[];
	};

	const docs = data.docs;

	const documentation = Object.freeze({
		"ENV.md": "Environment",
		"GUIDE.md": "Guide",
		"PLACEHOLDERS.md": "Placeholders"
	});

	beforeNavigate(() => {
		navigationState.set(KaikiNavigationState.loading);
	});

	afterNavigate(() => {
		navigationState.set(KaikiNavigationState.loaded);
	});
</script>

{#if $navigationState === KaikiNavigationState.loading}
	<div out:fade={{ delay: 400 }}>
		<PageLoader />
	</div>
{/if}

<nav id="navigation" class="mt-2 pb-5">
	<a
		href="/README.md"
		class="text-xl items-start"
		aria-current={$page.url.pathname === "/README.md"}
	>
		Docs
	</a>
	<br class="mb-6 mt-3 pb-2" />
	{#each docs as doc}
		<a href="/docs/{doc}" aria-current={$page.url.pathname === `/docs/${doc}`}
			>{documentation[doc] || doc}</a
		>
	{/each}
</nav>

<slot />

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	#navigation {
		color: var(--accent3);
		border-bottom: solid var(--accent2) 2px;
	}

	nav a {
		margin: 0 0.2rem;
		background-color: var(--accent2);
		padding: 0.5rem;
	}

	nav a[aria-current="true"] {
		border-bottom: 2px solid var(--accent4);
	}
</style>
