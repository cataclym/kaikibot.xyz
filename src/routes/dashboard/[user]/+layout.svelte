<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { ArrowKeyLeft, Button } from "flowbite-svelte";

	export let data;
	const { responseData } = data;
	$: location = $page.params.guild;
</script>

<div class="flex justify-evenly gap-1 smol">
	<div class="h-full w-full pt-1 text-orange flex flex-row justify-around">
		{#if location != null}
			<Button href="/dashboard/{responseData.user.id}/">
				<ArrowKeyLeft /> Back
			</Button>
		{/if}
		Logged in as {responseData.user.username}
		<button on:click={() => goto("/auth/signout")}>Logout</button>
	</div>
</div>

<slot />
