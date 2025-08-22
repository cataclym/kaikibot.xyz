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
	import { slide } from "svelte/transition";

	let { user }: { user: User } = $props();
	let activeUrl = $derived(
		page.url.pathname.startsWith("/dashboard") ? "/dashboard" : page.url.pathname
	);
</script>

<header class="shadow-md w-full z-50" transition:slide={{ duration: 300 }}>
	<Navbar class="bg-gray-800! text-gray-200 mx-auto">
		<NavBrand href="/">
			<span class="self-center text-xl font-semibold whitespace-nowrap text-primary-600"
				>Logged in
			</span>
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
		<NavUl
			hidden={false}
			{activeUrl}
			ulClass="bg-gray-700! rounded-none divide-gray-700 flex flex-col p-4 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium"
		>
			<NavLi href="/">Home</NavLi>
			<NavLi href="/about">About</NavLi>
			<NavLi href="/dashboard">Dashboard</NavLi>
			<NavLi href="/contact">Contact</NavLi>
		</NavUl>
	</Navbar>
</header>
