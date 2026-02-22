<script lang="ts">
	import Placeholders from "../components/Placeholders.svelte";
	import OrangeBar from "../components/OrangeBar.svelte";
	import { Heading } from "flowbite-svelte";
	import { onMount } from "svelte";
	import { browser } from "$app/environment";
	import type { WaifuImJSON } from "../interfaces/IWaifuIm";

	let { data } = $props();
	const { INVITE, PUBLIC_SOURCE, CHANGELOG } = data;

	type Img = { url: string; alt: string };
	let images: Img[] = $state(Array(4).fill({ url: "", alt: "" }));

	onMount(async () => {
		const cookieName = "Images_WaifuIm";
		const cookies = document.cookie.split(';');
		let cachedImages: Img[] | null = null;
		
		for (const cookie of cookies) {
			const [name, value] = cookie.trim().split('=');
			if (name === cookieName) {
				try {
					cachedImages = JSON.parse(decodeURIComponent(value));
				} catch (e) {
					console.error("Error parsing image cookie:", e);
				}
				break;
			}
		}

		if (cachedImages && Array.isArray(cachedImages) && cachedImages.length > 0) {
			images = cachedImages;
		} 
		else {
			try {
				const res = await fetch("https://api.waifu.im/images?IncludedTags=maid&IsNsfw=false&PageSize=4");
				const json: WaifuImJSON = await res.json();

				if (json.items) {
					const mappedImages = json.items.map((image) => ({
						url: image.url,
						alt: image.tags.map((tag) => `${tag.name} - ${tag.description}`).join(". ")
					}));
					
					images = mappedImages;

					const date = new Date();
					date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
 					document.cookie = `${cookieName}=${encodeURIComponent(JSON.stringify(mappedImages))}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
				}
			} catch (error) {
				console.error("Failed to fetch images:", error);
			}
		}
	});
</script>

<main>
	<div class="inline-block w-11/12 mt-24">
		<div class="max-w-full md:flex justify-evenly mb-24">
			<div class="text-center md:w-96">
				<h3 class="text-accent3 font-bold text-2xl">
					Kaiki is a
					<mark class="italic">dad</mark>
					.
				</h3>
				<h4 class="text-accent1 mb-3.5">
					He will respond, like a dad, whenever you declare yourself with the use of 'I
					am'.
				</h4>
				<OrangeBar />
			</div>
			<div class="text-center md:w-96 md:h-96">
				<Placeholders img={images[0]} />
			</div>
		</div>

		<div class="max-w-full md:flex flex-row-reverse justify-evenly mb-24">
			<div class="text-center md:w-96">
				<h3 class="text-accent3 font-bold text-2xl">Useful, fun and silly commands</h3>
				<h4 class="text-accent1 mb-3.5">
					A wide variety of commands from fun and goofy commands to utility and server
					management focused commands.
				</h4>
				<OrangeBar />
			</div>
			<div class="text-center md:w-96 md:h-96">
				<Placeholders img={images[1]} />
			</div>
		</div>

		<div class="max-w-full md:flex justify-evenly mb-24">
			<div class="text-center md:w-96">
				<h3 class="text-accent3 font-bold text-2xl">Manage a large todo list</h3>
				<h4 class="text-accent1 mb-3.5">
					Create goals, save a link you just found or keep a tab on your loaning business.
				</h4>
				<OrangeBar />
			</div>
			<div class="text-center md:w-96 md:h-96">
				<Placeholders img={images[2]} />
			</div>
		</div>

		<div class="max-w-full md:flex flex-row-reverse justify-evenly mb-24">
			<div class="text-center md:w-96">
				<h3 class="text-accent3 font-bold text-2xl">Economy and gambling</h3>
				<h4 class="text-accent1 mb-3.5">
					Spend your hard earned yen on the casino and compete in the currency
					leaderboard!
				</h4>
				<OrangeBar />
			</div>
			<div class="text-center md:w-96 md:h-96">
				<Placeholders img={images[3]} />
			</div>
		</div>

		<!-- Large bottom features -->
		<div class="text-left text-accent1 md:w-8/12 sm:w-10/12 m-auto mt-52">
			<h3 class="text-accent3 font-bold text-2xl">Open source</h3>
			<h4 class="text-accent1">
				The codebase is fully open source software and available on GitHub. Fork it, clone
				it and contribute!
			</h4>
		</div>
		<div class="text-right text-accent1 md:w-8/12 sm:w-10/12 m-auto mt-36 mb-52">
			<h3 class="text-accent3 font-bold text-2xl">Donations</h3>
			<h4 class="text-accent1">
				KaikiBot is completely free and open source. Donations are completely optional, but
				highly appreciated.<br />Donations will go towards server costs and support the
				developer(s), as well as give you reward through Patreon on the Discord server.
			</h4>
		</div>
	</div>
	<div
		class="grid items-start m-auto mb-20 mt-10 grid-cols-3 justify-items-center w-10/12 text-accent1 smol-bottom"
	>
		<div class="grid text-accent1">
			<Heading tag="h2" class="text-accent3 text-left">Kaiki</Heading>
			<p class="flex-col text-left"><a href={INVITE}>Invite</a></p>
			<p class="flex-col text-left cursor-pointer"><a href="/commands">Commands</a></p>
		</div>

		<div class="grid text-accent1">
			<Heading tag="h2" class="text-accent3 text-left">Selfhosting</Heading>
			<p class="flex-col text-left"><a href={PUBLIC_SOURCE}>Source code</a></p>
			<p class="flex-col text-left"><a href="/README.md">Docs and guides</a></p>
		</div>

		<div class="grid text-accent1">
			<Heading tag="h2" class="text-accent3 text-left">Utilities</Heading>
			<p class="flex-col text-left"><a href={CHANGELOG}>Changelog</a></p>
			<p class="flex-col text-left"><a href="/about">About</a></p>
			<p class="flex-col text-left"><a href="/contact">Contact</a></p>
		</div>
	</div>
</main>