<script lang="ts">
	import ColorPicker from "svelte-awesome-color-picker";
	import {
		Alert,
		Avatar,
		Button,
		Input,
		Label,
		NumberInput,
		Select,
		Textarea,
		Toast,
		Toggle,
		Tooltip
	} from "flowbite-svelte";
	import type { Guilds, GuildUsers } from "@prisma/client";
	import { FileOutline } from "flowbite-svelte-icons";

	export let data;
	const { guildData, EMBED } = data;
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

	let {
		name,
		icon
	} = guildData;

	const channelOptions: { name: string; value: bigint | null }[] = guildData.channels.map(
		(g) => ({ name: `#${g.name}`, value: BigInt(g.id) })
	);
	channelOptions.push({ name: "None (Disable)", value: null });

	console.log(guildData);

	const savedPrefix = Prefix;
	$: prefixState = savedPrefix === Prefix;

	const savedToggles = { DadBot, Anniversary, StickyRoles };
	$: toggleState = JSON.stringify(savedToggles) === JSON.stringify({ DadBot, Anniversary, StickyRoles });

	let hexOkColor = OkColor?.toString(16) || "00ff00";
	let hexErrorColor = ErrorColor?.toString(16) || "ff0000";

	function saveChanges() {
		const recapturedGuildData: Partial<RecapturedGuildData> = {
			DadBot,
			Anniversary,
			name,
			icon: icon ? icon : undefined,
			Prefix,
			OkColor,
			ErrorColor,
			ByeChannel,
			ByeMessage,
			ByeTimeout,
			WelcomeChannel,
			WelcomeMessage,
			WelcomeTimeout,
			StickyRoles,
			ExcludeRole
		};

		Object.keys(recapturedGuildData).forEach((k) => {
			const key = k as keyof Omit<Guilds, "Id" | "CreatedAt"> & keyof GuildUsers & keyof {
				name: string,
				icon: string
			};
			if (guildData[key] === recapturedGuildData[key]) delete recapturedGuildData[key];
		});

		(document.getElementById("guildInput") as HTMLInputElement).value = JSON.stringify(recapturedGuildData);
		(document.getElementById("guildForm") as HTMLFormElement).submit();
	}
</script>


<!--
TODO

Make admin fields only show up if user is admin.

Compare States for save button

Save button for each segment

Add Userrole configuration

Create store for user/guilds
https://kit.svelte.dev/docs/state-management

-->

<main>
	<div>
		<Avatar size="xl" src={`https://cdn.discordapp.com/icons/${guildData.id}/${icon}.webp			` || ""}
				alt="Guild" />
	</div>
	<h2>Edit configuration of {name || guildData.Id}</h2>
	<Alert color="primary" class="m-auto">Changes wont apply before you have saved</Alert>
	<div id="guildSettings" class="flex-row mt-2 flex-wrap gap-2 flex justify-center w-full row-start-1">
		<div class="indent flex flex-col items-center justify-between">
			<h3>Server prefix</h3>
			<Input id="prefix" type="text" placeholder={Prefix} bind:value={Prefix}
				   style="width: 4rem; border-radius: 0.5rem;" />
			<Button color="primary" class="self-end ml-auto mr-auto enabled:cursor-pointer border-transparent" disabled={prefixState}><FileOutline/>Save</Button>
		</div>

		<div class="indent flex flex-col justify-between items-center">
			<h3>Toggles</h3>
			<Toggle bind:checked={DadBot}><p>Dad-mode</p></Toggle>
			<Toggle bind:checked={Anniversary}><p>Anniversary roles</p></Toggle>
			<Toggle bind:checked={StickyRoles}><p>Sticky roles</p></Toggle>
			<Button color="alternative" class="self-end ml-auto mr-auto enabled:cursor-pointer border-transparent" disabled={toggleState}><FileOutline/>Save</Button>
		</div>

		<div class="indent flex flex-col justify-between items-center">
			<h3>Command embed colors</h3>
			<Label>Select Ok-Color
				<ColorPicker bind:hex={hexOkColor} />
			</Label>

			<Label
			>Select Error-color
				<ColorPicker bind:hex={hexErrorColor} />
			</Label>
			<Button color="dark" class="self-end ml-auto mr-auto enabled:cursor-pointer border-transparent" disabled={toggleState}><FileOutline/>Save</Button>
		</div>
		<div class="indent flex flex-col justify-between items-center">
			<h3>Welcome configuration</h3>
			<p class="text-gray-100">Select channel</p>
				<Select class="mt-2" items={channelOptions} bind:value={WelcomeChannel} />

				<p class="text-gray-100">Message autodelete delay</p>
				<NumberInput bind:WelcomeTimeout />

			<p class="text-gray-100">Welcome message</p>

				<Textarea
					id="welcomeMessage"
					class="mb-4"
					placeholder={WelcomeMessage || "Write a welcome message"}
					bind:WelcomeMessage
				/>

			<Button color="primary" class="self-end ml-auto mr-auto enabled:cursor-pointer border-transparent" disabled={prefixState}><FileOutline/>Save</Button>
		</div>
		<div class="indent flex flex-col justify-between items-center">
			<h3>Bye configuration</h3>

			<p class="text-gray-100">Select channel</p>
				<Select class="mt-2" items={channelOptions} bind:value={ByeChannel} />

			<p class="text-gray-100">Message autodelete delay</p>
				<NumberInput bind:ByeTimeout />
			<p class="text-gray-100">
			Bye message
			</p>
				<Textarea
					id="byeMessage"
					class="mb-4"
					value={ByeMessage}
					placeholder={ByeMessage || "Write a welcome message"}
					bind:ByeMessage
				/>
			<Button color="primary" class="self-end ml-auto mr-auto enabled:cursor-pointer border-transparent" disabled={prefixState}><FileOutline/>Save</Button>

		</div>
	</div>
	<div>
		<Toast class="m-auto mt-2 mb-2" dismissable={false}>
			If you want fancy messages with embeds, create one <a
			target="_blank"
			class="underline text-primary-600"
			href={EMBED}>here</a>, copy the code and paste it in the message field. Use
			<a class="underline text-primary-600" target="_blank" href="/docs/PLACEHOLDERS.md">placeholders</a> if you want to mention
			users or servername in your message.
		</Toast>
	</div>
</main>
