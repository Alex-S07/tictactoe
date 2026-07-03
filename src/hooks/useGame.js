import { useState, useCallback } from 'react'

// All 8 winning combinations
export const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6],             // diagonals
]

function getWinningCombo(board) {
  return WINNING_COMBOS.find(
    ([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]
  ) ?? null
}

const WIN_MESSAGES = {
  X: ['PLAYER X WINS!', 'X DOMINATES!', 'NEON GREEN REIGNS!', 'X IS UNSTOPPABLE!'],
  O: ['PLAYER O WINS!', 'O CONQUERS!', 'NEON RED REIGNS!',   'O IS TRIUMPHANT!'],
}

const WIN_SUBS = {
  X:    ['The arena glows green...', 'Resistance is futile.', 'A flawless victory.'],
  O:    ['The arena burns red...',   'X has been eliminated.', 'Domination achieved.'],
  draw: ['An equal contest.',        'No mercy. No winner.', 'The arena stands divided.'],
}

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

const emptyBoard = () => Array(9).fill(null)

export function useGame() {
  const [board, setBoard]               = useState(emptyBoard)
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const [gameOver, setGameOver]         = useState(false)
  const [winCombo, setWinCombo]         = useState(null)
  const [result, setResult]             = useState(null) // { type, player, message, sub }
  const [scores, setScores]             = useState({ X: 0, O: 0, draws: 0 })

  const handleCellClick = useCallback((index) => {
    if (gameOver || board[index]) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    const combo = getWinningCombo(newBoard)

    if (combo) {
      setWinCombo(combo)
      setGameOver(true)
      setScores(s => ({ ...s, [currentPlayer]: s[currentPlayer] + 1 }))
      setTimeout(() => {
        setResult({
          type: 'win',
          player: currentPlayer,
          message: pick(WIN_MESSAGES[currentPlayer]),
          sub:     pick(WIN_SUBS[currentPlayer]),
        })
      }, 600)
      return
    }

    if (newBoard.every(Boolean)) {
      setGameOver(true)
      setScores(s => ({ ...s, draws: s.draws + 1 }))
      setTimeout(() => {
        setResult({
          type:    'draw',
          player:  null,
          message: "IT'S A DRAW!",
          sub:     pick(WIN_SUBS.draw),
        })
      }, 400)
      return
    }

    setCurrentPlayer(p => p === 'X' ? 'O' : 'X')
  }, [board, currentPlayer, gameOver])

  const nextRound = useCallback(() => {
    setBoard(emptyBoard())
    setCurrentPlayer('X')
    setGameOver(false)
    setWinCombo(null)
    setResult(null)
  }, [])

  const resetAll = useCallback(() => {
    setBoard(emptyBoard())
    setCurrentPlayer('X')
    setGameOver(false)
    setWinCombo(null)
    setResult(null)
    setScores({ X: 0, O: 0, draws: 0 })
  }, [])

  return {
    board,
    currentPlayer,
    gameOver,
    winCombo,
    result,
    scores,
    handleCellClick,
    nextRound,
    resetAll,
  }
}
