<script lang="ts">
	export let expanded = false;
	export let disabled = false;
</script>

<button
	on:click
	{disabled}
	class:w-full={expanded}
	class:w-fit={!expanded}
	class="px-6 py-2 rounded text-gray-50 font-bold bg-black hover:bg-gray-900 active:bg-gray-800 disabled:cursor-not-allowed disabled:hover:bg-gray-700"
>
	<slot />
</button>
