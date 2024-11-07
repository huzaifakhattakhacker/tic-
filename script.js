let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;
let botPlayer = 'O';

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const turnElement = document.getElementById('turn');
    const resetButton = document.getElementById('reset');

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (gameOver || gameBoard[index] !== '') return;

            gameBoard[index] = currentPlayer;
            cell.textContent = currentPlayer;

            checkWinner();
            updateTurn();

            currentPlayer = currentPlayer === 'X' ? botPlayer : 'X';

            setTimeout(() => {
                botTurn();
            }, 1000);
        });
    });

    resetButton.addEventListener('click', resetGame);

    updateTurn();
});

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c] && gameBoard[a] !== '') {
            gameOver = true;
            alert(`Player ${gameBoard[a]} wins!`);
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameOver = true;
        alert('It\'s a draw!');
    }
}

function updateTurn() {
    const turnElement = document.getElementById('turn');
    turnElement.textContent = `Turn: ${currentPlayer}`;
}

function botTurn() {
    const emptyCells = [];
    gameBoard.forEach((cell, index) => {
        if (cell === '') {
            emptyCells.push(index);
        }
    });

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameBoard[randomIndex] = botPlayer;
    document.getElementById(`cell-${randomIndex}`).textContent = botPlayer;

    checkWinner();
    updateTurn();

    currentPlayer = 'X';
}

function resetGame() {
    gameBoard = ['',]};