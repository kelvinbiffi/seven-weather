import styles from './style.module.css'

export default function SearchAddress() {
  return (
    <div className={styles.wrapper}>
      <input className={styles.input} placeholder="Ex.: 4600 Silver Hill Rd, Washington, DC 20233" />
    </div>
  )
}
