<script lang="ts">
	import { Tooltip } from "flowbite-svelte";

	export let text: string | undefined = undefined;
	export let placement: import("@floating-ui/dom").Placement = "top";
	export let header = true;

	const random = (Date.now() * Math.random()).toString(36).substring(0, 8);
	function copy() {
		const element = document.getElementById(random);
		if (!element) return;
		// Copy to ID clipboard
		const tooltip = document.getElementById(`tooltip-${random}`);
		if (tooltip) {
			tooltip.innerText = "Copied!";
			setTimeout(() => tooltip.innerText = "Click to copy", 1000);
		}

		navigator.clipboard.writeText(text ? text : element.innerText.trim());
	}
</script>

{#if header}
	<h6 id={random} style="cursor: copy;" class="hover:underline" on:click={copy}>
		<slot />
	</h6>
	{:else}
	<div id={random} style="cursor: copy;" class="hover:underline" on:click={copy}>
		<slot />
	</div>
{/if}
<Tooltip arrow={false} placement={placement} id="tooltip-{random}">Click to copy</Tooltip>
