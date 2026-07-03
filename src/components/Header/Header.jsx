import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <span className={styles.titleX}>X</span>
        <span className={styles.titleMain}>TIC TAC TOE</span>
        <span className={styles.titleO}>O</span>
      </h1>
      <p className={styles.subtitle}>NEON ARENA</p>
    </header>
  )
}
