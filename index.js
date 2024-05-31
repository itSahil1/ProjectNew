const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
   
];

//lets create the function to initialise the game

function initGame() {
  currentPlayer = "x";
  gameGrid = ["", "", "", "", "","","","",""];
  // empty in UI also
   boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    // initialize box with css properties again
    box.classList = `box box${index+1}`;
   });
  newGameBtn.classList.remove("active");

  gameInfo.innerText =  `Current Player- ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if(currentPlayer === "x") {
        currentPlayer = "O"
    }
    else{
        currentPlayer = "x"
    }

    gameInfo.innerText = `Current Player- ${currentPlayer}`;
}
function checkGameOver() {
   let answer = "";

   winningPositions.forEach((position) => {
    // all three boxes be non empty and same in value af all three box
     if((gameGrid[position[0]] !=="" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !=="")
     && (gameGrid[position[0]] === gameGrid[position[1]]) 
    && ( gameGrid[position[1]] === gameGrid[position[2]])) {
      
        // check if winner is x
        if(gameGrid[position[0]] === "x")
        answer = "x";

        else
            answer = "O";

            // disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
        // now we know x/O is a winner

        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");

    }
   });
     
   // it means we have a winner
   if(answer !=="")  {
      gameInfo.innerText = `Winner Player - ${answer}`;
      newGameBtn.classList.add("active");
      return;
   }

   // lets check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !=="" )
        fillCount++;
    });
     // board is filled, game is TIE
     if(fillCount === 9) {

        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
     }
}


function handleClick(index) {
    if(gameGrid[index] ==="") {
        boxes[index].innerText = currentPlayer;  // for UI change
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap for turn
        swapTurn();
        // check for winner
        checkGameOver();


    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);



