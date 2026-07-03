import styles from './TurnDisplay.module.css'

export default function TurnDisplay({ currentPlayer }) {
  return (
    <div className={styles.turnDisplay}>
      <span className={styles.label}>CURRENT TURN:</span>
      <span className={`${styles.player} ${currentPlayer === 'X' ? styles.playerX : styles.playerO}`}>
        {currentPlayer}
      </span>
    </div>
  )
}
