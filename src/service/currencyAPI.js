import axios from 'axios'

const options = {
  headers: {
    apikey: '7d9Ayf1vdUdIvwLTBI8KXHJkuqT2nB3A',
  },
}

export const getDataCurrency = async (
  symbols = ['USD', 'EUR', 'GBP', 'CAD', 'SEK'],
  base = 'PLN',
) => {
  const { data } = await axios.get(
    `https://api.apilayer.com/exchangerates_data/latest?symbols=${symbols}&base=${base}`,
    options,
  )
  return data
}
