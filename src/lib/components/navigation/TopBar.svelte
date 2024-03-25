<script lang="ts">
	import { goto } from '$app/navigation';
	import LoginModal from '@lib/components/modals/LoginModal.svelte';
	import { userStore } from '@lib/stores/user';

	let showDropdown = false;
	let showLoginModal = false;

	const onLoadNpubHandler = () => {};

	const onLogoutHandler = () => {
		// TODO: logout
		showDropdown = !showDropdown;
	};
</script>

<div class="h-full p-2 flex items-center justify-center relative bg-black text-gray-100">
	<button on:click={() => goto('/')} class="flex gap-2">
		<p class="font-bold">Billstr</p>
	</button>
	<div class="grow"></div>
	{#if $userStore}
		<button
			on:click={() => {
				showDropdown = !showDropdown;
			}}
		>
			{#if $userStore.profile?.image}
				<img
					src={$userStore.profile.image}
					alt="profile"
					class="w-10 h-10 p-px ring ring-gray-300 rounded-full"
				/>
			{:else}
				<img
					src={`https://robohash.org/${$userStore.pubkey}`}
					alt="profile"
					class="w-10 h-10 p-px ring ring-orange-700 rounded-full"
				/>
			{/if}
		</button>
		<!-- {:else}
		<button
			class="px-4 py-1 rounded text-sm text-gray-50 font-bold bg-black hover:bg-gray-900 active:bg-gray-800 disabled:cursor-not-allowed disabled:hover:bg-gray-700"
			on:click={() => {
				showLoginModal = true;
			}}>Load Contacts</button
		> -->
	{/if}

	{#if showDropdown}
		<div class="flex flex-col bg-gray-100 text-black border rounded-md absolute top-14 right-2">
			<button
				on:click={onLoadNpubHandler}
				class="py-1 px-12 flex gap-2 hover:bg-gray-300 cursor-pointer rounded-md"
			>
				<p>Load another npub</p>
			</button>
			<button
				on:click={onLogoutHandler}
				class="py-1 px-12 flex gap-2 hover:bg-gray-300 cursor-pointer rounded-md"
			>
				<p>Logout</p>
			</button>
		</div>
	{/if}

	<LoginModal show={showLoginModal} on:close={() => (showLoginModal = false)} />
</div>
