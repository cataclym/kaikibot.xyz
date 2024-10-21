import type { Config } from 'tailwindcss';
import flowbitePlugin from 'flowbite/plugin'

export default {
	content: [
		"./src/**/*.{html,js,svelte,ts}",
		"./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
		"./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}"
	],
	darkMode: "selector",
	theme: {
		extend: {
			colors: {
				orange: "#e85e28",
				primary: {
					50: "#ffcab4",
					100: "#ffb99c",
					200: "#fca784",
					300: "#f9966d",
					400: "#f48355",
					500: "#ee713e",
					600: "#e85e28",
					700: "#cc5323",
					800: "#b04920",
					900: "#96401d",
				},
				gray: {
					100: "#bbb9b8",
					200: "#878582",
					300: "#74726f",
					400: "#62605c",
					500: "#514e4a",
					600: "#403d39",
					700: "#363430",
					800: "#2d2b28",
					900: "#24221f"
				}
			}
		}
	},
	plugins: [flowbitePlugin],
	corePlugins: {
		preflight: false
	}
} as Config;
