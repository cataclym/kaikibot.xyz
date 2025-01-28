import { type Writable, writable } from "svelte/store";
import { error } from "@sveltejs/kit";

export type URLObject = {
	url: string;
}

export type AuthorObject = {
	name: string,
	icon_url?: string,
	url?: string,
}

export type FooterObject = {
	text: string,
	icon_url?: string,
}

type APIEmbed = {
	title?: string;
	description?: string;
	url?: string;
	color?: number;
	footer?: FooterObject;
	image?: URLObject;
	thumbnail?: URLObject;
	author?: AuthorObject;
	fields?: APIEmbedField[];
}

type APIEmbedField = {
	name: string;
	value: string;
	inline: boolean;
}

export const embedMessage: Writable<{ content?: string; embeds: APIEmbed[] }> = writable({
	embeds: []
});

// Add an embed to the embeds array
export const addEmbed = () => {
	embedMessage.update((message) => {
		message.embeds.push({
			color: 15228456, // #e85e28
		});
		return message;
	});
};

export const addField = (index: number) => {
	embedMessage.update((e) => {
		const embed = e.embeds[index];

		embed.fields = embed.fields ?? [];

		embed.fields.push({ name: "", value: "", inline: true });

		return e;
	});
};

export const removeField = (embedIndex: number, fieldIndex: number) => {
	embedMessage.update((e) => {
		e.embeds[embedIndex].fields?.splice(fieldIndex, 1);
		return e;
	});
};

export const updateContent = (value: string) => {
	embedMessage.update((message) => {
		message.content = value;
		return message;
	})
}

	export const updateField = (embedIndex: number, fieldIndex: number, key: keyof APIEmbedField, value: any) => {
		embedMessage.update((message) => {
			const field = message.embeds[embedIndex].fields![fieldIndex];

			// Check if the field has the key
			if (field && key in field) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				message.embeds[embedIndex].fields![fieldIndex][key] = value;
				}
			return message;
		});
	};

// Remove an embed from the embeds array
export const removeEmbed = (index: number) => {
	embedMessage.update((message) => {
		message.embeds.splice(index, 1);
		return message;
	});
};

// Update a field of a specific embed
export const updateEmbedProperty = <T extends AdditionalIndex>(embedIndex: number, property: keyof APIEmbed, value: any, propIndex?: keyof T) => {
	embedMessage.update((message) => {
		const embed = message.embeds[embedIndex];

		// Check if propIndex is provided and the property is part of the AdditionalIndex
		if (propIndex) {
			// Ensure the property is an indexable object (e.g., URLObject, AuthorObject, or FooterObject)
			const additionalIndexObj = embed[property] as T;
			if (additionalIndexObj && typeof additionalIndexObj === 'object') {
				additionalIndexObj[propIndex] = value;
			}
		} else {
			embed[property] = value;
		}

		return message;
	});
};

type AdditionalIndex = URLObject | AuthorObject | FooterObject
