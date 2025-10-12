<script lang="ts">
	import {
		Button,
		Heading,
		Img,
		Listgroup,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from "flowbite-svelte";
	import {
		MessagesSolid,
		MicrophoneSolid,
		UserCircleSolid,
		UsersGroupSolid
	} from "flowbite-svelte-icons";
	import ClickToCopy from "../../../../components/ClickToCopy.svelte";
	import IntColorToHex from "../../../../methods/IntColorToHex";
	
	let { data } = $props();
	const { guild, APIGuild } = data;
	const { roles, emojis, statsCount } = guild;

	let icons = [
		{ name: `${statsCount.members} Members`, icon: UsersGroupSolid },
		{ name: `${statsCount.bots} Bots`, icon: UserCircleSolid },
		{ name: `${statsCount.text} Text channels`, icon: MessagesSolid },
		{ name: `${statsCount.voice} Voice channels`, icon: MicrophoneSolid }
	];
</script>

<!--
TODO
Update servername
Svelte UI 
	Use tabs
	Skeleton
-->
<main class="content-container">
	<section class="section">
		<Heading tag="h2">Server Information</Heading>
		<div>
			<p color="">Server ID</p>
			<ClickToCopy text={APIGuild.id}>{APIGuild.id}</ClickToCopy>
		</div>
	</section>

	<section class="section">
		<Listgroup active={true} color="dark" items={icons} class="w-fit pl-0">
			{#snippet children({ item })}
				<item.icon class="w-4 h-4 me-2.5" />
				{item.name}
			{/snippet}
		</Listgroup>
	</section>

	<Heading tag="h3">Roles</Heading>
	<section class="section">
		<Table noborder={false} hoverable>
			<TableHead>
				<TableHeadCell>Name</TableHeadCell>
				<TableHeadCell>Color</TableHeadCell>
				<TableHeadCell>ID</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each roles as role}
					{@const hexClr = IntColorToHex(role.color)}
					<TableBodyRow>
						<TableBodyCell
							><ClickToCopy placement="top-start" header={false}
								>{role.name}</ClickToCopy
							></TableBodyCell
						>
						<TableBodyCell>
							<ClickToCopy placement="top-start" text={hexClr} header={false}>
								<Button
									outline={false}
									color="alternative"
									style="background: {hexClr}10; color: {hexClr}; mix-blend-mode: hard-light;"
									pill={true}>{hexClr}</Button
								>
							</ClickToCopy>
						</TableBodyCell>
						<TableBodyCell
							><ClickToCopy placement="top-start" header={false}
								>{role.id}</ClickToCopy
							></TableBodyCell
						>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</section>

	<Heading tag="h2">Emojis</Heading>
	<section class="section">
		<Table noborder={false} hoverable={true}>
			<TableHead>
				<TableHeadCell>Name</TableHeadCell>
				<TableHeadCell>Image</TableHeadCell>
				<TableHeadCell>ID</TableHeadCell>
				<TableHeadCell>Code</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each emojis as emoji}
					<TableBodyRow>
						<TableBodyCell
							><ClickToCopy placement="top-start" header={false}
								>{emoji.name}</ClickToCopy
							></TableBodyCell
						>
						<TableBodyCell><Img width="50rem" src={emoji.url} /></TableBodyCell>
						<TableBodyCell
							><ClickToCopy placement="top-start" header={false}
								>{emoji.id}</ClickToCopy
							></TableBodyCell
						>
						<TableBodyCell
							><ClickToCopy placement="top-start" header={false}
								>{`<${emoji.animated ? "a" : ""}:${emoji.name}:${emoji.id}>`}</ClickToCopy
							></TableBodyCell
						>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</section>
</main>

<style>
	@import "./../dashboard.css";
</style>
