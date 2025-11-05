<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Model3DScene.svelte';
	
	let { userImageUrl = undefined }: { userImageUrl?: string } = $props();
</script>

<div class="w-full h-full">
	<Canvas>
		<Scene {userImageUrl} />
	</Canvas>
</div>
