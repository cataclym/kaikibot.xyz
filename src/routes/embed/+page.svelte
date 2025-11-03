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
		type AuthorObject,
		type FooterObject
	} from "$lib/stores/embedStore.js";
	import {
		A,
		Alert,
		Avatar,
		Button,
		Heading,
		Helper,
		Img,
		Input,
		P,
		Popover,
		Textarea,
		Toggle,
		Tooltip
	} from "flowbite-svelte";
	import {
		CloseCircleSolid,
		CirclePlusOutline,
		TrashBinSolid,
		FileCopySolid,
		InfoCircleSolid
	} from "flowbite-svelte-icons";
	import ColorPicker from "svelte-awesome-color-picker";
	import AvatarPopover from "../../components/Embed/AvatarPopover.svelte";

	type MessageJSON = {
		[key: string]: any;
	};

	// Load serverside page data
	let { data } = $props();
	const { SOURCE_WEBSITE } = data;

	// Main Message Body Text
	let nonEmbedText = $state("");

	// Reactive dismiss status
	let alertStatus = $state(false);

	// Fetch cookie for dismissed alert
	$effect(() => {
		cookieStore
			.get("Dismissed_Alert")
			.then((cookie) => (alertStatus = cookie?.value === "true"));
	});

	// Simply sets cookie when alert is dismissed
	function setDismissedCookied() {
		cookieStore.set("Dismissed_Alert", "true");
		alertStatus = true;
	}

	// Takes any Object or null
	// Removes all keys for values that are empty strings
	// Returns the cleaned Object
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

						// Skip fields and icon_url to preserve them even when empty
						if (key === "fields" || key === "icon_url") continue;

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

	// Writes the input text to clipboard
	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text).then(() => {
			alert("Embed copied to clipboard!");
		});
	}

	// Takes a String
	// Runs regex tests
	// Returns boolean
	function isValidImageUrl(url: string) {
		const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
		return imageExtensions.test(url);
	}
</script>

