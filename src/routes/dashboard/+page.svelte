<script lang="ts">
	import { goto } from "$app/navigation";
	import { Heading } from "flowbite-svelte";
	import { DiscordSolid } from "flowbite-svelte-icons";
</script>

<main>
	<div class="text-center m-4">
		<Heading tag="h2">KaikiBot Dashboard</Heading>
		<Heading tag="h5" color="text-primary-500!">Manage your servers</Heading>
		<br />
		<!-- <SignIn provider="discord" signInPage="/auth/signin" options={{ redirectTo: "/dashboard" }} /> -->
		<DiscordSolid color="gray" transform="scale(1.5)" size="xl" />
		<form class="signInButton">
			<button on:click={() => goto("/auth/signin")}>Signin with Discord</button>
		</form>
	</div>
</main>
