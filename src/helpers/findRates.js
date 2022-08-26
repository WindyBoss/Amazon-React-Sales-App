export function findRatePLN(marketName, rates) {
    switch (marketName) {
        case 'uk':
            return rates.GBP
        case 'se':
            return rates.SEK
        case 'pl':
            return 1
        default:
            return rates.EUR
    }
}

export function findRateEUR(marketName, rates) {
    switch (marketName) {
        case 'uk':
            return rates.GBP / rates.EUR
        case 'se':
            return (1 * rates.SEK) / rates.EUR
        case 'pl':
            return rates.EUR
        default:
            return 1
    }
}