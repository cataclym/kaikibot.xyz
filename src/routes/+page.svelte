<script lang="ts">
  import Commands from "./commands/+page.svelte";
  import Placeholders from "../components/Placeholders.svelte";
  import OrangeBar from "../components/OrangeBar.svelte";
  import type { PageServerData } from "../../.svelte-kit/types/src/routes/$types";

  /** @type {import("./$types").PageServerData} */
  export let data;

  const links = data.links;
</script>

<main>
  <div class:active={!data.isActive} class="inline-block w-11/12 mt-24">
    <!-- 2x2 Medium feature list -->

    <div class="max-w-full md:flex justify-evenly mb-24">
      <div class="text-center md:w-96">
        <h3 class="text-accent3 font-bold text-2xl">

          Kaiki is a
          <mark class="italic">dad</mark>
          .
        </h3>
        <h4 class="text-accent1 mb-3.5">
          He will respond, like a dad, whenever you declare yourself with the
          use of 'I am'.
        </h4>
        <OrangeBar />
      </div>
      <div class="text-center md:w-96 md:h-96">
        <Placeholders url={"https://api.nekosapi.com/v3/images/random/file?rating=safe"} />
      </div>
    </div>

    <div class="max-w-full md:flex flex-row-reverse justify-evenly mb-24">
      <div class="text-center md:w-96">
        <h3 class="text-accent3 font-bold text-2xl">

          Useful, fun and silly commands
        </h3>
        <h4 class="text-accent1 mb-3.5">

          A wide variety of commands from fun and goofy commands to utility and
          server management focused commands.
        </h4>
        <OrangeBar />
      </div>
      <div class="text-center md:w-96 md:h-96">
        <Placeholders url={"https://api.nekosapi.com/v3/images/random/file?rating=safe&tag=1"} />
      </div>
    </div>

    <div class="max-w-full md:flex justify-evenly mb-24">
      <div class="text-center md:w-96">
        <h3 class="text-accent3 font-bold text-2xl">

          Manage a large todo list
        </h3>
        <h4 class="text-accent1 mb-3.5">

          Create goals, save a link you just found or keep a tab on your loaning
          business.
        </h4>
        <OrangeBar />
      </div>
      <div class="text-center md:w-96 md:h-96">
        <Placeholders url={"https://api.nekosapi.com/v3/images/random/file?rating=safe&tag=2"} />
      </div>
    </div>

    <div class="max-w-full md:flex flex-row-reverse justify-evenly mb-24">
      <div class="text-center md:w-96">
        <h3 class="text-accent3 font-bold text-2xl">
          Economy and gambling</h3>
        <h4 class="text-accent1 mb-3.5">

          Spend your hard earned yen on the casino and compete in the currency
          leaderboard!
        </h4>
        <OrangeBar />
      </div>
      <div class="text-center md:w-96 md:h-96">
        <Placeholders url={"https://api.nekosapi.com/v3/images/random/file?rating=safe&tag=8"} />
      </div>
    </div>

    <!-- Large bottom features -->
    <div class="text-left text-accent1 md:w-8/12 sm:w-10/12 m-auto mt-52">
      <h3 class="text-accent3 font-bold text-2xl">
        Open source</h3>
      <h4 class="text-accent1">
        The codebase is fully open source software and available on GitLab. Fork it, clone it and contribute!
      </h4>
    </div>
    <div class="text-right text-accent1 md:w-8/12 sm:w-10/12 m-auto mt-36 mb-52">
      <h3 class="text-accent3 font-bold text-2xl">
        Donations</h3>
      <h4 class="text-accent1">
        KaikiBot is completely free and open source. Donations are completely optional, but highly appreciated.<br>Donations
        will go towards server costs and support the developer(s), as well as give you reward through Patreon on the
        Discord server.
      </h4>
    </div>
  </div>
  <div
    class="grid m-auto mb-20 mt-10 grid-cols-3 justify-items-center w-10/12 text-accent1"
  >
    <div class="grid">
      <h2 class="mt-1 text-accent1 text-2xl text-left">Kaiki</h2>
      <h3 class="mt-1 flex-col text-left"><a href={links.invite}>Invite</a></h3>
      <h3
        class="mt-1 flex-col text-left cursor-pointer"
      ><a href="/commands">
        Commands
      </a>
      </h3>
    </div>
    <div class="grid">
      <h2 class="text-accent1 text-2xl text-left">Selfhosting</h2>
      <h3 class="flex-col text-left"><a href={links.source}>Source code</a></h3>
      <h3 class="flex-col text-left"><a href={links.docs}>Docs</a></h3>
    </div>
    <div class="grid">
      <h2 class="text-accent1 text-2xl text-left">Utilities</h2>
      <h3 class="flex-col text-left"><a href={links.changelog}>Changelog</a></h3>
      <h3 class="flex-col text-left"><a href="/about">About</a></h3>
    </div>
  </div>
</main>
