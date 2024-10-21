<script lang="ts">
	import { Tooltip } from "flowbite-svelte";
	import { FileCopyOutline } from "flowbite-svelte-icons";

	const random = (Date.now() * Math.random()).toString(36).substring(0, 8);
	function copy() {
		const element =  document.getElementById(random);
		if (!element) return;
		// Copy to ID clipboard
		navigator.clipboard.writeText(element.innerHTML.trim());
	}
</script>

<h6 id={random} style="cursor: copy;" class="hover:underline" on:click={copy}>
	<slot/>
</h6>
<Tooltip>Click to copy</Tooltip>
