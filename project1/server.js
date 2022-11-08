const express = require("express");
const app = express();
const PORT = 3000;

const uuidv4 = require("uuid").v4;
const cookieParser = require("cookie-parser");

const loginInfo = require("./login-info");
const loginWeb = require("./login-web");
const game = require("./game");
const words = require("./words");

app.use(express.static("./public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  const sid = req.cookies?.sid;

  if (!sid || !loginInfo.isValidSID(sid)) {
    res.clearCookie("sid");
    res.send(loginWeb.loginPage());
    return;
  }

  const username = loginInfo.sessions[sid];

  if (!loginInfo.words[username]) {
    const wordList = game.pickList(words);
    const secretWord = game.pickWord(wordList);
    loginInfo.words[username] = {};

    loginInfo.words[username].wordList = wordList;
    loginInfo.words[username].secretWord = secretWord;
    loginInfo.words[username].guessedWords = {};
  }
  console.log(
    "username: " +
      username +
      "\n" +
      "secret word: " +
      loginInfo.words[username].secretWord
  );

  res.send(loginWeb.loginPage(username));
});

app.post("/login", express.urlencoded({ extended: false }), (req, res) => {
  const username = req.body.username.trim();
  if (!loginWeb.validUsername(username)) {
    res
      .status(403)
      .send(`you entered an invalid username ${loginWeb.generateForm()}`);
    return;
  }
  const sid = uuidv4();
  loginInfo.sessions[sid] = username;
  res.cookie("sid", sid);
  res.redirect("/");
});

app.post("/guess", express.urlencoded({ extended: false }), (req, res) => {
  const guess = req.body.word.trim();
  if (!guess) {
    return;
  }
  const sid = req.cookies?.sid;
  const username = loginInfo.sessions[sid];

  const secretWord = loginInfo.words[username].secretWord;
  const letterMatched = game.compare(secretWord, guess);
  loginInfo.words[username].guessedWords[guess] = letterMatched;
  loginInfo.words[username].lastGuess = guess;

  res.redirect("/");
});

app.post("/logout", express.urlencoded({ extended: false }), (req, res) => {
  const sid = req.cookies?.sid;
  delete loginInfo.sessions[sid];

  res.clearCookie("sid");
  res.redirect("/");
});

app.post("/new-game", express.urlencoded({ extended: false }), (req, res) => {
  const sid = req.cookies?.sid;
  const username = loginInfo.sessions[sid];

  const wordList = game.pickList(words);
  const secretWord = game.pickWord(wordList);
  loginInfo.words[username] = {};

  loginInfo.words[username].wordList = wordList;
  loginInfo.words[username].secretWord = secretWord;
  loginInfo.words[username].guessedWords = {};

  res.redirect("/");
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
