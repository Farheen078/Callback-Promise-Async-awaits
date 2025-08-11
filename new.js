// ------------------- Selecting Elements -------------------

// Select all 9 boxes
let boxes = document.querySelectorAll(".box");

// Select reset button
let resetbtn = document.querySelector(".reset");

// Select new game button
let newGameBtn = document.querySelector("#new-game");

// Select message container (winner message)
let msgContainer = document.querySelector(".msg-container");

// Select message text where winner name will be shown
let msg = document.querySelector("#msg");

// Boolean variable to track whose turn it is
// true = O's turn, false = X's turn
let turno = true;

// ------------------- Winning Patterns -------------------
// Each sub-array contains indexes of 3 boxes that make a win
const winpatterns = [
    [0,1,2], // Top row
    [0,3,6], // Left column
    [0,4,8], // Diagonal from top-left
    [1,4,7], // Middle column
    [2,5,8], // Right column
    [2,4,6], // Diagonal from top-right
    [3,4,5], // Middle row
    [6,7,8]  // Bottom row
];

// ------------------- Game Reset Function -------------------
// This function restarts the game
const resetGame = () => {
    turno = true;           // O starts first
    enableBoxes();          // Allow clicking all boxes
    msgContainer.classList.add("hide"); // Hide the winner message
};

// ------------------- Box Click Event -------------------
// Loop through all boxes and add click event listener
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // If it's O's turn
        if(turno){
            box.innerText = "O";
            turno = false; // Next turn will be X's
        } 
        // If it's X's turn
        else {
            box.innerText = "X";
            turno = true; // Next turn will be O's
        }

        // Disable the clicked box so player can't click it again
        box.disabled = true;

        // After every click, check if someone has won
        checkwinner();
    });
});

// ------------------- Disable All Boxes -------------------
const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true; // Prevent clicking
    }
};

// ------------------- Enable All Boxes -------------------
const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false; // Allow clicking
        box.innerText = "";   // Remove O or X
    }
};

// ------------------- Show Winner -------------------
const showWinner = (winner) => {
    // Display message with winner's name
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide"); // Show message box
    disableBoxes(); // Stop further moves after win
};

// ------------------- Check for Winner -------------------
const checkwinner = () => {
    // Loop through all winning patterns
    for(let pattern of winpatterns){
        // Get the values (O or X) in the 3 positions of the pattern
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        // Check if all 3 positions are not empty
        if(pos1 !== "" && pos2 !== "" && pos3 !== ""){
            // If all three are same (either O or X), we have a winner
            if(pos1 === pos2 && pos2 === pos3){
                showWinner(pos1); // Pass the winner to the showWinner function
                return; // Stop checking further patterns
            }
        }
    }
};

// ------------------- Event Listeners for Buttons -------------------
// When "New Game" is clicked
newGameBtn.addEventListener("click", resetGame);

// When "Reset" is clicked
resetbtn.addEventListener("click", resetGame);
