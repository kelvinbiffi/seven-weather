import Head from 'next/head'
import Header from '@/components/Header'
import SearchAddress from '@/components/SearchAddress'

export default function Home() {
  return (
    <>
      <Head>
        <title>7 Weather Forecast</title>
        <meta name="description" content="Get the best 7 weather forecast for your address" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/7weather.jpg" />
      </Head>

      <main>
        <Header />
        <SearchAddress />
      </main>
    </>
  )
}
