const loginInfo = require("./login-info");
const words = require("./words");
const game = require("./game");

const loginWeb = {
  loginPage: function (username) {
    return `
    <!doctype html>
    <html>
      <head>
        <title>Login</title>
        <link rel="stylesheet" href="/game.css">
      </head>
      <body>
        <div id="login-app">
          ${
            username
              ? loginWeb.displayLoginInfo(username)
              : loginWeb.generateForm()
          }
        </div>
      </body>
    </html>
    `;
  },

  displayLoginInfo(username) {
    return `
      ${this.displayUsername(username)}
      ${this.displayLogoutBtn()}
      <div class=lists-container>
      ${this.displayPossibleWords(username)}
      ${this.displayPreviousGuess(username)}
      </div>
      ${this.displayMessage(username)}
      ${this.displayStoredWord(username)}
      ${this.displayNewGameButton()}
    `;
  },

  displayPossibleWords(username) {
    return (
      `<ul class="possible-words">
      <p class="possible-title"> Possible words </p>
      ` +
      Object.values(loginInfo.words[username].wordList)
        .map(
          (message) => `
        <li id="${message}">
          <p class="possible-word"> ${message}</p>
        </li>
      `
        )
        .join("") +
      `</ul>`
    );
  },

  displayPreviousGuess(username) {
    return (
      `<ul class="guessed-words">
        <div class="previous-titles">
          <p class="guessed-title"> Previous guess </p>
          <p class="guessed-matched"> Letter matched </p>
        </div>
        ` +
      Object.entries(loginInfo.words[username].guessedWords)
        .map(
          ([key, val] = entry) => `
          <li id="${key}">
            <div class="previous-container">
              <p class="previous-guess"> ${key}</p>
              <p class="letter-matched"> ${val}</p>
            </div>
          </li>
        `
        )
        .join("") +
      `</ul>`
    );
  },

  displayMessage(username) {
    return loginInfo.words[username].lastGuess
      ? `<p class="guess-message"> ${
          game.exactMatch(
            loginInfo.words[username].lastGuess,
            loginInfo.words[username].secretWord
          )
            ? "You won!!"
            : "Wrong guess, please continue."
        }`
      : "";
  },

  displayStoredWord(username) {
    return `
      <p class="last-guess-text"> Your last guess is: ${
        loginInfo.words[username].lastGuess
          ? loginInfo.words[username].lastGuess
          : ""
      } </p>
      <form class="submissions word" action="/guess" method="POST">
        <label class="submission-word">
          Make a guess:
          <input type="text" name="word" placeholder="Make a guess">
        </label>
        <button class="word-button" type="submit">Submit</button>
      </form>
    `;
  },

  displayNewGameButton() {
    return `
    <form class="submissions new-game" action="/new-game" method="POST">
      <label class="submission-new" for="new-game">
        Start a new game:
      </label>
      <button class="new-button" type="submit" id="new-game">New Game</button>
    </form>
    `;
  },

  displayLogoutBtn() {
    return `
    <div class="logout-container">
      <form class="submission-logout" action="/logout" method="POST">
        <button class="logout-button" type="submit">Logout</button>
      </form>
    </div>
    `;
  },

  displayUsername: function (username) {
    return `
      <p class="login-text"> You are logged in: ${username} </p>
    `;
  },

  generateForm: function () {
    return `
    <form class="submissions login" action="/login" method="POST">
      <label class="submission-username">
        Login:
        <input type="text" name="username" placeholder="Your username here">
      </label>
      <button class="login-button" type="submit">Login</button>
    </form>
      `;
  },

  validUsername: function (username) {
    return username && username != "dog" && /^[A-Za-z0-9]*$/.test(username);
  },
};

module.exports = loginWeb;
