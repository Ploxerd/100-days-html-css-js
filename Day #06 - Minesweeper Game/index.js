const resetBtn = document.getElementById("reset");
const gameBoard = document.getElementById("the-board");
const gameTimeEl = document.getElementById("timer");
const mineCounter = document.getElementById("mine-counter");

let grid = [];
let columns = 10, rows = 10;
let gameEnded = false;
let gameStarted = false;
let timerId;

generateGrids();

// Keeps a value between min and max
const clamp = (min, value, max) => Math.min(Math.max(value, min), max);

// Starts the game timer if gameStarted is true
function gameTimer(speed, condition, multiplier) {
    if (!condition) return;
    
    timerId = setInterval(() => {
        gameTimeEl.textContent = String(parseInt(gameTimeEl.textContent) + multiplier).padStart(3,"0");   
        let currentTime = parseInt(gameTimeEl.textContent); 

        if (currentTime >= 999) clearInterval(timerId);
    }, speed);
}

// Creates the grid buttons and sets up event listeners
function generateGrids() { 
    for (let col = 0; col < columns; col++) {
        grid[col] = [];
        for (let row = 0; row < rows; row++) {
            const buttonEl = document.createElement("button");
            grid[col][row] = buttonEl;
            buttonEl.classList.add("cell");
            
            buttonEl.addEventListener("mousedown", (e) => {
                if (!gameStarted) {
                    const buttonList = Array.from(gameBoard.querySelectorAll("button"));
                    const clickedIndex = buttonList.indexOf(e.currentTarget);
                    
                    gameStarted = true;
                    gameTimer(1000, gameStarted, 1);
                    generateMines(clickedIndex);
                }
                
                if (e.button === 0) {
                    // Left click: reveal cell
                    e.currentTarget.style.border = "inset 1px gray";
                    e.currentTarget.disabled = true;
                    checkForMines(col, row);

                    if (e.currentTarget.getAttribute("alt") === "mine") {
                        // Hit a mine, show all mines and alert
                        e.currentTarget.style.backgroundColor = "red";
                        e.currentTarget.innerHTML = "";
                        revealMines();
                        alert("Oops");
                    }
                }

                if (e.button === 2) {
                    // Right click: toggle mark
                    if (e.currentTarget.id === "") {
                        e.currentTarget.innerHTML = "X";
                        e.currentTarget.id = "marked";
                        markedSpot(-1);
                    } else {
                        e.currentTarget.innerHTML = "";
                        e.currentTarget.id = "";
                        markedSpot(1);
                    }
                } 
            });

            gameBoard.append(buttonEl);
        }
    }
}

// Updates mine counter display when marking/unmarking spots
function markedSpot(currentAmount) {
    let newAmount = parseInt(mineCounter.textContent) + currentAmount;
    newAmount = clamp(0, newAmount, 10);
    mineCounter.textContent = String(newAmount).padStart(3,"0");
}

// Randomly places mines while avoiding the first clicked cell
function generateMines(clickedIndex) {
    const placeMines = Array.from(gameBoard.children);
    const bombIndexes = new Set([clickedIndex]);

    while (bombIndexes.size < 11) {
        const MineAtIndex = Math.floor(Math.random() * placeMines.length);
        bombIndexes.add(MineAtIndex);
    }

    mineCounter.textContent = String(bombIndexes.size - 1).padStart(3,"0");
    
    bombIndexes.forEach(index => {
        if (index !== clickedIndex) {
            placeMines[index].setAttribute("alt", "mine");
        }
    });
}

// Shows all mines by coloring them red
function revealMines() {
    let allButtonEl = Array.from(gameBoard.children);
    allButtonEl.forEach(el => {
        if (el.getAttribute("alt") === "mine") {
            el.style.backgroundColor = "red";
            el.style.border = "inset 1px gray";
            gameEnded = true;
        }
    });
}

// Checks if all non-mines cells are revealed, if yes, player wins!
function checkGameCompletion() {
    let gameCompleted = true;
    for (let col = 0; col < columns; col++) {
        for (let row = 0; row < rows; row++) {
            if ((grid[col][row].getAttribute("alt") !== "mine") && 
                grid[col][row].innerHTML === "") {
                gameCompleted = false;
            }
        }
    }
    if (gameCompleted) {
        alert("Congrats, You succeeded!");
        revealMines();
    }
}

// Counts nearby mines and reveals emtpy ones surrounding it
function checkForMines(col, row) {
    if (gameEnded) return;

    let mineCount = 0;
    for (let i = Math.max(col - 1, 0); i <= Math.min(col + 1, columns - 1); i++) {
        for (let j = Math.max(row - 1, 0); j <= Math.min(row + 1, rows - 1); j++) {
            if (grid[i][j].getAttribute("alt") === "mine") {
                mineCount++;
            }
        }
    }
    grid[col][row].innerHTML = mineCount;
    
    if (mineCount === 0) {
        for (let i = Math.max(col - 1, 0); i <= Math.min(col + 1, columns - 1); i++) {
            for (let j = Math.max(row - 1, 0); j <= Math.min(row + 1, rows - 1); j++) {
                if (grid[i][j].innerHTML === "") {
                    grid[i][j].style.border = "inset 1px gray";
                    grid[i][j].disabled = true;
                    checkForMines(i, j);
                }
            }
        }
    }
    checkGameCompletion();
}