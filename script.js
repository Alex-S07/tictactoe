/**
 * Neon Arena - Tic Tac Toe
 * Game logic: two-player, score tracking, win detection, draw detection
 */

// ============================================================
//  State
// ============================================================

const WINNING_COMBOS = [
  [0, 1, 2], // top row
  [3, 4, 5], // mid row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left col
  [1, 4, 7], // mid col
  [2, 5, 8], // right col
  [0, 4, 8], // diagonal \
  [2, 4, 6], // diagonal /
];

let board        = Array(9).fill(null); // null | 'X' | 'O'
let currentPlayer = 'X';
let gameOver      = false;

const scores = { X: 0, O: 0, draws: 0 };

// ============================================================
//  DOM References
// ============================================================

const cells         = document.querySelectorAll('.cell');
const turnPlayerEl  = document.getElementById('turn-player');
const scoreXEl      = document.getElementById('score-x');
const scoreOEl      = document.getElementById('score-o');
const scoreDrawsEl  = document.getElementById('score-draws');
const scoreXCard    = document.getElementById('score-x-card');
const scoreOCard    = document.getElementById('score-o-card');
const indicatorX    = document.getElementById('indicator-x');
const indicatorO    = document.getElementById('indicator-o');
const resultOverlay = document.getElementById('result-overlay');
const resultIcon    = document.getElementById('result-icon');
const resultMessage = document.getElementById('result-message');
const resultSub     = document.getElementById('result-sub');
const btnNextRound  = document.getElementById('btn-next-round');
const btnResetAll   = document.getElementById('btn-reset-scores');
const btnNewGame    = document.getElementById('btn-new-game');

// ============================================================
//  Initialisation
// ============================================================

function init() {
  board         = Array(9).fill(null);
  currentPlayer = 'X';
  gameOver      = false;

  cells.forEach(cell => {
    cell.textContent   = '';
    cell.className     = 'cell';
    cell.disabled      = false;
    cell.removeAttribute('aria-label');
    cell.setAttribute('aria-label', `Cell ${Number(cell.dataset.index) + 1}`);
  });

  updateTurnDisplay();
  hideResult();
}

function resetAll() {
  scores.X = 0;
  scores.O = 0;
  scores.draws = 0;
  updateScoreBoard();
  init();
}

// ============================================================
//  Game Logic
// ============================================================

function handleCellClick(e) {
  const cell  = e.currentTarget;
  const index = Number(cell.dataset.index);

  if (gameOver || board[index]) return;

  // Place mark
  board[index]     = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken', `cell-${currentPlayer.toLowerCase()}`);
  cell.disabled = true;
  cell.setAttribute('aria-label', `Cell ${index + 1} - ${currentPlayer}`);

  // Check result
  const winCombo = getWinningCombo();

  if (winCombo) {
    highlightWinningCells(winCombo);
    scores[currentPlayer]++;
    updateScoreBoard();
    gameOver = true;
    setTimeout(() => showResult('win', currentPlayer), 600);
    return;
  }

  if (board.every(Boolean)) {
    scores.draws++;
    updateScoreBoard();
    gameOver = true;
    setTimeout(() => showResult('draw'), 400);
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateTurnDisplay();
}

function getWinningCombo() {
  return WINNING_COMBOS.find(([a, b, c]) =>
    board[a] && board[a] === board[b] && board[a] === board[c]
  ) || null;
}

function highlightWinningCells(combo) {
  combo.forEach(i => {
    cells[i].classList.add(`win-${currentPlayer.toLowerCase()}`);
  });
}

// ============================================================
//  UI Updates
// ============================================================

function updateTurnDisplay() {
  const p = currentPlayer;
  turnPlayerEl.textContent = p;
  turnPlayerEl.className   = `turn-player turn-${p.toLowerCase()}`;

  // Active score card highlight
  scoreXCard.classList.toggle('active-x', p === 'X');
  scoreOCard.classList.toggle('active-o', p === 'O');

  // Blinking dot
  indicatorX.classList.toggle('active', p === 'X');
  indicatorO.classList.toggle('active', p === 'O');
}

function updateScoreBoard() {
  scoreXEl.textContent     = scores.X;
  scoreOEl.textContent     = scores.O;
  scoreDrawsEl.textContent = scores.draws;
}

// ============================================================
//  Result Overlay
// ============================================================

const winMessages = {
  X: ['PLAYER X WINS!', 'X DOMINATES!', 'NEON GREEN REIGNS!', 'X IS UNSTOPPABLE!'],
  O: ['PLAYER O WINS!', 'O CONQUERS!', 'NEON RED REIGNS!', 'O IS TRIUMPHANT!'],
};

const winSubs = {
  X: ['The arena glows green...', 'Resistance is futile.', 'A flawless victory.'],
  O: ['The arena burns red...', 'X has been eliminated.', 'Domination achieved.'],
  draw: ['An equal contest.', 'No mercy. No winner.', 'The arena stands divided.'],
};

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function showResult(type, player) {
  resultOverlay.style.setProperty('--result-color',
    type === 'draw' ? '#555' : player === 'X' ? '#39ff14' : '#ff1744'
  );

  if (type === 'win') {
    resultIcon.textContent = player;
    resultIcon.className   = `result-icon icon-${player.toLowerCase()}`;
    resultMessage.textContent = randomPick(winMessages[player]);
    resultSub.textContent     = randomPick(winSubs[player]);
  } else {
    resultIcon.textContent = '—';
    resultIcon.className   = 'result-icon icon-draw';
    resultMessage.textContent = 'IT\'S A DRAW!';
    resultSub.textContent     = randomPick(winSubs.draw);
  }

  resultOverlay.classList.add('visible');
}

function hideResult() {
  resultOverlay.classList.remove('visible');
}

// ============================================================
//  Event Listeners
// ============================================================

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

btnNextRound.addEventListener('click', () => {
  hideResult();
  init();
});

btnResetAll.addEventListener('click', () => {
  hideResult();
  resetAll();
});

btnNewGame.addEventListener('click', () => {
  hideResult();
  init();
});

// ============================================================
//  Boot
// ============================================================

init();
