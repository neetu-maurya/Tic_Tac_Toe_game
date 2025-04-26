let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".resetbtn");
let newGameBtn = document.querySelector(".new-game");
let msgContainer = document.querySelector(".msg-Container");
let msg = document.querySelector(".msg");
let turnO = true; // true => O's turn, false => X's turn

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6], // fixed typo here
  [6, 7, 8],
  [3, 4, 5],
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      // Player O
      box.innerText = "O";
      box.style.color = "#E63462"; // Pinkish-red for O
      turnO = false;
    } else {
      // Player X
      box.innerText = "X";
      box.style.color = "#4169E1"; // Royal blue for X
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.color = ""; // Reset text color
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}!`;
  msgContainer.classList.remove("hide");
};

const showDraw = () => {
  msg.innerText = `It's a Draw!`;
  msgContainer.classList.remove("hide");
};

const checkWinner = () => {
  let winnerFound = false;

  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        winnerFound = true;
        disableBoxes();
        showWinner(pos1Val);
        break;
      }
    }
  }

  // Check for Draw (if no winner and all boxes filled)
  if (!winnerFound) {
    let allFilled = true;
    boxes.forEach((box) => {
      if (box.innerText === "") {
        allFilled = false;
      }
    });

    if (allFilled) {
      disableBoxes();
      showDraw();
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
