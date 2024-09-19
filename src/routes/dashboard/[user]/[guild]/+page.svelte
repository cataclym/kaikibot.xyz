<script lang="ts">
	import ColorPicker from "svelte-awesome-color-picker";
	import { Button, Input, Label, NumberInput, Range, Select, Textarea, Toast, Toggle, Tooltip } from "flowbite-svelte";

	export let data;
	const { guildData, guildChannels, EMBED } = data;
	let {
		DadBot,
		Anniversary,
		Name,
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

	const channelOptions: { name: string; value: bigint | null }[] = guildChannels.map(g => ({ name: `#${g.name}`, value: BigInt(g.id) }));
	channelOptions.push({ name: "None (Disable)", value: null })

	function saveChanges() {
		throw new Error("Not implemented");
	}
</script>

<main>
	<h2>Edit configuration of: {Name || guildData.GuildId}</h2>
	<Toast dismissable={false} color="orange">Changes wont apply before they are saved</Toast>

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
		<ColorPicker bind:hex={hexOkColor} />

		<ColorPicker bind:hex={hexErrorColor} />
	</div>

	<h3>Welcome and Bye messages</h3>
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
			<label for="welcomeMessage" class="sr-only">Welcome message
				<Button>Embed</Button>
				<Tooltip>
					If you want fancy messages with embeds, create one <a target="_blank" href={EMBED}>here</a>, copy the code and paste it below. Use <a target="_blank" href="/docs/PLACEHOLDERS.md">placeholders</a> if you want to mention users or servername in your message.
				</Tooltip>
			</label>
			<Textarea id="welcomeMessage" class="mb-4" placeholder={WelcomeMessage || "Write a welcome message"} />
		</form>
	</div>

	<div>
		<Button color="orange" on:click={saveChanges}>Save changes</Button>
	</div>
</main>
