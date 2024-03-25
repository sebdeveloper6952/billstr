<script lang="ts">
	import { slide } from 'svelte/transition';
	import { currencies, symbols } from '@lib/helpers/currencies';

	export let selectedCurrency: string = 'USD';
	let value = '';
	let showDropdown = false;

	const onItemClick = (currency: string) => {
		selectedCurrency = currency;
		showDropdown = false;
	};
</script>

<div class="w-full relative">
	<input
		{value}
		type="text"
		on:click={() => (showDropdown = !showDropdown)}
		class="w-full h-12 px-2 py-2 bg-gray-100 text-black border-2 border-gray-300 rounded focus:outline-none"
		class:border-b-0={showDropdown}
		class:rounded-b-none={showDropdown}
	/>
	<div class="absolute top-1 left-2 mt-2 flex gap-1 flex-wrap">
		<div class="p-1 flex items-center justify-center gap-1 bg-gray-300 rounded">
			<p class="text-xs">{symbols.get(selectedCurrency)} - {selectedCurrency}</p>
		</div>
	</div>
	{#if showDropdown}
		<ul
			class="h-fit max-h-48 p-1 overflow-y-auto text-sm text-black border-2 border-t-0 border-gray-300 rounded-b"
			transition:slide
		>
			{#each currencies as item}
				<li>
					<button
						on:click={() => onItemClick(item)}
						class="w-full my-1 p-1 flex gap-1 items-center rounded hover:bg-gray-200"
						class:bg-gray-200={selectedCurrency == item}
					>
						<div class="text-left">
							<p>{item}</p>
						</div>
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
