import { writable } from "svelte/store";

export enum KaikiNavigationState {
	loading = "loading",
	loaded = "loaded"
}

type NavigationState = KaikiNavigationState | null;

export const navigationState = writable<NavigationState>(null);
