export const buf2hex = (buffer: Uint8Array) => {
	return [...new Uint8Array(buffer)].map((x) => x.toString(16).padStart(2, '0')).join('');
};
