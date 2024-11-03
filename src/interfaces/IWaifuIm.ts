export interface WaifuImJSON {
	images: Image[];
}

export interface Image {
	signature: string;
	extension: string;
	image_id: number;
	favorites: number;
	dominant_color: string;
	source: string;
	artist: unknown;
	uploaded_at: string;
	liked_at: unknown;
	is_nsfw: boolean;
	width: number;
	height: number;
	byte_size: number;
	url: string;
	preview_url: string;
	tags: Tag[];
}

export interface Tag {
	tag_id: number;
	name: string;
	description: string;
	is_nsfw: boolean;
}
