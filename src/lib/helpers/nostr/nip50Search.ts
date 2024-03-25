import {
	NDKRelaySet,
	type NDKKind,
	NDKRelay,
	type NDKUserProfile,
	profileFromEvent,
	NDKUser
} from '@nostr-dev-kit/ndk';
import { ndk } from './ndk';

export const searchProfiles = async (query: string) => {
	const set = new Set([new NDKRelay('wss://relay.nostr.band')]);
	const relaySet = new NDKRelaySet(set, ndk);

	const events = await ndk.fetchEvents(
		[
			{
				kinds: [0],
				search: query
			}
		],
		undefined,
		relaySet
	);

	return Array.from(events).map((e) => {
		const user = new NDKUser({ pubkey: e.pubkey });
		user.profile = profileFromEvent(e);

		return user;
	});
};
