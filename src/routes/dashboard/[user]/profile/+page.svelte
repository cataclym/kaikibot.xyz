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
		Textarea
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
	let doubleClickModal = $state(false);
	let showAddModal = false;

	const toggleRow = (i: number) => {
		openRow = openRow === i ? null : i;
	};

	let selected = new Set<string>();

	function toggleSelect(id: string) {
		if (selected.has(id)) selected.delete(id);
		else selected.add(id);
	}

	function deleteSelected() {
		// send selected to form action

		// Remove table row elements from document
		selected.forEach(id => {
			document.getElementById(`TBR${id}`)?.remove();
		})
	}
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
	<h2 class="text-accent3 text-lg">Available guilds</h2>
	<div class="w-full flex flex-row gap-2 mb-12 flex-wrap justify-center content-center">
		{#each availableCachedGuilds as guild}
			<GuildCard {guild} {user} />
		{/each}
	</div>
	<Heading tag="h3">Todo list</Heading>

	<div class="mb-4">
		<Button color="green" on:click={() => (showAddModal = true)}>+ Add Todo</Button>
	</div>

	<!-- Add Todo Modal -->
	<Modal bind:open={showAddModal} title="Add Todo">
		<form method="post" action="?/addTodo" class="space-y-4">
			<Label class="space-y-2">
				<span>Todo</span>
				<Textarea name="text" rows={4} required />
			</Label>
		</form>
		<svelte:fragment slot="footer">
			<Button type="submit">Add</Button>
			<Button on:click={() => (showAddModal = false)} color="alternative">Cancel</Button>
		</svelte:fragment>
	</Modal>

	<section class="section">
		<Table noborder={false} hoverable={true}>
			<TableHead>
				<TableHeadCell>#</TableHeadCell>
				<TableHeadCell>Text</TableHeadCell>
				<TableHeadCell>Delete</TableHeadCell>
			</TableHead>
			<TableBody>
				{#if todos?.length}
					{#each todos as todo, i}
					{@const todoId = String(todo.Id)}
						<TableBodyRow id={"TBR" + todoId} onclick={() => toggleRow(i)}>
							<TableBodyCell>{todoId || 0}</TableBodyCell>
							<TableBodyCell
								>{todo.String.substring(0, 72)}{todo.String.length > 72
									? "..."
									: ""}</TableBodyCell
							>
							<TableBodyCell>
								<Button id={todoId} class="hover:cursor-pointer" color="red" on:click={(event) => toggleSelect(event.target?.id)}>
									<Checkbox checked={selected.has(todoId)} />
								</Button>
							</TableBodyCell>
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
				{:else}
					<P>You have no todo items</P>
				{/if}
			</TableBody>
		</Table>
	</section>
</main>
