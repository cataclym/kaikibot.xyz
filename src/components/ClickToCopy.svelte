<script lang="ts">
	import { Tooltip } from "flowbite-svelte";

	interface Props {
		text?: string | undefined;
		placement?: import("@floating-ui/dom").Placement;
		header?: boolean;
		children?: import("svelte").Snippet;
	}

	let { text = undefined, placement = "top", header = true, children }: Props = $props();

	const random = (Date.now() * Math.random()).toString(36).substring(0, 8);
	function copy() {
		const element = document.getElementById(random);
		if (!element) return;
		// Copy to ID clipboard
		const tooltip = document.getElementById(`tooltip-${random}`);
		if (tooltip) {
			tooltip.innerText = "Copied!";
			setTimeout(() => (tooltip.innerText = "Click to copy"), 1000);
		}

		navigator.clipboard.writeText(text ? text : element.innerText.trim());
	}
</script>

{#if header}
	<h6 id={random} style="cursor: copy;" class="hover:underline" onclick={copy}>
		{@render children?.()}
	</h6>
{:else}
	<div id={random} style="cursor: copy;" class="hover:underline" onclick={copy}>
		{@render children?.()}
	</div>
{/if}
<Tooltip arrow={false} {placement} id="tooltip-{random}">Click to copy</Tooltip>
