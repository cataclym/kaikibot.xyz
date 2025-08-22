<script lang="ts">
	import ColorPicker from "svelte-awesome-color-picker";
	import {
		Button,
		Heading,
		Img,
		Input,
		Listgroup,
		P,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from "flowbite-svelte";
	import {
		FileCheckSolid,
		MessagesSolid,
		MicrophoneSolid,
		UserCircleSolid,
		UsersGroupSolid
	} from "flowbite-svelte-icons";
	import ClickToCopy from "../../../../components/ClickToCopy.svelte";
	import IntColorToHex from "../../../../methods/IntColorToHex";
	import type { Component } from "svelte";

	let { data } = $props();
	const { guild, user, APIGuild } = data;
	const { roles, emojis, statsCount } = guild;

	let savedUserRole = $state(
		user.userRole
			? {
					name: user.userRole?.name,
					color: IntColorToHex(user.userRole.color),
					icon: user.userRole?.icon
				}
			: null
	);
	let userRoleState = $derived(
		user.userRole
			? JSON.stringify(savedUserRole) ===
					JSON.stringify({
						name: user.userRole?.name,
						color: IntColorToHex(user.userRole.color),
						icon: user.userRole?.icon
					})
			: null
	);

	let icons = [
		{ name: `${statsCount.members} Members`, icon: UsersGroupSolid },
		{ name: `${statsCount.bots} Bots`, icon: UserCircleSolid },
		{ name: `${statsCount.text} Text channels`, icon: MessagesSolid },
		{ name: `${statsCount.voice} Voice channels`, icon: MicrophoneSolid }
	];
</script>

<!--
TODO

~~Make admin fields only show up if user is admin.~~
~~Compare States for save button~~
~~Add Userrole configuration~~
~~Save button for each segment~~
Reset button
Update servername

Create store for user/guilds
https://kit.svelte.dev/docs/state-management

Use tabs
~~Use Navbar
Skeleton

-->
<main class="content-container">
	<section class="section">
	  <Heading tag="h2">Server Information</Heading>
	  <P color="">Server ID</P>
	  <ClickToCopy text={APIGuild.id} placement="top-start">{APIGuild.id}</ClickToCopy>
	</section>
  
	<section class="section">
	  <Listgroup active={true} color="dark" items={icons} class="w-fit pl-0">
		{#snippet children({ item })}
		  <item.icon class="w-4 h-4 me-2.5" />
		  {item.name}
		{/snippet}
	  </Listgroup>
	</section>
  
	<Heading tag="h3">Roles</Heading>
	<section class="section">
	  <Table noborder={true}>
		<TableHead>
		  <TableHeadCell>Name</TableHeadCell>
		  <TableHeadCell>Color</TableHeadCell>
		  <TableHeadCell>ID</TableHeadCell>
		</TableHead>
		<TableBody>
		  {#each roles as role}
			{@const hexClr = IntColorToHex(role.color)}
			<TableBodyRow>
			  <TableBodyCell><ClickToCopy placement="top-start" header={false}>{role.name}</ClickToCopy></TableBodyCell>
			  <TableBodyCell>
				<ClickToCopy placement="top-start" text={hexClr} header={false}>
				  <Button outline={false} color="alternative" style="background: {hexClr}10; color: {hexClr}; mix-blend-mode: hard-light;" pill={true}>{hexClr}</Button>
				</ClickToCopy>
			  </TableBodyCell>
			  <TableBodyCell><ClickToCopy placement="top-start" header={false}>{role.id}</ClickToCopy></TableBodyCell>
			</TableBodyRow>
		  {/each}
		</TableBody>
	  </Table>
	</section>
  
	<Heading tag="h2">Emojis</Heading>
	<section class="section">
	  <Table noborder={true}>
		<TableHead>
		  <TableHeadCell>Name</TableHeadCell>
		  <TableHeadCell>Image</TableHeadCell>
		  <TableHeadCell>ID</TableHeadCell>
		  <TableHeadCell>Code</TableHeadCell>
		</TableHead>
		<TableBody>
		  {#each emojis as emoji}
			<TableBodyRow>
			  <TableBodyCell><ClickToCopy placement="top-start" header={false}>{emoji.name}</ClickToCopy></TableBodyCell>
			  <TableBodyCell><Img width="50rem" src={emoji.url} /></TableBodyCell>
			  <TableBodyCell><ClickToCopy placement="top-start" header={false}>{emoji.id}</ClickToCopy></TableBodyCell>
			  <TableBodyCell><ClickToCopy placement="top-start" header={false}>{`<${emoji.animated ? "a" : ""}:${emoji.name}:${emoji.id}>`}</ClickToCopy></TableBodyCell>
			</TableBodyRow>
		  {/each}
		</TableBody>
	  </Table>
	</section>
  
	{#if savedUserRole}
	  <section class="user-role-section">
		<div class="userRole">
		  <Heading tag="h3">User-role</Heading>
		  <div class="role-info">
			<h3>Role name</h3>
			<h3>Role color</h3>
			<h3>Role icon</h3>
		  </div>
		  <div class="role-inputs">
			<Input type="text" bind:value={savedUserRole.name}></Input>
			<ColorPicker bind:hex={savedUserRole.color} />
			<Input type="text" bind:value={savedUserRole.icon}></Input>
		  </div>
		  {#if user.userRole}
			<ClickToCopy>{user.userRole.id}</ClickToCopy>
		  {/if}
		  <Button color="primary" class="save-button" disabled={!!userRoleState}><FileCheckSolid />Save</Button>
		</div>
	  </section>
	{/if}
</main>

<style>
	@import "./../dashboard.css";
</style>
