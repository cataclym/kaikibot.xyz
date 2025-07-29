<script lang="ts">
	import ClickToCopy from "./ClickToCopy.svelte";
	import GuildCardAv from "./GuildCardAv.svelte";

	let { guild, children = undefined } = $props();
</script>

<div class="indent">
	<GuildCardAv {guild} />
	{@render children?.()}
	<ClickToCopy>{guild.id}</ClickToCopy>
</div>
