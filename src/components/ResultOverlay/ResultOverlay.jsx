import styles from './ResultOverlay.module.css'

export default function ResultOverlay({ result, onNextRound, onResetAll }) {
  if (!result) return null

  const isX    = result.player === 'X'
  const isO    = result.player === 'O'
  const isDraw = result.type === 'draw'

  const accentColor = isDraw ? '#555' : isX ? '#39ff14' : '#ff1744'

  return (
    <div className={styles.overlay} role="dialog" aria-live="polite" aria-modal="true">
      <div
        className={styles.box}
        style={{ '--accent': accentColor }}
      >
        {/* Icon */}
        <div className={`${styles.icon} ${isX ? styles.iconX : isO ? styles.iconO : styles.iconDraw}`}>
          {isDraw ? '—' : result.player}
        </div>

        {/* Message */}
        <div className={styles.message}>{result.message}</div>
        <div className={styles.sub}>{result.sub}</div>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            id="btn-next-round"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={onNextRound}
          >
            NEXT ROUND
          </button>
          <button
            id="btn-reset-all"
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={onResetAll}
          >
            RESET ALL
          </button>
        </div>
      </div>
    </div>
  )
}
