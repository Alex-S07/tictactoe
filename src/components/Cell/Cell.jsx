import styles from './Cell.module.css'

export default function Cell({ value, index, isWinner, onClick }) {
  const cellClass = [
    styles.cell,
    value ? styles.taken : '',
    value === 'X' ? styles.cellX : '',
    value === 'O' ? styles.cellO : '',
    isWinner && value === 'X' ? styles.winX : '',
    isWinner && value === 'O' ? styles.winO : '',
  ].filter(Boolean).join(' ')

  return (
    <button
      id={`cell-${index}`}
      className={cellClass}
      onClick={onClick}
      disabled={!!value}
      aria-label={value ? `Cell ${index + 1} - ${value}` : `Cell ${index + 1}`}
      role="gridcell"
    >
      {value}
    </button>
  )
}
