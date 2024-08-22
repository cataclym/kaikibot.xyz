<script>
	import { SignIn } from "@auth/sveltekit/components";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
</script>

<main>
	<h1 class="text-accent1">KaikiBot dashboard</h1>
	<h3 class="text-accent3">Manage your servers</h3>
	{#if $page.data.session}
		<button on:click={goto(`/dashboard/${$page.data.session.user?.id}`)}>Goto</button>
	{:else}
		<SignIn provider="discord" signInPage="signin" />
	{/if}
</main>

<style>
</style>
