import { findMax } from './findMax'
export default function findMaxMarket({
  markets,
  array,
  comparison,
  criteria,
  countSum,
}) {
  const maxMarket = [
    ...markets.map((market) => {
      return {
        marketName: market.name,
        value: countSum({
          data: array,
          compareElFirst: 'salesChannel',
          firstCriteria: market.name,
          compareElSecond: comparison,
          secondCriteria: criteria,
          sumEl: 'quantity',
        }),
      }
    }),
  ]
  const mainMarket = findMax({ list: maxMarket, criteria: 'value' })
  return mainMarket
}
