import styles from "./style.module.css";

const ForecastInfo = ({ forecast }) => {
  console.log(forecast, "forecast");
  return <div className={styles.forecastInfo}>FORECAST</div>;
};

export default ForecastInfo;
