<script>
	import { Avatar, Button } from "flowbite-svelte";
	import ClickToCopy from "./ClickToCopy.svelte";

	export let guild;
	export let user;
</script>

<div class="indent min">
	<Avatar
		size="lg"
		src={`https://cdn.discordapp.com/icons/${guild.id}/${guild?.icon}.webp` || ""}
		alt="Guild"
	/>
	<h4>
		{guild?.name || "N/A"}
	</h4>
	<slot />
	<Button href="/dashboard/{user.id}/{guild.id}">Edit settings</Button>
	<ClickToCopy>{guild.id}</ClickToCopy>
</div>
