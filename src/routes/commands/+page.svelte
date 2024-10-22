<script lang="ts">
	import Search from "../../methods/Search";
	import type { Cmd, Cmds } from "../../ICommand";

	let active: {
		[id: string]: boolean;
	} = {};

	export let data: {
		commands: Cmds;
	};
	const { commands } = data;

	let originalColor: string;

	let cats: [string, [string, Cmd[]]][];
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
			<input
				class="inputSearchbar"
				type="text"
				id="searchbar2"
				placeholder="Search commands"
				on:input={(c) => searchbarOnInput(c, (() => active)())}
				on:reset={resetCats}
				on:abort={resetCats}
				on:focus={() => colorSearchbar("#252422")}
				on:focusout={() => colorSearchbar(originalColor)}
			/>
			<div class="searchThingy"></div>
			<div class="searchBottom">
				<button class="searchButton" id="searchbar3" disabled>
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

	<div class="flex flex-wrap justify-center">
		{#each Object.entries(commands) as categories}
			{#each categories[1] as category}
				{#if typeof category === "string"}
					<button
						class={active[category] ? "cmdCategoryActive" : "cmdCategory"}
						on:click={() => manageCategories(category)}
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
									<p class="subText categoryText">
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
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

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
	}

	.cmd:hover,
	.cmdUsage:hover,
	.cmdDesc:hover {
		border: 1px solid var(--accent4);
	}

	.description {
		max-width: 90%;
		white-space: pre-wrap;
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

	.permText {
		left: 0;
		right: auto !important;
	}

	.searchbar {
		align-items: center;
		background-clip: padding-box;
		background-color: var(--accent2);
		border-radius: var(--fds-control-corner-radius);
		cursor: text;
		display: flex;
		inline-size: 100%;
		position: relative;
	}

	.searchbar:hover {
		box-shadow: 0 2px var(--accent4);
	}

	.inputSearchbar {
		background-color: var(--accent2);
		border: none;
		border-radius: var(--fds-control-corner-radius);
		box-sizing: border-box;
		color: var(--accent3);
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
		color: var(--accent1);
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
		border: none;
		box-sizing: border-box;
		color: var(--accent1);
		background-color: var(--accent2);
		display: flex;
		justify-content: center;
		min-block-size: 22px;
		min-inline-size: 26px;
		outline: none;
		padding: 3px 5px;
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
