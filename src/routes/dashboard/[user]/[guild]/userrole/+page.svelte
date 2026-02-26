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

	let userRoleState = $derived(JSON.stringify(savedUserRole) === JSON.stringify(userRoleObject));

	function resetAll(): void {
		userRoleObject = savedUserRole;
	}
</script>

<main class="p-4 space-y-8 w-full max-w-4xl mx-auto flex justify-center">
	<div class="indent flex flex-col justify-between items-center overflow-visible! shadow-lg rounded-lg">
		<h3 class="text-center text-xl font-semibold mb-4 text-accent3">User Role</h3>
		<div class="flex flex-row justify-around w-full mb-2 text-gray-200">
			<h3>Role name</h3>
			<h3>Role color</h3>
		</div>
		<form
			class="flex flex-col justify-between h-full p-4 w-full"
			method="POST"
			action="{url}?/userrole"
		>
			<!-- Exclude Role Form Content -->
			<div class="flex flex-col flex-grow gap-4">
				<div class="flex flex-row justify-between gap-4 w-full text-gray-100 items-center">
					<Input
						maxlength={100}
						name="rolename"
						type="text"
						bind:value={userRoleObject.name}
						class="flex-1"
					/>
					<div class="flex-none">
						<ColorPicker isAlpha={false} name="rolecolor" bind:hex={userRoleObject.color} />
					</div>
					<Textarea class="hidden" name="roleid" value={userRole.id} />
				</div>
			</div>
			<div class="flex justify-center mt-4 text-gray-400 text-sm font-mono">
				<ClickToCopy>{userRole.id}</ClickToCopy>
			</div>

			<!-- Submit Button Section -->
			<div class="flex justify-center space-x-2 mt-6">
				<Button
					type="submit"
					color="primary"
					class="px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all"
					disabled={userRoleState}
				>
					<FileCheckSolid class="shrink-0 h-5 w-5 mr-2" />
					Save
				</Button>
				<Button
					type="button"
					onclick={resetAll}
					color="dark"
					class="px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all"
					disabled={userRoleState}><TrashBinSolid class="shrink-0 h-5 w-5 mr-2" />Reset</Button
				>
			</div>
		</form>
	</div>
</main>
