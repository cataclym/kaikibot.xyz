<script lang="ts">
	import { page } from "$app/state";
	import type { User } from "@auth/sveltekit";
	import {
		Avatar,
		Dropdown,
		DropdownHeader,
		DropdownItem,
		Navbar,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl
	} from "flowbite-svelte";

	let { user }: { user: User} = $props();
	let activeUrl = $derived(page.url.pathname.startsWith("/dashboard") ? "/dashboard" : page.url.pathname);
</script>

<header class="shadow-md w-full z-50 bg-gray-700">
	<Navbar class="bg-gray-700 text-gray-200 rounded-none mx-auto">
		<NavBrand href="/">
			<span class="self-center text-xl font-semibold whitespace-nowrap text-primary-600"
				>Logged in</span
			>
		</NavBrand>
		<div class="flex items-center md:order-2">
			<Avatar id="avatar-menu" src={user.image || "/default_avatar.webp"} />
			<NavHamburger />
		</div>
		<Dropdown placement="bottom" triggeredBy="#avatar-menu" trigger="hover">
			<DropdownHeader>
				<span class="block text-sm">{user.name}</span>
			</DropdownHeader>
			<DropdownItem href="/dashboard/{user.id}/profile">Profile</DropdownItem>
			<DropdownItem href="/auth/signout">Sign out</DropdownItem>
		</Dropdown>
		<NavUl hidden={false} {activeUrl} >
			<NavLi href="/">Home</NavLi>
			<NavLi href="/about">About</NavLi>
			<NavLi href="/dashboard">Dashboard</NavLi>
			<NavLi href="/contact">Contact</NavLi>
		</NavUl>
	</Navbar>
</header>
