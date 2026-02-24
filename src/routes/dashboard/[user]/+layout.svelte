<script lang="ts">
	import { page } from "$app/state";
	import { signOut } from "@auth/sveltekit/client";
	import { A, Button, Mark, P } from "flowbite-svelte";
	import { ArrowLeftOutline, ArrowRightToBracketOutline } from "flowbite-svelte-icons";

	let { data, children } = $props();
	const { responseData } = data;
	let userId = $derived(page.params.user);
</script>

<div class="w-full mt-1">
	<div class="w-full bg-gray-700 mb-1 shadow-md">
		<div class="mx-auto max-w-4xl pt-4 pb-4 px-4 text-gray-100 grid grid-cols-3 items-center">
			<div class="justify-self-start">
				{#if !page.url.pathname.endsWith(userId || "")}
					<Button size="sm" href="../" role="button" color="light" class="gap-2">
						<ArrowLeftOutline class="w-4 h-4" /> Back
					</Button>
				{/if}
			</div>

			<div class="justify-self-center">
				<Button
					href="/"
					role="button"
					color="red"
					class="font-bold gap-2 bg-red-700! hover:bg-red-600! text-white!"
				>
					Exit Dashboard
				</Button>
			</div>

			<div class="justify-self-end hover:border-b-black!">
				<Button
					href="javascript:void(0)"
					role="button"
					color="light"
					size="sm"
					onclick={() => signOut({ redirectTo: "/" })}
					class="gap-2"
				>
					Sign out <ArrowRightToBracketOutline class="w-4 h-4" />
				</Button>
			</div>
		</div>
	</div>
</div>

{@render children?.()}
