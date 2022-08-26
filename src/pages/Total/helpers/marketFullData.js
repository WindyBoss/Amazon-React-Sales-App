import mathRound from 'helpers/mathRound';

export default function marketFullData(data, marketName) {
    const filteredMarketData = data
        .map(element => {
            return {
                market: element.markets.filter(market => market.id === marketName),
                dayId: element.id,
            };
        })
        .flat(1);

    const addedDayId = filteredMarketData.map(element => {
        element.market = element.market[0];
        element.market.dayId = element.dayId;
        element = element.market;
        return element;
    });

    const marketData = {
        totalQuantity: mathRound(findSum(addedDayId, 'totalQuantity'), 100),
        totalSalesEUR: mathRound(findSum(addedDayId, 'totalSalesEUR'), 100),
        totalSalesLocalCurrency: mathRound(
            findSum(addedDayId, 'totalSalesLocalCurrency'),
            100
        ),
        totalSalesPLN: mathRound(findSum(addedDayId, 'totalSalesPLN'), 100),
        id: marketName,
    };

    return {
        tableData: marketData,
        composedChart: addedDayId,
        id: marketName,
    };
}

function findSum(data, param) {
    return data.reduce((el, row) => el + row[param], 0);
}