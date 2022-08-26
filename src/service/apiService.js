import axios from 'axios'

export const getData = async (path = '') => {
  return await (await axios.get(`http://localhost:4040/${path}`)).data
}

export const postData = async (path = '', data = {}) => {
  return await (await axios.post(`http://localhost:4040/${path}`, data)).data
}

export const deleteData = async (path = '') => {
  return await (await axios.delete(`http://localhost:4040/${path}`)).data
};

export const getCurrency = async () => {
  return await (await axios.get(`https://api.npoint.io/1e0d9008b27413fc7a72`)).data
}


export const getDays = async () => {
  return await (await axios.get(`https://api.npoint.io/989d2b1672a95c2fe24d`)).data
}
export const postSKU = async (data) => {
  return await (await axios.post(`https://62140f1689fad53b1f099ceb.mockapi.io/api/v3/skuData`, data)).data
}

