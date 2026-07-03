import { useGame } from './hooks/useGame'
import Header       from './components/Header/Header'
import ScoreBoard   from './components/ScoreBoard/ScoreBoard'
import TurnDisplay  from './components/TurnDisplay/TurnDisplay'
import Board        from './components/Board/Board'
import ResultOverlay from './components/ResultOverlay/ResultOverlay'
import styles       from './App.module.css'

export default function App() {
  const {
    board,
    currentPlayer,
    winCombo,
    result,
    scores,
    handleCellClick,
    nextRound,
    resetAll,
  } = useGame()

  return (
    <div className={styles.container}>
      <Header />

      <ScoreBoard scores={scores} currentPlayer={currentPlayer} />

      <TurnDisplay currentPlayer={currentPlayer} />

      <div className={styles.boardWrapper}>
        <Board
          board={board}
          winCombo={winCombo}
          onCellClick={handleCellClick}
        />
      </div>

      <div className={styles.controls}>
        <button
          id="btn-new-game"
          className={styles.btnNewGame}
          onClick={nextRound}
        >
          NEW GAME
        </button>
      </div>

      {result && (
        <ResultOverlay
          result={result}
          onNextRound={nextRound}
          onResetAll={resetAll}
        />
      )}
    </div>
  )
}
