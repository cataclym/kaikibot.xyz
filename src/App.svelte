<script lang="ts">
  import Commands from "./Commands.svelte";
  import Placeholders from "./Placeholders.svelte";

  export let name: string;
  let isActive = true;

  const links = Object.freeze({
    changelog: "https://gitlab.com/catadev/KaikiDeishuBot/-/blob/master/CHANGELOG.md",
    discord: "https://discord.gg/8G3AqjnFfX",
    docs: "https://gitlab.com/catadev/KaikiDeishuBot/-/blob/master/docs/GUIDE.md",
    embed: "https://embed.kaikibot.xyz/",
    invite:
            "https://discord.com/oauth2/authorize?client_id=714695773534814238&scope=bot",
    patreon: "https://www.patreon.com/user?u=52353582",
    paypal: "https://paypal.me/kaikibot",
    source: "https://gitlab.com/catadev/KaikiDeishuBot",
    kofi: "https://ko-fi.com/catadev"
  });
</script>

<main>
  <h1 class="text-8xl mt-10 mb-5 font-bold text-accent1">KAIKIBOT</h1>
  <h2 class="text-2xl mt-5 mb-10 text-gray-400">
    Your <mark>dad</mark> isn't <em>this</em> cool
  </h2>
  <div class="flex-auto">
    <a href={links.discord}>
      <button
        class="h-16 whitespace-nowrap md:h-20 border-b-2  text-accent1 custom-width-1_7"
        >SUPPORT SERVER
      </button>
    </a>
    <!--    -->
    <button
            class="h-16 whitespace-nowrap md:h-20 border-b-2  text-accent1 custom-width-1_7"
            on:click={() => (isActive = !isActive)}
    >
      COMMANDS
    </button>
    <!--    </a>-->
    <a href={links.embed}>
      <button
        class="h-16 whitespace-nowrap md:h-20 border-b-2  text-accent1 custom-width-1_7"
        >EMBED BUILDER
      </button>
    </a>
    <a href={links.invite}>
      <button
        class="h-16 whitespace-nowrap md:h-20 border-b-2  text-accent1 custom-width-1_7"
        >INVITE KAIKI
      </button>
    </a>
    <a href={links.source}>
      <button
        class="h-16 whitespace-nowrap md:h-20 border-b-2  text-accent1 gitlab custom-width-1_7"
      >
        SOURCE CODE
      </button></a
    >
    <a href={links.paypal}>
      <button
        class="h-16 whitespace-nowrap md:h-20 border-b-2  text-accent1 paypal custom-width-1_7"
      >
        DONATE
      </button>
    </a>
    <a href={links.patreon}>
      <button
        class="h-16 whitespace-nowrap md:h-20 border-b-2  text-accent1 patreon custom-width-1_7"
      >
        PATREON
      </button>
    </a>
  </div>
  <div class:active={!isActive} class="inline-block w-11/12 mt-24">
    <!-- 2x2 Medium feature list -->

    <div class="max-w-full md:flex justify-evenly mb-24">
      <div class="text-center md:w-96">
        <h3 class="text-gray-400 font-bold text-2xl">
          Kaiki is a <mark class="italic">dad</mark>.
        </h3>
        <h4 class="text-accent1">
          He will respond, like a dad, whenever you declare yourself with the
          use of 'I am'.
        </h4>
      </div>
      <div class="text-center md:w-96">
        <Placeholders/>
      </div>
    </div>

    <div class="max-w-full md:flex flex-row-reverse justify-evenly mb-24">
      <div class="text-center md:w-96">
        <h3 class="text-gray-400 font-bold text-2xl">
          Useful, fun and silly commands
        </h3>
        <h4 class="text-accent1">
          A wide variety of commands from fun and goofy commands to utility and
          server management focused commands.
        </h4>
      </div>
      <div class="text-center md:w-96">
        <Placeholders/>
      </div>
    </div>

    <div class="max-w-full md:flex justify-evenly mb-24">
      <div class="text-center md:w-96">
        <h3 class="text-gray-400 font-bold text-2xl">
          Manage a large todo list
        </h3>
        <h4 class="text-accent1">
          Create goals, save a link you just found or keep a tab on your loaning
          business.
        </h4>
      </div>
      <div class="text-center md:w-96">
        <Placeholders/>
      </div>
    </div>

    <div class="max-w-full md:flex flex-row-reverse justify-evenly mb-24">
      <div class="text-center md:w-96">
        <h3 class="text-gray-400 font-bold text-2xl">Economy and gambling</h3>
        <h4 class="text-accent1">
          Spend your hard earned yen on the casino and compete in the currency
          leaderboard!
        </h4>
      </div>
      <div class="text-center md:w-96">
        <Placeholders/>
      </div>
    </div>

