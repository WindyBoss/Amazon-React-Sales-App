import React, { useState, useEffect } from 'react';

import { useCSVReader } from 'react-papaparse';

import { nanoid } from 'nanoid';

import { getData, postData, getCurrency, postSKU } from 'service/apiService';

import { countSumByDate } from 'helpers/countSum';
import { findRateEUR, findRatePLN } from 'helpers/findRates';
import findMaxMarket from 'helpers/findMaxMarket';
import mathRound from 'helpers/mathRound';
import collectDayData from 'helpers/collectDayData';
import { parseDates } from 'helpers/parseDate';

import months from 'data/month.json';
import markets from 'data/markets.json';
import skuList from 'data/skuList.json';

import MainContainer from 'components/MainContainer';

function AddData({ apiState }) {
  const [data, setData] = useState([]);
  const [rates, setRates] = useState(null);

  useEffect(() => {
    // getData("currency").then((data) => setRates(data.rates));
    getCurrency().then(data => setRates(data.currency.rates));
    // getData('days').then(console.log);
    // getData('weeks').then(console.log);
    // getData('months').then(console.log);
  }, []);

  useEffect(() => {
    if (data.length === 0) {
      return;
    }

    console.log(data);

    const newData = [];

    data.forEach(d => {
      if (d[0] === '') {
        return;
      }
      newData.push({ sku: d[0], category: d[1] });
    });
    console.log(newData);
    console.log(skuList.sku);

    console.log(
      skuList.sku.map(sku => {
        sku.category = newData.filter(data => data.sku === sku.sku)[0].category;
        return sku
      })
    );

    // const remadeData = [];
    // // console.log(rates);
    // if (!rates) {
    //   return;
    // }

    // data.forEach(el => {
    //   remadeData.push({
    //     purchaseDate: parseDates(el[0], 'purchaseDate'),
    //     salesChannel: el[1],
    //     sku: el[2],
    //     quantity: el[3],
    //     itemPriceEur: mathRound(
    //       Number(el[4].replace(',', '.')) / findRateEUR(el[1], rates),
    //       100
    //     ),
    //     itemPricePln: mathRound(
    //       Number(el[4].replace(',', '.')) / findRatePLN(el[1], rates),
    //       100
    //     ),
    //     itemPriceLocal: mathRound(Number(el[4].replace(',', '.')), 100),
    //     id: nanoid(),
    //   });
    // });

    // addSKUData(remadeData, rates);

    // const dataLength = 577;
    // const weeks = [];

    // for (let i = 0; i < 100; i++) {
    //   const week = {
    //     totalQuantity: 0,
    //     totalSalesEUR: 0,
    //     totalSalesPLN: 0,
    //     averageOrder: 0,
    //     markets: 0,
    //     mainMarket: {},
    //     id: i + 1,
    //     days: [],
    //     minDate: '',
    //     maxDate: '',
    //     weekName: '',
    //   };
    //   weeks.push(week);
    // }

    // const days = [];
    // const dataLength = 100;

    // for (let j = 0; j <= dataLength; j++) {
    //   const dayData = collectDayData({
    //     array: remadeData,
    //     rates: rates,
    //     months: months.months,
    //     markets: markets.markets,
    //     countSumByDate: countSumByDate,
    //     iteration: j,
    //   });
    //   // postData('days', dayData);
    //   days.push(dayData);
    //   weeks.forEach(week => {
    //     week.id === dayData.weekId && week.days.push(dayData);
    //   });
    // }

    // weeks.forEach(week => {
    //   const { days } = week;
    //   // console.log(mathRound(countSum(days, 'totalSalesEUR').sum, 100));
    //   const marketList = countSumMarket(
    //     remadeData,
    //     days.length > 0 ? days[0].date : '',
    //     days.length > 0 ? days[days.length - 1].date : ''
    //   );

    //   week.minDate = days.length > 0 ? days[0].date : '';
    //   week.maxDate = days.length > 0 ? days[days.length - 1].date : '';

    //   week.totalQuantity = countSum(days, 'totalQuantity').sum;
    //   week.totalSalesEUR = mathRound(countSum(days, 'totalSalesEUR').sum, 100);
    //   week.totalSalesPLN = mathRound(countSum(days, 'totalSalesPLN').sum, 100);
    //   week.markets = marketList;
    //   week.averageOrder = isNaN(
    //     mathRound(
    //       countSum(days, 'totalQuantity', 'orderNumber').sum /
    //         countSum(days, 'totalQuantity', 'orderNumber').count,
    //       100
    //     )
    //   )
    //     ? 0
    //     : mathRound(
    //         countSum(days, 'totalQuantity', 'orderNumber').sum /
    //           countSum(days, 'totalQuantity', 'orderNumber').count,
    //         100
    //       );

    //   week.weekName =
    //     days.length > 0 ? `${days[0].id} - ${days[days.length - 1].id}` : '';

    //   const maxMarketSales = Math.max(...marketList.map(m => m.totalQuantity));

    //   week.mainMarket = marketList.find(
    //     market => market.totalQuantity === maxMarketSales
    //   );
    // });

    // const skuWeekData = weeks.filter(week => week.days.length > 0);

    // skuWeekData.forEach(week => {
    //   delete week.days;
    // });
    // console.log(skuWeekData);

    // postData('weeks', skuWeekData);

    // const years = [2021, 2022];
    // const monthData = [];

    // years.forEach(year => {
    //   const monthsData = months.months.map(month => {
    //     const daysData = days.filter(
    //       day => day.monthId === month.month && day.yearId === year
    //     );
    //     const marketList = countSumMarket(
    //       remadeData,
    //       daysData.length > 0 ? daysData[0].date : '',
    //       daysData.length > 0 ? daysData[daysData.length - 1].date : ''
    //     );
    //     const maxMarketSales = Math.max(
    //       ...marketList.map(m => m.totalQuantity)
    //     );
    //     return {
    //       minDate: daysData.length > 0 ? daysData[0].date : 0,
    //       maxDate: daysData.length > 0 ? daysData[daysData.length - 1].date : 0,
    //       totalQuantity: countSum(daysData, 'totalQuantity').sum,
    //       totalSalesEUR: mathRound(
    //         countSum(daysData, 'totalSalesEUR').sum,
    //         100
    //       ),
    //       totalSalesPLN: mathRound(
    //         countSum(daysData, 'totalSalesPLN').sum,
    //         100
    //       ),
    //       markets: marketList,
    //       averageOrder: isNaN(
    //         mathRound(
    //           countSum(daysData, 'totalQuantity', 'orderNumber').sum /
    //             countSum(daysData, 'totalQuantity', 'orderNumber').count,
    //           100
    //         )
    //       )
    //         ? 0
    //         : mathRound(
    //             countSum(daysData, 'totalQuantity', 'orderNumber').sum /
    //               countSum(daysData, 'totalQuantity', 'orderNumber').count,
    //             100
    //           ),
    //       orderNumber: countSum(daysData, 'totalQuantity', 'orderNumber').count,
    //       mainMarket: marketList.find(
    //         market => market.totalQuantity === maxMarketSales
    //       ),
    //       // dayData: daysData,
    //       id: `${month.id}/${year}`,
    //       // count: `${month.id}/${year}`,
    //       yearId: year,
    //     };
    //   });
    //   monthData.push(monthsData);
    // });

    // const filteredMonthsData = monthData
    //   .map(year => {
    //     return year.filter(
    //       month => month.minDate !== 0 && month.totalQuantity > 0
    //     );
    //   })
    //   .flatMap(months => months);

    // postData('months', filteredMonthsData);

    // apiState.success();
  }, [apiState, data, rates]);

  const { CSVReader } = useCSVReader();

  return (
    <MainContainer>
      <CSVReader
        onUploadAccepted={(results: any) => {
          setData(results.data);
        }}
      >
        {({
          getRootProps,
          acceptedFile,
          ProgressBar,
          getRemoveFileProps,
        }: any) => (
          <>
            <div>
              <button type="button" {...getRootProps()}>
                Browse file
              </button>
              <div>{acceptedFile && acceptedFile.name}</div>
              <button {...getRemoveFileProps()}>Remove</button>
            </div>
          </>
        )}
      </CSVReader>
    </MainContainer>
  );
}

