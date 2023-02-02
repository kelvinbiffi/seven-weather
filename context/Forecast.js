import { useState, createContext, useEffect, useCallback } from 'react'

const ForecastContext = createContext()

export const ForecastProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [address, setAddress] = useState('')
  const [forecast, setForecast] = useState()

  const getForecast = useCallback(() => {
    console.log('GET FORECAST FOR', address)
  }, [address])

  useEffect(() => {
    if (address !== '') {
      getForecast()
    }
  }, [address, getForecast])

  const selectAddress = (address) => {
    setAddress(address)
  }

  return (
    <ForecastContext.Provider value={{
      forecast,
      selectAddress,
    }}>
      { children }
    </ForecastContext.Provider>
  )
}


export default ForecastContext
