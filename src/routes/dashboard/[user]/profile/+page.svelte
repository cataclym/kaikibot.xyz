<script lang="ts">
	import { page } from "$app/state";
	import { error } from "@sveltejs/kit";
	import {
		Avatar,
		Button,
		Card,
		Checkbox,
		Heading,
		Helper,
		Label,
		Modal,
		P,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Textarea,
		Tooltip,
		Badge
	} from "flowbite-svelte";
	import GuildCard from "../../../../components/GuildCard.svelte";
	import type OAuthGuildData from "../../../../interfaces/OAuthGuildData";
	import "../dashboard.css";
	import { slide } from "svelte/transition";
	import { CreditCardSolid, DollarOutline } from "flowbite-svelte-icons";

	// Access sessions
	const session = page.data.session;

	if (session?.user == null) throw error(500, "User does not exist");

	// Access session user and bot data
	const { user } = session;
	let { data } = $props();
	const { responseData, todos } = data;

	if (!responseData) throw error(500, { message: "Discord data is missing" });

	const mappedGuildIdSet = new Set(responseData.guildDb.map((guild) => guild.Id));
	const availableCachedGuilds: OAuthGuildData[] = [];
	const unavailableCachedGuilds: OAuthGuildData[] = [];

	// Separate arrays for guilds with bot and otherwise
	for (const guild of responseData.guilds) {
		if (mappedGuildIdSet.has(guild.id)) {
			availableCachedGuilds.push(guild);
		} else {
			unavailableCachedGuilds.push(guild);
		}
	}

	let openRow: number | null = $state(null);
	let showAddModal = $state(false);
	let showDeleteModal = $state(false);

	const toggleRow = (i: number) => {
		openRow = openRow === i ? null : i;
	};

	let selected = $state(new Set<string>());
	let selectedIdsString = $state("");
	let allChecked = $state(false);

	function toggleSelect(id: string) {
		if (selected.has(id)) selected.delete(id);
		else selected.add(id);
		selected = new Set(selected);
		selectedIdsString = [...selected].join(",");
	}

	function toggleAll(): void {
		if (allChecked) {
			selected.clear();
			allChecked = false;
		} else {
			todos?.forEach((todo) => {
				selected.add(String(todo.Id));
			});
			allChecked = !!selected.size;
		}
		selected = new Set(selected);
		selectedIdsString = [...selected].join(",");
	}

	let todoAddText = $state("");
</script>