<!--    <div class="m-2 max-w-full md:flex md:mt-52">-->
<!--      <div class="text-center md:w-96 md:m-auto">-->
<!--        <h3 class="text-gray-400 font-bold text-2xl">-->
<!--          Kaiki is a <mark class="italic">dad</mark>.-->
<!--        </h3>-->
<!--        <h4 class="text-accent1">-->
<!--          He will respond, like a dad, whenever you declare yourself with the-->
<!--          use of 'I am'.-->
<!--        </h4>-->
<!--    </div>-->
<!--      <div class="text-center md:w-72 md:m-auto">-->
<!--        <h3 class="text-gray-400 font-bold text-2xl">-->
<!--          Useful, fun and silly commands-->
<!--        </h3>-->
<!--        <h4 class="text-accent1">-->
<!--          A wide variety of commands from fun and goofy commands to utility and-->
<!--          server management focused commands.-->
<!--        </h4>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="m-2 max-w-full md:flex md:mt-10">-->
<!--      <div class="text-center md:flex md:w-96 md:m-auto">-->
<!--        <Placeholders/>-->
<!--      </div>-->
<!--      <div class="text-center md:flex md:w-96 md:m-auto">-->
<!--        <Placeholders/>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="m-2 max-w-full md:flex md:mt-20">-->
<!--      <div class="text-center md:w-72 md:m-auto">-->
<!--        <h3 class="text-gray-400 font-bold text-2xl">-->
<!--          Manage a large todo list-->
<!--        </h3>-->
<!--        <h4 class="text-accent1">-->
<!--          Create goals, save a link you just found or keep a tab on your loaning-->
<!--          business.-->
<!--        </h4>-->
<!--      </div>-->
<!--      <div class="text-center md:w-72 md:m-auto">-->
<!--        <h3 class="text-gray-400 font-bold text-2xl">Economy and gambling</h3>-->
<!--        <h4 class="text-accent1">-->
<!--          Spend your hard earned yen on the casino and compete in the currency-->
<!--          leaderboard!-->
<!--        </h4>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="m-2 max-w-full md:flex md:mt-10">-->
<!--      <div class="text-center md:flex md:w-96 md:m-auto">-->
<!--        <Placeholders/>-->
<!--      </div>-->
<!--      <div class="text-center md:flex md:w-96 md:m-auto">-->
<!--        <Placeholders/>-->
<!--      </div>-->
<!--    </div>-->

    <!-- Large bottom features -->
    <div class="text-left text-gray-400 md:w-8/12 sm:w-10/12 m-auto mt-52">
      <h3 class="text-gray-400 font-bold text-2xl">Open source</h3>
      <h4 class="text-accent1">
        The codebase is fully open source software and available on GitLab. Fork it, clone it and contribute!
      </h4>
    </div>
    <div class="text-right text-gray-400 md:w-8/12 sm:w-10/12 m-auto mt-36 mb-52">
      <h3 class="text-gray-400 font-bold text-2xl">Donations</h3>
      <h4 class="text-accent1">
        KaikiBot is completely free and open source. Donations are completely optional, but highly appreciated.<br>Donations will go towards server costs and support the developer(s), as well as give you reward through Patreon on the Discord server.
      </h4>
    </div>
  </div>
  <div class:active={isActive}>
    <Commands />
  </div>

  <div
    class="grid m-auto mb-20 mt-10 grid-cols-3 justify-items-center w-8/12 2xl:w-1/2 text-accent1"
  >
    <div class="grid">
      <h3 class="mt-1 text-accent1 text-xl text-left">Kaiki</h3>
      <h3 class="mt-1 flex-col text-left"><a href={links.invite}>Invite</a></h3>
      <h3
        class="mt-1 flex-col text-left cursor-pointer"
        on:click={() => (isActive = !isActive)}
      >
        Commands
      </h3>
    </div>
    <div class="grid">
      <h2 class="text-accent1 text-xl text-left">Selfhosting</h2>
      <h3 class="flex-col text-left"><a href={links.source}>Source code</a></h3>
      <h3 class="flex-col text-left"> <a href={links.docs}>Docs</a></h3>
    </div>
    <div class="grid">
      <h2 class="text-accent1 text-xl text-left">Utilities</h2>
      <h3 class="flex-col text-left"> <a href={links.changelog}>Changelog </a></h3>
    </div>
  </div>
