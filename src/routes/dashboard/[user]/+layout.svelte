<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { ArrowKeyLeft, Button } from "flowbite-svelte";

	export let data;
	const { userData } = data;
	$: location = $page.params.guild;
</script>

<div class="flex justify-evenly gap-1 smol">
	<div class="h-full w-full">
		<p>Logged in as {userData.user.name}</p>
		<button on:click={() => goto("/auth/signout")}>Logout</button>
		{#if location != null}
			<Button href="/dashboard/{userData.user.id}/">
				<ArrowKeyLeft /> Back
			</Button>
		{/if}
	</div>
</div>

<slot />
