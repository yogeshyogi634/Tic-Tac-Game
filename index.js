const cells = document.querySelectorAll("td");
const turn = document.querySelector("#turn");
const result = document.querySelector("#result");
const restart = document.querySelector("#restart");
let currentPlayer = "X";
let moves = 0;
let gameOver = false;
let board = ["", "", "", "", "", "", "", "", ""];

// function to check for a win
function checkWin() {
    const wins = [
        "012",
        "345",
        "678",
        "036",
        "147",
        "258",
        "048",
        "246"
    ];
    for (let i = 0; i < wins.length; i++) {
        const [a, b, c] = wins[i];
        if (
            board[a] === board[b] &&
            board[b] === board[c] &&
            board[a] !== ""
        ) {
            return true;
        }
    }
    return false;
}

// function to check if game ends in a draw
function checkDraw() {
    if (moves === 9 && !checkWin()) {
        return true;
    }
    return false;
}

// function to display turn
function displayTurn() {
    turn.textContent = `Current Turn: ${currentPlayer}`;
}

// function to display winner or draw
function displayResult() {
    if (checkWin()) {
        result.textContent = `Player ${currentPlayer} Wins!`;
    } else if (checkDraw()) {
        result.textContent = "It's a Draw!";
    }
}

// function to update board
function updateBoard() {
    board.forEach((cell, i) => {
        cells[i].textContent = cell;
    });
}

// function to restart game
function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    moves = 0;
    gameOver = false;
    currentPlayer = "X";
    result.textContent = "";
    updateBoard();
    displayTurn();
}

// event listener for cell clicks
cells.forEach((cell, i) => {
    cell.addEventListener("click", () => {
        if (!gameOver && board[i] === "") {
            board[i] = currentPlayer;
            moves++;
            updateBoard();
            if (checkWin() || checkDraw()) {
                displayResult();
                gameOver = true;
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                displayTurn();
            }
        }
    });
})

// event listener for restart button
restart.addEventListener("click", restartGame);