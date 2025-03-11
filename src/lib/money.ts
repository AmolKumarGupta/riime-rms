
const config = {
    currency: '₹',
    decimalPlaces: 2,
}

export default function money(amount: number, currencySymbol: string | undefined = undefined): string {
    const decimalPlaces = config.decimalPlaces;
    if (currencySymbol == undefined) {
        currencySymbol = config.currency;
    }

    const parsedAmount = parseFloat(amount.toString());
    if (isNaN(parsedAmount)) {
        return `${currencySymbol} 0.00`;
    }

    const formattedAmount = parsedAmount.toFixed(decimalPlaces);
    const [integerPart, decimalPart] = formattedAmount.split('.');
    const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return `${currencySymbol} ${integerWithCommas}.${decimalPart}`;
}