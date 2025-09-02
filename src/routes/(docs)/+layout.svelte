<script lang="ts">
	import "../../app.css";
	import PageLoader from "../../components/PageLoader.svelte";
	import { fade } from "svelte/transition";
	import { KaikiNavigationState, navigationState } from "$lib/stores/navigationState";
	import { page } from "$app/state";
	import { afterNavigate, beforeNavigate } from "$app/navigation";

	type Documentation = Readonly<{
		"ENV.md": string;
		"PLACEHOLDERS.md": string;
		"GUIDE.md": string;
	}>;

	const documentation: Documentation = Object.freeze({
		"ENV.md": "Environment",
		"GUIDE.md": "Guide",
		"PLACEHOLDERS.md": "Placeholders"
	});

	interface Props {
		data: {
			docs: (keyof Documentation)[];
		};
		children?: import("svelte").Snippet;
	}

	let { data, children } = $props();

	const docs = data.documentMetadata;

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

<nav id="navigation" class="mt-2 mb-2 pb-2 w-11/12 m-auto">
	<div class="grid grid-cols-6 gap-y-1 mr-auto w-fit">
		<a
			href="/README.md"
			class="text-xl col-span-1 place-self-start border-b-(--accent2) border-b-2"
			aria-current={page.url.pathname === "/README.md"}
		>
			Main
		</a>
		<div class="col-end-7"></div>
		{#each docs as { name, path }}
		{@const staticPath = `/${path}`}
			<a
				href={staticPath}
				class="border-b-(--accent2) border-b-2"
				aria-current={page.url.pathname === staticPath}>{documentation[name as keyof Documentation] || name}</a
			>
		{/each}
	</div>
</nav>

{@render children?.()}

<style>
	@reference "../../app.css";

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
