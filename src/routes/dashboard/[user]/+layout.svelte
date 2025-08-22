<script lang="ts">
	import { page } from "$app/state";
	import { ArrowKeyLeft, Button, Mark, P } from "flowbite-svelte";

	let { data, children } = $props();
	const { responseData } = data;
	let userId = $derived(page.params.user);
</script>

<div class="smol">
	<div
		class="h-10 w-full pt-2 pb-2 text-gray-100 bg-gray-500 flex flex-row justify-around items-center mt-1 mb-1"
	>
		{#if !page.url.pathname.endsWith(userId)}
			<Button size="sm" href="../" class="text-gray-700">
				<ArrowKeyLeft /> Back
			</Button>
		{:else}
			<div style="width: 87px;"></div>
		{/if}
		<P color="text-gray-100"
			>Logged in as <Mark bgColor="bg-gray-700" color="text-primary-600"
				>{responseData?.user.username}</Mark
			>
		</P>
		<Button size="sm" class="text-gray-800" href="/auth/signout">Sign out</Button>
	</div>
</div>

{@render children?.()}
