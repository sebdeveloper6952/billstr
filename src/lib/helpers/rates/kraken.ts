export const fetchTicker = async (pair: string): Promise<number> => {
	const response = await fetch(`https://api.kraken.com/0/public/Ticker?pair=${pair}`, {
		method: 'GET'
	});

	const parsed = await response.json();

	if (parsed.error && parsed.error.length) throw new Error(parsed.error);

	const result = parsed.result;
	const tickerInfo = result[pair];
	const askPrice = tickerInfo['a'][0];

	return parseFloat(askPrice);
};
