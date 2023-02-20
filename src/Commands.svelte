<script lang="ts">
  import "fluent-svelte/theme.css";
  import commands from "./cmdlist.js";
  import search from "./methods/search";

  let active = {};

  let originalColor;

  let cats = Object.entries(commands.commands);

  function searchbarOnInput(c, category) {
    cats = search(c, category);
  }

  function resetCats() {
    cats = Object.entries(commands.commands);
    active = {};
  }
</script>

<div class="w-10/12 text-gray-300 m-auto mt-10 mb-52 flow-root">
  <div class="bgColor mb-10">
    <div class="searchbar" id="searchbar">
      <input
        class="inputSearchbar"
        type="text"
        placeholder="Search commands"
        on:input={(c) => searchbarOnInput(c, (() => active)())}
        on:reset={resetCats}
        on:abort={resetCats}
        on:focus={(c) => {
          originalColor = document.getElementById("searchbar").style.backgroundColor;
          document.getElementById("searchbar").style.backgroundColor = "#353535"
         }}
        on:focusout={(c) => document.getElementById("searchbar").style.backgroundColor = originalColor}
      />
      <div class="searchThingy"></div>
      <div class="searchBottom">
        <button class="searchButton">
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <path
              d="M5.00038 1C2.79103 1 1 2.7909 1 5.00008C1 7.20927 2.79103 9.00017 5.00038 9.00017C5.92463 9.00017 6.77568 8.68675 7.45302 8.1604L10.1464 10.8536C10.3416 11.0488 10.6583 11.0488 10.8535 10.8536C11.0488 10.6583 11.0488 10.3417 10.8535 10.1464L8.16028 7.45337C8.68705 6.77595 9.00075 5.92465 9.00075 5.00008C9.00075 2.7909 7.20972 1 5.00038 1ZM2.00009 5.00008C2.00009 3.34319 3.34337 2.00002 5.00038 2.00002C6.65739 2.00002 8.00066 3.34319 8.00066 5.00008C8.00066 6.65697 6.65739 8.00015 5.00038 8.00015C3.34337 8.00015 2.00009 6.65697 2.00009 5.00008Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>

  {#each Object.entries(commands) as categories}
    {#each categories[1] as category}
      {#if category[1].length}
      <div
        class={active[category[0]] ? "cmdCategoryActive" : "cmdCategory"}
        on:click={() => {
          if (active[category[0]]) {
            if (Object.keys(active).length !== 1) {
              resetCats();
            }
            active[category[0]] = !active[category[0]];
            resetCats();
          } else {
            active[category[0]] = !active[category[0]];
            cats = cats.filter((a) => a[1][0] === category[0]);
            if (Object.keys(active).length !== 1) {
              resetCats();
            }
          }
        }}
      >
        {category[0]}
      </div>
        {/if}
    {/each}
  {/each}

  <div class="w-full m-auto mt-10 mb-5 flex">
    <div class="cmd">
      <p class="description">Command</p>
    </div>
    <div class="cmdDesc">
      <p class="description">Description</p>
    </div>
    <div class="cmdUsage">
      <p class="description">Usage</p>
    </div>
  </div>

  {#each cats as category}
    {#each category[1] as group}
      {#if group.length}
      {#if typeof group !== "string"}
        {#each group as cmd}
          <div class="m-auto flex mb-1 cmdContainer">
            <div class="cmd">
              +{cmd.id}
              <p class="categoryTxt">
                {category[1][0]}
              </p>
            </div>
            <div class="cmdDesc">
              <p class="description">
                {cmd.description}
              </p>
            </div>
            <div class="cmdUsage">
              <p class="description">
                +{cmd.id}
                {Array.isArray(cmd.usage)
                  ? cmd.usage.join(`\n+${cmd.id} `)
                  : cmd.usage || ""}
              </p>
            </div>
          </div>
        {/each}
      {/if}
        {/if}
    {/each}
  {/each}
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :root {
    --input-color: rgb(156 163 175);
  }

  .bgColor {
    background-color: #353535;
  }

  .cmdCategory {
    color: var(--input-color);
    margin: 0.5rem 0.5rem;
    font-size: xx-large;
    display: inline-flex;
    padding: 0.2rem 0.5rem;
    border: #1f1f1f 2px solid;
    background-color: #1f1f1f;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
  }

  .cmdCategory:hover {
    border-bottom-color: rgb(234 88 12);
    background-color: #0a0a0aff;
    cursor: pointer;
  }

  .cmdCategoryActive {
    color: #0a0a0aff;
    margin: 0.5rem 0.5rem;
    font-size: xx-large;
    display: inline-flex;
    padding: 0.2rem 0.5rem;
    border: #1f1f1f 2px solid;
    background-color: rgb(234 88 12);
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
  }

  .cmdCategoryActive:hover {
    border-bottom: 2px solid black;
    cursor: pointer;
  }

  .cmd {
    padding-top: 1rem;
    width: 33.3333%;
    background-color: #353535;
    vertical-align: middle;
    display: inline;
  }
  .cmdDesc {
    padding-top: 1rem;
    width: 33.3333%;
    background-color: #1f1f1f;
    vertical-align: middle;
    display: inline;
  }
  .cmdUsage {
    padding-top: 1rem;
    width: 33.3333%;
    background-color: #353535;
    vertical-align: middle;
    display: inline;
  }

  .cmdButton {
    color: var(--input-color);
    margin: 0.2rem 0.5rem;
    padding: 0.2rem 0.5rem;
    border: #1f1f1f 2px solid;
    background-color: #1f1f1f;
  }

  .description {
    max-width: 90%;
    white-space: pre-wrap;
    overflow: hidden;
    margin: auto auto 1rem;
  }

  .cmdContainer {
    max-height: 10rem;
    width: 100%;
  }

  .categoryTxt {
    font-size: small;
  }

  .searchbar {
    align-items: center;
    background-clip: padding-box;
    background-color: hsl(0, 0%, 25.9%);
    border: 1px solid var(--fds-control-stroke-default);
    border-radius: var(--fds-control-corner-radius);
    cursor: text;
    display: flex;
    inline-size: 100%;
    position: relative;
  }

  .inputSearchbar {
    background-color: transparent;
    border: none;
    border-radius: var(--fds-control-corner-radius);
    box-sizing: border-box;
    color: var(--input-color);
    cursor: unset;
    flex: 1 1 auto;
    font-family: var(--fds-font-family-text);
    font-size: var(--fds-body-font-size);
    font-weight: 400;
    inline-size: 100%;
    line-height: 20px;
    margin: 0;
    min-block-size: 30px;
    outline: none;
    padding-inline: 10px;
    /*-webkit-user-select: none;*/
    /*-moz-user-select: none;*/
    /*user-select: none;*/
  }

  .searchThingy {
    block-size: calc(100% + 2px);
    border-radius: var(--fds-control-corner-radius);
    inline-size: calc(100% + 2px);
    inset-block-start: -1px;
    inset-inline-start: -1px;
    overflow: hidden;
    pointer-events: none;
    position: absolute;
  }

  .searchThingy::after {
    block-size: 100%;
    border-bottom: 1px solid var(--fds-control-strong-stroke-default);
    box-sizing: border-box;
    inline-size: 100%;
    inset-block-end: 0;
    inset-inline-start: 0;
    position: absolute;
  }

  .searchBottom {
    align-items: center;
    cursor: default;
    display: flex;
    flex: 0 0 auto;
  }

  .searchButton {
    align-items: center;
    /*background-color: var(--fds-subtle-fill-transparent);*/
    border: none;
    /*border-radius: var(--fds-control-corner-radius);*/
    box-sizing: border-box;
    color: hsla(0, 0%, 100%, 78.6%);
    display: flex;
    justify-content: center;
    min-block-size: 22px;
    min-inline-size: 26px;
    outline: none;
    padding: 3px 5px;
  }
</style>
