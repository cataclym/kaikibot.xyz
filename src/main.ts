import App from "./routes/+page.svelte";
import { mount } from "svelte";
import "app.css";


const app = mount(App, {
	target: document.body,
	props: {
		data: {
			docs: [],
			session: undefined,
			DISCORD: "",
			EMBED: "",
			KOFI: "",
			IMAGES: [],
			INVITE: "",
			SOURCE: "",
			CHANGELOG: ""
		}
	}
});

export default app;
