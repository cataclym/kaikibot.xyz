<script lang="ts">
	import { page } from "$app/state";
	import { error } from "@sveltejs/kit";
	import { Avatar } from "flowbite-svelte";
	import GuildCard from "../../../../components/GuildCard.svelte";
	import NaGuildCard from "../../../../components/NAGuildCard.svelte";
	import type OAuthGuildData from "../../../../interfaces/OAuthGuildData";

	const session = page.data.session;

	if (session?.user == null) throw error(500, "User does not exist");

	const { user } = session;

	let { data } = $props();

	const { responseData } = data;
	const mappedIdSet = new Set(responseData.guildDb.map((guild) => guild.Id));

    const availableCachedGuilds: OAuthGuildData[] = [];
    const unavailableCachedGuilds: OAuthGuildData[] = [];

    for (const guild of responseData.guilds) {
        if (mappedIdSet.has(guild.id)) {
            availableCachedGuilds.push(guild);
        } else {
            unavailableCachedGuilds.push(guild);
        }
    }
</script>

<main>
    <div>
        <Avatar size="lg" src={user.image || ""} alt="Avatar" />
    </div>
    <h1 class="text-accent3">{user.name || "User"}</h1>
    <div class="text-accent3">
        <p><b>Balance</b>: 💴 {responseData.userData?.Amount || 0}</p>
    </div>
    <div class="text-accent3">
        <p><b>Daily</b>: {responseData.userData?.ClaimedDaily ? "Claimed ✅" : "Not claimed"}</p>
        {#if responseData.userData?.ClaimedDaily}
            <br>
            <p>Your daily reminder is {responseData.userData.DailyReminder ? "at " + responseData.userData.DailyReminder.toLocaleString : "not enabled"}</p>
        {/if}
    </div>
    <h2 class="text-accent3 text-lg">Available guilds</h2>
    <div class="w-full flex flex-row gap-2 mb-12 flex-wrap justify-center content-center">
        {#each availableCachedGuilds as guild}
            <GuildCard {guild} {user} />
        {/each}
    </div>
    <h2 class="text-accent3 text-lg">Other guilds</h2>
    <div class="w-full flex flex-row gap-2 mb-12 flex-wrap justify-center content-center">
        {#each unavailableCachedGuilds as guild}
            <NaGuildCard {guild} />
        {/each}
    </div>
</main>
