let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnIndicator = document.querySelector("#turn-indicator")

let turnO = true;
let filledBoxesCount = 0;
const winPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
];

const resetGame = () => {
    turnO = true;
    filledBoxesCount = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    turnIndicator.innerText = "Current Turn: O";
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O";
            box.style.color = "#30879F";
            turnIndicator.innerText = "Current Turn: X";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "#9A3939";
            turnIndicator.innerText = "Current Turn: O";
            turnO = true;
        }
        box.disabled = true;
        filledBoxesCount++;
        checkWinner();
    });
});

const disabledBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
    turnIndicator.innerText = "";
}

const showDraw = () => {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    turnIndicator.innerText = "";
}

const checkWinner = () => {
    let winnerFound = false;
    for(pattern of winPattern) {
        let posVal1 = boxes[pattern[0]].innerText;
        let posVal2 = boxes[pattern[1]].innerText;
        let posVal3 = boxes[pattern[2]].innerText;

        if(posVal1 != "" && posVal2 != "" && posVal3 != "") {
            if(posVal1 === posVal2 && posVal2 === posVal3) {
                showWinner(posVal1);
                winnerFound = true;
                break;
            }
        }
    }
    if (!winnerFound && filledBoxesCount === boxes.length) {
        showDraw();
        disabledBoxes();
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);