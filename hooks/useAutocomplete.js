import { useState, useEffect } from 'react'

const useAutocomplete = (address) => {
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [possibleAddresses, setPossibleAddresses] = useState([])

  const findPossibleAddresses = async () => {
    setIsLoading(true);
    try {
      const results = await fetch(
        `/api/autocomplete?address=${address}`,
        {
          method: 'GET',
        }
      )
      const addresses = await results.json();
      setPossibleAddresses(addresses)
    } catch (e) {
      setError(e);
      console.warn(`Error: `, e);
    } finally {
      setIsLoading(false);
    }
    
  }

  useEffect(() => {
    const waitToAutoCompleteAddress = setTimeout(() => {
      if (address !== '') {
        findPossibleAddresses();
      }
    }, 1000)

    return () => {
      clearTimeout(waitToAutoCompleteAddress)
    }
  }, [address])

  const clearTips = () => {
    setPossibleAddresses([]);
  }

  return {
    error,
    isLoading,
    possibleAddresses,
    clearTips,
  }
}

export default useAutocomplete