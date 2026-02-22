<script lang="ts">
	import { page } from "$app/state";
	import { signOut } from "@auth/sveltekit/client";
	import { A, Button, Mark, P } from "flowbite-svelte";
	import { ArrowLeftOutline, ArrowRightToBracketOutline } from "flowbite-svelte-icons";

	let { data, children } = $props();
	const { responseData } = data;
	let userId = $derived(page.params.user);
</script>

<div class="smol">
	<div
		class="h-10 w-full pt-2 pb-2 text-gray-100 bg-gray-500 flex flex-row justify-center gap-40 items-center mt-1 mb-1"
	>
		{#if !page.url.pathname.endsWith(userId || "")}
			<A href="../" color="secondary"><ArrowLeftOutline /> Back</A>
			<!-- <Button size="sm" href="../" class="text-gray-700">
				<ArrowLeftOutline /> Back
			</Button> -->
		{:else}
			<div style="width: 87px;"></div>
		{/if}
		<P color="text-gray-100"
			>Logged in as <Mark class="bg-gray-700! text-primary-600!"
				>{responseData?.user.username}</Mark
			>
		</P>
		<A href="" onclick={() => signOut({ redirectTo: "/" })} color="secondary" >Sign out <ArrowRightToBracketOutline class="ml-1" /></A
		>
	</div>
</div>

{@render children?.()}
