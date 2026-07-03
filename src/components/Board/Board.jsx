import Cell from '../Cell/Cell'
import styles from './Board.module.css'

export default function Board({ board, winCombo, onCellClick }) {
  return (
    <div className={styles.board} role="grid" aria-label="Tic Tac Toe board">
      {board.map((value, index) => (
        <Cell
          key={index}
          index={index}
          value={value}
          isWinner={winCombo?.includes(index) ?? false}
          onClick={() => onCellClick(index)}
        />
      ))}
    </div>
  )
}
