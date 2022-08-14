<script lang="ts">
  import Commands from "./Commands.svelte";
  export let name: string;
  let isActive = true;
</script>

<main>
  <h1 class="text-8xl mt-10 mb-5 font-bold text-orange-600">KAIKIBOT</h1>
  <h2 class="text-2xl mt-5 mb-10 text-gray-400">
    Your <mark>dad</mark> isn't <em>this</em> cool
  </h2>
  <div class="flex-auto">
    <a href="https://discord.gg/8G3AqjnFfX">
      <button
        class="h-16 whitespace-nowrap md:h-20 border-b-2 border-b-orange-600 w-full md:w-24 lg:w-36 xl:w-44 2xl:w-64 text-gray-400"
        >SUPPORT SERVER
      </button>
    </a>
    <a href="#">
      <button
        class="h-16 whitespace-nowrap md:h-20 border-b-2 border-b-orange-600 w-full md:w-24 lg:w-36 xl:w-44 2xl:w-64 text-gray-400"
        on:click={() => (isActive = !isActive)}
      >
        COMMANDS
      </button>
    </a>
    <a href="https://embed.kaikibot.xyz/">
      <button
        class="h-16 whitespace-nowrap md:h-20 border-b-2 border-b-orange-600 w-full md:w-24 lg:w-36 xl:w-44 2xl:w-64 text-gray-400"
        >EMBED BUILDER
      </button>
    </a>
    <a
      href="https://discord.com/oauth2/authorize?client_id=714695773534814238&scope=bot"
    >
      <button
        class="h-16 whitespace-nowrap md:h-20 border-b-2 border-b-orange-600 w-full md:w-24 lg:w-36 xl:w-44 2xl:w-64 text-gray-400"
        >INVITE KAIKI
      </button>
    </a>
    <a href="https://gitlab.com/cataclym/KaikiDeishuBot">
      <button
        class="h-16 whitespace-nowrap md:h-20 border-b-2 border-b-orange-600 w-full md:w-24 lg:w-36 xl:w-44 2xl:w-64 text-gray-400 gitlab"
      >
        SOURCE CODE
      </button></a
    >
    <a href="https://paypal.me/kaikibot">
      <button
        class="h-16 whitespace-nowrap md:h-20 border-b-2 border-b-orange-600 w-full md:w-24 lg:w-36 xl:w-44 2xl:w-64 text-gray-400 paypal"
      >
        DONATE
      </button>
    </a>
    <a href="https://www.patreon.com/user?u=52353582">
      <button
        class="h-16 whitespace-nowrap md:h-20 border-b-2 border-b-orange-600 w-full md:w-24 lg:w-36 xl:w-44 2xl:w-64 text-gray-400 patreon"
      >
        PATREON
      </button>
    </a>
  </div>
  <div class:active={!isActive} class="inline-block w-10/12">
    <!-- 2x2 Medium feature list -->

    <div class="m-2 max-w-full md:flex md:mt-52">
      <div class="text-center md:w-72 md:m-auto">
        <h3 class="text-gray-400 font-bold text-2xl">
          Kaiki is a <mark class="italic">dad</mark>.
        </h3>
        <h4 class="text-orange-600">
          He will respond, like a dad, whenever you declare yourself with the
          use of 'I am'.
        </h4>
        <img src="" />
      </div>
      <div class="text-center md:w-72 md:m-auto">
        <h3 class="text-gray-400 font-bold text-2xl">
          Useful, fun and silly commands
        </h3>
        <h4 class="text-orange-600">
          A wide variety of commands from fun and goofy commands to utility and
          server management focused commands.
        </h4>
        <img src="" />
      </div>
    </div>
    <div class="m-2 max-w-full md:flex md:mt-52">
      <div class="text-center md:w-72 md:m-auto">
        <h3 class="text-gray-400 font-bold text-2xl">
          Don't forget that thought!
        </h3>
        <h4 class="text-orange-600">
          Save and manage a large todo list. Create goals or just save a link
          you just found.
        </h4>
        <img src="" />
      </div>
      <div class="text-center md:w-72 md:m-auto">
        <h3 class="text-gray-400 font-bold text-2xl">Economy</h3>
        <h4 class="text-orange-600">
          Spend your hard earned yen on the casino and compete in the currency
          leaderboard!
        </h4>
        <img src="" />
      </div>
    </div>

    <!-- Large bottom features -->

    <div class="text-left text-gray-400 md:w-8/12 m-auto mt-52">
      <h3 class="text-gray-400 font-bold text-2xl">Open source</h3>
      <h4 class="text-orange-600">
        Save and manage a large todo list. Create goals or just save a link you
        just found.
      </h4>
    </div>
    <div class="text-right text-gray-400 md:w-8/12 m-auto mt-10 mb-52">
      <h3 class="text-gray-400 font-bold text-2xl">Donations</h3>
      <h4 class="text-orange-600">
        Save and manage a large todo list. Create goals or just save a link you
        just found.
      </h4>
    </div>
  </div>
  <div class:active={isActive}>
    <Commands />
  </div>
</main>

<footer>@Cata 2022</footer>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :root {
    --tw-text-opacity: 1;
    --orange: rgb(234 88 12 / var(--tw-text-opacity));
  }

  :global(body) {
    background-color: #0a0a0aff;
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

  .feature-block {
    margin-top: 3em;
    width: 35%;
    box-sizing: border-box;
    display: inline-block;
  }

  .buttons {
    margin-top: 1em;
  }

  .active {
    display: none;
  }

  mark {
    --tw-text-opacity: 1;
    color: rgb(234 88 12 / var(--tw-text-opacity));
    background-color: inherit;
  }

  a {
    text-decoration: none;
    /*color: #f4f4f4;*/
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
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
    border-top: #1f1f1f solid 2px;
    border-right: #1f1f1f solid 2px;
    border-left: #1f1f1f solid 2px;
    background-color: #1f1f1f;
    /*border: 0 solid;*/
    /*border-bottom: 4px solid var(--orange);*/
  }

  button:hover {
    cursor: pointer;
    background-color: #0a0a0aff;
  }

  .gitlab {
    border-bottom-color: #6b4fbb;
  }

  .patreon {
    border-bottom-color: #ff424d;
  }

  .paypal {
    border-bottom-color: #003087;
  }

  footer {
    color: #999999;
    background: #1f1f1f;
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
</style>
