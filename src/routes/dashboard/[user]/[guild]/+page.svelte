<script lang="ts">
	import ColorPicker from "svelte-awesome-color-picker";
	import {
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
	import type { GuildData } from "./+page.server";
	import { submitChanges } from "../../../../methods/submitChanges";

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
	} = guildData.Guilds;

	let {
		name,
		icon,
	} = guildData;

	console.log(guildData)
	let hexOkColor = OkColor.toString(16);
	let hexErrorColor = ErrorColor!.toString(16);

	const channelOptions: { name: string; value: bigint | null }[] = guildData.guildChannels.map(
		(g) => ({ name: `#${g.name}`, value: BigInt(g.id) })
	);
	channelOptions.push({ name: "None (Disable)", value: null });

	function saveChanges() {
		const recapturedGuildData: RecapturedGuildData = {
			DadBot,
			Anniversary,
			name,
			icon,
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
			const key: keyof GuildData = k as keyof Omit<Guilds, "Id" | "CreatedAt"> & keyof GuildUsers & keyof { name: string, icon: string };
			if (guildData[key] === recapturedGuildData[key]) delete recapturedGuildData[key]
		})

		submitChanges(recapturedGuildData, guildData.GuildId, data.USER_API_URL, data.USER_API_URL);
	}
</script>

<main>
	<div>
		<Avatar size="xl" src={`https://cdn.discordapp.com/icons/${guildData.id}/${icon}.webp			` || ""} alt="Guild" />
	</div>
	<h2>Edit configuration of {name || guildData.GuildId}</h2>
	<Toast dismissable={false} color="purple">Changes wont apply before you have saved</Toast>

	<div class="indent">
		<Label for="prefix"><h3>Change server prefix</h3></Label>
		<Input size="sm" id="prefix" placeholder={Prefix} bind:Prefix />
	</div>

	<h3>Toggles</h3>
	<div class="indent">
		<Toggle checked={DadBot} bind:DadBot><p>Dad-mode</p></Toggle>

		<Toggle checked={Anniversary} bind:Anniversary><p>Anniversary roles</p></Toggle>

		<Toggle checked={StickyRoles} bind:StickyRoles><p>Sticky roles</p></Toggle>
	</div>

	<h3>Command embed colors</h3>
	<div class="indent">
		<Label>Select Ok-Color
			<ColorPicker bind:hex={hexOkColor} />
		</Label>

		<Label
			>Select Error-color
			<ColorPicker bind:hex={hexErrorColor} />
		</Label>
	</div>

	<h3>Welcome and Bye messages</h3>
	<h4>Welcome configuration</h4>
	<div class="indent">
		<Label>
			Select channel
			<Select class="mt-2" items={channelOptions} bind:value={WelcomeChannel} />
		</Label>

		<Label>
			<span>Message autodelete delay</span>
			<NumberInput bind:WelcomeTimeout />
		</Label>

		<form>
			<label for="welcomeMessage" class="sr-only"
				>Welcome message
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
				id="welcomeMessage"
				class="mb-4"
				placeholder={WelcomeMessage || "Write a welcome message"}
				bind:WelcomeMessage
			/>
		</form>

		<h4>Bye configuration</h4>
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

	<div>
		<Button color="primary" on:click={saveChanges}>Save changes</Button>
	</div>
</main>
