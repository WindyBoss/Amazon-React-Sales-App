import React, { useState, useEffect } from "react";

import { useCSVReader } from "react-papaparse";

import { nanoid } from "nanoid";

import { getData, postData, getCurrency } from "../../service/apiService";

import { countSumByDate, countSume } from "../../helpers/countSum";

import { parseDates } from "../../helpers/parseDate";

import months from "../../data/month.json";
import markets from "../../data/markets.json";
import skuList from "../../data/skuList.json";

import { findRateEUR, findRatePLN } from "../../helpers/findRates";

import collectDayData from "../../helpers/collectDayData";

import MainContainer from "../../components/MainContainer";

import findMaxMarket from "../../helpers/findMaxMarket";

import mathRound from "../../helpers/mathRound";

function AddData({ apiState }) {
  const [data, setData] = useState([]);
  const [rates, setRates] = useState({});

  useEffect(() => {
    // getData("currency").then((data) => setRates(data.rates));
    getCurrency().then(console.log);
  }, []);

  useEffect(() => {
    if (data.length === 0) {
      return;
    }

    const remadeData = [];

    data.forEach((el) => {
      remadeData.push({
        purchaseDate: parseDates(el[0], "purchaseDate"),
        salesChannel: el[1],
        sku: el[2],
        quantity: el[3],
        itemPrice: el[4],
        id: nanoid(),
      });
    });

    addSKUData(remadeData, rates);

    // const dataLength = 0;

    // for (let j = 0; j <= dataLength; j++) {
    //   const dayData = collectDayData({
    //     array: remadeData,
    //     rates: rates,
    //     months: months.months,
    //     markets: markets.markets,
    //     countSumByDate: countSumByDate,
    //     findRateEUR: findRateEUR,
    //     findRatePLN: findRatePLN,
    //     iteration: j,
    //   });
    //   // postData("days", dayData);
    //   console.log(dayData);
    // }

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
  console.log(array);

  skuList.sku.forEach((sku) => {
    const skuTransactions = array.filter((el) => el.sku === sku.sku);

    const dataLength = 577;
    // const dataLength = 40;

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
        minDate: "",
        maxDate: "",
        skuId: sku.sku,
      };

      weeks.push(week);
    }

    for (let i = 0; i < dataLength; i++) {
      const date = new Date(2021, 0, 1 + i);
      const marketDataPerDay = [
        ...markets.markets.map((market) => {
          return {
            averageOrder: isNaN(
              countSumByDate({
                data: array,
                compareElFirst: "salesChannel",
                firstCriteria: market.id,
                skuId: sku.sku,
                sumEl: "quantity",
                maxTimeDate: date,
                minTimeDate: date,
              }).sum /
                countSumByDate({
                  data: array,
                  compareElFirst: "salesChannel",
                  firstCriteria: market.id,
                  skuId: sku.sku,
                  sumEl: "quantity",
                  maxTimeDate: date,
                  minTimeDate: date,
                }).count
            )
              ? 0
              : mathRound(
                  countSumByDate({
                    data: array,
                    compareElFirst: "salesChannel",
                    firstCriteria: market.id,
                    skuId: sku.sku,
                    sumEl: "quantity",
                    maxTimeDate: date,
                    minTimeDate: date,
                  }).sum /
                    countSumByDate({
                      data: array,
                      compareElFirst: "salesChannel",
                      firstCriteria: market.id,
                      skuId: sku.sku,
                      sumEl: "quantity",
                      maxTimeDate: date,
                      minTimeDate: date,
                    }).count,
                  100
                ),
            orderNumber: countSumByDate({
              data: array,
              compareElFirst: "salesChannel",
              firstCriteria: market.id,
              skuId: sku.sku,
              sumEl: "quantity",
              maxTimeDate: date,
              minTimeDate: date,
            }).count,
            marketName: market.fullName,
            marketId: market.id,
            totalQuantity: countSumByDate({
              data: array,
              compareElFirst: "salesChannel",
              firstCriteria: market.id,
              skuId: sku.sku,
              sumEl: "quantity",
              maxTimeDate: date,
              minTimeDate: date,
            }).sum,
            totalSalesPLN: mathRound(
              countSumByDate({
                data: array,
                compareElFirst: "salesChannel",
                firstCriteria: market.id,
                skuId: sku.sku,
                sumEl: "itemPrice",
                maxTimeDate: date,
                minTimeDate: date,
                replace: true,
                findRates: true,
                rates: rates,
                findRatesFunc: findRatePLN,
              }).sum,
              100
            ),
            totalSalesEUR: mathRound(
              countSumByDate({
                data: array,
                compareElFirst: "salesChannel",
                firstCriteria: market.id,
                skuId: sku.sku,
                sumEl: "itemPrice",
                maxTimeDate: date,
                minTimeDate: date,
                replace: true,
                findRates: true,
                rates: rates,
                findRatesFunc: findRateEUR,
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
          sumEl: "quantity",
          compareElFirst: "sku",
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
            sumEl: "itemPrice",
            compareElFirst: "sku",
            firstCriteria: sku.sku,
            replace: true,
            findRates: true,
            rates: rates,
            findRatesFunc: findRatePLN,
          }).sum,
          100
        ),
        id: `${date.getDate()}/${
          months.months.find((month) => month.month === date.getMonth() + 1).id
        }/${date.getFullYear()}`,
        totalSalesEUR: mathRound(
          countSumByDate({
            data: array,
            maxTimeDate: date,
            minTimeDate: date,
            sumEl: "itemPrice",
            compareElFirst: "sku",
            firstCriteria: sku.sku,
            replace: true,
            findRates: true,
            rates: rates,
            findRatesFunc: findRateEUR,
          }).sum,
          100
        ),
        totalQuantity: countSumByDate({
          data: array,
          maxTimeDate: date,
          minTimeDate: date,
          sumEl: "quantity",
          compareElFirst: "sku",
          firstCriteria: sku.sku,
        }).sum,
        markets: marketDataPerDay,
        averageOrder: isNaN(
          mathRound(
            countSumByDate({
              data: array,
              maxTimeDate: date,
              minTimeDate: date,
              sumEl: "quantity",
              compareElFirst: "sku",
              firstCriteria: sku.sku,
            }).sum /
              countSumByDate({
                data: array,
                maxTimeDate: date,
                minTimeDate: date,
                sumEl: "quantity",
                compareElFirst: "sku",
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
                sumEl: "quantity",
                compareElFirst: "sku",
                firstCriteria: sku.sku,
              }).sum /
                countSumByDate({
                  data: array,
                  maxTimeDate: date,
                  minTimeDate: date,
                  sumEl: "quantity",
                  compareElFirst: "sku",
                  firstCriteria: sku.sku,
                }).count,
              100
            ),
      };

      weeks.forEach((week) => {
        week.id === day.weekId && week.days.push(day);
      });
      // console.log(day);
      days.push(day);
    }

    weeks.forEach((week) => {
      const { days } = week;
      const marketList = countSumMarket(
        array,
        days.length > 0 ? days[0].date : "",
        days.length > 0 ? week.days[week.days.length - 1].date : "",
        sku.sku,
        rates
      );
      week.minDate = days.length > 0 ? days[0].dayId : "";
      week.maxDate =
        days.length > 0 ? week.days[week.days.length - 1].dayId : "";
      week.totalQuantity = countSum(days, "totalQuantity").sum;
      week.totalSalesEUR = mathRound(countSum(days, "totalSalesEUR").sum, 100);
      week.totalSalesPLN = mathRound(countSum(days, "totalSalesPLN").sum, 100);
      week.markets = marketList;
      week.averageOrder = isNaN(
        mathRound(
          countSum(days, "totalQuantity", "orderNumber").sum /
            countSum(days, "totalQuantity", "orderNumber").count,
          100
        )
      )
        ? 0
        : mathRound(
            countSum(days, "totalQuantity", "orderNumber").sum /
              countSum(days, "totalQuantity", "orderNumber").count,
            100
          );

      const maxMarketSales = Math.max(
        ...marketList.map((m) => m.totalQuantity)
      );

      week.mainMarket = marketList.find(
        (market) => market.totalQuantity === maxMarketSales
      );
    });

    years.forEach((year) => {
      const monthsData = months.months.map((month) => {
        const daysData = days.filter(
          (day) => day.monthId === month.month && day.yearId === year
        );
        const marketList = countSumMarket(
          array,
          daysData.length > 0 ? daysData[0].date : "",
          daysData.length > 0 ? daysData[daysData.length - 1].date : "",
          sku.sku,
          rates
        );
        const maxMarketSales = Math.max(
          ...marketList.map((m) => m.totalQuantity)
        );
        return {
          minDate: daysData.length > 0 ? daysData[0].date : 0,
          maxDate: daysData.length > 0 ? daysData[daysData.length - 1].date : 0,
          totalQuantity: countSum(daysData, "totalQuantity").sum,
          totalSalesEUR: mathRound(
            countSum(daysData, "totalSalesEUR").sum,
            100
          ),
          totalSalesPLN: mathRound(
            countSum(daysData, "totalSalesPLN").sum,
            100
          ),
          markets: marketList,
          averageOrder: isNaN(
            mathRound(
              countSum(daysData, "totalQuantity", "orderNumber").sum /
                countSum(daysData, "totalQuantity", "orderNumber").count,
              100
            )
          )
            ? 0
            : mathRound(
                countSum(daysData, "totalQuantity", "orderNumber").sum /
                  countSum(daysData, "totalQuantity", "orderNumber").count,
                100
              ),
          orderNumber: countSum(daysData, "totalQuantity", "orderNumber").count,
          mainMarket: marketList.find(
            (market) => market.totalQuantity === maxMarketSales
          ),
          dayData: daysData,
          id: month.id,
          name: month.name,
          short: month.short,
          month: month.month,
          length: month.length,
          yearId: year,
        };
      });
      monthData.push(monthsData);
    });

    const skuWeekData = weeks.filter((week) => week.days.length > 0);

    const skuOrderedItemsArray = [];
    const skuSalesPLN = [];
    const skuSalesEUR = [];

    skuTransactions.forEach((transaction) => {
      const number = Number(transaction.itemPrice.replace(",", "."));
      skuSalesPLN.push(number / findRatePLN(transaction.salesChannel, rates));
      skuSalesEUR.push(number / findRateEUR(transaction.salesChannel, rates));
      skuOrderedItemsArray.push(Number(transaction.quantity));
    });

    const maxMarket = [
      ...markets.markets.map((market) => {
        return {
          marketName: market.fullName,
          marketId: market.id,
          value: countSumByDate({
            data: array,
            compareElFirst: "salesChannel",
            firstCriteria: market.id,
            compareElSecond: "sku",
            secondCriteria: sku.sku,
            sumEl: "quantity",
          }).sum,
        };
      }),
    ];

    const data = {
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
        comparison: "sku",
        criteria: sku.sku,
        countSum: countSumByDate,
      }),
      name: sku.sku,
      markets: maxMarket,
      averageOrder: mathRound(
        skuOrderedItemsArray.reduce((acc, el) => acc + el, 0) /
          skuOrderedItemsArray.length,
        100
      ),
      dayData: days,
      weekData: skuWeekData,
      monthsData: monthData,
    };

    postData('skuData', data).then(console.log)
  });
}

function countSum(array, criteria, secondCriteria) {
  const countArray = [];
  const orderArray = [];
  array.forEach((el) => {
    countArray.push(el[criteria]);
    orderArray.push(el[secondCriteria]);
  });

  return {
    sum: countArray.reduce((acc, el) => acc + el, 0),
    count: orderArray.reduce((acc, el) => acc + el, 0),
  };
}

function countSumMarket(array, minDate, maxDate, sku, rates) {
  const marketsData = [];

  markets.markets.forEach((market) => {
    const marketWeekData = {
      skuId: sku,
      totalQuantity: countSumByDate({
        data: array,
        maxTimeDate: maxDate,
        minTimeDate: minDate,
        compareElFirst: "salesChannel",
        firstCriteria: market.id,
        skuId: sku,
        sumEl: "quantity",
      }).sum,
      marketId: market.id,
      marketName: market.fullName,
      totalSalesPLN: mathRound(
        countSumByDate({
          data: array,
          maxTimeDate: maxDate,
          minTimeDate: minDate,
          sumEl: "itemPrice",
          compareElFirst: "salesChannel",
          firstCriteria: market.id,
          skuId: sku,
          replace: true,
          findRates: true,
          rates: rates,
          findRatesFunc: findRatePLN,
        }).sum,
        100
      ),
      totalSalesLocalCurrency: mathRound(
        countSumByDate({
          data: array,
          maxTimeDate: maxDate,
          minTimeDate: minDate,
          sumEl: "itemPrice",
          compareElFirst: "salesChannel",
          firstCriteria: market.id,
          skuId: sku,
          replace: true,
        }).sum,
        100
      ),
      totalSalesEUR: mathRound(
        countSumByDate({
          data: array,
          maxTimeDate: maxDate,
          minTimeDate: minDate,
          sumEl: "itemPrice",
          compareElFirst: "salesChannel",
          firstCriteria: market.id,
          skuId: sku,
          replace: true,
          findRates: true,
          rates: rates,
          findRatesFunc: findRateEUR,
        }).sum,
        100
      ),
      orderNumber: countSumByDate({
        data: array,
        maxTimeDate: maxDate,
        minTimeDate: minDate,
        compareElFirst: "salesChannel",
        firstCriteria: market.id,
        skuId: sku,
        sumEl: "quantity",
      }).count,
      averageOrder: isNaN(
        countSumByDate({
          data: array,
          maxTimeDate: maxDate,
          minTimeDate: minDate,
          compareElFirst: "salesChannel",
          firstCriteria: market.id,
          skuId: sku,
          sumEl: "quantity",
        }).sum /
          countSumByDate({
            data: array,
            maxTimeDate: maxDate,
            minTimeDate: minDate,
            compareElFirst: "salesChannel",
            firstCriteria: market.id,
            skuId: sku,
            sumEl: "quantity",
          }).count,
        100
      )
        ? 0
        : mathRound(
            countSumByDate({
              data: array,
              maxTimeDate: maxDate,
              minTimeDate: minDate,
              compareElFirst: "salesChannel",
              firstCriteria: market.id,
              skuId: sku,
              sumEl: "quantity",
            }).sum /
              countSumByDate({
                data: array,
                maxTimeDate: maxDate,
                minTimeDate: minDate,
                compareElFirst: "salesChannel",
                firstCriteria: market.id,
                skuId: sku,
                sumEl: "quantity",
              }).count,
            100
          ),
    };
    marketsData.push(marketWeekData);
  });
  return marketsData;
}
