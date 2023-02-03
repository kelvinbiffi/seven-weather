import { useState, createContext, useEffect, useCallback } from 'react'

const ForecastContext = createContext()

export const ForecastProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [coordinates, setCoordinates] = useState('')
  const [forecast, setForecast] = useState()

  const getForecast = useCallback(() => {
    console.log('GET FORECAST FOR', coordinates)
  }, [coordinates])

  useEffect(() => {
    if (coordinates !== '') {
      getForecast()
    }
  }, [coordinates, getForecast])

  const selectCoordinates = (coords) => {
    setCoordinates(coords)
  }

  return (
    <ForecastContext.Provider value={{
      forecast,
      selectCoordinates,
    }}>
      { children }
    </ForecastContext.Provider>
  )
}


export default ForecastContext
