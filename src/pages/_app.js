import "@/styles/globals.css";
import { ForecastProvider } from "@/context/Forecast";

export default function App({ Component, pageProps }) {
  return (
    <ForecastProvider>
      <Component {...pageProps} />
    </ForecastProvider>
  );
}
