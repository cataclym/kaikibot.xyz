<script lang="ts">
	import {
		embedMessage, addEmbed, removeField, updateField,
		addField, removeEmbed, updateEmbedProperty, updateContent, type URLObject
	} from "$lib/embedStore";
	import {
		Avatar,
		Button,
		Heading,
		Img,
		Input,
		P,
		Textarea, Tooltip
	} from "flowbite-svelte";
	import { CloseCircleSolid, CirclePlusOutline } from "flowbite-svelte-icons";

	$: content = "";

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text).then(() => {
			alert("Embed copied to clipboard!");
		});
	}

</script>

<main>
	<div class="container m-auto p-[20px]">
		<Heading tag="h2" class="mb-5 mt-5">Embed Builder</Heading>
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
					class="ml-14 w-11/12"
					id="content"
					bind:value={content}
					placeholder="Main message body"
					on:input={() => updateContent(content)}>
				</Textarea>
			</div>

			<!-- Embeds Section -->
			<div class="flex flex-row justify-between flex-wrap gap-x-1">
				{#each $embedMessage.embeds as embed, embedIndex}
					<div class="shrink">
						<Button size="xs" color="red" on:click={() => removeEmbed(embedIndex)}>
							<CloseCircleSolid/>
						</Button>
						<Tooltip color="gray">Remove embed</Tooltip>
					</div>
					<div class="w-10/12 bg-gray-800 rounded-[0.5rem] grow mb-5 p-1"
						 style="border-left: 4px solid #{embed.color?.toString(16)}">
						<!-- Embed Title -->
						<div class="mb-2">
							<Input
								id={`title-${embedIndex}`}
								bind:value={embed.title}
								placeholder="Embed Title"
								on:input={() => updateEmbedProperty(embedIndex, "title", embed.title)}
							/>
						</div>

						<!-- Embed Description -->
						<div class="mb-2">
							<Textarea
								id={`description-${embedIndex}`}
								bind:value={embed.description}
								placeholder="Embed Description"
								on:input={() => updateEmbedProperty(embedIndex, "description", embed.description)}
							></Textarea>
						</div>

						<!-- Embed Footer -->
						<div class="mb-2">
							<Input
								id={`footer-${embedIndex}`}
								bind:value={embed.footer}
								placeholder="Footer Text"
								on:input={() => updateEmbedProperty(embedIndex, "footer", embed.footer)}
							/>
						</div>

						<!-- Embed Image -->
						<div class="mb-2">
						{#if !embed.image}
								<Button
									size="sm"
									on:click={() => embed.image = { url: "" }}
								><CirclePlusOutline class="w-5 h-5 me-2" /> Image
								</Button>
							{:else}
								<Input
									id={`image-${embedIndex}`}
									bind:value={embed.image.url}
									placeholder="Image URL"
									on:input={() => updateEmbedProperty<URLObject>(embedIndex, "image", embed.image?.url, "url")}
								/>
								{#if embed.image.url}
									<Img src={embed.image.url} />
								{/if}
								<Button
									on:click={() => embed = { ...embed, image: undefined }}
									size="sm"
								>Remove image
								</Button>
							{/if}
						</div>

						<!-- Embed Fields -->
						<div class="mb-2">
							{#if embed.fields}
								{#each embed.fields as field, fieldIndex}
									<div>
										<Input
											bind:value={field.name}
											placeholder="Field Name"
											on:input={() => updateField(embedIndex, fieldIndex, "name", field.name)}
										/>
										<Textarea
											bind:value={field.value}
											placeholder="Field Value"
											on:input={() => updateField(embedIndex, fieldIndex, "value", field.value)}
										></Textarea>
										<Button size="xs" on:click={() => removeField(embedIndex, fieldIndex)}>Remove
											Field
										</Button>
									</div>
								{/each}
							{/if}
							<Button size="xs" on:click={() => addField(embedIndex)}>Add Field</Button>
						</div>
					</div>
				{/each}
			</div>
			<Button
				class="enabled:cursor-pointer ml-14 mt-5"
				on:click={addEmbed}><CirclePlusOutline class="w-5 h-5 me-2" /> Add Embed
			</Button>
		</div>

		<!-- Preview Section -->
		<div class="right-side">
			<Button class="mb-[1rem]" on:click={() => copyToClipboard(JSON.stringify($embedMessage))}>
				Copy JSON
			</Button>
			<pre class="text-left text-accent1 bg-gray-700">{JSON.stringify($embedMessage, null, 2)}</pre>
		</div>
	</div>
</main>

<style>
    .split-container {
        display: flex;
        height: 100vh;
    }

    .left-side, .right-side {
        flex: 1;
        padding: 1rem;
        overflow-y: auto;
    }

    .left-side {
        background-color: var(--background);
        border: 1px solid var(--accent4);
        border-right: 0.05rem solid var(--accent4);
    }

    .right-side {
        border: 1px solid var(--accent4);
        border-left: 0.05rem solid var(--accent4);
        background-color: var(--accent2);
    }

</style>
