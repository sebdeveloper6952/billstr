<script lang="ts">
	export let expanded = false;
	export let disabled = false;
</script>

<button
	on:click
	{disabled}
	class:w-full={expanded}
	class:w-fit={!expanded}
	class="px-6 py-1 rounded-lg text-gray-700 font-bold hover:bg-gray-600/10 active:bg-gray-700/10 disabled:cursor-not-allowed disabled:hover:bg-gray-700/10"
>
	<slot />
</button>
