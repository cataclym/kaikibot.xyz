<script lang="ts">
	import { Card, Avatar, Button } from "flowbite-svelte";
	import ClickToCopy from "./ClickToCopy.svelte";

	let { guild, children = undefined } = $props();

	const iconUrl = guild.icon
		? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`
		: undefined;
</script>

<Card
	padding="none"
	class="w-72 max-w-xs flex flex-col items-center justify-between pb-0 opacity-75 hover:opacity-100 hover:shadow-lg transition-all bg-gray-50 border border-gray-200 rounded-lg dark:bg-gray-800/60 dark:border-gray-700 min-h-[340px]"
>
	<div class="flex flex-col items-center justify-start pt-8 px-4 text-center w-full grow">
		<Avatar
			size="lg"
			src={iconUrl}
			alt={guild.name}
			class="mb-4 bg-gray-200 dark:bg-gray-600 shadow-sm ring-4 ring-gray-100 dark:ring-gray-700 object-cover grayscale"
		/>
		<h5
			class="mb-1 text-xl font-bold tracking-tight text-gray-500 dark:text-gray-400 line-clamp-2 w-full break-words"
			title={guild.name}
		>
			{guild.name}
		</h5>
		<span class="inline-block px-2 py-0.5 text-xs font-semibold tracking-wide text-gray-400 uppercase dark:text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
			{#if guild.owner}
				Owner
			{:else}
				Member
			{/if}
		</span>
		{@render children?.()}
	</div>
	
	<div class="w-full mt-auto bg-gray-100/50 dark:bg-gray-800/30 border-t border-gray-200 dark:border-gray-700 rounded-b-lg p-4 flex flex-col gap-3 items-center">
		<!-- Placeholder or specific action for unavailable guilds -->
		<Button color="alternative" class="w-full font-medium shadow-sm cursor-not-allowed opacity-50" disabled>
			Not Configured
		</Button>
		<ClickToCopy text={guild.id} header={false}>
			<span class="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 font-mono transition-colors cursor-pointer select-none">
				ID: {guild.id}
			</span>
		</ClickToCopy>
	</div>
</Card>
