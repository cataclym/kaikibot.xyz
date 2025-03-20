<script lang="ts">
	import { Button, Heading, NumberInput, Select, Textarea, Toast } from "flowbite-svelte";
	import { FileCheckSolid, InfoCircleSolid } from "flowbite-svelte-icons";
	import { error } from "@sveltejs/kit";
	import { page } from "$app/state";

	let { data } = $props();

	const { isAdmin } = data;
	if (!isAdmin) error(401, "Not authorized");

	const channelOptions: { name: string; value: bigint | null }[] = data.guild.channels.map(
		(g: { name: string; id: string }) => ({ name: `#${g.name}`, value: BigInt(g.id) })
	);
	channelOptions.push({ name: "None (Disable)", value: null });

	const endpoint = page.url.pathname;
	let { ByeChannel, ByeMessage, ByeTimeout, WelcomeTimeout, WelcomeMessage, WelcomeChannel } =
		$state(data.guild);

	let welcomeTimeout = $state(WelcomeTimeout ?? 0);
	const savedWelcome = {
		WelcomeChannel,
		WelcomeTimeout: welcomeTimeout,
		WelcomeMessage
	};
	let welcomeState = $derived(
		JSON.stringify(savedWelcome) ===
			JSON.stringify({
				WelcomeChannel,
				WelcomeTimeout: welcomeTimeout,
				WelcomeMessage
			})
	);

	let byeTimeout = $state(ByeTimeout ?? 0);
	const savedBye = {
		ByeChannel,
		ByeTimeout: ByeTimeout,
		ByeMessage
	};
	let byeState = $derived(
		JSON.stringify(savedBye) ===
			JSON.stringify({
				ByeChannel,
				ByeTimeout: ByeTimeout,
				ByeMessage
			})
	);
</script>

<div class="flex flex-row items-center gap-2 justify-center flex-wrap mt-2">
	<div class="indent flex flex-row flex-wrap gap-2 w-full">
		<Heading color="" class="text-center" tag="h6">Welcome configuration</Heading>
		<form method="POST" action="{endpoint}?/welcome">
			<p class="text-gray-100">Select channel</p>
			<Select
				class="mt-2"
				items={channelOptions}
				bind:value={WelcomeChannel}
				name="welcomechannel"
			/>

			<p class="text-gray-100">Message autodelete delay</p>
			<NumberInput bind:value={welcomeTimeout} name="welcometimeout" />

			<p class="text-gray-100">Welcome message</p>
			<Textarea
				id="welcomeMessage"
				name="welcomemessage"
				class="mb-4"
				placeholder={WelcomeMessage || "Write a welcome message"}
				bind:value={WelcomeMessage}
			/>
			<Button color="primary" class="enabled:cursor-pointer" disabled={welcomeState}
				><FileCheckSolid />Save</Button
			>
		</form>
	</div>
	<div class="indent flex flex-row items-center flex-wrap gap-2 justify-center w-full">
		<Heading color="" class="text-center" tag="h6">Bye configuration</Heading>

		<form method="POST" action="{endpoint}?/bye">
			<p class="text-gray-100">Select channel</p>
			<Select class="mt-2" items={channelOptions} bind:value={ByeChannel} name="byechannel" />

			<p class="text-gray-100">Message autodelete delay</p>
			<NumberInput bind:value={byeTimeout} name="byetimeout" />

			<p class="text-gray-100">Bye message</p>
			<Textarea
				id="byeMessage"
				name="byemessage"
				class="mb-4"
				bind:value={ByeMessage}
				placeholder={ByeMessage || "Write a bye message"}
			/>

			<Button color="primary" class="self-end enabled:cursor-pointer" disabled={byeState}
				><FileCheckSolid />Save</Button
			>
		</form>
	</div>
	<div class="flex-11/12">
		<Toast
			divClass="w-full max-w-xs p-4 text-gray-500 shadow-sm dark:text-gray-100 bg-gray-700"
			class="m-auto"
			dismissable={false}
		>
			<InfoCircleSolid /><br />
			If you want fancy messages with embeds, create one
			<a target="_blank" class="underline text-primary-600" href={data.EMBED}>here</a>, copy
			the code and paste it in the message field. Use
			<a class="underline text-primary-600" target="_blank" href="/docs/PLACEHOLDERS.md"
				>placeholders</a
			> if you want to dynamically mention users or server-name in your message.
		</Toast>
	</div>
</div>
