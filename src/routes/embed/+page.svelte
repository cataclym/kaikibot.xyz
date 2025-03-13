<script lang="ts">
	import {
		embedMessage,
		addEmbed,
		removeField,
		updateField,
		addField,
		removeEmbed,
		updateEmbedProperty,
		updateContent,
		type URLObject,

		type AuthorObject

	} from "$lib/embedStore";
	import {
		A,
		Alert,
		Avatar,
		Button,
		Heading,
		Img,
		Input,
		P,
		Textarea,
		Toggle,
		Tooltip
	} from "flowbite-svelte";
	import { CloseCircleSolid, CirclePlusOutline, TrashBinSolid } from "flowbite-svelte-icons";
	import ColorPicker from "svelte-awesome-color-picker";

	export let data;
	const { SOURCE_WEBSITE } = data;

	$: content = "";

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text).then(() => {
			alert("Embed copied to clipboard!");
		});
	}

	type MessageJSON = {
		[key: string]: any;
	};

	function cleanEmptyStrings(obj: MessageJSON | null): MessageJSON {
		// Check if the value is an object (and not null or array)
		if (obj && typeof obj === "object") {
			// If the value is an array, recursively clean each element
			if (Array.isArray(obj)) {
				obj = obj.map((item) => cleanEmptyStrings(item));
			} else {
				// Loop through object properties and clean recursively
				for (const key in obj) {
					if (obj.hasOwnProperty(key)) {
						const value = obj[key];

						// Skip fields
						if (key === "fields") continue;

						// If the value is an empty string, remove it
						if (!value) {
							delete obj[key];
						} else {
							// Recursively clean non-empty string properties
							obj[key] = cleanEmptyStrings(value);
						}
					}
				}
			}
		}
		return obj || { embeds: [] };
	}
</script>

