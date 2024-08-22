<script>
	import { goto } from "$app/navigation";

	/** @type {import("./$types").PageServerData} */
	export let data;
</script>

<main>
	<h1 class="text-accent3">{data.title}</h1>
	<div class="text-accent3">{@html data.content}</div>
	<button on:click={() => goto("/auth/signout")}>Logout</button>
</main>
