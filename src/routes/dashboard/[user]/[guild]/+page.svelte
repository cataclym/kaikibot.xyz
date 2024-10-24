<script lang="ts">
	import ColorPicker from "svelte-awesome-color-picker";
	import {
		Avatar,
		Button, Heading,
		Input,
		NumberInput,
		Select,
		Textarea,
		Toast,
		Toggle
	} from "flowbite-svelte";
	import { FileCheckSolid, InfoCircleSolid } from "flowbite-svelte-icons";
	import ClickToCopy from "../../../../components/ClickToCopy.svelte";
	import IntColorToHex from "../../../../methods/IntColorToHex";

	export let data;
	const { guildData, EMBED, userRole } = data;
	let {
		DadBot,
		Anniversary,
		Prefix,
		OkColor,
		ErrorColor,
		ByeChannel,
		ByeMessage,
		ByeTimeout,
		WelcomeTimeout,
		WelcomeMessage,
		WelcomeChannel,
		StickyRoles,
		ExcludeRole
	} = guildData;

	let { name, icon } = guildData;

	const channelOptions: { name: string; value: bigint | null }[] = guildData.channels.map(
		(g: { name: string; id: string }) => ({ name: `#${g.name}`, value: BigInt(g.id) })
	);
	channelOptions.push({ name: "None (Disable)", value: null });

	console.log(guildData);

	const savedPrefix = Prefix;
	$: prefixState = savedPrefix === Prefix;

	const savedToggles = { DadBot, Anniversary, StickyRoles };
	$: toggleState =
		JSON.stringify(savedToggles) === JSON.stringify({ DadBot, Anniversary, StickyRoles });

	let hexOkColor = OkColor ? IntColorToHex(OkColor) : "#00ff00";
	let hexErrorColor = ErrorColor
		? `#${Number(ErrorColor)?.toString(16).padStart(6, "0")}`
		: "#ff0000";
	const savedColors = {
		hexOkColor,
		hexErrorColor
	};
	$: colorState = JSON.stringify(savedColors) === JSON.stringify({ hexOkColor, hexErrorColor });

	let welcomeTimeout = WelcomeTimeout ?? 0;
	const savedWelcome = {
		WelcomeChannel,
		WelcomeTimeout: welcomeTimeout,
		WelcomeMessage
	};
	$: welcomeState =
		JSON.stringify(savedWelcome) ===
		JSON.stringify({
			WelcomeChannel,
			WelcomeTimeout: welcomeTimeout,
			WelcomeMessage
		});

	let byeTimeout = ByeTimeout ?? 0;
	const savedBye = {
		ByeChannel,
		ByeTimeout: ByeTimeout,
		ByeMessage
	};
	$: byeState =
		JSON.stringify(savedBye) ===
		JSON.stringify({
			ByeChannel,
			ByeTimeout: ByeTimeout,
			ByeMessage
		});

	let savedUserRole = userRole
		? {
			name: userRole?.name,
			color: IntColorToHex(userRole.color),
			icon: userRole?.icon,
		} : null;
	$: userRoleState = userRole ? JSON.stringify(savedUserRole) === JSON.stringify({
		name: userRole?.name,
		color: IntColorToHex(userRole.color),
		icon: userRole?.icon,
	}) : null;

	// Apparently this checks ADMIN flag in the permissions bitfield
	const isAdmin = (BigInt(guildData.permissions || 0) & 0x8n) == 0x8n;
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

-->

