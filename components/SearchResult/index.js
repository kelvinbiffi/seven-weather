import { Roboto } from '@next/font/google'
import styles from './style.module.css'

const roboto = Roboto({ subsets: ['latin'], weight: ['400','500','700'] })

const SearchResult = ({error, isLoading, addresses, onItemClick}) => {
  return (
    <div className={styles.searchResult}>
      {isLoading && (
        <div className={[roboto.className, styles.message].join(' ')}>
          Loading...
        </div>
      )}

      {error && (
        <div className={[roboto.className, styles.message, styles.error].join(' ')}>
          {error?.message}
        </div>
      )}

      {!!addresses?.length && !error && (
        <ul className={styles.addressList}>
          {addresses.map(address => (
              <li
                onClick={() => { onItemClick(address) }}
                className={[roboto.className, styles.addressListItem].join(' ')}
                key={address.id}
              >
                {address.address}
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}

export default SearchResult