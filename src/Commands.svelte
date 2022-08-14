<script lang="ts">
  import {TextBox} from "fluent-svelte";
  import "fluent-svelte/theme.css";
  import commands from "./cmdlist.js";
  import search from "./methods/search";

  let active = {};

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
    <TextBox
      type="search"
      placeholder="Search commands"
      on:input={(c) => searchbarOnInput(c, (() => active)())}
      on:reset={resetCats}
      on:abort={resetCats}
    />
  </div>

<!--      <p class="whitespace-pre text-left">{JSON.stringify(Object.entries(commands.commands)-->
<!--          .map(cm => cm[1]), null, 12)-->
<!--      }</p>-->
  <!--<br>-->
  <!--    <p>{JSON.stringify(commands.commands-->
  <!--        .map(cb => cb[1])-->
  <!--        .flat())-->
  <!--    }</p>-->

  {#each Object.entries(commands) as categories}
    {#each categories[1] as category}
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
    {/each}
  {/each}
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .bgColor {
    background-color: #1f1f1f;
  }

  .cmdCategory {
    color: rgb(156 163 175);
    margin: 0.5rem 0.5rem;
    font-size: xx-large;
    display: inline-flex;
    padding: 0.2rem 0.5rem;
    border: #1f1f1f 2px solid;
    background-color: #1f1f1f;
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
    color: rgb(156 163 175);
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
</style>
