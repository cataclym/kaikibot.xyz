<script lang="ts">
	import {
		embedMessage, addEmbed, removeField, updateField,
		addField, removeEmbed, updateEmbedProperty
	} from "$lib/embedStore";
	import { Heading } from "flowbite-svelte";

	// Bind content to the main content input
	let content = '';

	$: embedData = {
		content,
		embeds: $embedMessage.embeds,
	};

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text).then(() => {
			alert("Embed copied to clipboard!");
		});
	}

</script>

<main>
	<Heading tag="h1">Discord Embed Builder</Heading>

	<!-- Main message content -->
	<div>
		<label for="content">Message Content:</label>
		<textarea id="content" bind:value={content} placeholder="Main message content"></textarea>
	</div>

	<!-- Embeds Section -->
	<div>
		<Heading tag="h3">Embeds</Heading>

		{#each $embedMessage.embeds as embed, embedIndex}
			<div class="embed">
				<Heading tag="h4">Embed {embedIndex + 1}</Heading>
				<button on:click={() => removeEmbed(embedIndex)}>Remove Embed</button>

				<!-- Embed Title -->
				<div>
					<label for={`title-${embedIndex}`}>Title:</label>
					<input
						id={`title-${embedIndex}`}
						bind:value={embed.title}
						placeholder="Embed Title"
						on:input={() => updateEmbedProperty(embedIndex, "title", embed.title)}
					/>
				</div>

				<!-- Embed Description -->
				<div>
					<label for={`description-${embedIndex}`}>Description:</label>
					<textarea
						id={`description-${embedIndex}`}
						bind:value={embed.description}
						placeholder="Embed Description"
						on:input={() => updateEmbedProperty(embedIndex, "description", embed.description)}
					></textarea>
				</div>

				<!-- Embed Footer -->
				<div>
					<label for={`footer-${embedIndex}`}>Footer:</label>
					<input
						id={`footer-${embedIndex}`}
						bind:value={embed.footer}
						placeholder="Footer Text"
						on:input={() => updateEmbedProperty(embedIndex, "footer", embed.footer)}
					/>
				</div>

				<!-- Embed Image -->
				<div>
					<label for={`image-${embedIndex}`}>Image URL:</label>
					<input
						id={`image-${embedIndex}`}
						bind:value={embed.image}
						placeholder="Embed Image URL"
						on:input={() => updateEmbedProperty(embedIndex, "image", embed.image)}
					/>
				</div>

				<!-- Embed Fields -->
				<div>
					<h5>Fields</h5>
					{#if embed.fields}
						{#each embed.fields as field, fieldIndex}
							<div>
								<input
									bind:value={field.name}
									placeholder="Field Name"
									on:input={() => updateField(embedIndex, fieldIndex, "name", field.name)}
								/>
								<textarea
									bind:value={field.value}
									placeholder="Field Value"
									on:input={() => updateField(embedIndex, fieldIndex, "value", field.value)}
								></textarea>
								<button on:click={() => removeField(embedIndex, fieldIndex)}>Remove Field</button>
							</div>
						{/each}
					{/if}
					<button on:click={() => addField(embedIndex)}>Add Field</button>
				</div>
			</div>
		{/each}

		<button on:click={addEmbed}>Add Embed</button>
	</div>

	<!-- Preview Section -->
	<div>
		<h2>Preview Embed Message</h2>
		<pre>{JSON.stringify($embedMessage, null, 2)}</pre>
	</div>

	<button on:click={() => copyToClipboard(JSON.stringify($embedMessage))}>
		Copy Embed as JSON
	</button>

</main>

<style>
    .embed {
        margin-bottom: 20px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    input, textarea {
        margin-bottom: 10px;
        padding: 5px;
        width: 100%;
    }
    button {
        margin-top: 10px;
        padding: 5px 10px;
    }

		main {
        color: var(--accent1);
		}

</style>