<main class="flex flex-col items-center w-full p-4 space-y-8">
	<!-- User Profile Card -->
	<div class="text-center flex flex-col items-center space-y-4 p-2">
		<Avatar size="xl" src={user.image || ""} alt="Avatar" />
		<Heading tag="h3">Profile for {user.name || "User"}</Heading>

		<div class="flex flex-wrap gap-4 justify-center">
			<Badge
				class="px-4 py-2 flex items-center gap-1.5 text-white! bg-primary-700!"
				large
				color="primary"
			>
				<span class="font-semibold">Balance:</span>
				<span class="flex items-center gap-1">
					{Number(responseData.userData?.Amount || 0).toFixed(2)}
				</span>
			</Badge>
			<Badge
				class="px-4 py-2 flex items-center gap-1.5"
				large
				color={responseData.userData?.ClaimedDaily ? "green" : "gray"}
			>
				<span class="font-semibold">Daily:</span>
				<span>{responseData.userData?.ClaimedDaily ? "Claimed ✅" : "Not claimed"}</span>
			</Badge>
		</div>	
		{#if responseData.userData?.ClaimedDaily && responseData.userData?.DailyReminder}
			<P class="text-sm text-gray-400">
				Daily reminder: {String(responseData.userData.DailyReminder)}
			</P>
		{/if}
	</div>

	<!-- Available Guilds Section -->
	{#if availableCachedGuilds.length}
		<Heading tag="h3">Guilds</Heading>
		<div class="w-full flex flex-row gap-2 mb-12 flex-wrap justify-center content-center">
			{#each availableCachedGuilds as guild}
				<GuildCard {guild} {user} />
			{/each}
		</div>
	{/if}

	<!-- Todo List Section -->
	<section class="w-full max-w-4xl space-y-4">
		<div class="flex items-center justify-between flex-wrap gap-4">
			<Heading tag="h3">Todo List</Heading>
			<div class="flex gap-2 flex-wrap">
				{#if allChecked || selected.size}
					<Button color="red" onclick={() => (showDeleteModal = true)}>
						Delete Selected ({selected.size})
					</Button>
				{/if}
				<Button color="green" onclick={() => (showAddModal = true)}>Add Todo</Button>
			</div>
		</div>

		<!-- Add Todo Modal -->
		<Modal bind:open={showAddModal} title="Add Todo" size="md">
			<form id="add-todo-form" method="post" action="?/addTodo" class="space-y-4">
				<Label class="space-y-2">
					<span>Text</span>
					<Textarea
						class="w-full"
						name="todoText"
						rows={4}
						maxlength={204}
						bind:value={todoAddText}
						required
					/>
					<Helper>{204 - todoAddText.length} characters remaining</Helper>
				</Label>
			</form>
			{#snippet footer()}
				<Button type="submit" form="add-todo-form">Add</Button>
				<Button onclick={() => (showAddModal = false)} color="alternative"
					>Cancel</Button
				>
			{/snippet}
		</Modal>

		<!-- Delete Todo Modal -->
		<Modal bind:open={showDeleteModal} title="Delete Todos" size="md">
			<form id="delete-todo-form" method="post" action="?/deleteTodos">
				<input type="hidden" name="todoIds" bind:value={selectedIdsString} />
				<P
					>Are you sure you want to delete {selected.size} selected todo{selected.size !==
					1
						? "s"
						: ""}?</P
				>
			</form>
			{#snippet footer()}
				<Button color="red" form="delete-todo-form" type="submit">Delete</Button>
				<Button onclick={() => (showDeleteModal = false)} color="alternative"
					>Cancel</Button
				>
			{/snippet}
		</Modal>

		{#if todos?.length}
			<section class="overflow-x-auto rounded-lg shadow-md">
				<Table hoverable striped class="w-full text-sm text-left text-gray-100 bg-gray-800">
					<TableHead class="text-xs text-gray-100 uppercase bg-gray-600">
						<TableHeadCell class="w-32">
							<Checkbox bind:checked={allChecked} onclick={toggleAll}>ID</Checkbox>
						</TableHeadCell>
						<TableHeadCell>Todo</TableHeadCell>
					</TableHead>
					<TableBody class="bg-gray-700">
						{#each todos as todo, i}
							{@const todoId = String(todo.Id)}
							{@const isExpanded = openRow === i}
							{@const isExpandable = todo.String.length > 72}
							<TableBodyRow class="border-b border-gray-600 hover:bg-gray-600">
								<TableBodyCell class="whitespace-nowrap font-medium text-gray-100">
									<Checkbox
										checked={selected.has(todoId)}
										onclick={() => toggleSelect(todoId)}
									>
										{todoId}
									</Checkbox>
								</TableBodyCell>
								<TableBodyCell 
									class="transition-colors text-gray-100 {isExpandable ? 'cursor-pointer' : ''}" 
									onclick={() => isExpandable && toggleRow(i)}
								>
									<div class="flex items-center justify-between gap-3">
										<span class="flex-1 text-base">
											{todo.String.substring(0, 72)}{isExpandable
												? "..."
												: ""}
										</span>
										{#if isExpandable}
											<div class="flex items-center gap-2 text-sm">
												<span class="text-gray-300 group-hover:text-white transition-colors font-medium">
													{isExpanded ? "Click to collapse" : "Click to expand"}
												</span>
												<svg 
													class="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-all duration-200 {isExpanded ? 'rotate-180' : 'rotate-0'}"
													fill="none" 
													stroke="currentColor" 
													viewBox="0 0 24 24"
												>
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
												</svg>
											</div>
										{/if}
									</div>
								</TableBodyCell>
							</TableBodyRow>
							{#if isExpanded}
								<TableBodyRow class="bg-gray-700">
									<TableBodyCell colspan={2} class="p-6 border-t border-gray-600 text-gray-100">
										<div
											class="space-y-3"
											transition:slide={{ duration: 300, axis: "y" }}
										>
											<p class="whitespace-pre-wrap wrap-break-word text-base leading-relaxed">
												{todo.String}
											</p>
										</div>
									</TableBodyCell>
								</TableBodyRow>
							{/if}
						{/each}
					</TableBody>
				</Table>
			</section>
		{:else}
			<div class="text-center py-8 bg-gray-700 rounded-lg">
				<P class="text-gray-400">No todos yet. Click "Add Todo" to create one!</P>
			</div>
		{/if}
	</section>
</main>
