<script lang="ts">
	import Search from "../../methods/Search";
	import type { Cmd, Cmds } from "../../interfaces/ICommand";
	import { Input } from "flowbite-svelte";
	import { SearchOutline } from "flowbite-svelte-icons";
	
	interface Props {
		data: {
			commands: Cmds;
		};
	}

	let { data }: Props = $props();
	const { commands } = data;

	let searchText: string = $state("");
	let selectedCategory: string = $state("");

	let categories: [string, [string, Cmd[]]][] | undefined = $derived.by(() => {
		if (searchText && selectedCategory) {
			return Search(commands, searchText, selectedCategory);
		} else if (searchText) {
			// Search across all categories
			const allCommands = Object.entries(commands);
			const searchLower = searchText.toLowerCase().trim();
			return allCommands
				.map(([key, [catName, cmds]]) => {
					const filtered = cmds.filter((cmd) => cmd.id.toLowerCase().includes(searchLower));
					return filtered.length > 0 ? [key, [catName, filtered]] as [string, [string, Cmd[]]] : null;
				})
				.filter((item) => item !== null) as [string, [string, Cmd[]]][];
		} else if (selectedCategory) {
			return Object.entries(commands).filter((a) => a[1][0].toLowerCase() === selectedCategory);
		} else {
			return Object.entries(commands);
		}
	});

	function selectCategory(categoryElement: string) {
		if (typeof categoryElement !== "string") return;
		selectedCategory = selectedCategory === categoryElement
			? ""
			: categoryElement;
	}
</script>

<div class="w-10/12 text-gray-300 m-auto mt-10 mb-52">
	<div class="mb-10 m-auto">
		<Input
			clearable
			color="primary"
			class="bg-gray-800 text-gray-100! ps-9"
			type="text"
			placeholder="Search commands"
			bind:value={searchText}
		>
			{#snippet left()}
				<SearchOutline class="w-4 h-4" />
			{/snippet}
		</Input>
	</div>

	<div class="flex flex-wrap justify-center">
		{#each Object.entries(commands) as categories}
			{#each categories[1] as category}
				{#if typeof category === "string"}
					<button
						class={selectedCategory === category.toLocaleLowerCase()
							? "cmdCategoryActive"
							: "cmdCategory"}
						onclick={() => selectCategory(category.toLocaleLowerCase())}
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
		<div class="cmdUsage flex! justify-between items-baseline">
			<h2
				class="description"
				style="font-size: 1.5rem !important; line-height: 2rem !important;"
			>
				Usage
			</h2>
			<h6 class="text-primary-700 w-fit font-medium">User Permissions</h6>
		</div>
	</div>

		{#each categories as commands}
			{#each commands[1] as category}
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
										{commands[1][0]}
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
										{#if Array.isArray(cmd.usage)}
											{#each cmd.usage as usage}
												<br />+{cmd.id} {usage}
											{/each}
										{:else if cmd.usage}
											+{cmd.id} {cmd.usage}
										{:else}
											+{cmd.id}
										{/if}
									</p>
									{#if cmd.userPermissions.length && cmd.userPermissions[0]}
										<p class="subText categoryText permText">
											{#each cmd.userPermissions as perm}
												{perm}<br />
											{/each}
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
		width: 33.3333%;
		background-color: var(--accent2);
		vertical-align: middle;
		display: inline;
		color: var(--accent3);
	}

	.cmdDesc {
		width: 33.3333%;
		background-color: var(--background);
		vertical-align: middle;
		display: inline;
		color: var(--accent3);
	}

	.cmdUsage {
		width: 33.3333%;
		background-color: var(--accent2);
		align-self: stretch;
		display: inline;
		color: var(--accent3);
	}

	.cmd,
	.cmdDesc,
	.cmdUsage {
		padding: 1rem;
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
		max-width: fit-content;
		white-space: normal;
		overflow: hidden;
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
		text-align: right;
	}

	.permText,
	.guildText {
		color: var(--color-primary-700);
		font-weight: 600;
		left: 0;
		right: auto !important;
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
