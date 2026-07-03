import styles from './ScoreBoard.module.css'

export default function ScoreBoard({ scores, currentPlayer }) {
  return (
    <div className={styles.scoreboard}>
      {/* Player X */}
      <div className={`${styles.scoreCard} ${styles.scoreX} ${currentPlayer === 'X' ? styles.activeX : ''}`}>
        <div className={styles.label}>PLAYER X</div>
        <div className={styles.value}>{scores.X}</div>
        <div className={`${styles.dot} ${currentPlayer === 'X' ? styles.dotActive : ''}`} />
      </div>

      {/* Draws */}
      <div className={styles.draws}>
        <div className={styles.label}>DRAWS</div>
        <div className={`${styles.value} ${styles.drawValue}`}>{scores.draws}</div>
      </div>

      {/* Player O */}
      <div className={`${styles.scoreCard} ${styles.scoreO} ${currentPlayer === 'O' ? styles.activeO : ''}`}>
        <div className={styles.label}>PLAYER O</div>
        <div className={styles.value}>{scores.O}</div>
        <div className={`${styles.dot} ${currentPlayer === 'O' ? styles.dotActive : ''}`} />
      </div>
    </div>
  )
}
