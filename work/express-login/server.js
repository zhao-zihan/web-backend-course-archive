const express = require("express");
const app = express();
const PORT = 3000;

const uuidv4 = require("uuid").v4;
const cookieParser = require("cookie-parser");

const loginInfo = require("./login-info");
const loginWeb = require("./login-web");

app.use(express.static("./public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  const sid = req.cookies?.sid;
  if (!sid) {
    res.clearCookie("sid");
    res.send(loginWeb.loginPage());
    return;
  }

  const username = loginInfo.sessions[sid];
  res.send(loginWeb.loginPage(username));
});

app.post("/login", express.urlencoded({ extended: false }), (req, res) => {
  const username = req.body.username.trim();
  if (!loginWeb.validUsername(username)) {
    res
      .status(403)
      .send(`invalid username <a href="/">Go back to homepage</a>`);
    return;
  }
  const sid = uuidv4();
  loginInfo.sessions[sid] = username;
  res.cookie("sid", sid);
  res.redirect("/");
});

app.post("/word", express.urlencoded({ extended: false }), (req, res) => {
  const newWord = req.body.word.trim();
  if (!newWord) {
    return;
  }
  const sid = req.cookies?.sid;
  const username = loginInfo.sessions[sid];
  loginInfo.words[username] = newWord;
  res.redirect("/");
});

app.post("/logout", express.urlencoded({ extended: false }), (req, res) => {
  const sid = req.cookies?.sid;
  const username = loginInfo.sessions[sid];
  delete loginInfo.sessions.username;
  res.clearCookie("sid");
  res.redirect("/");
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
