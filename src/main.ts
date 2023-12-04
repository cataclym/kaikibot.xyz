import App from "./routes/+page.svelte";
import 'dotenv/config';

const app = new App({
  target: document.body
});

export default app;
