import { useContext } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import SearchAddress from "@/components/SearchAddress";
import ForecastContext from "@/context/Forecast";
import dynamic from "next/dynamic";

const ForecastInfo = dynamic(() => import("@/components/ForecastInfo"));
const ErrorMessage = dynamic(() => import("@/components/ErrorMessage"));

export default function Home() {
  const { forecast, isLoading, error, retry } = useContext(ForecastContext);
  return (
    <>
      <Head>
        <title>7 Weather Forecast</title>
        <meta
          name="description"
          content="Get the best 7 weather forecast for your address"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/7weather.jpg" />
      </Head>

      <main>
        <Header />
        <SearchAddress />
        {!isLoading && !error && forecast && (
          <ForecastInfo forecast={forecast} />
        )}
        {!isLoading && error && (
          <ErrorMessage
            message={error?.message}
            ctaLabel="Retry"
            ctaAction={retry}
          />
        )}
      </main>
    </>
  );
}
