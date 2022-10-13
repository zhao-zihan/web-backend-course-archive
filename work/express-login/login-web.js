const loginInfo = require("./login-info");

const loginWeb = {
  loginPage: function (username) {
    return `
    <!doctype html>
    <html>
      <head>
        <title>Login</title>
        <link rel="stylesheet" href="/login.css">
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
      ${this.displayStoredWord(username)}
    `;
  },

  displayStoredWord(username) {
    return `
    <p class="username-word"> Your stored word is: ${
      username in loginInfo.words ? loginInfo.words[username] : ""
    } </p>
    <form class="submissions word" action="/word" method="POST">
      <label class="submission-word">
        Modify word:
        <input type="text" name="word" placeholder="Type in new word">
      </label>
      <button class="word-button" type="submit">Submit</button>
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
