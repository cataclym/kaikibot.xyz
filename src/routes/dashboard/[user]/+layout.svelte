<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { ArrowKeyLeft, Button, Mark, P } from "flowbite-svelte";

	export let data;
	const { responseData } = data;
	$: location = $page.params.guild;
</script>

<div class="smol">
	<div
		class="h-10 w-full pt-2 pb-2 text-gray-100 bg-gray-500 flex flex-row justify-around items-center mt-1 mb-2"
	>
		{#if location != null}
			<Button href="/dashboard/{responseData.user.id}/" class="text-gray-700">
				<ArrowKeyLeft /> Back
			</Button>
		{:else}
			<div style="width: 87px;" />
		{/if}
		<P color="text-gray-100">Logged in as <Mark bgColor="bg-gray-700" color="text-primary-600">{responseData.user.username}</Mark></P>
		<Button class="text-gray-800 bg-gray-100" href="/auth/signout">Logout</Button>
	</div>
</div>

<slot />
