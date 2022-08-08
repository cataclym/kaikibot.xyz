<script lang="ts">
    import {Button, ProgressRing, TextBox} from "fluent-svelte";
    import "fluent-svelte/theme.css";
    import commands from "./cmdlist.js"
</script>
<div class="w-10/12 text-gray-300 m-auto mt-10 mb-52 flow-root">
        <div class="bgColor mb-10">
            <TextBox type="search" placeholder="Search commands"/>
        </div>

    {#each Object.entries(commands) as categories}
        {#each categories[1] as category}
            <div class="cmdCategory">
                {category[0]}
            </div>
        {/each}
    {/each}

    <div class="w-full m-auto mt-10 mb-5 inline-flex">
        <div class="cmd align-middle">
            Command
        </div>
        <div class="cmdDesc align-middle">
            Description
        </div>
        <div class="cmdUsage align-middle">
            Usage
        </div>
    </div>

    {#each Object.entries(commands) as categories}
        {#each categories[1] as category}
            {#each category[1] as cmd}
                <div class="w-full m-auto inline-flex">
                    <div class="cmd">
                            +{cmd.id}
                        <p class="categoryTxt">
                            {category[0]}
                        </p>
                    </div>
                    <div class="cmdDesc">
                        {cmd.description}
                    </div>
                    <div class="cmdUsage">
                        +{cmd.id} {cmd.usage}
                    </div>
                </div>
            {/each}
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

    .cmd {
        display: inline-block;
        width: 33%;
        height: 5rem;
        background-color: #353535;
    }
    .cmdDesc {
        display: inline-block;
        width: 33%;
        height: 5rem;
        background-color: #1f1f1f;

    }
    .cmdUsage {
        display: inline-block;
        width: 33%;
        height: 5rem;
        background-color: #353535;
    }

    .cmdButton {
        color: rgb(156 163 175);
        margin: 0.2rem 0.5rem;
        padding: 0.2rem 0.5rem;
        border: #1f1f1f 2px solid;
        background-color: #1f1f1f;
    }

    .cmdCategory:hover {
        border-bottom-color: rgb(234 88 12);
        background-color: #0A0A0AFF;
        cursor: pointer;
    }

    .categoryTxt {
        font-size: small;
    }
</style>
