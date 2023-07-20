export const formatNumberToCurrency = (number) => {
    const formattedNumber = number.toFixed(2);
    const parts = formattedNumber.split(".");
    const integerPart = parts[0];
    const integerWithSeparator = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const formattedCurrency = `$ ${integerWithSeparator}`;
    return formattedCurrency;
};
