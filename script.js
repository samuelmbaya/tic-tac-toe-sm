// Select all HTML elements with class "box" (the Tic-Tac-Toe grid cells) and store them in the boxes variable as a NodeList
let boxes = document.querySelectorAll(".box");

// Initialize the current player's turn to "X" (X starts first)
let turn = "X";

// Initialize a flag to track if the game is over (win or draw condition met)
let isGameOver = false;

// Loop through each box element in the NodeList using forEach
boxes.forEach(e => {
    // Clear the inner HTML of each box to start with an empty board
    e.innerHTML = ""
    // Add a click event listener to each box
    e.addEventListener("click", () => {
        // Check if the game is not over and the clicked box is empty before allowing a move
        if(!isGameOver && e.innerHTML === ""){
            // Place the current player's mark (X or O) in the clicked box
            e.innerHTML = turn;
            // Check if the current move results in a win
            cheakWin();
            // Check if the current move results in a draw
            cheakDraw();
            // Switch the turn to the other player
            changeTurn();
        }
    })
})

// Function to switch between players X and O, and update the background indicator
function changeTurn(){
    // If it's currently X's turn, switch to O and move the background slider to the right (85px)
    if(turn === "X"){
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    }
    // Otherwise, switch back to X and move the background slider to the left (0px)
    else{
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}

// Function to check for a win condition after each move (note: function name has a typo, should be "checkWin")
function cheakWin(){
    // Define all possible winning combinations as an array of index triplets for the 3x3 grid
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Horizontal rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Vertical columns
        [0, 4, 8], [2, 4, 6]               // Diagonals
    ]
    // Loop through each winning condition
    for(let i = 0; i<winConditions.length; i++){
        // Get the inner HTML (marks) from the three boxes in the current winning condition
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        // Check if all three boxes are non-empty and have the same mark
        if(v0 != "" && v0 === v1 && v0 === v2){
            // Set game over flag to true
            isGameOver = true;
            // Display the winning message with the current player's mark
            document.querySelector("#results").innerHTML = turn + " win";
            // Show the "Play Again" button
            document.querySelector("#play-again").style.display = "inline"

            // Loop through the three winning boxes and highlight them (note: 'j' variable not declared with 'let', potential issue)
            for(j = 0; j<3; j++){
                // Set background color to teal for winning cells
                boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6"
                // Set text color to black for better visibility on highlighted background
                boxes[winConditions[i][j]].style.color = "#000"
            }
        }
    }
}

// Function to check for a draw condition after each move (note: function name has a typo, should be "checkDraw")
function cheakDraw(){
    // Only check for draw if the game is not already over
    if(!isGameOver){
        // Assume it's a draw initially
        let isDraw = true;
        // Loop through all boxes to check if any are still empty
        boxes.forEach(e =>{
            // If any box is empty, it's not a draw
            if(e.innerHTML === "") isDraw = false;
        })

        // If all boxes are filled and no win occurred, it's a draw
        if(isDraw){
            // Set game over flag to true
            isGameOver = true;
            // Display draw message
            document.querySelector("#results").innerHTML = "Draw";
            // Show the "Play Again" button
            document.querySelector("#play-again").style.display = "inline"
        }
    }
}

// Add a click event listener to the "Play Again" button to reset the game
document.querySelector("#play-again").addEventListener("click", ()=>{
    // Reset game over flag to false
    isGameOver = false;
    // Reset turn to X
    turn = "X";
    // Reset background slider to starting position
    document.querySelector(".bg").style.left = "0";
    // Clear the results message
    document.querySelector("#results").innerHTML = "";
    // Hide the "Play Again" button
    document.querySelector("#play-again").style.display = "none";

    // Loop through all boxes to reset them
    boxes.forEach(e =>{
        // Clear the inner HTML of each box
        e.innerHTML = "";
        // Remove any custom background color (reset to default)
        e.style.removeProperty("background-color");
        // Reset text color to white
        e.style.color = "#fff"
    })
})