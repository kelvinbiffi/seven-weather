import { useState, useContext, useRef } from 'react'
import ForecastContext from '@/context/Forecast'
import useAutocomplete from '@/hooks/useAutocomplete'
import { Roboto } from '@next/font/google'
import styles from './style.module.css'

const roboto = Roboto({ subsets: ['latin'], weight: ['400','500','700'] })

export default function SearchAddress() {
  const { selectCoordinates } = useContext(ForecastContext)
  const [address, setAddress] = useState('')
  const { possibleAddresses, clearTips, isLoading } = useAutocomplete(address)

  const tipInput = useRef();

  const copyTipAddress = () => {
    const tipInputElement = tipInput.current;
    console.log(tipInputElement, 'tipInputElement');
    tipInputElement.select();
    tipInputElement.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(tipInputElement.value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchField}>
        <input
          className={[roboto.className,styles.input].join(' ')}
          placeholder="Ex.: 4600 Silver Creek Drive, Sherwood (street, city, state)"
          onChange={(e) => { setAddress(e.target.value) }}
          value={address}
        />

        <ul className={styles.addressList}>
          {possibleAddresses.map(pa => (
              <li
                onClick={() => {
                  selectCoordinates(pa.coordinates)
                  clearTips()
                }}
                className={[roboto.className, styles.addressListItem].join(' ')}
                key={pa.id}
              >
                {pa.address}
              </li>
            ))}
        </ul>
      </div>

      <p className={roboto.className}>
        Try:
        <input
          ref={tipInput}
          readOnly
          className={[roboto.className, styles.tipAddress].join(' ')}
          value='4600 Silver Creek Drive, Sherwood'
        />
        <button
          className={styles.copyButton}
          type='button'
          onClick={copyTipAddress}
        >
            copy
        </button>
      </p>
    </div>
  )
}
