<script lang="ts">
	import { SignIn } from "@auth/sveltekit/components";
	import { page } from "$app/state";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { Heading } from "flowbite-svelte";

	onMount(() => {
		console.log(page.data);
		if (!page.data.session) return;
		goto(`/dashboard/${page.data.session.user?.id}`);
	});
</script>

<main>
	<Heading tag="h2">KaikiBot Dashboard</Heading>
	<Heading tag="h3">Manage your servers</Heading>
	<SignIn provider="discord" signInPage="signin" />
</main>

<style>
	.signInButton > button:nth-child(2) {
		background-color: var(--accent4);
		border: 1rem solid var(--accent4);
	}
</style>