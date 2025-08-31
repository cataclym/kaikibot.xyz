## 🌐 kaikibot.xyz — Source Code
#### A fast, modern web app for managing your Discord server with SvelteKit & Vite.

<img width=600 src="static/kaikibot.png">

![License](https://img.shields.io/github/license/catadev0/kaikibot.xyz)
![Website](https://img.shields.io/website?url=http%3A//kaikibot.xyz)
![Live Version](https://img.shields.io/endpoint?url=https%3A%2F%2Fkaikibot.xyz%2Fshields%3Fparam%3Dversion)




### 👷 Embed Builder
Build custom embeds with colorpicker, custom content, multiple embeds in stunning visual user interface.

### 💻 Dashboard Features
- ✅ Server information
- ✅ Discord user login
- ✅ Update settings
    - 🎉 Greetings (Welcome/Bye)
    - 🔧 Toggle DadBot, Anniversary, Sticky Roles
    - 👤 Custom roles for users
    - 🎨 Embed colors for bot messages
    - ⚡ Server prefix management
    - 📋 Copy IDs, emojis, and roles
- 🌐 Global logged-in layout

<img width=600 src="https://i.imgur.com/k6DIvf8.png" alt="Dashboard screenshot">

*Dashboard KaikiBot configuration dashboard*

### 📑 Command Explorer
* 🔷 **All Commands** – Browse the complete command list at a glance  
* 🗂 **Categories** – Quickly filter commands by category or type  
* 🔍 **Search** – Find commands instantly with a powerful search  
* 📝 **Usage & Description** – Clear explanations and examples for each command  
* ⚡ **Dynamic Updates** – Commands can be updated from the bot client in real-time


## 📦 Scripts

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