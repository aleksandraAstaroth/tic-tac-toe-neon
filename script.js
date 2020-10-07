const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cellElements = document.querySelectorAll('[data-cell]') //select all the cells 
const board = document.getElementById('board');
//selects the winning message div from html
const winningMessagePage = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageText = document.querySelector('[data-winning-message-text]');
let circleTurn;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = false

    //loop that goes through each cell and checks for clicks to handle them (removes X's and 0's and click events from before if game is restarted)
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true }) //activate this event listener ONCE when it's clicked 
    })

    setBoardHoverClass();

    //remove message from the screen when starting new game
    winningMessagePage.classList.remove('show');
}
// function checking which turn it is to activate that classes' mark
function currentClass() {
    if (circleTurn) {
        return CIRCLE_CLASS;
    } else {
        return X_CLASS;
    }
}

function handleClick(e) {
    //cell is a target to click on 
    const cell = e.target;
    currentClass();

    /*place mark in the cell depending who's turn it is,
     check for wins if it's x or circle,
     check if it's draw (end game if it is),
     or switch turns and activate hover effect before next click
     */
    placeMark(cell, currentClass());
    if (checkWIN(currentClass())) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true)
    } else {
        switchTurns();
        setBoardHoverClass();
    }

}

//end game if it's draw // when game ends show winning message who won
function endGame(draw) {
    if (draw) {
        winningMessageText.innerText = 'Draw!'
    } else {
        if (currentClass() == CIRCLE_CLASS) {
            winningMessageText.innerText = "O's Wins";
        } else {
            winningMessageText.innerText = "X's Wins";
        }
    }
    winningMessagePage.classList.add('show')
}

function isDraw() {
    //destructuring into an array
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })

}
//places x or o mark in the cell depending who's turn it is
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)

}
//if it's not circle's turn- then it's x's turn
function switchTurns() {
    circleTurn = !circleTurn;
}

//switches hover effect depending who's turn it is 
function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);

    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);

    }
}
/*function(returns true if any values inside this function are true),
'.some' checking for win through all the possible winning combinations if any combination is met by currentClass-
need to check in the combination if every index(value in the cell element) in that combination has the same class .every),
want to return every cell element of that index.
check in the list if it contains currentClass,
if it contains at least one of the possible winning combination-it's a WIN*/

function checkWIN(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}