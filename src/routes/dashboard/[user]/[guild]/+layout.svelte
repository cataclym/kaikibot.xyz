<script>
	import { page } from '$app/stores';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	$: activeUrl = $page.url.pathname;

	const user = $page.params.user;

	export let data;
	const { APIGuild } = data;
	const { icon } = APIGuild;
	const baseURL = `/dashboard/${user}/${APIGuild.id}`;
</script>

<Navbar>
	<NavBrand href="/">
		<img src={`https://cdn.discordapp.com/icons/${APIGuild.id}/${icon}.${icon?.startsWith("a") ? "gif" : "webp"}` || ""} class="me-3 h-6 sm:h-9" alt="Guild Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">{data.APIGuild.name}</span>
	</NavBrand>
	<NavHamburger />
	<NavUl {activeUrl}>
		<NavLi href={baseURL}>{data.APIGuild.name}</NavLi>
		<NavLi href="{baseURL}/config">Configuration</NavLi>
		<NavLi href="{baseURL}/welcome">Welcome & bye</NavLi>
	</NavUl>
</Navbar>

<slot />
