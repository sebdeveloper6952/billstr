import { get, writable } from 'svelte/store';
import { NDKUser } from '@nostr-dev-kit/ndk';
import { nip19 } from 'nostr-tools';
import { persisted } from 'svelte-persisted-store';
import { ndk } from '@lib/helpers/nostr/ndk';
import { buf2hex } from '@lib/helpers/buf2hex';

const pkStorage = persisted('pk', '');

export const userStore = writable<NDKUser | null>();

export const init = async () => {
	const pk = get(pkStorage);
	if (pk) {
		loadUserFromPubkey(pk);
	}
};

export const loadUserFromPubkey = async (pk: string) => {
	const user = new NDKUser({ pubkey: pk });

	try {
		let { type, data } = nip19.decode(pk);
		if (type === 'npub') {
			user.npub = pk;
			user.pubkey = '';
		}
	} catch (e) {}

	user.ndk = ndk;
	await user.fetchProfile();

	userStore.set(user);
};

export const logout = () => {
	userStore.set(null);
	pkStorage.set('');
};
