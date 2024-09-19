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

	export let data;
	const { guildData, EMBED } = data;
	let {
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
		WelcomeTimeout,
		WelcomeMessage,
		WelcomeChannel,
		StickyRoles
	} = guildData;

	let hexOkColor = OkColor.toString(16);
	let hexErrorColor = ErrorColor.toString(16);

	const channelOptions: { name: string; value: bigint | null }[] = guildData.guildChannels.map(
		(g) => ({ name: `#${g.name}`, value: BigInt(g.id) })
	);
	channelOptions.push({ name: "None (Disable)", value: null });

	function saveChanges() {
		throw new Error("Not implemented");
	}
</script>

<main>
	<Avatar src={icon}></Avatar>
	<h2>Edit configuration of: {name || guildData.GuildId}</h2>
	<Toast dismissable={false} color="primary">Changes wont apply before they are saved</Toast>

	<div class="indent">
		<Label for="prefix">Change server prefix</Label>
		<Input id="prefix" placeholder={Prefix} bind:Prefix />
	</div>

	<h3>Toggles</h3>
	<div class="indent">
		<Toggle checked={DadBot} bind:DadBot>Dad-mode</Toggle>

		<Toggle checked={Anniversary} bind:Anniversary>Anniversary roles</Toggle>

		<Toggle checked={StickyRoles} bind:StickyRoles>Sticky roles</Toggle>
	</div>

	<h3>Command embed colors</h3>
	<div class="indent">
		<Label
			>Select Ok-Color
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
				placeholder={ByeMessage || "Write a welcome message"}
				bind:ByeMessage
			/>
		</form>
	</div>

	<div>
		<Button color="primary" on:click={saveChanges}>Save changes</Button>
	</div>
</main>
