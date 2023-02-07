import { useState, useEffect, useCallback } from "react";

const useLookup = (address) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [possibleAddresses, setPossibleAddresses] = useState();

  const findPossibleAddresses = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const request = await fetch(`/api/lookup?address=${address}`, {
        method: "GET",
      });
      const response = await request.json();
      if (response.code === 200) {
        setPossibleAddresses(response.results);
        return;
      }

      setError(response);
    } catch (e) {
      setError(e);
      console.warn(`Error: `, e);
    } finally {
      setIsLoading(false);
    }
  }, [address]);

  const clearTips = () => {
    setPossibleAddresses([]);
  };

  useEffect(() => {
    const waitToAutoCompleteAddress = setTimeout(() => {
      if (address !== "") {
        findPossibleAddresses();
        return;
      }

      setError(null);
      clearTips();
    }, 1000);

    return () => {
      clearTimeout(waitToAutoCompleteAddress);
    };
  }, [address, findPossibleAddresses]);

  return {
    error,
    isLoading,
    possibleAddresses,
    clearTips,
  };
};

export default useLookup;
