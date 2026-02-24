<script lang="ts">
	import { page } from "$app/state";
	import type { DiscordUser } from "$lib/types/discord";
	import { signOut } from "@auth/sveltekit/client";
	import {
		Avatar,
		Button,
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

	let { user }: { user: DiscordUser | undefined } = $props();
	let activeUrl = $derived(
		page.url.pathname.startsWith("/dashboard") ? "/dashboard" : page.url.pathname
	);
</script>

<header class="shadow-md w-full z-50" transition:slide={{ duration: 300 }}>
	<Navbar class="bg-gray-800! text-gray-200 mx-auto">
		<NavBrand href="/">
			<span class="self-center text-xl font-semibold whitespace-nowrap text-primary-600"
				>KaikiBot
			</span>
		</NavBrand>

		{#if user}
			<div class="flex items-center md:order-2">
				<Avatar
					id="avatar-menu"
					class="cursor-pointer"
					src={user.image ? `${user.image}?size=128` : "/default_avatar.webp"}
				/>
				<NavHamburger />
			</div>
			<Dropdown placement="bottom" triggeredBy="#avatar-menu" trigger="hover">
				<DropdownHeader>
					<span class="block text-sm">{user.name}</span>
				</DropdownHeader>
				<DropdownItem
					class="text-gray-200 text-sm"
					liClass="list-none"
					href="/dashboard/{user.id}/profile">Profile</DropdownItem
				>
				<DropdownItem
					class="text-gray-200 text-sm"
					liClass="list-none"
					href="javascript:void(0)"
					onclick={() => signOut()}>Sign out</DropdownItem
				>
			</Dropdown>
		{:else}
			<div class="flex items-center md:order-2">
				<Button size="sm" href="javascript:void(0)" onclick={() => window.location.assign("/auth/signin" + (page.url.pathname === "/" ? "" : `?callbackUrl=${page.url.pathname}`))}>Login</Button>
				<NavHamburger />
			</div>
		{/if}

		<NavUl
			{activeUrl}
			class="w-full md:block md:w-auto bg-gray-700 rounded-lg px-4"
			ulClass="flex flex-col p-4 bg-gray-600 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:bg-transparent md:border-0"
			activeClass="block py-2 pr-4 pl-3 text-primary-600 bg-primary-700 rounded md:bg-transparent md:text-primary-600 md:p-0"
			nonActiveClass="block py-2 pr-4 pl-3 text-gray-200 hover:bg-gray-500 md:hover:bg-transparent md:hover:text-primary-600 md:p-0"
		>
			<NavLi href="/">Home</NavLi>
			<NavLi href="/about">About</NavLi>
			<NavLi href={user ? `/dashboard/${user.id}` : "/auth/signin"}>Dashboard</NavLi>
			<NavLi href="/contact">Contact</NavLi>
		</NavUl>
	</Navbar>
</header>
