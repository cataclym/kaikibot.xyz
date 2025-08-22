<script lang="ts">
	import { Button } from "flowbite-svelte";
	import ClickToCopy from "./ClickToCopy.svelte";
	import GuildCardAv from "./GuildCardAv.svelte";

	let { guild, user, children = undefined } = $props();
</script>

<div class="indent shadow-lg">
	<GuildCardAv {guild} />
	{@render children?.()}
	<Button class="text-gray-800" href="/dashboard/{user.id}/{guild.id}">Edit settings</Button>
	<ClickToCopy>{guild.id}</ClickToCopy>
</div>
