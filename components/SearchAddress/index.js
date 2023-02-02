import { useState, useEffect, useContext } from 'react'
import ForecastContext from '@/context/Forecast'
import useAutocomplete from '@/hooks/useAutocomplete'
import { Roboto } from '@next/font/google'
import styles from './style.module.css'

const roboto = Roboto({ subsets: ['latin'], weight: ['400','500','700'] })

export default function SearchAddress() {
  const { selectAddress } = useContext(ForecastContext)
  const [address, setAddress] = useState('')
  const { possibleAddresses, clearTips, isLoading } = useAutocomplete(address)

  return (
    <div className={styles.wrapper}>
      <input
        className={[roboto.className,styles.input].join(' ')}
        placeholder="Ex.: 4600 Silver Creek Drive, Sherwood (street, city, state)"
        onChange={(e) => { setAddress(e.target.value) }}
        value={address}
      />

      <ul className={styles.addressList}>
        {possibleAddresses.map(pa => {
          const addressToList = `${pa.housenumber ? `${pa.housenumber} ` : ''}${pa.city ? `${pa.city}, ` : ''}${pa.state}, ${pa.state}, ${pa.state_code}`
          return (
            <li
              onClick={() => {
                setAddress(addressToList)
                selectAddress(addressToList)
                clearTips()
              }}
              className={[roboto.className, styles.addressListItem].join(' ')}
              key={pa.place_id}
            >
              {addressToList}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
