<script lang="ts">
	import ColorPicker from "svelte-awesome-color-picker";
	import {
		Avatar,
		Button, Heading,
		Input, Listgroup, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell
	} from "flowbite-svelte";
	import {
		FileCheckSolid,
		MessagesSolid,
		MicrophoneSolid,
		UserCircleSolid
	} from "flowbite-svelte-icons";
	import ClickToCopy from "../../../../components/ClickToCopy.svelte";
	import IntColorToHex from "../../../../methods/IntColorToHex";

	export let data;
	const { guild, user, isAdmin, APIGuild } = data;

	let { name, icon } = APIGuild;
	const { roles, emojis } = guild;

	let savedUserRole = user.userRole
		? {
			name: user.userRole?.name,
			color: IntColorToHex(user.userRole.color),
			icon: user.userRole?.icon,
		} : null;
	$: userRoleState = user.userRole
		? JSON.stringify(savedUserRole) === JSON.stringify({
		name: user.userRole?.name,
		color: IntColorToHex(user.userRole.color),
		icon: user.userRole?.icon,
	}) : null;

	let icons = [
		{ name: 'Members', icon: UserCircleSolid },
		{ name: 'Text', icon: MessagesSolid },
		{ name: 'Voice', icon: MicrophoneSolid },
	];
</script>

<!--
TODO

~~Make admin fields only show up if user is admin.~~
~~Compare States for save button~~
~~Add Userrole configuration~~
~~Save button for each segment~~
Reset button

Create store for user/guilds
https://kit.svelte.dev/docs/state-management

Use tabs
Use Navbar
Skeleton

-->

<div>
	<Avatar
		size="xl"
		src={`https://cdn.discordapp.com/icons/${APIGuild.id}/${icon}.${icon?.startsWith("a") ? "gif" : "webp"}` || ""}
		alt="Guild"
	/>
</div>
<h1>Server Information</h1>
<h2>{name || APIGuild.id}</h2>
<ClickToCopy>APIGuild.id</ClickToCopy>

<Listgroup active items={icons} let:item class="w-48">
	<svelte:component this={item.icon} class="w-4 h-4 me-2.5"/>
	{item.name}
</Listgroup>

<div>
	<Heading tag="h2">Roles</Heading>
	<Table noborder={true}>
		<TableHead>
			<TableHeadCell>Name</TableHeadCell>
			<TableHeadCell>Color</TableHeadCell>
			<TableHeadCell>ID</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each roles as role}
				<TableBodyRow>
					<TableBodyCell>{role.name}</TableBodyCell>
					<TableBodyCell>{role.color}</TableBodyCell>
					<TableBodyCell>{role.id}</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>

<div>
	<Heading tag="h2">Emojis</Heading>
	<Table noborder={true}>
		<TableHead>
			<TableHeadCell>Name</TableHeadCell>
			<TableHeadCell>ID</TableHeadCell>
			<TableHeadCell>Price</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each emojis as emoji}
				<TableBodyRow>
					<TableBodyCell>{emoji.name}</TableBodyCell>
					<TableBodyCell>{emoji.url}</TableBodyCell>
					<TableBodyCell>{emoji.id}</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>

{#if savedUserRole}
	<div class="flex-row mt-2 flex-wrap flex justify-center w-full">
		<div class="userRole flex flex-col items-center w-full">
			<Heading tag="h3">User-role</Heading>
			<div class="flex flex-row justify-around w-full">
				<h3>Role name</h3>>
				<h3>Role color</h3>
				<h3>Role icon</h3>
			</div>
			<div class="flex flex-row justify-between gap-16 w-full text-gray-100">
				<Input type="text" bind:value={savedUserRole.name}></Input>
				<ColorPicker bind:hex={savedUserRole.color} />
				<Input type="text" bind:value={savedUserRole.icon}></Input>
			</div>
			{#if user.userRole}
				<ClickToCopy>{user.userRole.id}</ClickToCopy>
			{/if}
			<Button
				color="primary"
				class="self-end ml-auto mr-auto enabled:cursor-pointer border-transparent"
				disabled={!!userRoleState}><FileCheckSolid />Save</Button
			>
		</div>
	</div>
{/if}
