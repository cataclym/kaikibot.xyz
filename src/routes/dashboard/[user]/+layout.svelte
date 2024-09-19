<script lang="ts">
	import { goto } from "$app/navigation";

	export let data;
	const { userData } = data;
</script>

<div class="flex justify-evenly gap-1 smol">
	<div class="h-full w-full">
		<p>Logged in as {userData.user.name}</p>
		<button on:click={() => goto("/auth/signout")}>Logout</button>
	</div>
</div>

<slot />
