const words = require("./words");

const game = {
  exactMatch(word, guess) {
    return word.toUpperCase() === guess.toUpperCase();
  },

  pickList(words) {
    const randomStart = Math.floor(Math.random() * 9);
    return words.splice(randomStart, 12);
  },

  pickWord(words) {
    return words[Math.floor(Math.random() * words.length)];
  },

  compare(word, guess) {
    const wordCounts = this.letterCountsOf(word);
    const guessCounts = this.letterCountsOf(guess);

    let matched = 0;

    for (let letter in guessCounts) {
      const wordCount = wordCounts[letter] || 0;
      const guessCount = guessCounts[letter] || 0;
      matched += Math.min(wordCount, guessCount);
    }

    return matched;
  },

  letterCountsOf(word) {
    const letterCounts = {};

    word
      .toUpperCase()
      .split("")
      .forEach((letter) => {
        letterCounts[letter] = letterCounts[letter] + 1 || 1;
      });

    return letterCounts;
  },
};

module.exports = game;
