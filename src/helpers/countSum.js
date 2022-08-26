export function countSume({ data, compareEl, criteria, sumEl }) {
  const array = []
  data.filter((el) => {
    return el[compareEl] === criteria && array.push(el[sumEl])
  })

  return array.reduce((acc, el) => acc + el, 0)
}

export function countSumDoubleCrit({
  data,
  compareElFirst,
  firstCriteria,
  compareElSecond,
  secondCriteria,
  sumEl,
}) {
  const array = []
  const filteredData = data.filter(
    (el) =>
      el[compareElFirst] === firstCriteria &&
      el[compareElSecond].toString() === secondCriteria,
  )
  // console.log(filteredData)

  filteredData.forEach((el) => {
    // console.log(el[sumEl]);
    array.push(Number(el[sumEl]))
  })

  // console.log(array)

  const totalSum = array.reduce((acc, el) => acc + el, 0)
  // console.log(totalSum)
  return totalSum
}

export function countSumByDate({
  data,
  maxTimeDate,
  minTimeDate,
  sumEl,
  compareElFirst,
  firstCriteria,
  skuId,
  replace = false,
  compareElSecond,
  secondCriteria,
  findRates = false,
  rates,
  findRatesFunc,
}) {
  const array = []

  let newData = []

  if (maxTimeDate === '') {
    return { sum: 0, count: 0 }
  }

  maxTimeDate
    ? !skuId
      ? compareElFirst
        ? (newData = data.filter(
            (el) =>
              el.purchaseDate.getTime() >= minTimeDate.getTime() &&
              el.purchaseDate.getTime() <= maxTimeDate.getTime() &&
              el[compareElFirst] === firstCriteria,
          ))
        : (newData = data.filter(
            (el) =>
              el.purchaseDate.getTime() >= minTimeDate.getTime() &&
              el.purchaseDate.getTime() <= maxTimeDate.getTime(),
          ))
      : compareElFirst
      ? (newData = data.filter(
          (el) =>
            el.purchaseDate.getTime() >= minTimeDate.getTime() &&
            el.purchaseDate.getTime() <= maxTimeDate.getTime() &&
            el[compareElFirst] === firstCriteria &&
            el.sku === skuId,
        ))
      : (newData = data.filter(
          (el) =>
            el.purchaseDate.getTime() >= minTimeDate.getTime() &&
            el.purchaseDate.getTime() <= maxTimeDate.getTime() &&
            el.sku === skuId,
        ))
    : (newData = data.filter(
        (el) =>
          el[compareElFirst] === firstCriteria &&
          el[compareElSecond] === secondCriteria,
        // el[compareElSecond].toString() === secondCriteria,
      ))

  !replace
    ? newData.map((dd) => array.push(Number(dd[sumEl])))
    : newData.forEach((dd) => {
        let number = 0
        findRates
          ? (number =
              Number(dd[sumEl].replace(',', '.')) /
              findRatesFunc(dd.salesChannel, rates))
          : (number = Number(dd[sumEl].replace(',', '.')))
        array.push(number)
      })
  return { sum: array.reduce((acc, el) => acc + el, 0), count: array.length }
}
