<script lang="ts">
	import { Toast } from "flowbite-svelte";
	import { InfoCircleSolid } from "flowbite-svelte-icons";
	import { error } from "@sveltejs/kit";
	import { page } from "$app/state";
	import ConfigForm from "../../../../../components/GuildConfig/ConfigForm.svelte";

	let { data } = $props();

	const { isAdmin } = data;
	if (!isAdmin) error(401, "Not authorized");

	const endpoint = page.url.pathname;

	const channelOptions: { name: string; value: string | null }[] = data.guild.channels.map(
		(g: { name: string; id: string }) => ({ name: `#${g.name}`, value: g.id })
	);
	channelOptions.push({ name: "None (Disable)", value: null });
</script>

<main class="p-4 space-y-8 w-full max-w-6xl mx-auto flex flex-col items-center">
	<div class="flex flex-row items-stretch gap-6 justify-center flex-wrap w-full">
		<ConfigForm
			title="Welcome configuration"
			endpoint="{endpoint}?/welcome"
			{channelOptions}
			initial={{
				channel: data.guild.WelcomeChannel ? String(data.guild.WelcomeChannel) : null,
				timeout: data.guild.WelcomeTimeout ?? 0,
				message: data.guild.WelcomeMessage ?? ""
			}}
		/>

		<ConfigForm
			title="Bye configuration"
			endpoint="{endpoint}?/bye"
			{channelOptions}
			initial={{
				channel: data.guild.ByeChannel ? String(data.guild.ByeChannel) : null,
				timeout: data.guild.ByeTimeout ?? 0,
				message: data.guild.ByeMessage ?? ""
			}}
		/>
	</div>
	<div class="w-full flex justify-center mt-4">
		<Toast
			class="w-full max-w-xl p-4 shadow-lg text-gray-200! bg-gray-700! border border-gray-600! rounded-lg flex items-center gap-4"
			dismissable={false}
		>
			<InfoCircleSolid class="w-6 h-6 text-primary-500 flex-shrink-0" />
			<div class="text-sm">
				If you want fancy messages with embeds, create one
				<a target="_blank" class="underline text-primary-500 hover:text-primary-400 font-semibold" href={data.EMBED}>here</a>, copy
				the code and paste it in the message field. Use
				<a class="underline text-primary-500 hover:text-primary-400 font-semibold" target="_blank" href="/docs/PLACEHOLDERS.md"
					>placeholders</a
				> if you want to dynamically mention users or server-name in your message.
			</div>
		</Toast>
	</div>
</main>
