const words = require("./words");

function startNewGame() {
  const gameData = {
    words,
    secretWord: "",
    guessedWords: [],
    lastGuess: "",
    lettersMatched: "",
    gameOver: false,
  };

  gameData.addSecretWord = function addSecretWord() {
    this.secretWord = this.words[Math.floor(Math.random() * this.words.length)];
  };

  gameData.getSecretWord = function getSecretWord() {
    return this.secretWord;
  };

  gameData.checkIfMatch = function checkIfMatch(guess) {
    return this.secretWord === guess;
  };

  gameData.compare = function compare(guess) {
    const wordCounts = this.letterCountsOf(this.secretWord);
    const guessCounts = this.letterCountsOf(guess);

    let matched = 0;

    for (let letter in guessCounts) {
      const wordCount = wordCounts[letter] || 0;
      const guessCount = guessCounts[letter] || 0;
      matched += Math.min(wordCount, guessCount);
    }

    return matched;
  };

  gameData.letterCountsOf = function letterCountsOf(word) {
    const letterCounts = {};

    word
      .toUpperCase()
      .split("")
      .forEach((letter) => {
        letterCounts[letter] = letterCounts[letter] + 1 || 1;
      });

    return letterCounts;
  };

  gameData.addGuessedWord = function addGuessedWord(word) {
    this.guessedWords.push(word);
  };

  gameData.setGameOver = function setGameOver() {
    this.gameOver = true;
  };

  gameData.setLettersMatched = function setLettersMatched(number) {
    this.lettersMatched = number;
  };

  gameData.setLastGuess = function setLastGuess(word) {
    this.lastGuess = word;
  };

  gameData.resetGame = function resetGame() {
    this.secretWord = "";
    this.guessedWords = [];
    this.lastGuess = "";
    this.lettersMatched = "";
    this.gameOver = false;
    this.addSecretWord();
    return this;
  };

  gameData.addSecretWord();

  return gameData;
}

module.exports = {
  startNewGame,
};
