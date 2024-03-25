<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '@iconify/svelte';
	import BaseModal from './BaseModal.svelte';
	import TextInput from '@lib/components/forms/TextInput.svelte';
	import TextButton from '@lib/components/buttons/TextButton.svelte';
	import { loadUserFromPubkey } from '@lib/stores/user';

	export let show = false;
	let pubkey = 'npub1rw7hlhmgat6ur9zxcw40vweem49guv6530yk767j8xjpynv0y20q6qsl3w';

	const dispatch = createEventDispatcher();

	const onLoadHandler = async () => {
		await loadUserFromPubkey(pubkey);
		dispatch('close');
	};
</script>

<BaseModal {show} on:close>
	<div class="w-full flex flex-col justify-center items-center text-black">
		<Icon icon="system-uicons:contacts" width="48" height="48" />
		<p class="mt-2 text-2xl font-bold text-black-50">Load contacts using your pubkey / npub</p>
	</div>

	<div class="p-2">
		<div class="flex flex-col gap-2 justify-center">
			<TextInput bind:value={pubkey} type="text" />
		</div>
		<div class="mt-4 w-full flex justify-end">
			<TextButton on:click={() => dispatch('close')}>Cancel</TextButton>
			<TextButton on:click={() => onLoadHandler()}>Load</TextButton>
		</div>
	</div>
</BaseModal>
