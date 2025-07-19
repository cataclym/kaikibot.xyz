<script lang="ts">
	let { data } = $props();
    const { EMAIL, SOURCE, SOURCE_WEBSITE } = data;
    // GitHub issue string
    const issueStr = "/issues/new/choose/"
</script>

<h1 class="text-accent1 text-center text-3xl mt-52 mb-5">Getting in contact</h1>

<p class="text-accent3 text-center">
    E-Mail <a class="underline decoration-orange-700 decoration-2" href={`mailto:${EMAIL}`}>{EMAIL}</a>
</p>
<br>
<p class="text-accent3 text-center">
    Create an issue on GitHub
</p>

<p class="text-accent3 text-center">
    <a class="underline decoration-orange-700 decoration-2" href={`${SOURCE}${issueStr}`}>KaikiBot</a>
</p>

<p class="text-accent3 text-center">
    <a class="underline decoration-orange-700 decoration-2" href={`${SOURCE_WEBSITE}${issueStr}`}>Website</a>
</p>