import { Roboto } from "@next/font/google";
import styles from "./style.module.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

const ErrorMessage = ({ message, ctaLabel, ctaAction }) => {
  return (
    <p className={[roboto.className, styles.errorMessage].join(" ")}>
      {message}
      {ctaLabel && ctaAction && (
        <>
          <br />
          <button className={styles.cta} type="" onClick={ctaAction}>
            {ctaLabel}
          </button>
        </>
      )}
    </p>
  );
};

export default ErrorMessage;
