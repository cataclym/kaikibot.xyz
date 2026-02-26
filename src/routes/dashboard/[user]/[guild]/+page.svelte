<script lang="ts">
	import {
		Heading,
		Img,
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
<main class="p-4 space-y-8 w-full max-w-4xl mx-auto">
	<section class="space-y-4">
		<Heading tag="h2" class="text-accent3">Server Information</Heading>
		<div class="text-gray-100">
			<p>Server ID</p>
			<ClickToCopy text={APIGuild.id}>{APIGuild.id}</ClickToCopy>
		</div>
	</section>

	<section class="space-y-4">
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
			{#each icons as icon}
			<div class="flex items-center p-4 bg-gray-600 rounded-lg text-gray-100 shadow-md">
				<icon.Icon class="w-6 h-6 mr-3 text-accent3" />
				<span class="font-semibold">{icon.name}</span>
			</div>
			{/each}
		</div>
	</section>

	<Heading tag="h3" class="text-accent3">Roles</Heading>
	<section class="overflow-x-auto rounded-lg shadow-md">
		<Table hoverable striped class="w-full text-sm text-left text-gray-100 bg-gray-800">
			<TableHead class="text-xs text-gray-100 uppercase bg-gray-600">
				<TableHeadCell>Name</TableHeadCell>
				<TableHeadCell>Color</TableHeadCell>
				<TableHeadCell>ID</TableHeadCell>
			</TableHead>
			<TableBody class="bg-gray-700">
				{#each roles as role}
					{@const hexClr = IntColorToHex(role.color)}
					<TableBodyRow class="border-b border-gray-600 hover:bg-gray-600">
						<TableBodyCell class="font-medium text-gray-100 whitespace-nowrap">
							<ClickToCopy placement="top-start" header={false}>{role.name}</ClickToCopy>
						</TableBodyCell>
						<TableBodyCell>
							<ClickToCopy placement="top-start" text={hexClr} header={false}>
								<div class="flex items-center gap-2">
									<div class="w-6 h-6 rounded-full border border-gray-500" style="background-color: {hexClr};"></div>
									<span class="font-mono">{hexClr}</span>
								</div>
							</ClickToCopy>
						</TableBodyCell>
						<TableBodyCell class="font-mono">
							<ClickToCopy placement="top-start" header={false}>{role.id}</ClickToCopy>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</section>

	<Heading tag="h2" class="text-accent3">Emojis</Heading>
	<section class="overflow-x-auto rounded-lg shadow-md">
		<Table hoverable striped class="w-full text-sm text-left text-gray-100 bg-gray-800">
			<TableHead class="text-xs text-gray-100 uppercase bg-gray-600">
				<TableHeadCell>Name</TableHeadCell>
				<TableHeadCell>Image</TableHeadCell>
				<TableHeadCell>ID</TableHeadCell>
				<TableHeadCell>Code</TableHeadCell>
			</TableHead>
			<TableBody class="bg-gray-700">
				{#each emojis as emoji}
					<TableBodyRow class="border-b border-gray-600 hover:bg-gray-600">
						<TableBodyCell class="font-medium text-gray-100 whitespace-nowrap">
							<ClickToCopy placement="top-start" header={false}>{emoji.name}</ClickToCopy>
						</TableBodyCell>
						<TableBodyCell>
							<Img width="40" height="40" src={emoji.url} alt={emoji.name} class="rounded object-contain bg-gray-900/50 p-1" />
						</TableBodyCell>
						<TableBodyCell class="font-mono">
							<ClickToCopy placement="top-start" header={false}>{emoji.id}</ClickToCopy>
						</TableBodyCell>
						<TableBodyCell class="font-mono text-xs">
							<ClickToCopy placement="top-start" header={false}>{`<${emoji.animated ? "a" : ""}:${emoji.name}:${emoji.id}>`}</ClickToCopy>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</section>
</main>

