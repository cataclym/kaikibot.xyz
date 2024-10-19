<script lang="ts">
	import ColorPicker from "svelte-awesome-color-picker";
	import {
		Alert,
		Avatar,
		Button,
		Input,
		Label,
		NumberInput, P,
		Select,
		Textarea,
		Toast,
		Toggle,
		Tooltip
	} from "flowbite-svelte";
	import type { Guilds, GuildUsers } from "@prisma/client";

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

	console.log(guildData);
	let hexOkColor = OkColor?.toString(16) || "00ff00";
	let hexErrorColor = ErrorColor?.toString(16) || "ff0000";

	const channelOptions: { name: string; value: bigint | null }[] = guildData.channels.map(
		(g) => ({ name: `#${g.name}`, value: BigInt(g.id) })
	);
	channelOptions.push({ name: "None (Disable)", value: null });

	function saveChanges() {
		const recapturedGuildData: RecapturedGuildData = {
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

-->

<main>
	<div>
		<Avatar size="xl" src={`https://cdn.discordapp.com/icons/${guildData.id}/${icon}.webp			` || ""}
				alt="Guild" />
	</div>
	<h2>Edit configuration of {name || guildData.Id}</h2>
	<Alert color="primary" class="m-auto">Changes wont apply before you have saved</Alert>
	<div id="guildSettings" class="flex-row mt-2 flex-wrap gap-2 flex justify-center w-full row-start-1">
		<div class="indent">
			<Label for="prefix"><h3>Change server prefix</h3></Label>
			<Input id="prefix" type="text" placeholder={Prefix} bind:value={Prefix}
				   style="width: 2rem; border-radius: 0.5rem;" />
		</div>

		<div class="indent">
			<h3>Toggles</h3>
			<Toggle checked={DadBot} bind:DadBot><p>Dad-mode</p></Toggle>
			<Toggle checked={Anniversary} bind:Anniversary><p>Anniversary roles</p></Toggle>
			<Toggle checked={StickyRoles} bind:StickyRoles><p>Sticky roles</p></Toggle>
		</div>

		<div class="indent">
			<h3>Command embed colors</h3>
			<Label>Select Ok-Color
				<ColorPicker bind:hex={hexOkColor} />
			</Label>

			<Label
			>Select Error-color
				<ColorPicker bind:hex={hexErrorColor} />
			</Label>
		</div>
		<div class="indent justify-self-center">
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
		</div>
		<div class="indent">
			<h3>Bye configuration</h3>
			<Label>
				Select channel
				<Select class="mt-2" items={channelOptions} bind:value={ByeChannel} />
			</Label>

			<Label>
				<span>Message autodelete delay</span>
				<NumberInput bind:ByeTimeout />
			</Label>

			<form>
				<label for="byeMessage" class="sr-only"
				>Bye message
					<Button>Embed</Button>
					<Tooltip>
						If you want fancy messages with embeds, create one <a
						target="_blank"
						href={EMBED}>here</a
					>, copy the code and paste it below. Use
						<a target="_blank" href="/docs/PLACEHOLDERS.md">placeholders</a> if you want to mention
						users or servername in your message.
					</Tooltip>
				</label>
				<Textarea
					id="byeMessage"
					class="mb-4"
					value={ByeMessage}
					placeholder={ByeMessage || "Write a welcome message"}
					bind:ByeMessage
				/>
			</form>
		</div>
	</div>
	<div>
		<Toast class="m-auto mt-2 mb-2" dismissable={false} color="primary">
			If you want fancy messages with embeds, create one <a
			target="_blank"
			href={EMBED}>here</a
		>, copy the code and paste it below. Use
			<a class="" target="_blank" href="/docs/PLACEHOLDERS.md">placeholders</a> if you want to mention
			users or servername in your message.
		</Toast>
		<Button class="text-gray-700" on:click={saveChanges}>Save changes</Button>
	</div>
	<form method="POST" id="guildForm" class="hidden" action="">
		<label>
			<input name="data" id="guildInput" type="text" value="">
		</label>
	</form>
</main>
