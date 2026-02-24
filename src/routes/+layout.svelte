<script lang="ts">
	import "../app.css";
	import SEO from "../components/SEO.svelte";
	import { page } from "$app/state";
	import { afterNavigate, beforeNavigate } from "$app/navigation";
	import { KaikiNavigationState, navigationState } from "$lib/stores/navigationState";
	import { fade, slide } from "svelte/transition";
	import PageLoader from "../components/PageLoader.svelte";
	import Capitalize from "../methods/Capitalize";
	import { Avatar, Heading, Mark } from "flowbite-svelte";
	import { ArrowUpRightFromSquareOutline } from "flowbite-svelte-icons";
	import Header from "../components/Header.svelte";

	let { data, children } = $props();

	const { DISCORD, INVITE, KOFI, PUBLIC_SOURCE } = data;

	let user = $state(data.session?.user);

	beforeNavigate(() => {
		navigationState.set(KaikiNavigationState.loading);
	});

	afterNavigate(() => {
		navigationState.set(KaikiNavigationState.loaded);
	});

	function isDocs() {
		return page.url.pathname === "/README.md" || page.url.pathname.includes("/docs/")
			? "/"
			: "/README.md";
	}

	function isDash() {
		return user
			? !!page.url.pathname.match("/dashboard")?.length ? "/" : "/dashboard"
			: "/auth/signin";
	}

	function isGenericPath(path: string) {
		return page.url.pathname === path ? "/" : path;
	}

	function ariaCurrent(path: string): "page" | undefined {
		return isGenericPath(path) === "/" ? "page" : undefined;
	}
</script>

<SEO />
<svelte:head>
	<title
		>KaikiBot - {Capitalize(user?.name || page.url.pathname.split("/")[1] || "Home")}</title
	>
</svelte:head>

{#if $navigationState === KaikiNavigationState.loading}
	<div out:fade={{ delay: 400 }}>
		<PageLoader />
	</div>
{/if}

{#if !page.params.user}
	<Header {user} />
{/if}

{#if page.url.pathname === "/"}
	<div class="relative" transition:slide={{ duration: 300 }}>
		<div class="absolute left-1/5 top-1">
			<Avatar class="invisible xl:visible" src="/favicon.png" size="xl" alt="Kaiki" />
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
{/if}
<nav class="flex justify-evenly gap-1 smol overflow-hidden">
	<a
		href={DISCORD}
		class="link_flex layout-btn h-16 md:h-20 border-b-2 text-accent1 text-xl full-width"
	>
		<span class="truncate">SUPPORT SERVER</span>
		<ArrowUpRightFromSquareOutline size="sm" class="align-top! ml-1 inline-block" />
	</a>
	<a
		href={isGenericPath("/commands")}
		aria-current={ariaCurrent("/commands")}
		class="link_flex layout-btn h-16 md:h-20 border-b-2 text-xl text-accent1 full-width"
	>
		<span class="truncate">COMMANDS</span>
	</a>
	<a
		href={isGenericPath("/embed")}
		aria-current={ariaCurrent("/embed")}
		class="link_flex layout-btn h-16 md:h-20 border-b-2 text-xl text-accent1 full-width"
	>
		<Mark class="bg-primary-600! mr-1">NEW</Mark><span class="truncate">EMBED BUILDER</span>
	</a>
	<a
		href={INVITE}
		class="link_flex layout-btn invite-link h-16 md:h-20 border-b-2 text-xl text-accent1 full-width"
	>
		<span class="truncate">INVITE KAIKI</span>
		<ArrowUpRightFromSquareOutline size="sm" class="align-top! ml-1 inline-block" />
	</a>
	<a
		href={PUBLIC_SOURCE}
		class="link_flex layout-btn gitlab h-16 md:h-20 border-b-2 text-xl text-accent1 full-width"
	>
		<span class="truncate">SOURCE CODE</span>
		<ArrowUpRightFromSquareOutline size="sm" class="align-top! ml-1 inline-block" />
	</a>
	<a
		href={isDocs()}
		aria-current={ariaCurrent(isDocs())}
		class="link_flex layout-btn paypal h-16 md:h-20 border-b-2 text-xl text-accent1 full-width"
	>
		<span class="truncate">DOCUMENTATION</span>
	</a>
</nav>

{@render children?.()}
<div class="mt-20"></div>
<footer class="items-center grid grid-cols-3">
	<a class="self-center" href={KOFI}><h3>Buy me a ko-fi ☕</h3></a>
	<h3 class="flex-col">© Cata 2025</h3>
</footer>
