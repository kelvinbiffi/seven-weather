import Image from "next/image";
import { Roboto } from "@next/font/google";
import { useState } from "react";
import styles from "./style.module.css";
import Toggle from "../Toggle";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

const WeatherCard = ({ info }) => {
  const [period, setPeriod] = useState("day");

  const togglePeriod = () => {
    setPeriod((s) => (s === "day" ? "night" : "day"));
  };

  const weatherInfo = info[period];

  const {
    name,
    icon,
    shortForecast,
    temperature,
    temperatureUnit,
    detailedForecast,
  } = weatherInfo;

  return (
    <div className={styles.weatherCard}>
      <div
        className={[
          styles.weatherContent,
          period === "day" ? styles.dayInfo : styles.nightInfo,
        ].join(" ")}
      >
        <div className={styles.toggleWrapper}>
          <Toggle onChange={togglePeriod} active={period === "night"} />
        </div>
        <Image
          className={styles.icon}
          src={icon}
          alt={`${shortForecast} image icon`}
          width={80}
          height={80}
          priority
        />
        <h2 className={[roboto.className, styles.name].join(" ")}>
          {name && <div>{name}</div>}
        </h2>
        <p className={[roboto.className, styles.temperature].join(" ")}>
          {temperature} <span className={styles.unit}>{temperatureUnit} °</span>
        </p>
        <p className={[roboto.className, styles.detailed].join(" ")}>
          {detailedForecast}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
