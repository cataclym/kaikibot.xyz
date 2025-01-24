import { type Writable, writable } from "svelte/store";

type APIEmbed = {
	title?: string;
	description?: string;
	url?: string;
	color?: number;
	footer?: Object;
	image?: Object;
	thumbnail?: Object;
	video?: Object;
	provider?: Object;
	author?: Object;
	fields?: APIEmbedField[];
}

type APIEmbedField = {
	name: string;
	value: string;
	inline?: boolean;
}

export const embedMessage: Writable<{ content: string | null; embeds: APIEmbed[] }> = writable({
	content: "",
	embeds: []
});

// Add an embed to the embeds array
export const addEmbed = () => {
	embedMessage.update((message) => {
		message.embeds.push({
				author: {
					name: '',
					url: '',
					icon_url: "",
				},
				color: 15228456, // #e85e28
				description: "",
				fields: [],
				footer: {
					text: '',
					icon_url: ''
				},
				image: { url: "" },
				thumbnail: { url: "" },
				title: "",
				url: ""
			}
		);
		return message;
	});
};

export const addField = (index: number) => {
	embedMessage.update((e) => {
		e.embeds[index].fields?.push({ name: '', value: '', inline: true });
		return e;
	});
};

export const removeField = (embedIndex: number, fieldIndex: number) => {
	embedMessage.update((e) => {
		e.embeds[embedIndex].fields?.splice(fieldIndex, 1);
		return e;
	});
};

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
export const updateEmbedProperty = (embedIndex: number, property: keyof APIEmbed, value: any) => {
	embedMessage.update((message) => {
		message.embeds[embedIndex][property] = value;
		return message;
	});
};

