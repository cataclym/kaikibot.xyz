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

<div class="flex flex-row items-center gap-2 justify-center flex-wrap mt-2">
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
	<div class="w-full flex justify-center mt-4">
		<Toast
			class="w-full max-w-xs p-4 shadow-sm text-gray-100! bg-gray-700!"
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
