<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { ArrowKeyLeft, Button } from "flowbite-svelte";

	export let data;
	const { responseData } = data;
	$: location = $page.params.guild;
</script>

<div class="smol">
	<div class="h-full w-full pt-2 pb-2 text-gray-100 bg-gray-500 flex flex-row flex justify-around items-baseline mt-1 mb-2">
		{#if location != null}
			<Button href="/dashboard/{responseData.user.id}/" class="text-gray-700">
				<ArrowKeyLeft /> Back
			</Button>
		{/if}
		Logged in as {responseData.user.username}
		<button on:click={() => goto("/auth/signout")}>Logout</button>
	</div>
</div>

<slot />
