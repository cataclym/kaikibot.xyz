<script lang="ts" generics="T extends AuthorObject | FooterObject">
	import {
		updateEmbedProperty,
		type AuthorObject,
		type FooterObject
	} from "$lib/stores/embedStore";
	import { Input, Popover } from "flowbite-svelte";

	export let embedIndex: number;
	export let objIndex: "author" | "footer";
	export let subObjIndex: keyof T;
	export let title: string = "Icon URL";
	export let value: string | undefined;
</script>

<Popover {title}>
	<Input
		type="url"
		class="border-amber-600 rounded"
		placeholder={title}
		bind:value
		oninput={() => updateEmbedProperty<T>(embedIndex, objIndex, value, subObjIndex)}
	/>
</Popover>
