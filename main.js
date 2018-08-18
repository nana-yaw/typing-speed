window.addEventListener("load", init);

// Globals

//Game levels
let diffcultyLevel = {
  easy: 5,
  meduim: 3,
  hard: 1
};

//Current Level
let currentLevel = diffcultyLevel.meduim;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
let words;
let wordList;
const wordsUrl =
  "https://raw.githubusercontent.com/words/an-array-of-english-words/master/words.json";

async function init() {
  //console.log("init");

  seconds.innerHTML = time;

  // Start word match
  startMatch();

  //Dispay current word
  showCurrentWord();

  //Match user input with current word displayed
  wordInput.addEventListener("input", startMatch);

  //Show timer countdown
  setInterval(countDown, 1000);

  //Check game status
  setInterval(checkStatus, 50);

  //Reset score
  setInterval(resetScore, 50);
}

async function getWords() {
  try {
    const data = await fetch(wordsUrl);
    const json = await data.json();
    return json.filter(word => word.length > 3);
  } catch (e) {
    console.log(e);
  }
}

// Start word match
function startMatch() {
  if (matchWords()) {
    //The user is stil playing
    isPlaying = true;
    //Add more time
    time = 6;
    //Dispay current word
    showCurrentWord();
    //Clear input field
    wordInput.value = "";
    //Clear message field
    message.innerHTML = "";
    //Increase score value
    score++;
  }
  scoreDisplay.innerHTML = score;
}

//Check if user input matches current word
function matchWords() {
  let wordInputVal = wordInput.value;
  let currentWordVal = currentWord.innerHTML;
  if (wordInputVal === currentWordVal) {
    message.innerHTML = "Correct!!!";
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}

async function showCurrentWord() {
  //Initialize the words array
  const wordsArray = await getWords();
  //Set random number for words array
  const randIndex = Math.floor(Math.random() * wordsArray.length);
  //Display random word to user
  currentWord.innerHTML = wordsArray[randIndex];
}

function countDown() {
  //Check for time
  if (time > 0) {
    //Decrease the value of time by 1 step
    time--;
  } else if (time === 0) {
    //console.log("Game over!");
    isPlaying = false;
  }
  //Show current time
  timeDisplay.innerHTML = time;
}

//Check if Game is over
function checkStatus() {
  if (!isPlaying && time === 0) {
    //Show Game over message
    message.innerHTML = "Game Over!!!";
    score = -1;
  }
}

//If game over,reset the score
function resetScore() {
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  }
}
