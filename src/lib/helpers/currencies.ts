import { fetchTicker } from './rates/kraken';

export const currencies = ['USD', 'EUR', 'GBP', 'GTQ'];

export const symbols = new Map<string, string>([
	['USD', '$'],
	['EUR', '€'],
	['GBP', '£'],
	['GTQ', 'Q']
]);

export const getSatsRate = async (currency: string): Promise<number> => {
	const rate = await fetchTicker(`BTC/${currency}`);
	const satsPerBtc = 100000000;

	return 1 / (rate / satsPerBtc);
};
