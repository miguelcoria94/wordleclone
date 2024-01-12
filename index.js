// fetch the word ✅

// create the elements and make sure you number them style them
/*
<div class="row-1">
  <input class="row-1-input-1"
</div>
*/

import { wordList } from "./words.js";



let gameOver = false;
let word = wordList[Math.floor(Math.random() * 30)];

async function init() {
  let wordToGuess = "";
  let round = 0;


let showHintElement = document.querySelector(".hint");
showHintElement.addEventListener('click', () => {
  let hintElement = document.querySelector(".show-hint");
  hintElement.innerHTML = `Hint: ${word.hint}`
  console.log(hintElement)
})

  wordToGuess = word.word
  console.log(wordToGuess)
  

  createElements();
  startGame(round, wordToGuess);
}

init();

function createElements() {
  for (let i = 0; i < 6; i++) {
    let gameGrid = document.getElementById("game-grid");
    let row = document.createElement("div");
    row.classList.add(`row-${i}`);
    row.classList.add("row");

    for (let j = 0; j < 5; j++) {
      let input = document.createElement("input");
      input.classList.add(`letter`);
      input.disabled = true;
      row.appendChild(input);
    }
    gameGrid.appendChild(row);
  }
}

function startGame(round, wordToGuess) {
  if(round > 6 || gameOver){
    return
  }
  let needToFinish = 5;
  let row = document.querySelector(`.row-${round}`);
  let wordToCheck = "";
  for (let i = 0; i < row.children.length; i++) {
    let input = row.children[i];
    row.children[0].focus();
    input.disabled = false;
    input.addEventListener("keyup", (event) => {
      input.disabled = true;
      event.target.value = event.target.value.toUpperCase();
      wordToCheck += event.target.value;

      if (wordToCheck.length === 5) {
        if (checkWordAndUpdateStyles(wordToGuess, wordToCheck, round)) {
          let inputs = document.querySelectorAll("input");
          for (let input of inputs) {
            input.disabled = true;
          }
          return;
          return;
        } else {
          if (round < 5) {
            startGame(round + 1, wordToGuess);
          }
        }
      }

      row.children[i + 1].focus();

      needToFinish = needToFinish - 1;
    });
  }

  // do something style the current row and do something to each input focus the next input focus()

  // start next round
}

function checkWordAndUpdateStyles(wordToGuess, wordToCheck, round) {
  let rowToEdit = document.querySelector(`.row-${round}`);
  if (wordToGuess.toLowerCase() === wordToCheck.toLowerCase()) {
    for (let i = 0; i < rowToEdit.children.length; i++) {
      let input = rowToEdit.children[i];
      if (input.value.toLowerCase() == wordToGuess[i].toLowerCase()) {
        input.classList.add("correctletter");
      }
    }
    gameOver = true;
    return true;
  } else {
    for (let i = 0; i < rowToEdit.children.length; i++) {
      let input = rowToEdit.children[i];
      if (input.value.toLowerCase() == wordToGuess[i].toLowerCase()) {
        input.classList.add("correctletter");
      } else {
        if (wordToGuess.includes(input.value.toLowerCase())) {
          input.classList.add("yellowletter");
        }
      }
    }
    return false;
  }
}
