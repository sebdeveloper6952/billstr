<script lang="ts">
	export let checked = true;
	export let label = '';

	const onInput = (e: Event) => (checked = (e.target as HTMLInputElement).checked);
</script>

<label class="inline-flex items-center cursor-pointer">
	<input bind:checked on:input={onInput} type="checkbox" class="sr-only peer" />
	<div
		class="relative w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"
	></div>
	<span class="ms-3 text-sm font-medium text-gray-900">{label}</span>
</label>
