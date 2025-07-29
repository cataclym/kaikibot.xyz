## 🌐 kaikibot.xyz — Source Code

This is the source for kaikibot.xyz, a fast, modern web app built with Svelte and SvelteKit, powered by Vite.

### 📦 Scripts

- `npm run dev` 
    
    Run development server, hot reload

- `npm run format`

    Lint with prettier

## 👷 Build and deploy 

1. Fill `.env` based on `.env.example`

        cp .env.example .env
        nano .env

2. `npm run build`

    Compiles code into `build` folder

3. Deploy from `build`:

        node build
    or

        bun build

## 📝 Contributions

PRs and suggestions are always welcome! Open an issue if you'd like to propose a change.