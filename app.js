// get elements
const game = document.querySelector("#game"),
  guessInput = document.querySelector("#guess-input"),
  guessBtn = document.querySelector("#guess-btn"),
  message = document.querySelector(".message-text"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  scoreDisplay = document.querySelector("#score");

// console.log(game, guessInput, guessBtn, message);

// user variables
let min = 1,
  max = 10,
  winningNumber = getRandomNum(min, max),
  guessesLeft = 3,
  score = 0;
guessArray = [];
console.log(winningNumber);

// min max values are sent to UI
minNum.textContent = min;
maxNum.textContent = max;

// detect guess
guessBtn.addEventListener("click", () => {
  // get input value
  let guess = parseInt(guessInput.value); // get value as number

  if (guessInput.value === "" || isNaN(guess)) {
    setMessage(`Enter a number please`, "aliceblue");
    guessInput.value.clear();
  } else {
    // check for duplicate values
    if (checkDuplicateValue(guess, guessArray)) {
      setMessage(`You've already guessed ${guess}`, "rebeccapurple");
      guessInput.value = "";
      return;
    }
    guessArray.push(guessInput.value);
    console.log(guessArray)

    if (guess === winningNumber) {
      // you win
      gameOver(true, `YOU WIN! Right Number: ${winningNumber}`);
      guessBtn.textContent = "Play Again";
      guessBtn.addEventListener("click", refreshPage);
    } else {
      // you lost
      guessesLeft--;
      if (guessesLeft === 0) {
        gameOver(false, `You lost! True guess: ${winningNumber} Try again`);
        guessBtn.textContent = "Try Again";
        guessBtn.addEventListener("click", refreshPage);
      } else {
        // you can guess again
        // checkDuplicateValue();
        guessInput.value = "";
        let messageText = `${guess} is not correct, `;
        if (guess > winningNumber) {
          messageText += `too high!`;
        } else {
          messageText += `too low!`;
        }
        setMessage(`${messageText} You have ${guessesLeft} guess`, "red");
      }
    }
  }
});

// functions
function getRandomNum(min, max) {
  let random = Math.floor(Math.random() * (max - min + 1) + min);
  return random;
}

function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}

function gameOver(won, msg) {
  let color = won ? "green" : "red";
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  guessInput.style.backgroundColor = color;
  setMessage(msg);
  guessInput.value = "";
  score += 10;
  scoreDisplay.textContent = score;
}

function refreshPage() {
  document.getElementById("guess-btn").type = "submit";
  location.reload();
}

function checkDuplicateValue() {
  if (guessArray.indexOf(guessInput.value) !== -1) {
    console.log(guessArray)
    return true;
  } else {
    return false;
    console.log(guessArray)
  }
}

window.addEventListener('keydown', (e) => {
  console.log(e.code)
if(e.code === 'Enter' && guessInput.value !== "") {
  guessBtn.click();
}
})
