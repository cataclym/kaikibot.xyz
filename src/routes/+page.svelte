<script lang="ts">
	import Placeholders from "../components/Placeholders.svelte";
	import OrangeBar from "../components/OrangeBar.svelte";

	/** @type {import("./$types").PageServerData} */
	export let data;

	const links = data.LINKS;
	const images: { url: string; alt: string }[] = data.IMAGES;
</script>

<main>
	<div class="inline-block w-11/12 mt-24">
		<!-- 2x2 Medium SignOutfeature list -->

		<div class="max-w-full md:flex justify-evenly mb-24">
			<div class="text-center md:w-96">
				<h3 class="text-accent3 font-bold text-2xl">
					Kaiki is a
					<mark class="italic">dad</mark>
					.
				</h3>
				<h4 class="text-accent1 mb-3.5">
					He will respond, like a dad, whenever you declare yourself with the use of 'I am'.
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
					A wide variety of commands from fun and goofy commands to utility and server management
					focused commands.
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
					Spend your hard earned yen on the casino and compete in the currency leaderboard!
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
				The codebase is fully open source software and available on GitLab. Fork it, clone it and
				contribute!
			</h4>
		</div>
		<div class="text-right text-accent1 md:w-8/12 sm:w-10/12 m-auto mt-36 mb-52">
			<h3 class="text-accent3 font-bold text-2xl">Donations</h3>
			<h4 class="text-accent1">
				KaikiBot is completely free and open source. Donations are completely optional, but highly
				appreciated.<br />Donations will go towards server costs and support the developer(s), as
				well as give you reward through Patreon on the Discord server.
			</h4>
		</div>
	</div>
	<div
		class="grid items-start m-auto mb-20 mt-10 grid-cols-3 justify-items-center w-10/12 text-accent1 smol-bottom"
	>
		<div class="grid text-accent1">
			<h1 class="text-accent3 text-left">Kaiki</h1>
			<p class="flex-col text-left"><a href={links.invite}>Invite</a></p>
			<p class="flex-col text-left cursor-pointer"><a href="/commands">Commands</a></p>
		</div>

		<div class="grid text-accent1">
			<h1 class="text-accent3 text-left">Selfhosting</h1>
			<p class="flex-col text-left"><a href={links.source}>Source code</a></p>
			<p class="flex-col text-left"><a href="/README.md">Docs and guides</a></p>
		</div>

		<div class="grid text-accent1">
			<h1 class="text-accent3 text-left">Utilities</h1>
			<p class="flex-col text-left"><a href={links.changelog}>Changelog</a></p>
			<p class="flex-col text-left"><a href="/about">About</a></p>
		</div>
	</div>
</main>
