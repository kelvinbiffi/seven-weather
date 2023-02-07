import styles from "./style.module.css";
import WeatherCard from "../WeatherCard";

const ForecastInfo = ({ forecast }) => {
  return (
    <div className={styles.forecastInfo}>
      {Object.keys(forecast).map((date) => {
        const dateInfo = forecast[date];

        return <WeatherCard key={date} info={dateInfo} />;
      })}
    </div>
  );
};

export default ForecastInfo;
