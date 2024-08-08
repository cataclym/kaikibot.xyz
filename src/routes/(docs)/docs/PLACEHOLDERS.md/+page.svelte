<script>
	import SvelteMarkdown from "svelte-markdown";

	const source = `
### Paths

-  [Readme](../README.md)
-  Docs
    - [Guide](GUIDE.md)
    - [.env setup](ENV.md)

## Placeholders

-  %guild% - Guild name
-  %guild.name%" - Guild name
-  %guild.id%" - Guild ID
-  %guild.icon%" - Guild-icon URL
-  %member%" - Member username
-  %member.name%" - Member username
-  %member.id%" - Member ID
-  %member.mention%" - Member mention
-  %member.avatar%" - Member avatar URl
`;
</script>

<div class="text-accent1 m-auto w-11/12">
	<SvelteMarkdown {source} />
</div>
