<script lang="ts">
	import { NavLi } from "flowbite-svelte";
	export let href: string;
	export let disabled = false;
	export let className = "";
	export let style = "";
	export let message = "";

	function handleClick(event: MouseEvent) {
		if (disabled) {
			event.preventDefault();
			event.stopPropagation();
			// optional - stop bubbling to parent
		}
	}
</script>

<NavLi
	{href}
	class={`${className} ${disabled ? "text-gray-400! opacity-60 cursor-not-allowed cursor-not-allowed" : ""}`}
	activeClass="text-white!"
	nonActiveClass="text-gray-200!"
	{style}
	onclick={handleClick}
	title={disabled ? message : ""}
>
	<span title={disabled ? message : ""}>
		<slot />
	</span>
</NavLi>
