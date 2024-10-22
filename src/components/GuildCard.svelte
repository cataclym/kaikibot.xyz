<script>
	import { Avatar, Button } from "flowbite-svelte";
	import ClickToCopy from "./ClickToCopy.svelte";

	export let guild;
	export let cacheGuild;
	export let user;
</script>

<div class="indent min">
	<Avatar
		size="lg"
		src={`https://cdn.discordapp.com/icons/${guild.Id}/${cacheGuild?.icon}.webp			` || ""}
		alt="Guild"
	/>
	<h4>
		{cacheGuild?.name || "N/A"}
	</h4>
	<slot />
	<Button href="/dashboard/{user.id}/{guild.Id}">Edit settings</Button>
	<ClickToCopy>{guild.Id}</ClickToCopy>
</div>
