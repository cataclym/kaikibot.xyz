<script lang="ts">
	import "../app.css";
	import SEO from "../components/SEO.svelte";
	import { page } from "$app/stores";
	import { afterNavigate, beforeNavigate, goto } from "$app/navigation";
	import { KaikiNavigationState, navigationState } from "../stores/navigationState";
	import { fade } from "svelte/transition";
	import PageLoader from "../components/PageLoader.svelte";
	import capitalize from "../methods/capitalize";

	export let data: {
		docs: string[];
		LINKS: { [key: string]: string };
	};

	const LINKS = data.LINKS;
	const docs = data.docs.map((page) => `/docs/${page}`);
	docs.push("/README.md");

	beforeNavigate(() => {
		navigationState.set(KaikiNavigationState.loading);
	});

	afterNavigate(() => {
		navigationState.set(KaikiNavigationState.loaded);
	});
</script>

<SEO />
<svelte:head>
	<title>KaikiBot - {capitalize($page.url.pathname.replace("/", "") || "Home")}</title>
</svelte:head>

{#if $navigationState === KaikiNavigationState.loading}
	<div out:fade={{ delay: 400 }}>
		<PageLoader />
	</div>
{/if}

{#if $page.url.pathname === "/"}
	<h1 class="mt-10 mb-5 font-bold text-accent1 text-6xl lg:text-8xl text-center">
		<a class="text-center" href="/">KAIKIBOT</a>
	</h1>
	<h2 class="text-2xl mt-5 mb-10 text-accent1 text-center">
		Your
		<mark>dad</mark>
		isn't <em>this</em> cool
	</h2>
{:else}
	<div class="m-auto w-2/12 flex mb-2 justify-center items-center content-center">
		<div class="h-full w-full">
			<p class="font-bold text-accent1 text-xl text-accent1 text-center">
				<a class="text-center" href="/">KAIKIBOT</a>
			</p>
		</div>
		<button
			on:click={() => goto("/")}
			class="whitespace-nowrap h-10 border-b-2 text-accent1 layout w-full text-2xl text-accent1 text-center"
		>
			Home
		</button>
	</div>
{/if}
<div class="flex justify-evenly gap-1 smol">
	<a href={LINKS.discord} class="link_flex">
		<button
			class="h-16 whitespace-nowrap md:h-20 border-b-2 text-accent1 text-xl custom-width-1_7 layout"
			>SUPPORT SERVER
		</button>
	</a>
	<a class="link_flex" href={$page.url.pathname === "/commands" ? "/" : "/commands"}>
		<button
			aria-current={$page.url.pathname === "/commands"}
			class="h-16 whitespace-nowrap md:h-20 border-b-2 text-xl text-accent1 custom-width-1_7 layout"
		>
			COMMANDS
		</button>
	</a>
	<a href={LINKS.embed} class="link_flex">
		<button
			class="h-16 whitespace-nowrap md:h-20 border-b-2 text-xl text-accent1 custom-width-1_7 layout"
			>EMBED BUILDER
		</button>
	</a>
	<a href={LINKS.invite} class="link_flex">
		<button
			class="h-16 whitespace-nowrap md:h-20 border-b-2 text-xl text-accent1 custom-width-1_7 layout"
			>INVITE KAIKI
		</button>
	</a>
	<a href="/dashboard" class="link_flex">
		<button
			class="h-16 whitespace-nowrap md:h-20 border-b-2 text-xl text-accent1 patreon custom-width-1_7 layout"
		>
			DASHBOARD
		</button>
	</a>
	<a href={LINKS.source} class="link_flex">
		<button
			class="h-16 whitespace-nowrap md:h-20 border-b-2 text-xl text-accent1 gitlab custom-width-1_7 layout"
		>
			SOURCE CODE
		</button>
	</a>
	<a href={docs.includes($page.url.pathname) ? "/" : "/README.md"} class="link_flex">
		<button
			aria-current={docs.includes($page.url.pathname)}
			class="h-16 whitespace-nowrap md:h-20 border-b-2 text-xl text-accent1 paypal custom-width-1_7 layout"
		>
			DOCUMENTATION
		</button>
	</a>
</div>

<slot />
<div class="mt-20" />
<footer class="items-center grid grid-cols-3">
	<a class="self-center" href={LINKS.kofi}><h3>Buy me a coffee ☕</h3></a>
	<h3 class="flex-col">© Cata 2024</h3>
	<a href={LINKS.patreon}><h3>Patreon️</h3></a>
</footer>
