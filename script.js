//Selects all HTML elements with the class "box" (the Tic-Tac-Toe) grid cells) and stores them in the boxes variable.
let boxes = querySelectorAll(".box");

//Initializes the current players turn (X starts first)
let turn = "X";

//Initializes a flag to track if the game is over (win/draw condition)
let isGameOver = false;

//Loop through each box element using forEach
boxes.forEach(e => {
    //Clears the innerHTML of each box to start with an empty board
    e.innerHTML = "";
    //Adds a click event listener to each box
    e.addEventListener("click", () =>{
        //Check if the game is not over and the clicked box is empty before a move is made
        if(isGameOver && e.innerHTML === ""){
            //Place the current playes mark (X/0) in the clicked box
            e.innerHTML = turn;
            //Check if the current move results in a win
            checkWin();
            //Check if the current move results in a draw
            checkDraw();
            //Switch the turn to the other player
            changeTurn();
        }
    })
})

//Function to switch between players X&O and update thre background indicator
function changeTurn(){
    //If its currently X's turn, switch to O and move the background indicator to the right by 85px
    if(turn === "X"){
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    }
    //Otherwise, switch back to X and mmove the background indicator to the left 0px
    else{
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}

//Function to check for a win condition after each move
function checkWin(){
    //Define all possible win combinations as an array of index triplets for 3x3 grid
    let winConditions = [
        [0,1,2],[3,4,5],[6,7,8],  //Horizontal Rows
        [0,3,6],[1,4,7],[2,5,8],  //Vertical Rows
        [0,4,8],[2,4,6]          //Diagonal Rows
    ]
    //Loop through each winning condition
    for(let i = 0; i < winConditions; i++){
        //Get the innerHTML (marks) from the 3 boxes in the current winning condition
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        //Checks if all the boxes are non-empty and have the same mark
        if (v0 != "" && v0 === v1 && v0 === v2){
            //Set game over flag to true
            isGameOver = true;
            //Display the winning message with the current players mark
            document.querySelector("#results").innerHTML = turn + "win";
            //Show the "Play-Again" button
            document.querySelector("play-again").style.display = "inline";

            //Loop through the 3 winning boxes and higlight them
            for(let j = 0; j<3; j++){
                //Set the background color to teal for winning cells
                boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6"
                //Set the text color to black for better visibility on highlighted background
                boxes[winConditions[i][j]].style.color = "#000"
            }

        }
    }
}

//Function to check for a draw condition after each move
function checkDraw(){
    //Only check for a draw if the game is not over
    if(!isGameOver){
        //Assume is draw initially
        let isDraw = true;
        //Loop through all boxes to check if any are still empty
        boxes.forEach(e => {
            //If any boxes are empty, its not a draw
            if(e.innerHTML === "") isDraw = false;
        })

        //If all boxes are filled and no win occured, its a draw
        if(isDraw){
            //Set game over flag to true
            isGameOver = true;
            //Display draw message
            document.querySelector("#results").innerHTML = "Draw"
            //Show the "Play-Again" button
            document.querySelector("#play-again").style.display = "inline"
        }
    }
}

//Add a click event listener to the "Play Again" button to reset the game
document.querySelector("#play-again").addEventListener("click", ()=>{
    //Reset game over flag to false
    isGameOver = false;
    //Reset turn to X
    turn = "X";
    //Reset background slider to original position
    document.querySelector(".bg").style.left = "0";
    //Clear result message
    document.querySelector("#results").innerHTML = "";
    //Hide play again button
    document.querySelector("#play-again").style.display = "none";

    //Loop through all boxes to reset them
    boxes.forEach (e => {
        //Clear the inner HTML for each box
        e.innerHTML = "";
        //Reset backgorund color
        e.stlye.removeProperty("background-color");
        //Reset text color to white
        e.style.color = "#fff"
    })
})