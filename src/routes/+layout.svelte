<script>
  export let data;
  const links = data.links;
  import {page} from "$app/stores";
</script>

<h1 class="mt-10 mb-5 font-bold text-accent1 text-6xl lg:text-8xl text-center">KAIKIBOT</h1>
<h2 class="text-2xl mt-5 mb-10 text-accent1 text-center">
  Your
  <mark>dad</mark>
  isn't <em>this</em> cool
</h2>
<div class="flex justify-evenly gap-1 ">
  <a href={links.discord} class="link_flex">
    <button
      class="h-16 whitespace-nowrap md:h-20 border-b-2 text-accent1 custom-width-1_7 layout"
    >SUPPORT SERVER
    </button>
  </a>
  <a class="link_flex" href="{$page.url.pathname === '/commands' ? '/' : '/commands'}">
    <button
      class="h-16 whitespace-nowrap md:h-20 border-b-2  text-accent1 custom-width-1_7 layout"
    >
      {$page.url.pathname === '/commands' ? 'HOME' : 'COMMANDS'}
    </button>
  </a>
  <a href={links.embed} class="link_flex">
    <button
      class="h-16 whitespace-nowrap md:h-20 border-b-2  text-accent1 custom-width-1_7 layout"
    >EMBED BUILDER
    </button>
  </a>
  <a href={links.invite} class="link_flex">
    <button
      class="h-16 whitespace-nowrap md:h-20 border-b-2  text-accent1 custom-width-1_7 layout"
    >INVITE KAIKI
    </button>
  </a>
  <a href={links.source} class="link_flex">
    <button
      class="h-16 whitespace-nowrap md:h-20 border-b-2  text-accent1 gitlab custom-width-1_7 layout"
    >
      SOURCE CODE
    </button>
  </a
  >
  <a href={links.paypal} class="link_flex">
    <button
      class="h-16 whitespace-nowrap md:h-20 border-b-2  text-accent1 paypal custom-width-1_7 layout"
    >
      DONATE
    </button>
  </a>
  <a href={links.patreon} class="link_flex">
    <button
      class="h-16 whitespace-nowrap md:h-20 border-b-2  text-accent1 patreon custom-width-1_7 layout"
    >
      PATREON
    </button>
  </a>
</div>

<slot />

<footer class="alignment-center grid grid-cols-3">
  <div class="grid">
    <h3 class="flex-col text-sm lg:text-xl">
      <a href={links.kofi}>Buy me a coffee ☕</a>
    </h3>
  </div>
  <div class="grid">
    <h3 class="flex-col text-sm lg:text-xl">© Cata 2023</h3>
  </div>
  <div class="grid">
    <h3 class="flex-col text-sm lg:text-xl">
      <a href={links.patreon}>Patreon️</a>
    </h3>
  </div>
</footer>
