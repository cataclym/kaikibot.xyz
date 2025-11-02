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
		{ name: `${statsCount.members} Members`, Icon: UsersGroupSolid },
		{ name: `${statsCount.bots} Bots`, Icon: UserCircleSolid },
		{ name: `${statsCount.text} Text channels`, Icon: MessagesSolid },
		{ name: `${statsCount.voice} Voice channels`, Icon: MicrophoneSolid }
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
		<Listgroup active={true} itemClass="bg-gray-600 text-gray-100" items={icons} class="w-fit" />
	</section>

	<Heading tag="h3">Roles</Heading>
	<section class="section">
		<Table border={false} hoverable>
			<TableHead>
				<TableHeadCell class="bg-gray-600 text-gray-100">Name</TableHeadCell>
				<TableHeadCell class="bg-gray-600 text-gray-100">Color</TableHeadCell>
				<TableHeadCell class="bg-gray-600 text-gray-100">ID</TableHeadCell>
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
		<Table border={false} hoverable={true}>
			<TableHead>
				<TableHeadCell class="bg-gray-600 text-gray-100">Name</TableHeadCell>
				<TableHeadCell class="bg-gray-600 text-gray-100">Image</TableHeadCell>
				<TableHeadCell class="bg-gray-600 text-gray-100">ID</TableHeadCell>
				<TableHeadCell  class="bg-gray-600 text-gray-100">Code</TableHeadCell>
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
