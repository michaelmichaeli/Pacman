const PACMAN = '<img id="pacman" src="img/pacman.png" WIDTH=16 HEIGHT=18></img>';


var gPacman;

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  //hitting a CHERRY, update score
  if (nextCell === CHERRY) {
    updateScore(10);
  }

  // Hitting FOOD? update score
  if (nextCell === SUPERFOOD) {
    if (gPacman.isSuper){
      return;
    }
    else {
    updateScore(1);
    gPacman.isSuper = true;
    setTimeout(function () { gPacman.isSuper = false; }, 5000);
    }
  }
  else if (nextCell === FOOD) {
    updateScore(1);
    // debugger
    console.log("getFoodCount", getFoodCount());
    if (getFoodCount() === 1) {                             //LAST FOOD
      renderCell(gPacman.location, EMPTY);
      renderCell(nextLocation, PACMAN);
      gameOver();
      victoryModal();
      return;
    }
  }
  else if (nextCell === GHOST) {
    // debugger
    if (gPacman.isSuper) {
      updateScore(100);
      //search for the right ghost in gGhosts array and delete the right ghost with splice
      for (var index = 0; index < gGhosts.length; index++) {
        if (nextLocation.i === gGhosts[index].location.i && nextLocation.j === gGhosts[index].location.j) {
          gGhosts.splice(index, 1);
        }
      }
      // ghosts eaten are back to life after 5 sec
      setTimeout(() => {
        createGhost(gBoard);
      }, 5000);
    }
    else {
      gameOver()
      renderCell(gPacman.location, EMPTY);
      gameOverModal();
      return;
    }
  }

  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);

  // moveGhosts();

  generateCherry();
}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    default: return null;
  }
  return nextLocation;
}

function rotatePacman(eventKeyboard) {
  switch (eventKeyboard.code) {
    case 'ArrowUp':
      document.querySelector("#pacman").style.transform = "rotate(270deg)";
      break;
    case 'ArrowDown':
      document.querySelector("#pacman").style.transform = "rotate(90deg)";
      break;
    case 'ArrowLeft':
      document.querySelector("#pacman").style.transform = "rotate(180deg)";
      break;
    case 'ArrowRight':
      document.querySelector("#pacman").style.transform = "rotate(0deg)";

      break;
    default: return null;
    // document.querySelector("#pacman").style.transform="rotate(270deg)";
  }
}