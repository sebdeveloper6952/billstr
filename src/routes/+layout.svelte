<script lang="ts">
	import { init as initNdk } from '@lib/helpers/nostr/ndk';
	import { init as initUserStore } from '@lib/stores/user';
	import '@assets/css/app.css';
	import { Toaster } from 'svelte-french-toast';
	import Icon from '@iconify/svelte';
	import dayjs from 'dayjs';
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	import TopBar from '@lib/components/navigation/TopBar.svelte';
	import { fetchTicker } from '@lib/helpers/rates/kraken';

	dayjs.extend(localizedFormat);

	const init = async () => {
		await Promise.all([initNdk(), initUserStore()]);
	};
</script>

{#await init()}
	<div class="w-full h-full flex flex-col justify-center items-center bg-gray-50 text-black">
		<Icon icon="system-uicons:loader" width="48" height="48" />
		<p>Loading!</p>
	</div>
{:then}
	<div class="w-full h-full flex flex-col overflow-x-hidden bg-gray-50 text-black">
		<div class="fixed w-full h-16">
			<TopBar />
		</div>
		<div class="pt-16 flex w-full h-full">
			<div class="md:ml-20 w-full h-full p-2">
				<slot />
			</div>
		</div>
	</div>
{/await}

<Toaster />

<style>
	:global(html, body) {
		width: 100%;
		height: 100%;
	}
</style>
