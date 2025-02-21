<script lang="ts">
	import "../app.css";
	import SEO from "../components/SEO.svelte";
	import { page } from "$app/state";
	import { afterNavigate, beforeNavigate, goto } from "$app/navigation";
	import { KaikiNavigationState, navigationState } from "$lib/navigationState";
	import { fade, scale, slide } from "svelte/transition";
	import PageLoader from "../components/PageLoader.svelte";
	import Capitalize from "../methods/Capitalize";
	import { Heading, Mark } from "flowbite-svelte";
	import { ArrowUpRightFromSquareOutline } from "flowbite-svelte-icons";

	let { data, children } = $props();

	const { DISCORD, EMBED, INVITE, KOFI, SOURCE } = data;

	beforeNavigate(() => {
		navigationState.set(KaikiNavigationState.loading);
	});

	afterNavigate(() => {
		navigationState.set(KaikiNavigationState.loaded);
	});

	function isDocs() {
		return page.url.pathname === "/README.md" || page.url.pathname.includes("/docs/")
	}

	function isDash() {
		return !!page.url.pathname.match("/dashboard")?.length
	}

	function isGenericPath(path: string) {
		return page.url.pathname === path;
	}
</script>

<SEO />
<svelte:head>
	<title>KaikiBot - {Capitalize(page.url.pathname.split("/")[1] || "Home")}</title>
</svelte:head>

{#if $navigationState === KaikiNavigationState.loading}
	<div out:fade={{ delay: 400 }}>
		<PageLoader />
	</div>
{/if}

{#if page.url.pathname === "/"}
<div class="big_title" transition:slide={{duration: 300}}>
	<h1 class="mt-10 mb-5 font-bold text-accent1 text-6xl lg:text-8xl text-center">
		<a class="text-center" href="/">KAIKIBOT</a>
	</h1>
	<h2 class="text-2xl mt-5 mb-10 text-accent1 text-center">
		Your
		<mark>dad</mark>
		isn't <em>this</em> cool
	</h2>
</div>
{:else}
	<div class="small_title m-auto w-2/12 flex mb-2 mt-2 justify-center items-center content-center" transition:slide={{duration: 600}} >
		<div class="h-full w-full">
			<Heading tag="h4" class="font-bold text-accent1 text-center">
				<a class="text-center" href="/">KAIKIBOT</a>
			</Heading>
		</div>
	</div>
{/if}
<div class="flex justify-evenly gap-1 smol">
	<a href={DISCORD} class="link_flex">
		<button
			class="h-16 whitespace-nowrap md:h-20 border-b-2 text-accent1 text-xl full-width layout"
			>SUPPORT SERVER
			<ArrowUpRightFromSquareOutline size="sm" class="align-top!"/>
		</button>
	</a>
	<a class="link_flex" href={isGenericPath("/commands") ? "/" : "/commands"}>
		<button
			aria-current={isGenericPath("/commands")}
			class="h-16 whitespace-nowrap md:h-20 border-b-2 text-xl text-accent1 full-width layout"
		>
			COMMANDS
		</button>
	</a>
	<a href={isGenericPath("/embed") ? "/" : "/embed"} class="link_flex">
		<button
			aria-current={isGenericPath("/embed")}
			class="h-16 whitespace-nowrap md:h-20 border-b-2 text-xl text-accent1 full-width layout"
		><Mark>NEW</Mark><br>EMBED BUILDER
		</button>
	</a>
	<a href={INVITE} class="link_flex">
		<button
			class="h-16 whitespace-nowrap md:h-20 border-b-2 text-xl text-accent1 full-width layout"
			>INVITE KAIKI
				<ArrowUpRightFromSquareOutline size="sm" class="align-top!"/>
		</button>
	</a>
	<a href={isDash() ? "/" : "/dashboard"} class="link_flex">
		<button
			aria-current={isDash()}
			class="h-16 whitespace-nowrap md:h-20 border-b-2 text-xl text-accent1 patreon full-width layout"
		>
			DASHBOARD
		</button>
	</a>
	<a href={SOURCE} class="link_flex">
		<button
			class="h-16 whitespace-nowrap md:h-20 border-b-2 text-xl text-accent1 gitlab full-width layout"
		>
			SOURCE CODE
			<ArrowUpRightFromSquareOutline size="sm" class="align-top!"/>
		</button>
	</a>
	<a href={isDocs() ? "/" : "/README.md"} class="link_flex">
		<button
			aria-current={isDocs()}
			class="h-16 whitespace-nowrap md:h-20 border-b-2 text-xl text-accent1 paypal full-width layout"
		>
			DOCUMENTATION
		</button>
	</a>
</div>

{@render children?.()}
<div class="mt-20"></div>
<footer class="items-center grid grid-cols-3">
	<a class="self-center" href={KOFI}><h3>Buy me a ko-fi ☕</h3></a>
	<h3 class="flex-col">© Cata 2025</h3>
</footer>
