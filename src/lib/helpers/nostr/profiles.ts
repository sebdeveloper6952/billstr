import { NDKUser } from '@nostr-dev-kit/ndk';
import { ndk } from './ndk';

export const fetchProfile = async (pk: string) => {
	const author = new NDKUser({ pubkey: pk });
	author.ndk = ndk;

	return await author.fetchProfile();
};
