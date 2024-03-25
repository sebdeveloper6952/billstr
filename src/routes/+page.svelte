<script lang="ts">
	import CurrencyDropdown from '@lib/components/CurrencyDropdown.svelte';
	import QrCode from '@lib/components/QrCode.svelte';
	import UserSearchBar from '@lib/components/UserSearchBar.svelte';
	import FilledButton from '@lib/components/buttons/FilledButton.svelte';
	import TextInput from '@lib/components/forms/TextInput.svelte';
	import type { NDKUser } from '@nostr-dev-kit/ndk';
	import { symbols } from '@lib/helpers/currencies';
	import { splitBillEqualParts, type SplitResult } from '@lib/helpers/nostr/zaps';
	import type { ComponentEvents } from 'svelte';
	import Icon from '@iconify/svelte';
	import ToggleSwitch from '@lib/components/forms/ToggleSwitch.svelte';
	import { userStore } from '@lib/stores/user';

	let selectedUser: NDKUser | null;
	let selectedCurrency: string = 'USD';
	let billTotal = '0';
	let splitParts = '2';
	let step = 0;
	let currentSplitResult: SplitResult;
	let currentSplitIdx = 0;
	let userPaidBill = true;

	$: currentSplit = currentSplitResult?.splits[currentSplitIdx];
	$: showDonePage = currentSplitIdx === currentSplitResult?.splits?.length ?? 0;

	const onUserSelected = (e: ComponentEvents<UserSearchBar>['selected']) => {
		selectedUser = e.detail.user;
	};

	const onStartOverHandler = () => {
		currentSplitIdx = 0;
		step = 0;
	};

	const startZaps = async () => {
		if (!selectedUser || !selectedUser.pubkey) return;

		currentSplitResult = await splitBillEqualParts(
			selectedUser,
			Number(billTotal),
			selectedCurrency,
			Number(splitParts)
		);

		if (currentSplitResult && currentSplitResult.splits) {
			currentSplitIdx = 0;
			step = 3;
		}
	};
</script>

<div class="w-full flex flex-col items-center">
	<div class="w-full md:max-w-screen-md flex flex-col gap-2">
		{#if step === 0}
			<div class="mt-2">
				<p>Who paid the bill?</p>
				{#if $userStore}
					<ToggleSwitch bind:checked={userPaidBill} label={'I paid the bill'} />
				{/if}
				{#if !$userStore || !userPaidBill}
					<UserSearchBar on:selected={onUserSelected} placeholder={'Search user here'} />
				{/if}
			</div>

			<div class="my-2">
				<p>What shitcoin was the bill in?</p>
				<CurrencyDropdown bind:selectedCurrency />
			</div>

			<div class="mb-2">
				<p>Bill total? (in shitcoin)</p>
				<TextInput bind:value={billTotal} />
			</div>

			<div class="mb-2 flex flex-col gap-2">
				<FilledButton
					expanded
					on:click={() => {
						step = 1;
					}}>Split Equally</FilledButton
				>
				<FilledButton
					expanded
					disabled
					on:click={() => {
						step = 2;
					}}>Custom Split</FilledButton
				>
			</div>
		{:else if step === 1}
			<div class="w-full flex flex-col items-center">
				<p>Bill Total</p>
				<p class="font-bold text-xl">{symbols.get(selectedCurrency)} {billTotal}</p>
			</div>
			<div>
				<p>Split in how many parts?</p>
				<TextInput bind:value={splitParts} />
			</div>

			<FilledButton expanded on:click={startZaps}>Start</FilledButton>

			<FilledButton
				expanded
				on:click={() => {
					step = 0;
				}}>Back</FilledButton
			>
		{:else if step === 2}
			<div class="w-full flex flex-col items-center">
				<p>Bill Total</p>
				<p class="font-bold text-xl">{symbols.get(selectedCurrency)} {billTotal}</p>
			</div>
			<FilledButton
				expanded
				on:click={() => {
					step = 0;
				}}>Back</FilledButton
			>
		{:else if step === 3}
			<div class="w-full flex flex-col items-center">
				<p>Bill Total</p>
				<p class="font-bold text-xl">{symbols.get(selectedCurrency)} {billTotal}</p>
			</div>
			{#if currentSplit}
				<div class="w-full flex flex-col items-center">
					<QrCode data={currentSplit.pr} />
					<p class="text-black font-bold">
						{symbols.get(currentSplit.currency)}
						{currentSplit.amountFiat.toFixed(2)}
					</p>
					<p class="text-gray-500 text-sm">
						{currentSplit.amountSats} sats
					</p>
				</div>
			{/if}
			{#if showDonePage}
				<div class="flex flex-col items-center">
					<Icon icon="system-uicons:check-circle" width="96" height="96" class="text-green-500" />
					<p class="text-green-500 font-bold text-xl">All done!</p>
					<FilledButton expanded on:click={() => onStartOverHandler()}>Start Over</FilledButton>
				</div>
			{/if}
			<div class="flex gap-1">
				<FilledButton
					expanded
					disabled={currentSplitIdx == 0}
					on:click={() => {
						if (currentSplitIdx > 0) currentSplitIdx--;
					}}>Previous</FilledButton
				>
				<FilledButton
					expanded
					disabled={currentSplitIdx >= currentSplitResult.splits.length}
					on:click={() => {
						if (currentSplitIdx < currentSplitResult.splits.length) currentSplitIdx++;
					}}>Next</FilledButton
				>
			</div>
		{/if}
	</div>
</div>
