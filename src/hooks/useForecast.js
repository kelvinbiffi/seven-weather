import { useState, useEffect, useCallback } from "react";

const useForecast = (coordinates) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [forecast, setForecast] = useState();

  const fetchForecast = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const request = await fetch(
        `/api/forecast?coordinates=${coordinates.y},${coordinates.x}`,
        {
          method: "GET",
        }
      );
      const response = await request.json();
      if (response.code === 200) {
        setForecast(response.forecast);
      } else {
        setError(response);
      }
    } catch (e) {
      setError(e);
      console.warn(`Error: `, e);
    } finally {
      setIsLoading(false);
    }
  }, [coordinates]);

  const clear = () => {
    setForecast(null);
  };

  const retry = () => {
    fetchForecast();
  };

  useEffect(() => {
    if (coordinates?.x && coordinates?.y) {
      fetchForecast();
    }
  }, [coordinates, fetchForecast]);

  return {
    error,
    isLoading,
    forecast,
    retry,
    clear,
  };
};

export default useForecast;
