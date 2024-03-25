import { NDKUser } from '@nostr-dev-kit/ndk';
import { ndk } from '@lib/helpers/nostr/ndk';
import { getSatsRate } from '@lib/helpers/currencies';

export class Split {
	amountSats: number;
	amountFiat: number;
	currency: string;
	pr: string;

	constructor(amountSats: number, amountFiat: number, currency: string, pr: string) {
		this.amountSats = amountSats;
		this.amountFiat = amountFiat;
		this.currency = currency;
		this.pr = pr;
	}
}

export class SplitResult {
	billTotal: number;
	currency: string;
	fiatPerBtcRate: number;
	splits: Split[];

	constructor(billTotal: number, currency: string, fiatPerBtcRate: number, splits: Split[]) {
		this.billTotal = billTotal;
		this.currency = currency;
		this.fiatPerBtcRate = fiatPerBtcRate;
		this.splits = splits;
	}
}

export const splitBillEqualParts = async (
	userToZap: NDKUser,
	amount: number,
	currency: string = 'USD',
	numberOfSplits: number,
	payOnePartLess: boolean = true
): Promise<SplitResult> => {
	userToZap.ndk = ndk;

	let numberOfInvoices = numberOfSplits;
	if (payOnePartLess) numberOfInvoices--;

	const satsPerFiatCurrency = await getSatsRate(currency);
	const totalSats = Math.ceil(satsPerFiatCurrency * amount);
	const invoiceAmountSats = Math.ceil(totalSats / numberOfSplits);

	const promises = [];
	for (let i = 0; i < numberOfInvoices; i++) {
		promises.push(userToZap.zap(invoiceAmountSats * 1000));
	}

	const splits = (await Promise.all(promises)).map(
		(i) => new Split(invoiceAmountSats, invoiceAmountSats / satsPerFiatCurrency, currency, i ?? '')
	);

	return {
		billTotal: amount,
		fiatPerBtcRate: 1 / (satsPerFiatCurrency / 100000000),
		currency: currency,
		splits: splits
	};
};

export const splitBillCustom = (pubkeyToZap: string): Promise<string[] | null> => {
	const user = new NDKUser({ pubkey: pubkeyToZap });
	user.ndk = ndk;

	return Promise.resolve([]);
};
