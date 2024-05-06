<script>
  import SvelteMarkdown from "svelte-markdown";

  const source = `
  ### Paths

- Docs
    - [Guide](docs/GUIDE.md)
    - [Placeholders](docs/PLACEHOLDERS.md) for greet and bye messages
    - [.env setup](docs/ENV.md)

# Welcome to Kaiki Deishu Bot

KaikiBot is a personal project for me and my server. Feel free to selfhost, fork, support this project!

[Add Kaiki to your server](https://discord.com/oauth2/authorize?client_id=714695773534814238&scope=bot)

# Guide

[Selfhosting guide](docs/GUIDE.md)

# Contributing

Consider contributing. I appreciate all the help I can get!

1. Fork the bot!
1. Create your feature branch: \`git checkout -b cool-new-branch\`
1. Commit your changes: \`git commit -am "Added x feature!"\`
1. Push to the branch: \`git push origin My-new-feature\`
1. Submit a pull request!

---

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/C0C3IJV8A)
  `
</script>

<div class="text-accent1 m-auto w-11/12">
  <SvelteMarkdown {source}/>
</div>