<main>
	<div>
		<Avatar
			size="xl"
			src={`https://cdn.discordapp.com/icons/${guildData.id}/${icon}.${icon?.startsWith("a") ? "gif" : "webp"}` || ""}
			alt="Guild"
		/>
	</div>
	<h1>{name || guildData.Id}</h1>
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
				<ClickToCopy>{userRole?.id}</ClickToCopy>
				<Button
					color="primary"
					class="self-end ml-auto mr-auto enabled:cursor-pointer border-transparent"
					disabled={!!userRoleState}><FileCheckSolid />Save</Button
				>
			</div>
		</div>
	{/if}
	{#if isAdmin}
	<h2>Edit server configuration</h2>
	<div
		id="guildSettings"
		class="flex-row mt-2 flex-wrap gap-2 flex justify-center w-full row-start-1"
	>
		<div class="indent flex flex-col items-center justify-between">
			<h3>Server prefix</h3>
			<Input
				id="prefix"
				type="text"
				placeholder={Prefix}
				bind:value={Prefix}
				style="width: 4rem; border-radius: 0.5rem;"
			/>
			<Button
				color="primary"
				class="self-end ml-auto mr-auto enabled:cursor-pointer border-transparent"
				disabled={prefixState}><FileCheckSolid />Save</Button
			>
		</div>

		<div class="indent flex flex-col justify-between items-center">
			<h3>Toggles</h3>
			<div>
				<Toggle bind:checked={DadBot}><p>Dad-mode</p></Toggle>
				<Toggle bind:checked={Anniversary}><p>Anniversary roles</p></Toggle>
				<Toggle bind:checked={StickyRoles}><p>Sticky roles</p></Toggle>
			</div>
			<Button
				color="primary"
				class="self-end ml-auto mr-auto enabled:cursor-pointer border-transparent"
				disabled={toggleState}><FileCheckSolid />Save</Button
			>
		</div>

		<div class="indent flex flex-col justify-between items-center text-gray-100 text-left">
			<h3 class="mb-0">Command embed colors</h3>
			<div class="pb-6">
				<h4 class="text-gray-100">Ok-Color</h4>
				<ColorPicker bind:hex={hexOkColor} />
				<h4 class="text-gray-100">Error-color</h4>
				<ColorPicker bind:hex={hexErrorColor} />
			</div>
			<Button
				color="primary"
				class="self-end ml-auto mr-auto enabled:cursor-pointer border-transparent"
				disabled={colorState}><FileCheckSolid />Save</Button
			>
		</div>
		<div class="indent flex flex-col justify-between items-center">
			<h3>Welcome configuration</h3>

			<p class="text-gray-100">Select channel</p>
			<Select class="mt-2" items={channelOptions} bind:value={WelcomeChannel} />

			<p class="text-gray-100">Message autodelete delay</p>
			<NumberInput bind:value={welcomeTimeout} />

			<p class="text-gray-100">Welcome message</p>
			<Textarea
				id="welcomeMessage"
				class="mb-4"
				placeholder={WelcomeMessage || "Write a welcome message"}
				bind:value={WelcomeMessage}
			/>

			<Button
				color="primary"
				class="self-end ml-auto mr-auto enabled:cursor-pointer border-transparent"
				disabled={welcomeState}><FileCheckSolid />Save</Button
			>
		</div>
		<div class="indent flex flex-col justify-between items-center">
			<h3>Bye configuration</h3>

			<p class="text-gray-100">Select channel</p>
			<Select class="mt-2" items={channelOptions} bind:value={ByeChannel} />

			<p class="text-gray-100">Message autodelete delay</p>
			<NumberInput bind:value={byeTimeout} />

			<p class="text-gray-100">Bye message</p>
			<Textarea
				id="byeMessage"
				class="mb-4"
				bind:value={ByeMessage}
				placeholder={ByeMessage || "Write a welcome message"}
			/>

			<Button
				color="primary"
				class="self-end ml-auto mr-auto enabled:cursor-pointer border-transparent"
				disabled={byeState}><FileCheckSolid />Save</Button
			>
		</div>
	</div>
	<div>
		<Toast
			divClass="w-full max-w-xs p-4 text-gray-500 bg-white shadow dark:text-gray-100 dark:bg-gray-800 gap-3"
			class="m-auto mt-2 mb-2" dismissable={false}>
			<InfoCircleSolid/><br>
			If you want fancy messages with embeds, create one <a
				target="_blank"
				class="underline text-primary-600"
				href={EMBED}>here</a
			>, copy the code and paste it in the message field. Use
			<a class="underline text-primary-600" target="_blank" href="/docs/PLACEHOLDERS.md"
				>placeholders</a
			> if you want to mention users or server-name in your message.
		</Toast>
	</div>
	{/if}
</main>
