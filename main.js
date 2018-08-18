// Globals
let time = 5;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
const wordsUrl =
  "https://raw.githubusercontent.com/words/an-array-of-english-words/master/words.json";
let words;

fetch(wordsUrl)
  .then(function(response) {
    return response.json();
  })
  .then(data => {
    // words = data;
    console.log(data);
  })
  .catch(function(err) {
    // Error :(
    console.log("Something went wrong");
  });

if (!words) {
  console.log(words);
} else {
  console.log("No words available");
}
