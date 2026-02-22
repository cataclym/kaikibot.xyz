<script lang="ts">
	import { P, Tooltip } from "flowbite-svelte";

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
	<P
		color=""
		id={random}
		class="text-center cursor-copy text-sm hover:underline text-gray-200!"
		onclick={copy}
	>
		{@render children?.()}
	</P>
{:else}
	<div id={random} class="text-center cursor hover:underline text-gray-200" onclick={copy}>
		{@render children?.()}
	</div>
{/if}
<Tooltip class="text-center" arrow={false} {placement} id="tooltip-{random}">Click to copy</Tooltip>
