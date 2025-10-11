<script lang="ts">
	import "../app.css";
	import SEO from "../components/SEO.svelte";
	import { page } from "$app/state";
	import { afterNavigate, beforeNavigate, goto } from "$app/navigation";
	import { KaikiNavigationState, navigationState } from "$lib/stores/navigationState";
	import { fade, slide } from "svelte/transition";
	import PageLoader from "../components/PageLoader.svelte";
	import Capitalize from "../methods/Capitalize";
	import { Avatar, Heading, Mark } from "flowbite-svelte";
	import { ArrowUpRightFromSquareOutline } from "flowbite-svelte-icons";
	import LoggedInHeader from "../components/LoggedInHeader.svelte";
	import type { User } from "@auth/sveltekit";

	let { data, children } = $props();

	const { DISCORD, INVITE, KOFI, PUBLIC_SOURCE } = data;

	const session = page.data.session;
	let user: User | undefined = $state();

	if (session?.user) {
		user = session.user;
	}

	beforeNavigate(() => {
		navigationState.set(KaikiNavigationState.loading);
	});

	afterNavigate(() => {
		navigationState.set(KaikiNavigationState.loaded);
	});

	function isDocs() {
		return (page.url.pathname === "/README.md" || page.url.pathname.includes("/docs/"))
		 	? "/"
			: "/README.md";
	}

	function isDash() {
		return !!page.url.pathname.match("/dashboard")?.length
			? "/"
			: "/dashboard";

	}

	function isGenericPath(path: string) {
		return page.url.pathname === path
			? "/"
			: path;
	}

	function ariaCurrent(path: string) {
		return isGenericPath(path) === "/";
	}
</script>

<SEO />
<svelte:head>
	<title>KaikiBot - {Capitalize(session?.user?.name || page.url.pathname.split("/")[1] || "Home")}</title>
</svelte:head>

{#if $navigationState === KaikiNavigationState.loading}
	<div out:fade={{ delay: 400 }}>
		<PageLoader />
	</div>
{/if}

{#if user && !page.params.user}
	<LoggedInHeader {user} />	
{/if}

{#if page.url.pathname === "/"}
<div class="relative" transition:slide={{ duration: 300 }}>
	<div class="absolute left-1/5 top-1">
		<Avatar class="invisible xl:visible" src="/favicon.png" size="xl" alt="Kaiki"/>
	</div>

	<div class="big_title">
		<h1 class="mt-10 mb-5 font-bold text-accent1 text-6xl lg:text-8xl text-center">
			<a class="text-center" href="/">KAIKIBOT</a>
		</h1>
		<h2 class="text-2xl mt-5 mb-10 text-accent1 text-center">
			Your
			<mark>dad</mark>
			isn't <em>this</em> cool
		</h2>
	</div>
</div>
{:else}
	<div
		class="small_title m-auto w-2/12 flex mb-2 mt-2 justify-center items-center content-center"
		transition:slide={{ duration: 600 }}
	>
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
			<ArrowUpRightFromSquareOutline size="sm" class="align-top!" />
		</button>
	</a>
	<a class="link_flex" href={isGenericPath("/commands")}>
		<button
			aria-current={ariaCurrent("/commands")}
			class="h-16 whitespace-nowrap md:h-20 border-b-2 text-xl text-accent1 full-width layout"
		>
			COMMANDS
		</button>
	</a>
	<a href={isGenericPath("/embed")} class="link_flex">
		<button
			aria-current={ariaCurrent("/embed")}
			class="h-16 whitespace-nowrap md:h-20 border-b-2 text-xl text-accent1 full-width layout"
			><Mark class="bg-primary-600!">NEW</Mark><br />EMBED BUILDER
		</button>
	</a>
	<a href={INVITE} class="link_flex">
		<button
			class="h-16 whitespace-nowrap md:h-20 border-b-2 text-xl text-accent1 full-width layout invite_link"
			>INVITE KAIKI
			<ArrowUpRightFromSquareOutline size="sm" class="align-top!" />
		</button>
	</a>
	<a href={isDash()} class="link_flex">
		<button
			aria-current={ariaCurrent(isDash())}
			class="h-16 whitespace-nowrap md:h-20 border-b-2 text-xl text-accent1 patreon full-width layout"
		>
			DASHBOARD
		</button>
	</a>
	<a href={PUBLIC_SOURCE} class="link_flex">
		<button
			class="h-16 whitespace-nowrap md:h-20 border-b-2 text-xl text-accent1 gitlab full-width layout"
		>
			SOURCE CODE
			<ArrowUpRightFromSquareOutline size="sm" class="align-top!" />
		</button>
	</a>
	<a href={isDocs()} class="link_flex">
		<button
			aria-current={ariaCurrent(isDocs())}
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
