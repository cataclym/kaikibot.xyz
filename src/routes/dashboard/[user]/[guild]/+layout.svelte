<script lang="ts">
	import { page } from "$app/state";
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from "flowbite-svelte";
	let activeUrl = $derived(page.url.pathname);

	const user = page.params.user;

	let { data, children } = $props();
	const { APIGuild, isAdmin } = data;
	const { icon } = APIGuild;
	const baseURL = `/dashboard/${user}/${APIGuild.id}`;
</script>

<Navbar class="bg-gray-600!" fluid={true}>
	<NavBrand href={baseURL}>
		<img
			src={`https://cdn.discordapp.com/icons/${APIGuild.id}/${icon}.${icon?.startsWith("a") ? "gif" : "webp"}` ||
				""}
			class="me-3 h-6 sm:h-9"
			alt="Guild Logo"
		/>
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>{data.APIGuild.name}</span
		>
	</NavBrand>
	<NavHamburger hidden={false} />
	<NavUl hidden={false} activeUrl={activeUrl}>
		<NavLi style="visibility:visible !important" href={baseURL}>{data.APIGuild.name}</NavLi>
		{#if isAdmin}
			<NavLi href="{baseURL}/config">Configuration</NavLi>
			<NavLi href="{baseURL}/welcome">Welcome & bye</NavLi>
		{/if}
	</NavUl>
</Navbar>

{@render children?.()}