<main>
	<div class="container m-auto p-[20px]">
		<Heading tag="h2" class="mb-5 mt-5">Embed Builder</Heading>
		<Alert dismissable color="gray" onclick={setDismissedCookied} hidden={alertStatus}>
			{#snippet icon()}<InfoCircleSolid class="h-5 w-5" />{/snippet}
			Please report any bugs at the website <A
				class="underline"
				href={`${SOURCE_WEBSITE}/issues/new`}>repository</A
			>!
		</Alert>
	</div>
	<div class="split-container">
		<div class="left-side">
			<!-- Main message content -->
			<div class="text-left mb-5">
				<div class="flex gap-2">
					<Avatar />
					<P class="self-center">User</P>
				</div>
				<Textarea
					class="ml-14 w-[calc(100%-3.5rem)]"
					id="content"
					bind:value={nonEmbedText}
					placeholder="Main message body"
					oninput={() => updateContent(nonEmbedText)}
				></Textarea>
			</div>

			<!-- Embeds Section -->
			<div class="grid grid-cols-10">
				{#each $embedMessage.embeds as embed, embedIndex}
					<div class="shrink col-start-1">
						<Button
							class="cursor-pointer"
							size="xs"
							color="red"
							onclick={() => removeEmbed(embedIndex)}
						>
							<CloseCircleSolid />
						</Button>
						<Tooltip color="gray">Remove embed</Tooltip>
						<!-- Embed color -->
						<div class="dark mt-2">
							<ColorPicker
								nullable={false}
								isAlpha={false}
								label=""
								hex={"#" + embed.color?.toString(16).padStart(6, "0")}
								on:input={(event) => {
									const hex = event.detail.hex;

									if (!hex?.startsWith("#")) return;

									// Update the embed.color with the parsed integer value
									embed.color = parseInt(hex.slice(1), 16);
								}}
							></ColorPicker>
							<Tooltip>Embed color</Tooltip>
						</div>
					</div>
					<div
						class="w-full bg-gray-700 rounded-[0.5rem] col-start-2 col-span-9 mb-5 p-1 grid grid-cols-3 gap-1"
						style="border-left: 4px solid #{embed.color
							?.toString(16)
							.padStart(6, '0') || '000000'}"
					>
						<!-- Embed Author -->
						<div class="col-span-2 col-start-1 grid grid-cols-6 gap-2">
							{#if !embed.author}
								<Button
									size="xs"
									class="col-span-2 col-start-3"
									onclick={() => (embed.author = { name: "" })}
								>
									<CirclePlusOutline class="w-5 h-5 me-2" />
									Add author
								</Button>
							{:else}
								<Avatar
									src={embed.author.icon_url &&
									isValidImageUrl(embed.author.icon_url)
										? embed.author.icon_url
										: ""}
									size="md"
									class="col-span-1 justify-self-center self-center"
								></Avatar>
								<!-- Make the popover not disappear between src change -->
								{#if !embed.author.icon_url}
									<AvatarPopover
										{embedIndex}
										objIndex="author"
										subObjIndex="icon_url"
										title="Author icon URL"
										bind:value={embed.author.icon_url}
									/>
								{:else}
									<AvatarPopover
										{embedIndex}
										objIndex="author"
										subObjIndex="icon_url"
										title="Author icon URL"
										bind:value={embed.author.icon_url}
									/>
								{/if}
								<div class="col-span-3">
									<Input
										maxlength={256}
										id={`author-${embedIndex}`}
										bind:value={embed.author.name}
										class="bg-gray-800!"
										placeholder="Author name"
										oninput={() =>
											updateEmbedProperty<AuthorObject>(
												embedIndex,
												"author",
												embed.author!.name,
												"name"
											)}
									></Input>
									<Helper
										>{256 - (embed.author.name?.length || 0)} Characters remaining</Helper
									>
								</div>
								<div class="col-span-2">
									<Input
										type="url"
										class="col-span-2 bg-gray-800!"
										id={`author-${embedIndex}`}
										bind:value={embed.author.url}
										placeholder="Author URL"
										oninput={() =>
											updateEmbedProperty<AuthorObject>(
												embedIndex,
												"author",
												embed.author!.url,
												"url"
											)}
									></Input>
									<Helper></Helper>
								</div>

								<Button
									onclick={() => (embed["author"] = undefined)}
									size="xs"
									color="red"
									class="col-span-2 col-start-3"
									><CloseCircleSolid class="w-5 h-5 me-2" /> Remove author
								</Button>
							{/if}
						</div>

						<!-- Embed Thumbnail -->
						<div class="col-span-1 col-start-3 place-self-center h-0 w-fit">
							{#if !embed.thumbnail}
								<Avatar size="lg" />
								<Popover title="Thumbnail URL">
									<Input
										type="url"
										class=""
										placeholder="Thumbnail URL"
										oninput={(e: Event) => {
											const target = e.currentTarget as HTMLInputElement;
											embed.thumbnail = { url: target.value };
											updateEmbedProperty<URLObject>(
												embedIndex,
												"thumbnail",
												target.value,
												"url"
											);
										}}
									/>
								</Popover>
							{:else}
								<img
									alt="Thumbnail"
									class="size-min"
									src={embed.thumbnail.url && isValidImageUrl(embed.thumbnail.url)
										? embed.thumbnail.url
										: ""}
								/>
								<Popover title="Thumbnail URL">
									<Input
										type="url"
										class=""
										placeholder="Thumbnail URL"
										bind:value={embed.thumbnail.url}
										oninput={() =>
											updateEmbedProperty<URLObject>(
												embedIndex,
												"thumbnail",
												embed.thumbnail?.url,
												"url"
											)}
									/>
								</Popover>
							{/if}
						</div>

						<!-- Embed Title -->
						<div class="mb-2 col-span-2 col-start-1">
							<Input
								maxlength={256}
								class="bg-gray-800!"
								id={`title-${embedIndex}`}
								bind:value={embed.title}
								placeholder="Embed Title"
								oninput={() =>
									updateEmbedProperty(embedIndex, "title", embed.title)}
							/>
							<Helper>{256 - (embed.title?.length || 0)} Characters remaining</Helper>
						</div>

						<!-- Embed URL -->
						<div class="mb-2 col-span-2 col-start-1">
							<Input
								type="url"
								class="bg-gray-800!"
								id={`url-${embedIndex}`}
								bind:value={embed.url}
								placeholder="Embed URL"
								oninput={() => updateEmbedProperty(embedIndex, "url", embed.title)}
							/>
						</div>

						<!-- Embed Description -->
						<div class="mb-2 col-span-2 col-start-1">
							<Textarea
								class="w-full bg-gray-800!"
								maxlength={4096}
								id={`description-${embedIndex}`}
								bind:value={embed.description}
								placeholder="Embed Description"
								oninput={() =>
									updateEmbedProperty(
										embedIndex,
										"description",
										embed.description
									)}
							></Textarea>
							<Helper
								>{4096 - (embed.description?.length || 0)} Characters remaining</Helper
							>
						</div>

						<!-- Embed Fields -->
						<div class="mb-2 col-span-3 grid grid-cols-3 gap-1">
							{#if embed.fields}
								{#each embed.fields as field, fieldIndex}
									<div>
										<div class="mb-2">
											<Input
												maxlength={256}
												class="bg-gray-800!"
												bind:value={field.name}
												placeholder="Field Name"
												oninput={() =>
													updateField(
														embedIndex,
														fieldIndex,
														"name",
														field.name
													)}
											/>
											<Helper
												>{256 - (embed.fields[fieldIndex].name.length || 0)}
												Characters remaining</Helper
											>
										</div>

										<Textarea
											maxlength={1024}
											class="bg-gray-800!"
											bind:value={field.value}
											placeholder="Field Value"
											oninput={() =>
												updateField(
													embedIndex,
													fieldIndex,
													"value",
													field.value
												)}
										></Textarea>
										<Helper
											>{1024 - (embed.fields[fieldIndex].value.length || 0)} Characters
											remaining</Helper
										>

										<div class="mb-2">
											<P size="sm">Inline</P>
											<Toggle bind:checked={field.inline} />
										</div>
										<Button
											color="red"
											class="mb-4"
											size="xs"
											onclick={() => removeField(embedIndex, fieldIndex)}
										>
											<CloseCircleSolid class="w-5 h-5 me-2" /> Remove Field
										</Button>
									</div>
								{/each}
							{/if}
							{#if !embed.fields || embed.fields?.length < 25}
								<Button
									class="col-start-1 w-38"
									onclick={() => addField(embedIndex)}
									><CirclePlusOutline class="w-5 h-5 me-2" /> Add Field</Button
								>
							{/if}
						</div>

						<!-- Embed Image -->
						<div class="mb-2 col-span-2 col-start-1 flex justify-between items-center">
							<div class="max-w-fit m-auto">
								{#if !embed.image}
									<Button onclick={() => (embed.image = { url: "" })}>
										<CirclePlusOutline class="w-5 h-5 me-2" />
										Add Image
									</Button>
								{:else}
									<Input
										id={`image-${embedIndex}`}
										type="url"
										class="bg-gray-800!"
										bind:value={embed.image.url}
										placeholder="Image URL"
										oninput={() =>
											updateEmbedProperty<URLObject>(
												embedIndex,
												"image",
												embed.image?.url,
												"url"
											)}
									/>
									{#if embed.image.url && isValidImageUrl(embed.image.url)}
										<Img
											size="md"
											class="rounded-lg m-auto"
											src={embed.image.url}
										/>
									{/if}
									<Button
										onclick={() => (embed["image"] = undefined)}
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
							{#if !embed.footer}
								<Button
									size="xs"
									class="col-span-2 col-start-3"
									onclick={() =>
										(embed.footer = { text: "", icon_url: undefined })}
								>
									<CirclePlusOutline class="w-5 h-5 me-2" />
									Add footer
								</Button>
							{:else}
								<Input
									maxlength={2048}
									id={`footer-${embedIndex}`}
									class="bg-gray-800!"
									bind:value={embed.footer.text}
									placeholder="Footer Text"
									oninput={() => {
										return updateEmbedProperty<FooterObject>(
											embedIndex,
											"footer",
											embed.footer!.text,
											"text"
										);
									}}
								/>
								<Helper
									>{2048 - (embed.footer.text?.length || 0)} Characters remaining</Helper
								>

								<!-- Footer Icon -->
								<div class="flex items-center gap-2 mt-2">
									{#if typeof embed.footer?.icon_url !== "string"}
										<Button
											size="xs"
											onclick={() =>
												updateEmbedProperty<FooterObject>(
													embedIndex,
													"footer",
													"",
													"icon_url"
												)}
										>
											<CirclePlusOutline class="w-5 h-5 me-2" />
											Add footer icon URL
										</Button>
									{:else}
										<Avatar
											src={embed.footer.icon_url &&
											isValidImageUrl(embed.footer.icon_url)
												? embed.footer.icon_url
												: ""}
											size="md"
											class="flex-shrink-0"
										></Avatar>
										<!-- Make the popover not disappear between src change -->
										{#if !embed.footer.icon_url}
											<AvatarPopover
												{embedIndex}
												objIndex="footer"
												subObjIndex="icon_url"
												title="Footer Icon URL"
												bind:value={embed.footer.icon_url}
											/>
										{:else}
											<AvatarPopover
												{embedIndex}
												objIndex="footer"
												subObjIndex="icon_url"
												title="Footer Icon URL"
												bind:value={embed.footer.icon_url}
											/>
										{/if}
									{/if}
								</div>
								<Button
									onclick={() => (embed["footer"] = undefined)}
									size="xs"
									color="red"
									class="col-span-1 col-start-3"
									><CloseCircleSolid class="w-5 h-5 me-2" /> Remove footer
								</Button>
							{/if}
						</div>
					</div>
				{/each}
			</div>
			{#if $embedMessage.embeds.length < 10}
				<Button class="mt-2 shadow" onclick={addEmbed}>
					<CirclePlusOutline class="w-5 h-5 me-2" />
					Add Embed
				</Button>
			{/if}
		</div>

		<!-- Preview Section -->
		<div class="right-side">
			{#if $embedMessage.content || $embedMessage.embeds.length}
				<Button
					class="mb-2 cursor-pointer"
					color="red"
					onclick={() => {
						$embedMessage = { embeds: [] };
						nonEmbedText = "";
					}}
				>
					<TrashBinSolid class="w-5 h-5 me-1" />Reset all
				</Button>
			{/if}
			<Button
				class="mb-2 cursor-copy"
				onclick={() => copyToClipboard(JSON.stringify(cleanEmptyStrings($embedMessage)))}
			>
				<FileCopySolid class="w-5 h-5 me-1" />Copy JSON
			</Button>
			<pre
				class="text-left text-accent1 bg-gray-700 overflow-hidden overflow-x-scroll">{JSON.stringify(
					cleanEmptyStrings($embedMessage),
					null,
					2
				)}</pre>
		</div>
	</div>
</main>

<style>
	@import "./embed.css";
</style>
