<script lang="ts">
	import Search from "../../methods/Search";
	import type { Cmd, Cmds } from "../../interfaces/ICommand";
	import { Input } from "flowbite-svelte";
	import { SearchOutline, SearchSolid } from "flowbite-svelte-icons";

	let active: {
		[id: string]: boolean;
	} = $state({});

	interface Props {
		data: {
			commands: Cmds;
		};
	}

	let { data }: Props = $props();
	const { commands } = data;

	let originalColor: string = $state();

	let cats: [string, [string, Cmd[]]][] = $state();
	resetCats();

	function searchbarOnInput(
		c: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		},
		category: Record<string, boolean>
	) {
		cats = Search(commands, c, category);
	}

	function resetCats() {
		cats = Object.entries(commands);
		active = {};
	}

	function colorSearchbar(color: string) {
		const searchBar = document.getElementById("searchbar1");
		originalColor = searchBar!.style.backgroundColor;
		searchBar!.style.backgroundColor = color;

		if (searchBar?.style.boxShadow) {
			searchBar.style.boxShadow = "";
		} else {
			searchBar!.style.boxShadow = "0 2px var(--accent4)";
		}

		["searchbar2", "searchbar3"].forEach((name) => {
			document.getElementById(name)!.style.backgroundColor = color;
		});
	}

	function manageCategories(categoryElement: string | Cmd[]) {
		if (typeof categoryElement !== "string") return;

		if (active[categoryElement]) {
			if (Object.keys(active).length !== 1) {
				resetCats();
			}

			active[categoryElement] = !active[categoryElement];
			resetCats();
		} else {
			active[categoryElement] = !active[categoryElement];
			cats = cats.filter((a) => a[1][0] === categoryElement);
			if (Object.keys(active).length !== 1) {
				resetCats();
			}
		}
	}
</script>

