<script lang="ts">
	import type { NDKUser } from '@nostr-dev-kit/ndk';
	
	let user: NDKUser;
</script>

<button on:click={() => {}}>
	{#if user.profile?.image}
		<img
			src={user?.profile.image}
			alt="profile"
			class="w-10 h-10 p-px ring ring-orange-700 rounded-full"
		/>
	{:else}
		<img
			src={`https://robohash.org/${user.pubkey}`}
			alt="profile"
			class="w-10 h-10 p-px ring ring-orange-700 rounded-full"
		/>
	{/if}
</button>
