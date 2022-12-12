const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;

const game = require("./game");
const sessions = require("./sessions");
const users = require("./users");

app.use(cookieParser());
app.use(express.static("./build"));
app.use(express.json());

// Sessions
app.get("/api/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  res.json({ username });
});

app.post("/api/session", (req, res) => {
  const { username } = req.body;

  if (!users.isValid(username)) {
    res.status(400).json({ error: "required-username" });
    return;
  }

  if (username === "dog") {
    res.status(403).json({ error: "auth-insufficient" });
    return;
  }

  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);

  if (!existingUserData) {
    users.addUserData(username, game.startNewGame());
  }

  res.cookie("sid", sid);
  res.json(users.getUserData(username));
});

app.delete("/api/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";

  if (sid) {
    res.clearCookie("sid");
  }

  if (username) {
    sessions.deleteSession(sid);
  }

  res.json({ username });
});

// Game
app.get("/api/game", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  res.json(users.getUserData(username));
});

app.post("/api/game", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  const { word } = req.body;
  if (!word) {
    res.status(400).json({ error: "required-word" });
    return;
  }
  const gameData = users.getUserData(username);
  if (!gameData.words.includes(word)) {
    res.status(404).json({ error: "impossible-guess" });
    return;
  }
  if (gameData.guessedWords.includes(word)) {
    res.status(409).json({ error: "duplicate-guess" });
    return;
  }
  const exactMatch = gameData.checkIfMatch(word);
  gameData.addGuessedWord(word);
  if (exactMatch) {
    gameData.setGameOver();
  }
  const letterMatched = gameData.compare(word);
  gameData.setLettersMatched(letterMatched);
  gameData.setLastGuess(word);

  res.json({ gameData });
});

app.delete("/api/game", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  const resetData = users.getUserData(username).resetGame();
  users.addUserData(username, resetData);
  const gameData = users.getUserData(username);

  res.json({ gameData });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
