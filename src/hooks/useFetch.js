import { useEffect, useState } from 'react'

export const useFetch = ({ apiState, fetchAPI, param }) => {
  const [state, setState] = useState([])

  useEffect(() => {
    apiState.pending()
    fetchAPI(param)
      .then((data) => {
        setState(data)
        apiState.success()
      })
      .catch((err) => apiState.error())
  }, [apiState, fetchAPI, param])

  return state
}
