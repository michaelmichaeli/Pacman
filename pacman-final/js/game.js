'use strict';
const WALL = '<img src="img/wall.png" />';
const FOOD = '<span style= "color:red">.</span>';
const EMPTY = ' ';
const SUPERFOOD = '&#127815';
const CHERRY = '🍒';

var gBoard;
var gGame = {
  score: 0,
  isOn: false
};


// CR: we will give functions a name that starts with a verb to indicate that it is an action of some sort
function getFoodCount(){
  // debugger
  var foodCount = 0;
  for (var i = 1 ; i < gBoard.length-1 ; i++){
    for (var j = 1 ; j < gBoard[0].length-1 ; j++) {
      if (document.querySelector("tbody").rows[i].cells[j].innerText === ".") foodCount++;
    }
  }
  return foodCount;
}

function gameOverModal() {
  // Display the modal
  var elModal = document.querySelector("#gameOverModal");
  elModal.style.display = "block";
  // When the user clicks on Play again, close the modal and init game.
  var elBtn = document.querySelector(".modal-content button");
  elBtn.onclick = function () {
    elModal.style.display = "none";
    init();
    }
}
function victoryModal() {
  // Display the modal
  var elModal = document.querySelector("#victoryModal");
  elModal.style.display = "block";
  // When the user clicks on Play again, close the modal and init game.
  var elBtn = document.querySelector("#victoryModal button");
  elBtn.onclick = function () {
    elModal.style.display = "none";
    init();
    }
}

function init() {
  gGame.score = 0;
  gGame.isOn = false;
  gBoard = buildBoard();

  createPacman(gBoard);
  createGhosts(gBoard);
  gIntervalGhosts = setInterval(moveGhosts, 750)

  printMat(gBoard, '.board-container');
  gGame.isOn = true;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

  // Render updated model to the DOM
  rotatePacman(eventKeyboard);
  renderCell(gPacman.location, PACMAN);
  // generateCherry();
  // var cherryInterval = setInterval(generateCherry, 3000);
  setInterval(function(){ generateCherry();}, 3000);
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
      }
    }
  }
  board[1][1] = SUPERFOOD;
  board[SIZE-2][1] = SUPERFOOD;
  board[1][SIZE-2] = SUPERFOOD;
  board[SIZE-2][SIZE-2] = SUPERFOOD;

  
  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
}


function gameOver() {
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
}

function generateCherry(){
  debugger
  var possibleCherryLocations = [];
  for (var index = 1 ; index < gBoard.length - 1 ; index++){
    for (var jindex = 1 ; jindex < gBoard[0].length - 1 ; jindex++){
      if (gBoard[index][jindex] === EMPTY && gBoard[index][jindex] !== SUPERFOOD 
                  && gBoard[index][jindex] !== CHERRY)
      {
          possibleCherryLocations.push({i:index, j:jindex});
      }
    }
  }
  console.log("possibleCherryLocations",possibleCherryLocations);
  
  var randomIndex = getRandomIntInclusive(0,possibleCherryLocations.length-1);
  var randomLocation = possibleCherryLocations[randomIndex];
  var index = randomLocation.i;
  var jindex = randomLocation.j;
  
  // model:
  gBoard[index][jindex] = CHERRY;
  // dom
  renderCell(randomLocation, CHERRY);


    // possibleCherryLocations = [];
  // }, 15000);
  // return;
}

function renderBoard(){
  for (var i = 0 ; i < gBoard.length ; i++){
    for (var j = 0 ; j < gBoard[0].length ; j++){
      renderCell({i,j},gBoard[i][j]);
    }
  }
}