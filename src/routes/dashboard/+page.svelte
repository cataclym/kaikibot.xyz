<script>
	import { SignIn } from "@auth/sveltekit/components";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { Button } from "flowbite-svelte";
</script>

<main>
	<h1 class="text-accent1">KaikiBot dashboard</h1>
	<h3 class="text-accent3">Manage your servers</h3>
	{#if $page.data.session}
		{goto(`/dashboard/${$page.data.session.user?.id}`)}
	{:else}
			<SignIn provider="discord" signInPage="signin">
				<div slot="submitButton">
            <Button>
              Signin with Discord
            </Button>
				</div>
			</SignIn>
	{/if}
</main>
