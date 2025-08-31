<script lang="ts">
	import { Button, NumberInput, Select, Textarea } from "flowbite-svelte";
	import { FileCheckSolid, TrashBinSolid } from "flowbite-svelte-icons";

    interface ChannelOption {
		name: string;
		value: string | null;
	}
	
	interface InitialValues {
		channel: string | null;
		timeout: number;
		message: string;
	}

	interface Props {
		title: string;
		endpoint: string;
		channelOptions: ChannelOption[];
		initial: InitialValues;
	}

	let { title, endpoint, channelOptions, initial }: Props = $props();

	let channel = $state(initial.channel);
	let timeout = $state(initial.timeout ?? 0);
	let message = $state(initial.message ?? "");

	const saved = {
		channel: initial.channel,
		timeout: initial.timeout ?? 0,
		message: initial.message ?? ""
	};

	let changed = $derived(
		JSON.stringify({ channel: (channel), timeout, message }) !== JSON.stringify(saved)
	);

	function resetAll() {
		channel = initial.channel;
		timeout = initial.timeout ?? 0;
		message = initial.message ?? "";
	}
</script>

<div class="indent flex flex-row flex-wrap gap-2 w-full">
	<h6 class="text-center w-full text-lg font-semibold">{title}</h6>
	<form method="POST" action={endpoint} class="w-full">
		<Textarea name="endpoint" class="hidden" value={endpoint} />
        <p class="text-gray-100">Select channel</p>
		<Select class="mt-2" items={channelOptions} bind:value={channel} name="channel" />

		<p class="text-gray-100 mt-2">Message autodelete delay (Seconds)</p>
		<NumberInput
            bind:value={timeout}
            min={0}
            max={600}
            name="timeout"
            on:input={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
            }}
        />
		<p class="text-gray-100 mt-2">Message</p>
		<Textarea
			maxlength={6000}
			class="mb-4"
			name="message"
			bind:value={message}
			placeholder={initial.message || "Write a message"}
		/>

		<div class="flex justify-center space-x-1 mt-4">
			<Button
				type="submit"
				color="primary"
				class="px-4 py-2 rounded-md enabled:cursor-pointer border-transparent"
				disabled={!changed}
			>
				<FileCheckSolid class="shrink-0 h-6 w-6" />Save
			</Button>
			<Button
				type="button"
				on:click={resetAll}
				color="dark"
				class="px-4 py-2 rounded-md enabled:cursor-pointer border-transparent"
				disabled={!changed}
			>
				<TrashBinSolid class="shrink-0 h-6 w-6" />Reset
			</Button>
		</div>
	</form>
</div>