<div class="w-10/12 text-gray-300 m-auto mt-10 mb-52 flow-root justify-around">
	<div class="mb-10">
		<div class="searchbar" id="searchbar1">
			<Input
				clearable
				type="text"
				id="searchbar2"
				placeholder="Search commands"
				on:input={(c) => searchbarOnInput(c, (() => active)())}
				on:reset={resetCats}
				on:change={resetCats}
			>
				<SearchOutline slot="left" class="w-4 h-4" />
			</Input>
		</div>
	</div>

	<div class="flex flex-wrap justify-center">
		{#each Object.entries(commands) as categories}
			{#each categories[1] as category}
				{#if typeof category === "string"}
					<button
						class={active[category] ? "cmdCategoryActive" : "cmdCategory"}
						onclick={() => manageCategories(category)}
					>
						{category}
					</button>
				{/if}
			{/each}
		{/each}
	</div>

	<div class="w-full m-auto mt-10 mb-5 flex">
		<div class="cmd">
			<h2
				class="description"
				style="font-size: 1.5rem !important; line-height: 2rem !important;"
			>
				Command
			</h2>
		</div>
		<div class="cmdDesc">
			<h2
				class="description"
				style="font-size: 1.5rem !important; line-height: 2rem !important;"
			>
				Description
			</h2>
		</div>
		<div class="cmdUsage">
			<h2
				class="description"
				style="font-size: 1.5rem !important; line-height: 2rem !important;"
			>
				Usage
			</h2>
		</div>
	</div>

	{#each cats as categories}
		{#each categories[1] as category}
			{#if category.length}
				{#if typeof category !== "string"}
					{#each category as cmd}
						<div class="m-auto flex mb-1 cmdContainer">
							<div class="cmd">
								+{cmd.id}
								<br />
								{#if cmd.aliases?.length && cmd.aliases[0]}
									<p class="subText">
										+{cmd.aliases.join("\n+")}
									</p>
								{/if}
								<p class="subText categoryText">
									{categories[1][0]}
								</p>
							</div>
							<div class="cmdDesc">
								<p class="description">
									{cmd.description}
								</p>
								{#if cmd.ownerOnly}
									<p class="subText categoryText">Bot Owner Only</p>
								{/if}
							</div>
							<div class="cmdUsage">
								<p class="description">
									+{cmd.id}
									{Array.isArray(cmd.usage)
										? cmd.usage.join(`\n+${cmd.id} `)
										: cmd.usage || ""}
								</p>
								{#if cmd.userPermissions.length && cmd.userPermissions[0]}
									<p class="subText categoryText permText">
										{cmd.userPermissions.join("\n")}
									</p>
								{/if}
								{#if cmd.channel}
									<p class="subText categoryText guildText">
										{cmd.channel}
									</p>
								{/if}
							</div>
						</div>
					{/each}
				{/if}
			{/if}
		{/each}
	{/each}
</div>

<style>
	@reference "../../app.css";

	:root {
		--input-color: var(--accent1);
	}

	.cmdCategory {
		color: var(--input-color);
		margin: 0.5rem 0.5rem;
		font-size: xx-large;
		padding: 0.2rem 0.5rem;
		border: transparent 2px solid;
		background-color: var(--accent2);
		user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		-webkit-user-select: none;
		align-self: center;
	}

	.cmdCategory:hover {
		background-color: var(--background);
		cursor: pointer;
		box-shadow: 0 4px var(--accent4);
	}

	.cmdCategoryActive {
		color: var(--background);
		margin: 0.5rem 0.5rem;
		font-size: xx-large;
		display: inline-flex;
		padding: 0.2rem 0.5rem;
		background-color: var(--accent4);
		border: transparent 2px solid;
		user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		-webkit-user-select: none;
	}

	.cmdCategoryActive:hover {
		box-shadow: 0 4px var(--accent2);
		cursor: pointer;
		background-color: var(--accent1);
	}

	.cmd {
		padding-top: 1rem;
		width: 33.3333%;
		background-color: var(--accent2);
		vertical-align: middle;
		display: inline;
		color: var(--accent3);
		padding-left: 2rem;
	}

	.cmdDesc {
		padding-top: 1rem;
		width: 33.3333%;
		background-color: var(--background);
		vertical-align: middle;
		display: inline;
		color: var(--accent3);
	}

	.cmdUsage {
		padding-top: 1rem;
		width: 33.3333%;
		background-color: var(--accent2);
		align-self: stretch;
		display: inline;
		color: var(--accent3);
	}

	.cmd,
	.cmdDesc,
	.cmdUsage {
		border: 1px solid transparent;
		transition: border-color 0.01s step-end 0.05s; /* Transition to fade after 0.3s */
	}

	.cmd:hover,
	.cmdUsage:hover,
	.cmdDesc:hover {
		border: 1px solid var(--accent4);
		transition-delay: 0s; /* Remove the delay when hovering */
	}

	.description {
		max-width: 90%;
		white-space: normal;
		overflow: hidden;
		margin: auto auto 1rem;
		font-size: 0.95rem !important;
	}

	.cmdContainer {
		max-height: 20rem;
		width: 100%;
	}

	.subText {
		white-space: pre-line;
		font-size: small;
		color: var(--accent1);
	}

	.categoryText {
		padding: 0 1.5rem;
		text-align: right;
	}

	.permText, .guildText {
		color: var(--color-primary-700);
		font-weight: 600;
		left: 0;
		right: auto !important;
	}

	.searchbar {
		align-items: center;
		cursor: text;
		display: flex;
		inline-size: 100%;
		position: relative;
		border-bottom: 2px solid transparent;
		border-radius: 0.5rem;
	}

	.searchbar:hover {
		border-bottom: 2px solid var(--accent4);
		border-radius: 0.5rem;
	}

	@media (max-width: 768px) {
		.cmdContainer {
			max-height: 20rem;
			min-height: 8rem;
		}

		.permText {
			position: relative;
		}
	}
</style>
