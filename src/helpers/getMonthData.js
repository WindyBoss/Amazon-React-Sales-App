export function getMonthData(marketList, data, feature, options) {
    let selectedOption = [];
    let description = 'Total Ordered Item';
    if (options) {
        selectedOption = options.filter(opt => opt.value === feature);
        description = selectedOption[0].label;
    }

    function setCurrency() {
        switch (description) {
            case 'Total Sales PLN':
                return 'PLN';
            case 'Total Sales EUR':
                return 'EUR';
            default:
                return '';
        }
    }

    const marketData = marketList.map(market => {
        return {
            value: findTotal(data, market.id, feature),
            name: market.fullName,
            feature: description,
            currency: setCurrency(),
        };
    });

    return marketData;
}

function findTotal(data, marketName, feature) {
    const marketData = [];
    const separateData = [];

    data.forEach(day => {
        marketData.push(
            ...day.markets.filter(market => market.marketId === marketName)
        );
    });

    marketData.length === 0 &&
        data.forEach(day => {
            marketData.push(
                ...day.markets.filter(market => market.id === marketName)
            );
        });

    marketData.forEach(market => {
        separateData.push(market[feature]);
    });

    return Math.round(separateData.reduce(getSum, 0) * 100) / 100;
}

function getSum(total, num) {
    return total + num;
}