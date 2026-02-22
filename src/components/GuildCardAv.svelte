<script>
	import { Avatar } from "flowbite-svelte";

	export let guild;
</script>

<!--
		It was apparently necessary to use inline-block to center SVG avatars when icon is missing
	-->
<Avatar
	style="display: inline-block"
	size="lg"
	src={guild?.icon && `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`}
	alt="Guild"
></Avatar>
<h4>
	{guild?.name || "N/A"}
</h4>
