<script lang="ts">
	import { SignIn } from "@auth/sveltekit/components";
	import { page } from "$app/state";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { Heading } from "flowbite-svelte";

	onMount(() => {
		if (!page.data.session) return;
		goto(`/dashboard/${page.data.session.user?.id}`);
	});
</script>

<main>
	<div class="text-center m-4">
		<Heading tag="h2" class="text-primary-600!">Under construction</Heading>
		<Heading tag="h2">KaikiBot Dashboard</Heading>
			<Heading tag="h5" color="text-primary-500!">Manage your servers</Heading>
			<br>
		<SignIn provider="discord" signInPage="/auth/signin" />
	</div>
</main>
