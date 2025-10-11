<script lang="ts">
	import { error } from "@sveltejs/kit";
	import { page } from "$app/state";
	import { Input, Button, Textarea } from "flowbite-svelte";
	import { FileCheckSolid, TrashBinSolid } from "flowbite-svelte-icons";
	import ColorPicker from "svelte-awesome-color-picker";
	import ClickToCopy from "../../../../../components/ClickToCopy.svelte";
	import IntColorToHex from "../../../../../methods/IntColorToHex";

	let { data } = $props();
	const { isAdmin } = data;

	if (!isAdmin) error(401, "Not authorized");

	let { userRole } = data.user;
	if (!userRole) error(404, "UserRole not found");

	let userRoleObject = $state({
		name: userRole.name,
		color: IntColorToHex(userRole.color),
		icon: userRole.icon
	});

	const url = page.url.pathname;

	const savedUserRole = {
		name: userRole.name,
		color: IntColorToHex(userRole.color),
		icon: userRole.icon
	};

	let userRoleState = $derived(
		JSON.stringify(savedUserRole) === JSON.stringify(userRoleObject)
	);

	function resetAll(): void {
		userRoleObject = savedUserRole;
	}
</script>

<div id="guildSettings" class="flex-row mt-2 flex-wrap gap-2 flex justify-center w-full">
	<div class="indent flex flex-col justify-between items-center overflow-visible!">
		<h3 class="text-center text-xl font-semibold mb-4">User Role</h3>
		<div class="flex flex-row justify-around w-full">
			<h3>Role name</h3>
			<h3>Role color</h3>
		</div>
		<form
			class="flex flex-col justify-between h-full p-4"
			method="POST"
			action="{url}?/userrole"
		>
			<!-- Exclude Role Form Content -->
			<div class="flex flex-col flex-grow gap-4">
				<div class="flex flex-row justify-between gap-16 w-full text-gray-100">
					<Input maxlength={100} name="rolename" type="text" bind:value={userRoleObject.name} />
					<ColorPicker isAlpha={false} name="rolecolor" bind:hex={userRoleObject.color} />
					<Textarea
						class="hidden"
						name="roleid"
						value={userRole.id}	
					/>
				</div>
			</div>
			<div class="flex justify-center mt-4">
				<ClickToCopy>{userRole.id}</ClickToCopy>
			</div>

			<!-- Submit Button Section -->
			<div class="flex justify-center space-x-1 mt-4">
				<Button
					type="submit"
					color="primary"
					class="px-4 py-2 rounded-md enabled:cursor-pointer border-transparent"
					disabled={userRoleState}
				>
					<FileCheckSolid class="shrink-0 h-6 w-6" />
					Save
				</Button>
				<Button
					type="button"
					on:click={resetAll}
					color="dark"
					class="px-4 py-2 rounded-md enabled:cursor-pointer border-transparent"
					disabled={userRoleState}><TrashBinSolid class="shrink-0 h-6 w-6" />Reset</Button
				>
			</div>
		</form>
	</div>
</div>
