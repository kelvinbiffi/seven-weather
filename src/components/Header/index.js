import Image from "next/image";
import { Roboto } from "@next/font/google";
import styles from "./style.module.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function Header() {
  return (
    <header className={styles.header}>
      <Image
        className={styles.logo}
        src="/7weather.jpg"
        alt="7 Weather Logo"
        width={80}
        height={80}
        priority
      />
      <h1 className={[roboto.className, styles.title].join(" ")}>
        <span>7 Weather Forecast</span>
      </h1>
    </header>
  );
}