<main>
	<div class="container m-auto p-[20px]">
		<Heading tag="h2" class="mb-5 mt-5">Embed Builder</Heading>
		<Alert color="red" class="bg-gray-700!">
			<span class="font-medium">Work in progress!</span>
			This Embed builder is not finished. Some features are not present. Please report any bugs
			at the website <A class="underline" href={`${SOURCE_WEBSITE}/issues/new`}>repository</A
			>!
		</Alert>
		{#if $embedMessage.content || $embedMessage.embeds.length}
			<Button
				color="red"
				on:click={() => {
					$embedMessage = { embeds: [] };
					content = "";
				}}
			>
				<TrashBinSolid class="w-5 h-5 me-2" />Reset all
			</Button>
		{/if}
	</div>
	<div class="split-container">
		<div class="left-side">
			<!-- Main message content -->
			<div class="text-left mb-5">
				<div class="flex gap-2">
					<Avatar></Avatar>
					<P class="self-center">User</P>
				</div>
				<Textarea
					class="ml-14 w-[calc(100%-3.5rem)]"
					id="content"
					bind:value={content}
					placeholder="Main message body"
					on:input={() => updateContent(content)}
				></Textarea>
			</div>

			<!-- Embeds Section -->
			<div class="grid grid-cols-10">
				{#each $embedMessage.embeds as embed, embedIndex}
					<div class="shrink col-start-1">
						<Button size="xs" color="red" on:click={() => removeEmbed(embedIndex)}>
							<CloseCircleSolid />
						</Button>
						<Tooltip color="gray">Remove embed</Tooltip>
					</div>
					<div
						class="w-full bg-gray-800 rounded-[0.5rem] col-start-2 col-span-9 mb-5 p-1 grid grid-cols-3 gap-1"
						style="border-left: 4px solid #{embed.color
							?.toString(16)
							.padStart(6, '0') || '000000'}"
					>
						<!-- Embed Title -->
						<div class="mb-2 col-span-2">
							<Input
								id={`title-${embedIndex}`}
								bind:value={embed.title}
								placeholder="Embed Title"
								on:input={() =>
									updateEmbedProperty(embedIndex, "title", embed.title)}
							/>
						</div>

						<!-- Embed Author -->
						<div class="mb-2 col-span-1 col-start-3">
							{#if !embed.author}
								<Button on:click={() => (embed.author = { name: "" })}>
									<CirclePlusOutline class="w-5 h-5 me-2" />
									Add author
								</Button>
							{:else}
								<!--
								TODO
									Add author image, maybe use embed.image method 
								-->
								<Textarea
									id={`author-${embedIndex}`}
									bind:value={embed.author.name}
									placeholder="Author name"
									on:input={() =>
										updateEmbedProperty<AuthorObject>(
											embedIndex,
											"author",
											embed.author!.name,
											"name"
										)}
								></Textarea>
								<Button
									on:click={() => (embed = { ...embed, author: undefined })}
									size="sm"
									color="red"
									class="mt-2"
									><CloseCircleSolid class="w-5 h-5 me-2" /> Remove author
								</Button>
							{/if}
						</div>

						<!-- Embed URL -->
						<div class="mb-2 col-span-2">
							<Input
								id={`url-${embedIndex}`}
								bind:value={embed.url}
								placeholder="Embed URL"
								on:input={() => updateEmbedProperty(embedIndex, "url", embed.title)}
							/>
						</div>

						<!-- Embed Description -->
						<div class="mb-2 col-span-2">
							<Textarea
								id={`description-${embedIndex}`}
								bind:value={embed.description}
								placeholder="Embed Description"
								on:input={() =>
									updateEmbedProperty(
										embedIndex,
										"description",
										embed.description
									)}
							></Textarea>
						</div>

						<!-- Embed Fields -->
						<div class="mb-2 col-span-3 grid grid-cols-3 gap-1">
							{#if embed.fields}
								{#each embed.fields as field, fieldIndex}
									<div>
										<div class="mb-2">
											<Input
												bind:value={field.name}
												placeholder="Field Name"
												on:input={() =>
													updateField(
														embedIndex,
														fieldIndex,
														"name",
														field.name
													)}
											/>
										</div>

										<Textarea
											bind:value={field.value}
											placeholder="Field Value"
											on:input={() =>
												updateField(
													embedIndex,
													fieldIndex,
													"value",
													field.value
												)}
										></Textarea>

										<div class="mb-2">
											<P size="sm">Inline</P>
											<Toggle bind:checked={field.inline} />
										</div>
										<Button
											color="red"
											class="mb-4"
											size="xs"
											on:click={() => removeField(embedIndex, fieldIndex)}
										>
											<CloseCircleSolid class="w-5 h-5 me-2" /> Remove Field
										</Button>
									</div>
								{/each}
							{/if}
							<Button class="col-start-1 w-38" on:click={() => addField(embedIndex)}
								><CirclePlusOutline class="w-5 h-5 me-2" /> Add Field</Button
							>
						</div>

						<!-- Embed Image -->
						<div class="mb-2 col-span-2 col-start-1 flex justify-between items-center">
							<!-- Embed color -->
							<div class="dark max-w-fit">
								<ColorPicker
									isAlpha={false}
									label={""}
									hex={embed.color?.toString(16).padStart(6, "0")}
									on:input={(event) => {
										if (!event.detail.hex?.startsWith("#")) return;
										embed.color = parseInt(event.detail.hex.slice(1), 16);
									}}
								/>
								<Tooltip>Embed color</Tooltip>
							</div>
							<div class="max-w-fit m-auto">
								{#if !embed.image}
									<Button on:click={() => (embed.image = { url: "" })}>
										<CirclePlusOutline class="w-5 h-5 me-2" />
										Add Image
									</Button>
								{:else}
									<Input
										id={`image-${embedIndex}`}
										bind:value={embed.image.url}
										placeholder="Image URL"
										on:input={() =>
											updateEmbedProperty<URLObject>(
												embedIndex,
												"image",
												embed.image?.url,
												"url"
											)}
									/>
									{#if embed.image.url}
										<Img
											size="max-w-md"
											class="rounded-lg m-auto"
											src={embed.image.url}
										/>
									{/if}
									<Button
										on:click={() => (embed = { ...embed, image: undefined })}
										size="sm"
										color="red"
										class="mt-2"
										><CloseCircleSolid class="w-5 h-5 me-2" /> Remove image
									</Button>
								{/if}
							</div>
						</div>

						<!-- Embed Footer -->
						<div class="mb-2 col-span-2">
							<Input
								id={`footer-${embedIndex}`}
								bind:value={embed.footer}
								placeholder="Footer Text"
								on:input={() =>
									updateEmbedProperty(embedIndex, "footer", embed.footer)}
							/>
						</div>
					</div>
				{/each}
			</div>
			{#if $embedMessage.embeds.length < 10}
				<Button class="enabled:cursor-pointer ml-14 mt-5" on:click={addEmbed}>
					<CirclePlusOutline class="w-5 h-5 me-2" />
					Add Embed
				</Button>
			{/if}
		</div>

		<!-- Preview Section -->
		<div class="right-side">
			<Button
				class="mb-2"
				on:click={() => copyToClipboard(JSON.stringify(cleanEmptyStrings($embedMessage)))}
			>
				Copy JSON
			</Button>
			<pre class="text-left text-accent1 bg-gray-700">{JSON.stringify(
					cleanEmptyStrings($embedMessage),
					null,
					2
				)}</pre>
		</div>
	</div>
</main>

<style>
	.split-container {
		display: flex;
		height: 100vh;
	}

	.left-side,
	.right-side {
		flex: 1;
		padding: 1rem;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.left-side {
		background-color: var(--background);
		border: 1px solid var(--accent4);
		border-right: 0.05rem solid var(--accent4);
	}

	.right-side {
		padding-top: 0.5rem;
		border: 1px solid var(--accent4);
		border-left: 0.05rem solid var(--accent4);
		background-color: var(--accent2);
	}

	/* Stack on mobile devices */
	@media (max-width: 1024px) {
		.split-container {
			flex-direction: column; /* Stack vertically on mobile */
		}

		.left-side,
		.right-side {
			border-right: none; /* Remove the right border for mobile */
			border-left: none; /* Remove the left border for mobile */
		}

		.right-side {
			margin-top: 1rem; /* Add space between the stacked sides */
		}
	}

	.dark {
		--cp-bg-color: var(--accent2);
		--cp-border-color: var(--accent4);
		--cp-text-color: var(--accent3);
		--cp-input-color: var(--background);
		--cp-button-hover-color: color-mix(in srgb, var(--accent2) 90%, #000000 30%);
	}
</style>
