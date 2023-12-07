<script lang="ts">
  import SEO from "../components/SEO.svelte";
  import { page } from "$app/stores";
  import {beforeNavigate, afterNavigate } from '$app/navigation';
  import navigationState from "../stores/navigationState";
  import { fade } from 'svelte/transition';
  import PageLoader from '../components/PageLoader.svelte';
  import {LINKS} from "../CONSTANTS";

  const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1)

  beforeNavigate(() => {
    navigationState.set('loading');
  });

  afterNavigate(() => {
    navigationState.set('loaded');
  });
</script>

<SEO/>
<svelte:head>
  <title>KaikiBot - {capitalize($page.url.pathname.replace("/", "") || "Home")}</title>
</svelte:head>

{#if $navigationState === "loading"}
  <div out:fade={{ delay: 500 }}>
    <PageLoader />
  </div>
{/if}

<h1 class="mt-10 mb-5 font-bold text-accent1 text-6xl lg:text-8xl text-center">KAIKIBOT</h1>
<h2 class="text-2xl mt-5 mb-10 text-accent1 text-center">
  Your
  <mark>dad</mark>
  isn't <em>this</em> cool
</h2>
<div class="flex justify-evenly gap-1 smol">
  <a href={LINKS.discord} class="link_flex">
    <button
      class="h-16 whitespace-nowrap md:h-20 border-b-2 text-accent1 text-xl custom-width-1_7 layout"
    >SUPPORT SERVER
    </button>
  </a>
  <a class="link_flex" href="{$page.url.pathname !== '/' ? '/' : '/commands'}">
    <button
      class="h-16 whitespace-nowrap md:h-20 border-b-2 text-xl text-accent1 custom-width-1_7 layout"
    >
      {$page.url.pathname !== '/' ? 'HOME' : 'COMMANDS'}
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
  <a href={LINKS.source} class="link_flex">
    <button
      class="h-16 whitespace-nowrap md:h-20 border-b-2 text-xl text-accent1 gitlab custom-width-1_7 layout"
    >
      SOURCE CODE
    </button>
  </a
  >
  <a href={LINKS.paypal} class="link_flex">
    <button
      class="h-16 whitespace-nowrap md:h-20 border-b-2 text-xl text-accent1 paypal custom-width-1_7 layout"
    >
      DONATE
    </button>
  </a>
  <a href={LINKS.patreon} class="link_flex">
    <button
      class="h-16 whitespace-nowrap md:h-20 border-b-2 text-xl text-accent1 patreon custom-width-1_7 layout"
    >
      PATREON
    </button>
  </a>
</div>

<slot />
<div class="mt-20"/>
<footer class="items-center grid grid-cols-3">
    <a class="self-center" href={LINKS.kofi}><h3 class="">Buy me a coffee ☕</h3></a>
    <h3 class="flex-col">© Cata 2023</h3>
    <a class="" href={LINKS.patreon}><h3 class="">Patreon️</h3></a>
</footer>
