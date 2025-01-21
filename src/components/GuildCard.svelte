<script lang="ts">
	import { Avatar, Button } from "flowbite-svelte";
	import ClickToCopy from "./ClickToCopy.svelte";

	let { guild, user, children } = $props();
</script>

<div class="indent">
	<!--
		It was apparently necessary to use inline-block to center SVG avatars when icon is missing
	-->
	<Avatar
		style="display: inline-block"
		size="lg"
		src={guild?.icon && `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`}
		alt="Guild"
	>

	</Avatar>
	<h4>
		{guild?.name || "N/A"}
	</h4>
	{@render children?.()}
	<Button href="/dashboard/{user.id}/{guild.id}">Edit settings</Button>
	<ClickToCopy>{guild.id}</ClickToCopy>
</div>
