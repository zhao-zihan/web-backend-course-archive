"use strict";
module.exports = compare;

function compare(word, guess) {
  word = word.toLowerCase();
  guess = guess.toLowerCase();

  let count = 0;

  for (let char of word) {
    if (guess.includes(char)) {
      count++;
      guess = guess.replace(char, "#");
    }
  }

  return count;
}