export default AddData;

function addSKUData(array, rates) {
  skuList.sku.forEach(sku => {
    const skuTransactions = array.filter(el => el.sku === sku.sku);

    const dataLength = 577;
    // const dataLength = 1;

    const days = [];
    const weeks = [];
    const monthData = [];

    const years = [2021, 2022];

    for (let i = 0; i < 100; i++) {
      const week = {
        totalQuantity: 0,
        totalSalesEUR: 0,
        totalSalesPLN: 0,
        averageOrder: 0,
        markets: 0,
        mainMarket: {},
        id: i + 1,
        days: [],
        minDate: '',
        maxDate: '',
        skuId: sku.sku,
      };
      weeks.push(week);
    }

    for (let i = 0; i < dataLength; i++) {
      const date = new Date(2021, 0, 1 + i);
      const marketDataPerDay = [
        ...markets.markets.map(market => {
          return {
            averageOrder: isNaN(
              countSumByDate({
                data: array,
                compareElFirst: 'salesChannel',
                firstCriteria: market.id,
                skuId: sku.sku,
                sumEl: 'quantity',
                maxTimeDate: date,
                minTimeDate: date,
              }).sum /
                countSumByDate({
                  data: array,
                  compareElFirst: 'salesChannel',
                  firstCriteria: market.id,
                  skuId: sku.sku,
                  sumEl: 'quantity',
                  maxTimeDate: date,
                  minTimeDate: date,
                }).count
            )
              ? 0
              : mathRound(
                  countSumByDate({
                    data: array,
                    compareElFirst: 'salesChannel',
                    firstCriteria: market.id,
                    skuId: sku.sku,
                    sumEl: 'quantity',
                    maxTimeDate: date,
                    minTimeDate: date,
                  }).sum /
                    countSumByDate({
                      data: array,
                      compareElFirst: 'salesChannel',
                      firstCriteria: market.id,
                      skuId: sku.sku,
                      sumEl: 'quantity',
                      maxTimeDate: date,
                      minTimeDate: date,
                    }).count,
                  100
                ),
            orderNumber: countSumByDate({
              data: array,
              compareElFirst: 'salesChannel',
              firstCriteria: market.id,
              skuId: sku.sku,
              sumEl: 'quantity',
              maxTimeDate: date,
              minTimeDate: date,
            }).count,
            marketId: market.id,
            totalQuantity: countSumByDate({
              data: array,
              compareElFirst: 'salesChannel',
              firstCriteria: market.id,
              skuId: sku.sku,
              sumEl: 'quantity',
              maxTimeDate: date,
              minTimeDate: date,
            }).sum,
            totalSalesPLN: mathRound(
              countSumByDate({
                data: array,
                compareElFirst: 'salesChannel',
                firstCriteria: market.id,
                skuId: sku.sku,
                sumEl: 'itemPricePln',
                maxTimeDate: date,
                minTimeDate: date,
              }).sum,
              100
            ),
            totalSalesEUR: mathRound(
              countSumByDate({
                data: array,
                compareElFirst: 'salesChannel',
                firstCriteria: market.id,
                skuId: sku.sku,
                sumEl: 'itemPriceEur',
                maxTimeDate: date,
                minTimeDate: date,
              }).sum,
              100
            ),
          };
        }),
      ];
      const day = {
        orderNumber: countSumByDate({
          data: array,
          maxTimeDate: date,
          minTimeDate: date,
          sumEl: 'quantity',
          compareElFirst: 'sku',
          firstCriteria: sku.sku,
        }).count,
        date: date,
        monthId: date.getMonth() + 1,
        weekId: Math.floor(i / 7 + 1, 1),
        dayInWeek: date.getDay(),
        yearId: date.getFullYear(),
        totalSalesPLN: mathRound(
          countSumByDate({
            data: array,
            maxTimeDate: date,
            minTimeDate: date,
            sumEl: 'itemPricePln',
            compareElFirst: 'sku',
            firstCriteria: sku.sku,
          }).sum,
          100
        ),
        id: `${date.getDate()}/${
          months.months.find(month => month.month === date.getMonth() + 1).id
        }/${date.getFullYear()}`,
        totalSalesEUR: mathRound(
          countSumByDate({
            data: array,
            maxTimeDate: date,
            minTimeDate: date,
            sumEl: 'itemPriceEur',
            compareElFirst: 'sku',
            firstCriteria: sku.sku,
          }).sum,
          100
        ),
        totalQuantity: countSumByDate({
          data: array,
          maxTimeDate: date,
          minTimeDate: date,
          sumEl: 'quantity',
          compareElFirst: 'sku',
          firstCriteria: sku.sku,
        }).sum,
        markets: marketDataPerDay,
        averageOrder: isNaN(
          mathRound(
            countSumByDate({
              data: array,
              maxTimeDate: date,
              minTimeDate: date,
              sumEl: 'quantity',
              compareElFirst: 'sku',
              firstCriteria: sku.sku,
            }).sum /
              countSumByDate({
                data: array,
                maxTimeDate: date,
                minTimeDate: date,
                sumEl: 'quantity',
                compareElFirst: 'sku',
                firstCriteria: sku.sku,
              }).count,
            100
          )
        )
          ? 0
          : mathRound(
              countSumByDate({
                data: array,
                maxTimeDate: date,
                minTimeDate: date,
                sumEl: 'quantity',
                compareElFirst: 'sku',
                firstCriteria: sku.sku,
              }).sum /
                countSumByDate({
                  data: array,
                  maxTimeDate: date,
                  minTimeDate: date,
                  sumEl: 'quantity',
                  compareElFirst: 'sku',
                  firstCriteria: sku.sku,
                }).count,
              100
            ),
      };
      weeks.forEach(week => {
        week.id === day.weekId && week.days.push(day);
      });
      days.push(day);
    }

    weeks.forEach(week => {
      const { days } = week;
      const marketList = countSumMarket(
        array,
        days.length > 0 ? days[0].date : '',
        days.length > 0 ? week.days[week.days.length - 1].date : '',
        sku.sku,
        rates
      );

      week.minDate = days.length > 0 ? days[0].date : '';
      week.maxDate =
        days.length > 0 ? week.days[week.days.length - 1].date : '';

      week.totalQuantity = countSum(days, 'totalQuantity').sum;
      week.totalSalesEUR = mathRound(countSum(days, 'totalSalesEUR').sum, 100);
      week.totalSalesPLN = mathRound(countSum(days, 'totalSalesPLN').sum, 100);
      week.markets = marketList;
      week.averageOrder = isNaN(
        mathRound(
          countSum(days, 'totalQuantity', 'orderNumber').sum /
            countSum(days, 'totalQuantity', 'orderNumber').count,
          100
        )
      )
        ? 0
        : mathRound(
            countSum(days, 'totalQuantity', 'orderNumber').sum /
              countSum(days, 'totalQuantity', 'orderNumber').count,
            100
          );

      const maxMarketSales = Math.max(...marketList.map(m => m.totalQuantity));

      week.mainMarket = marketList.find(
        market => market.totalQuantity === maxMarketSales
      );
    });

    years.forEach(year => {
      const monthsData = months.months.map(month => {
        const daysData = days.filter(
          day => day.monthId === month.month && day.yearId === year
        );
        const marketList = countSumMarket(
          array,
          daysData.length > 0 ? daysData[0].date : '',
          daysData.length > 0 ? daysData[daysData.length - 1].date : '',
          sku.sku,
          rates
        );
        const maxMarketSales = Math.max(
          ...marketList.map(m => m.totalQuantity)
        );
        return {
          minDate: daysData.length > 0 ? daysData[0].date : 0,
          maxDate: daysData.length > 0 ? daysData[daysData.length - 1].date : 0,
          totalQuantity: countSum(daysData, 'totalQuantity').sum,
          totalSalesEUR: mathRound(
            countSum(daysData, 'totalSalesEUR').sum,
            100
          ),
          totalSalesPLN: mathRound(
            countSum(daysData, 'totalSalesPLN').sum,
            100
          ),
          markets: marketList,
          averageOrder: isNaN(
            mathRound(
              countSum(daysData, 'totalQuantity', 'orderNumber').sum /
                countSum(daysData, 'totalQuantity', 'orderNumber').count,
              100
            )
          )
            ? 0
            : mathRound(
                countSum(daysData, 'totalQuantity', 'orderNumber').sum /
                  countSum(daysData, 'totalQuantity', 'orderNumber').count,
                100
              ),
          orderNumber: countSum(daysData, 'totalQuantity', 'orderNumber').count,
          mainMarket: marketList.find(
            market => market.totalQuantity === maxMarketSales
          ),
          // dayData: daysData,
          id: month.id,
          yearId: year,
        };
      });
      monthData.push(monthsData);
    });

    const filteredMonthsData = monthData.map(year => {
      return year.filter(month => month.minDate !== 0);
    });

    const skuWeekData = weeks.filter(week => week.days.length > 0);

    skuWeekData.forEach(week => {
      delete week.days;
    });

    const skuOrderedItemsArray = [];
    const skuSalesPLN = [];
    const skuSalesEUR = [];

    skuTransactions.forEach(transaction => {
      skuSalesPLN.push(transaction.itemPricePln);
      skuSalesEUR.push(transaction.itemPriceEur);
      skuOrderedItemsArray.push(Number(transaction.quantity));
    });

    const maxMarket = [
      ...markets.markets.map(market => {
        return {
          marketId: market.id,
          totalQuantity: countSumByDate({
            data: array,
            compareElFirst: 'salesChannel',
            firstCriteria: market.id,
            compareElSecond: 'sku',
            secondCriteria: sku.sku,
            sumEl: 'quantity',
          }).sum,
          totalSalesEUR: mathRound(
            countSumByDate({
              data: array,
              compareElFirst: 'salesChannel',
              firstCriteria: market.id,
              compareElSecond: 'sku',
              secondCriteria: sku.sku,
              sumEl: 'itemPriceEur',
            }).sum,
            100
          ),
          totalSalesPLN: mathRound(
            countSumByDate({
              data: array,
              compareElFirst: 'salesChannel',
              firstCriteria: market.id,
              compareElSecond: 'sku',
              secondCriteria: sku.sku,
              sumEl: 'itemPricePln',
            }).sum,
            100
          ),
          orderNumber: countSumByDate({
            data: array,
            compareElFirst: 'salesChannel',
            firstCriteria: market.id,
            compareElSecond: 'sku',
            secondCriteria: sku.sku,
            sumEl: 'quantity',
          }).count,

          averageOrder: isNaN(
            countSumByDate({
              data: array,
              compareElFirst: 'salesChannel',
              firstCriteria: market.id,
              compareElSecond: 'sku',
              secondCriteria: sku.sku,
              sumEl: 'quantity',
            }).sum /
              countSumByDate({
                data: array,
                compareElFirst: 'salesChannel',
                firstCriteria: market.id,
                compareElSecond: 'sku',
                secondCriteria: sku.sku,
                sumEl: 'quantity',
              }).count
          )
            ? 0
            : countSumByDate({
                data: array,
                compareElFirst: 'salesChannel',
                firstCriteria: market.id,
                compareElSecond: 'sku',
                secondCriteria: sku.sku,
                sumEl: 'quantity',
              }).sum /
              countSumByDate({
                data: array,
                compareElFirst: 'salesChannel',
                firstCriteria: market.id,
                compareElSecond: 'sku',
                secondCriteria: sku.sku,
                sumEl: 'quantity',
              }).count,
        };
      }),
    ];

    const data = {
      // sku: sku.sku,
      asin: sku.asin,
      totalSalesPLN: mathRound(
        skuSalesPLN.reduce((acc, el) => acc + el, 0),
        100
      ),
      totalSalesEUR: mathRound(
        skuSalesEUR.reduce((acc, el) => acc + el, 0),
        100
      ),
      totalQuantity: skuOrderedItemsArray.reduce((acc, el) => acc + el, 0),
      id: sku.sku,
      mainMarket: findMaxMarket({
        markets: markets.markets,
        array: array,
        comparison: 'sku',
        criteria: sku.sku,
        countSum: countSumByDate,
      }),
      markets: maxMarket,
      averageOrder: mathRound(
        skuOrderedItemsArray.reduce((acc, el) => acc + el, 0) /
          skuOrderedItemsArray.length,
        100
      ),
      dayData: days,
      weekData: skuWeekData,
      monthsData: filteredMonthsData,
    };

    // postSKU(data).then(console.log)
    postData('skuData', data).then(console.log);
  });
}
function countSum(array, criteria, secondCriteria) {
  const countArray = [];
  const orderArray = [];
  array.forEach(el => {
    countArray.push(el[criteria] ? el[criteria] : 0);
    orderArray.push(el[secondCriteria] ? el[secondCriteria] : 0);
  });

  return {
    sum: countArray.reduce((acc, el) => acc + el, 0),
    count: orderArray.reduce((acc, el) => acc + el, 0),
  };
}

