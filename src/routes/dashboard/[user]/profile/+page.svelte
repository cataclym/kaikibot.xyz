<script lang="ts">
	import { page } from "$app/state";
	import { error, fail } from "@sveltejs/kit";
	import {
		Avatar,
		Button,
		Checkbox,
		Heading,
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
		Tooltip
	} from "flowbite-svelte";
	import GuildCard from "../../../../components/GuildCard.svelte";
	import type OAuthGuildData from "../../../../interfaces/OAuthGuildData";
	import "../dashboard.css";
	import { slide } from "svelte/transition";

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
		if (todos?.length === selected.size) {
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

<main class="content-container">
	<div>
		<Avatar size="lg" src={user.image || ""} alt="Avatar" />
	</div>
	<h1 class="text-accent3 text-2xl">{user.name || "User"}</h1>
	<div class="text-accent3">
		<p><b>Balance</b>: 💴 {responseData.userData?.Amount || 0}</p>
	</div>
	<div class="text-accent3">
		<p><b>Daily</b>: {responseData.userData?.ClaimedDaily ? "Claimed ✅" : "Not claimed"}</p>
		{#if responseData.userData?.ClaimedDaily}
			<br />
			<p>
				Your daily reminder is {responseData.userData.DailyReminder
					? "at " + responseData.userData.DailyReminder.toLocaleString
					: "not enabled"}
			</p>
		{/if}
	</div>
	<br />
	{#if availableCachedGuilds.length}	
	<h2 class="text-accent3 text-lg">Available guilds</h2>
	<div class="w-full flex flex-row gap-2 mb-12 flex-wrap justify-center content-center">
		{#each availableCachedGuilds as guild}
			<GuildCard {guild} {user} />
		{/each}
	</div>
	{/if}
	<Heading tag="h3">Todo list</Heading>

	<div class="mb-4">
		{#if allChecked || selected.size}
			<Button id="delete-btn" color="red" onclick={() => (showDeleteModal = true)}
				>Delete selected</Button
			>
		{/if}
		<Button color="green" onclick={() => (showAddModal = true)}>Add Todo</Button>
	</div>

	<!-- Add Todo Modal -->
	<Modal bind:open={showAddModal} title="Add Todo">
		<form id="add-todo-form" method="post" action="?/addTodo" class="space-y-4">
			<Label class="space-y-2">
				<span>Text</span>
				<Textarea
					name="todoText"
					rows={4}
					maxlength={204}
					bind:value={todoAddText}
					required
				/>
			</Label>
		</form>
		<svelte:fragment slot="footer">
			<Button type="submit" form="add-todo-form">Add</Button>
			<Button onclick={() => (showAddModal = false)} color="alternative">Cancel</Button>
		</svelte:fragment>
	</Modal>

	<!-- Delete Todo Modal -->
	<Modal bind:open={showDeleteModal} title="Delete todos">
		<form id="delete-todo-form" method="post" action="?/deleteTodos" class="space-y-4">
			<Label class="space-y-2">
				<span>Are you sure you want to delete the selected todos?</span>
				<Textarea class="hidden" name="todoIds" bind:value={selectedIdsString} />
			</Label>
		</form>
		<svelte:fragment slot="footer">
			<Button color="red" form="delete-todo-form" type="submit">Yes</Button>
			<Button onclick={() => (showDeleteModal = false)} color="alternative">Cancel</Button>
		</svelte:fragment>
	</Modal>

	<section class="section">
		{#if todos?.length}
			<Table border={true} hoverable={true}>
				<TableHead>
					<TableHeadCell>
						<Checkbox bind:checked={allChecked} id="toggle-all" onclick={toggleAll}
							>UUID</Checkbox
						>
					</TableHeadCell>
					<TableHeadCell>Text</TableHeadCell>
				</TableHead>
				<TableBody>
					{#each todos as todo, i}
						{@const todoId = String(todo.Id)}
						<TableBodyRow id={"TBR" + todoId}>
							<TableBodyCell>
								<Checkbox
									checked={selected.has(todoId)}
									onclick={() => toggleSelect(todoId)}>{todoId || 0}</Checkbox
								>
							</TableBodyCell>
							<TableBodyCell class="cursor-pointer" onclickcapture={() => toggleRow(i)}
								>{todo.String.substring(0, 72)}{todo.String.length > 72
									? "..."
									: ""}</TableBodyCell
							>
							<Tooltip>{openRow !== i ? "Click to expand" : "Click to close"}</Tooltip>
						</TableBodyRow>
						{#if openRow === i}
							<TableBodyRow>
								<!-- I hate UI -->
								<TableBodyCell
									colspan={4}
									class="p-0 bg-gray-700 hover:cursor-select max-w-fit"
								>
									<div
										class="px-2 py-3"
										transition:slide={{ duration: 300, axis: "y" }}
									>
										{todo.String}
									</div>
								</TableBodyCell>
							</TableBodyRow>
						{/if}
					{/each}
				</TableBody>
			</Table>
		{:else}
			<P>You have no todo items</P>
		{/if}
	</section>
</main>
