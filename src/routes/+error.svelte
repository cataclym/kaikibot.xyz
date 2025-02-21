<script>
	import { page } from "$app/state";
	import { Heading } from "flowbite-svelte";
</script>

<Heading tag="h1" class="text-center text-primary-600! mt-5 mb-5">
	{page.status}
	{page.error?.message || "Unknown error occurred!"}
</Heading>

<img
	class="block! m-auto max-w-full max-h-full"
	src="https://http.cat/{page.status}"
	alt={String(page.status)}
/>
