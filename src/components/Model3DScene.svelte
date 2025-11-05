<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls, GLTF } from '@threlte/extras';
	import { DEG2RAD } from 'three/src/math/MathUtils.js';
	import { TextureLoader, MeshStandardMaterial } from 'three';
	import type { GLTF as GLTFType } from 'three/examples/jsm/loaders/GLTFLoader.js';
	
	let { userImageUrl = undefined }: { userImageUrl?: string } = $props();
	
	let gltf = $state<GLTFType>();
	
	$effect(() => {
		if (gltf && userImageUrl) {
			const loader = new TextureLoader();
			loader.load(userImageUrl, (texture) => {
				texture.flipY = false;
				texture.repeat.set(1, 1);
				texture.center.set(0, 0)

				gltf!.scene.traverse((child: any) => {
					if (child.isMesh) {
						// Apply user texture to the material
						child.material = new MeshStandardMaterial({
							map: texture,
						});
					}
				});
			});
		}
	});
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50}>
	<OrbitControls 
		enableZoom={false}
		enablePan={false}
		autoRotate={true}
		autoRotateSpeed={2}
		maxPolarAngle={DEG2RAD * 90}
		minPolarAngle={DEG2RAD * 30}
	/>
</T.PerspectiveCamera>

<T.DirectionalLight position={[3, 10, 10]} intensity={1.5} />
<T.DirectionalLight position={[-3, 10, -10]} intensity={0.5} />
<T.AmbientLight intensity={0.5} />

<!-- Replace with your model path -->
<GLTF url="/Untitled.glb" position={[0, 0, 0]} bind:gltf />