function countSumMarket(array, minDate, maxDate, sku) {
  const marketsData = [];
  sku
    ? markets.markets.forEach(market => {
        const marketWeekData = {
          totalQuantity: countSumByDate({
            data: array,
            maxTimeDate: maxDate,
            minTimeDate: minDate,
            compareElFirst: 'salesChannel',
            firstCriteria: market.id,
            skuId: sku,
            sumEl: 'quantity',
          }).sum,
          marketId: market.id,
          totalSalesPLN: mathRound(
            countSumByDate({
              data: array,
              maxTimeDate: maxDate,
              minTimeDate: minDate,
              sumEl: 'itemPricePln',
              compareElFirst: 'salesChannel',
              firstCriteria: market.id,
              skuId: sku,
            }).sum,
            100
          ),

          totalSalesEUR: mathRound(
            countSumByDate({
              data: array,
              maxTimeDate: maxDate,
              minTimeDate: minDate,
              sumEl: 'itemPriceEur',
              compareElFirst: 'salesChannel',
              firstCriteria: market.id,
              skuId: sku,
            }).sum,
            100
          ),
          orderNumber: countSumByDate({
            data: array,
            maxTimeDate: maxDate,
            minTimeDate: minDate,
            compareElFirst: 'salesChannel',
            firstCriteria: market.id,
            skuId: sku,
            sumEl: 'quantity',
          }).count,
          averageOrder: isNaN(
            countSumByDate({
              data: array,
              maxTimeDate: maxDate,
              minTimeDate: minDate,
              compareElFirst: 'salesChannel',
              firstCriteria: market.id,
              skuId: sku,
              sumEl: 'quantity',
            }).sum /
              countSumByDate({
                data: array,
                maxTimeDate: maxDate,
                minTimeDate: minDate,
                compareElFirst: 'salesChannel',
                firstCriteria: market.id,
                skuId: sku,
                sumEl: 'quantity',
              }).count,
            100
          )
            ? 0
            : mathRound(
                countSumByDate({
                  data: array,
                  maxTimeDate: maxDate,
                  minTimeDate: minDate,
                  compareElFirst: 'salesChannel',
                  firstCriteria: market.id,
                  skuId: sku,
                  sumEl: 'quantity',
                }).sum /
                  countSumByDate({
                    data: array,
                    maxTimeDate: maxDate,
                    minTimeDate: minDate,
                    compareElFirst: 'salesChannel',
                    firstCriteria: market.id,
                    skuId: sku,
                    sumEl: 'quantity',
                  }).count,
                100
              ),
        };
        marketsData.push(marketWeekData);
      })
    : markets.markets.forEach(market => {
        const marketWeekData = {
          totalQuantity: countSumByDate({
            data: array,
            maxTimeDate: maxDate,
            minTimeDate: minDate,
            compareElFirst: 'salesChannel',
            firstCriteria: market.id,
            sumEl: 'quantity',
          }).sum,
          marketId: market.id,
          totalSalesPLN: mathRound(
            countSumByDate({
              data: array,
              maxTimeDate: maxDate,
              minTimeDate: minDate,
              sumEl: 'itemPricePln',
              compareElFirst: 'salesChannel',
              firstCriteria: market.id,
            }).sum,
            100
          ),

          totalSalesEUR: mathRound(
            countSumByDate({
              data: array,
              maxTimeDate: maxDate,
              minTimeDate: minDate,
              sumEl: 'itemPriceEur',
              compareElFirst: 'salesChannel',
              firstCriteria: market.id,
            }).sum,
            100
          ),
          orderNumber: countSumByDate({
            data: array,
            maxTimeDate: maxDate,
            minTimeDate: minDate,
            compareElFirst: 'salesChannel',
            firstCriteria: market.id,
            sumEl: 'quantity',
          }).count,
          averageOrder: isNaN(
            countSumByDate({
              data: array,
              maxTimeDate: maxDate,
              minTimeDate: minDate,
              compareElFirst: 'salesChannel',
              firstCriteria: market.id,
              sumEl: 'quantity',
            }).sum /
              countSumByDate({
                data: array,
                maxTimeDate: maxDate,
                minTimeDate: minDate,
                compareElFirst: 'salesChannel',
                firstCriteria: market.id,
                sumEl: 'quantity',
              }).count,
            100
          )
            ? 0
            : mathRound(
                countSumByDate({
                  data: array,
                  maxTimeDate: maxDate,
                  minTimeDate: minDate,
                  compareElFirst: 'salesChannel',
                  firstCriteria: market.id,
                  sumEl: 'quantity',
                }).sum /
                  countSumByDate({
                    data: array,
                    maxTimeDate: maxDate,
                    minTimeDate: minDate,
                    compareElFirst: 'salesChannel',
                    firstCriteria: market.id,
                    sumEl: 'quantity',
                  }).count,
                100
              ),
        };
        marketsData.push(marketWeekData);
      });

  return marketsData;
}
