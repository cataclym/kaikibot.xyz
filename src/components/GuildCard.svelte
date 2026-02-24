<script lang="ts">
	import { Button, Card, Avatar } from "flowbite-svelte";
	import ClickToCopy from "./ClickToCopy.svelte";

	let { guild, user, children = undefined } = $props();

	const iconUrl = guild.icon
		? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`
		: undefined;
</script>

<Card
	class="w-72 max-w-xs flex flex-col items-center justify-between pb-0 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 rounded-lg bg-gray-700! border-gray-600! min-h-[340px]"
>
	<div class="flex flex-col items-center justify-start pt-8 px-4 text-center w-full grow">
		<Avatar
			size="lg"
			src={iconUrl}
			alt={guild.name}
			class="mb-4 bg-gray-600 shadow-md ring-4 ring-gray-700 object-cover"
		/>
		<h5
			class="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2 w-full break-words"
			title={guild.name}
		>
			{guild.name}
		</h5>
		<span class="inline-block px-2 py-0.5 text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
			{#if guild.owner}
				Owner
			{:else}
				Member
			{/if}
		</span>
		{@render children?.()}
	</div>
	
	<div class="w-full mt-auto bg-gray-600/30 border-t border-gray-700 rounded-b-lg p-4 flex flex-col gap-3 items-center">
		<Button
			color="primary"
			class="w-full font-medium shadow-sm hover:shadow transition-shadow"
			href="/dashboard/{user.id}/{guild.id}"
		>
			Configure
		</Button>
		<ClickToCopy text={guild.id} header={false}>
			<span class="text-xs text-gray-400 hover:text-gray-300 font-mono transition-colors cursor-pointer select-none">
				ID: {guild.id}
			</span>
		</ClickToCopy>
	</div>
</Card>