</main>
<footer class="alignment-center grid grid-cols-3">
  <div class="grid">
    <h3 class="flex-col text-xl" style="line-height: 95%">
      <a href={links.kofi}>Buy me a coffee ☕</a>
    </h3>
  </div>
  <div class="grid">
    <h3 class="flex-col text-xl" style="line-height: 95%">© Cata 2023</h3>
  </div>
  <div class="grid">
    <h3 class="flex-col text-xl" style="line-height: 95%">
      <a href={links.patreon}>Patreon️</a>
    </h3>
  </div>
</footer>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :root {
    --background: #252422;
    --accent1: #CCC5B9;
    --accent2: #403D39;
    --accent3: #FFFCF2;
    --accent4: #E85E28;

    --gitlab: #6b4fbb;
    --paypal: #003087;
    --patreon: #ff424d;
  }

  :global(body) {
    background-color: var(--background);
    padding: 1px !important;
    overflow-y: auto; /* vertical scrollbar */
    overflow-x: hidden; /* horizontal scrollbar */
  }

  main {
    text-align: center;
    padding: 0.01em;
    max-width: none;
    margin: 0 auto;
  }

  .text-accent1 {
    color: var(--accent1)
  }

  .text-accent2 {
    color: var(--accent2)
  }

  .text-accent3 {
    color: var(--accent3)
  }

  .text-accent4 {
    color: var(--accent4)
  }


  .feature-block {
    margin-top: 3em;
    width: 35%;
    box-sizing: border-box;
    display: inline-block;
  }

  .active {
    display: none;
  }

  mark {
    color: var(--accent4);
    background-color: inherit;
  }

  a {
    text-decoration: none;
    /*color: #f4f4f4;*/
  }

  button {
    /*font-family: Ubuntu,sans-serif;*/
    /*margin-top: 0;*/
    /*box-sizing: border-box;*/
    /*display: inline-block;*/
    /*height: 3em;*/
    /*font-size: 1.5em;*/
    /*text-align: center;*/
    /*width: 14.92em;*/
    /*border-top: var(--accent2) solid 2px;*/
    /*border-right: var(--accent2) solid 2px;*/
    /*border-left: var(--accent2) solid 2px;*/
    background-color: var(--accent2);
    border: var(--accent2) 2px solid;
    color: var(--accent1) !important;
    text-shadow: var(--background) 2px !important;
    transition: 0.5s;
    /*border-bottom: 4px solid var(--orange);*/
  }

  button:hover {
    cursor: pointer;
    background-color: var(--background);
    color: var(--accent1) !important;
    border: var(--background) 2px solid;
    /*border-bottom: var(--accent1) 4px solid;*/
    transform: scale(101%);
    transition: 0.1s;
    box-shadow: 0 4px var(--accent4);
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  @media (max-width: 640px) {
    button.custom-width-1_7 {
      width: 100%;
    }
  }

  .gitlab:hover {
    /*border-bottom-color: var(--gitlab);*/
  }

  .patreon:hover {
    /*border-bottom-color: var(--patreon);*/
  }

  .paypal:hover {
    /*border-bottom-color: var(--paypal);*/
  }

  footer {
    color: var(--accent3);
    background: var(--accent2);
    width: 100%;
    height: 3em;
    padding: 0.7% 0 0 0;
    position: fixed;
    bottom: 0;
    left: 0;
    text-align: center;
  }

  .full-width {
    width: 100%;
  }

  .custom-width-1_7 {
    width: calc(100%/7.3);
  }
</style>
