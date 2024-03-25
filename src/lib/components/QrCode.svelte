<script lang="ts">
	import QRCode from 'qrcode';
	import { onMount } from 'svelte';

	export let data = '';
	let canvas: HTMLElement | null;

	$: if (canvas) {
		QRCode.toCanvas(canvas, data, function (error) {
			if (error) console.error(error);
		});
	}

	onMount(() => {
		canvas = document.getElementById('canvas');
	});
</script>

<div>
	<canvas id="canvas"></canvas>
</div>
