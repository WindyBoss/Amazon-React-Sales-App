import { findMax } from './findMax';
import mathRound from './mathRound';
export default function collectDayData({
    array,
    rates,
    months,
    markets,
    countSumByDate,
    iteration,
}) {
    if (array.length === 0) {
        return;
    }

    const date = new Date(2021, 0, 1 + iteration);
    const month = months.find(month => month.month === date.getMonth() + 1);

    const marketList = [];
    markets.forEach(market => {
        const data = {
            name: market.fullName,
            id: market.id,
            totalQuantity: countSumByDate({
                data: array,
                maxTimeDate: date,
                minTimeDate: date,
                sumEl: 'quantity',
                compareElFirst: 'salesChannel',
                firstCriteria: market.id,
            }).sum,
            totalSalesLocalCurrency: mathRound(
                countSumByDate({
                    data: array,
                    maxTimeDate: date,
                    minTimeDate: date,
                    sumEl: 'itemPriceLocal',
                    compareElFirst: 'salesChannel',
                    firstCriteria: market.id,
                }).sum,
                1000
            ),
            totalSalesPLN: mathRound(
                countSumByDate({
                    data: array,
                    maxTimeDate: date,
                    minTimeDate: date,
                    sumEl: 'itemPriceEur',
                    compareElFirst: 'salesChannel',
                    firstCriteria: market.id,
                }).sum / rates.EUR,
                100
            ),
            totalSalesEUR: mathRound(
                countSumByDate({
                    data: array,
                    maxTimeDate: date,
                    minTimeDate: date,
                    sumEl: 'itemPriceEur',
                    compareElFirst: 'salesChannel',
                    firstCriteria: market.id,
                }).sum,
                100
            ),
        };

        marketList.push(data);
    });

    const day = {
        id: `${date.getDate()}/${month.id}/${date.getFullYear()}`,
        date: date,
        iteration: iteration,
        totalQuantity: countSumByDate({
            data: array,
            maxTimeDate: date,
            minTimeDate: date,
            sumEl: 'quantity',
        }).sum,
        orderNumber: countSumByDate({
            data: array,
            maxTimeDate: date,
            minTimeDate: date,
            sumEl: 'quantity',
        }).count,
        averageOrder: isNaN(
                countSumByDate({
                    data: array,
                    maxTimeDate: date,
                    minTimeDate: date,
                    sumEl: 'quantity',
                }).sum /
                countSumByDate({
                    data: array,
                    maxTimeDate: date,
                    minTimeDate: date,
                    sumEl: 'quantity',
                }).count
            ) ?
            0 : mathRound(
                countSumByDate({
                    data: array,
                    maxTimeDate: date,
                    minTimeDate: date,
                    sumEl: 'quantity',
                }).sum /
                countSumByDate({
                    data: array,
                    maxTimeDate: date,
                    minTimeDate: date,
                    sumEl: 'quantity',
                }).count,
                100
            ),
        totalSalesEUR: mathRound(
            countSumByDate({
                data: array,
                maxTimeDate: date,
                minTimeDate: date,
                sumEl: 'itemPriceEur',
            }).sum,
            100
        ),
        totalSalesPLN: mathRound(
            countSumByDate({
                data: array,
                maxTimeDate: date,
                minTimeDate: date,
                sumEl: 'itemPricePln',
            }).sum,
            100
        ),
        mainMarket: findMax({
            list: marketList,
            criteria: 'totalQuantity',
            noSum: true,
        }),
        monthId: date.getMonth() + 1,
        yearId: date.getFullYear(),
        currentDate: `${date.getDate()}/${month.id}/${date.getFullYear()}`,
        markets: marketList,
        dayInWeek: date.getDay(),
        weekId: Math.floor(iteration / 7 + 1, 1),
    };

    return day;
}