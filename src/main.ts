import App from "./routes/+page.svelte";
import { mount } from "svelte";

const app = mount(App, {
	target: document.body,
	props: {
		data: {
			session: undefined,
			DISCORD: "",
			KOFI: "",
			SOURCE_WEBSITE: "",
			IMAGES: undefined,
			INVITE: "",
			SOURCE: "",
			CHANGELOG: ""
		}
	}
});

export default app;
