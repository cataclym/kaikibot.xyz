<script lang="ts">
	export let data;
</script>

<h1 class="text-accent1 text-center text-3xl mt-52 mb-5">About</h1>
<p class="text-accent3 text-center">
	Images on this websites are retrieved from <a
		class="underline decoration-orange-700 decoration-2"
		href="https://www.waifu.im/">Waifu.im</a
	>.
</p>
<p class="text-accent3 text-center">
	This website was built with SvelteKit. Source code can be found <a
		class="underline decoration-orange-700 decoration-2"
		href={data.SOURCE_WEBSITE}>here</a
	>.
</p>
