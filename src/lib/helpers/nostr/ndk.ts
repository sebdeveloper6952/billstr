import { buf2hex } from '@lib/helpers/buf2hex';
import NDKSvelte from '@nostr-dev-kit/ndk-svelte';
import { nip19 } from 'nostr-tools';
import { persisted } from 'svelte-persisted-store';
import { NDKPrivateKeySigner } from '@nostr-dev-kit/ndk';

const npubToHex = (npub: string): string | null => {
	try {
		let { type, data } = nip19.decode(npub);
		if (type === 'npub') {
			return buf2hex(data as Uint8Array);
		}
	} catch (e) {}

	return null;
};

const signer = NDKPrivateKeySigner.generate();

export const ndk = new NDKSvelte({
	signer: signer,
	explicitRelayUrls: ['wss://nostrue.com']
});

export const init = async () => {
	await ndk.connect();
};
