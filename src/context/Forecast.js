import { useState, createContext } from "react";
import useForecast from "@/hooks/useForecast";

const ForecastContext = createContext();

export const ForecastProvider = ({ children }) => {
  const [coordinates, setCoordinates] = useState();
  const { isLoading, error, forecast } = useForecast(coordinates);
  const selectCoordinates = (coords) => {
    setCoordinates(coords);
  };

  return (
    <ForecastContext.Provider
      value={{
        error,
        isLoading,
        forecast,
        selectCoordinates,
      }}
    >
      {children}
    </ForecastContext.Provider>
  );
};

export default ForecastContext;
