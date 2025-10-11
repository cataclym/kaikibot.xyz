<script lang="ts">
	import { page } from "$app/state";
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from "flowbite-svelte";
	import NavLiExtended from "../../../../components/GuildConfig/NavLiExtended.svelte";
	let activeUrl = $derived(page.url.pathname);

	const user = page.params.user;

	let { data, children } = $props();
	const { APIGuild, isAdmin, user: userData } = data;
	const { icon } = APIGuild;
	const baseURL = `/dashboard/${user}/${APIGuild.id}`;
</script>

<Navbar class="bg-gray-600!">
	<NavBrand href={baseURL}>
		<img
			src={`https://cdn.discordapp.com/icons/${APIGuild.id}/${icon}.${icon?.startsWith("a") ? "gif" : "webp"}`}
			class="me-3 h-6 sm:h-9"
			alt="Guild Logo"
		/>
		<span class="self-center whitespace-nowrap text-xl font-semibold text-gray-100"
			>{data.APIGuild.name}</span
		>
	</NavBrand>
	<NavHamburger hidden={false} />
	<NavUl hidden={false} {activeUrl}>
		<NavLiExtended href={baseURL}>Information</NavLiExtended>
		<!-- Bool check for if user is admin -->
		<NavLiExtended
			href={`${baseURL}/config`}
			message="You do not have permisssion to access this configuration."
			disabled={!isAdmin}
			>Configuration
		</NavLiExtended>
		<NavLiExtended
			href={`${baseURL}/welcome`}
			message="You do not have permisssion to access this configuration."
			disabled={!isAdmin}
			>Welcome & bye
		</NavLiExtended>
		<!-- Bool check for available userRole -->
		<NavLiExtended
			href={`${baseURL}/userrole`}
			message="You do not have a user role to configure."
			disabled={!userData.userRole}
			>User role
		</NavLiExtended>
	</NavUl>
</Navbar>

{@render children?.()}
