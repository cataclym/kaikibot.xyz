<script lang="ts">
	import { SignIn } from "@auth/sveltekit/components";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

	onMount(() => {
		console.log($page.data);
		if (!$page.data.session) return;
		goto(`/dashboard/${$page.data.session.user?.id}`);
	});
</script>

<main>
	<h1 class="text-accent1">KaikiBot dashboard</h1>
	<h3 class="text-accent3">Manage your servers</h3>
	<SignIn className="" provider="discord" signInPage="signin" />
</main>
