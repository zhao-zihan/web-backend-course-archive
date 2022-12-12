const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

const sessions = require("./sessions");
const users = require("./users");

app.use(cookieParser());
app.use(express.static("./public"));
app.use(express.json());

app.get("/api/v1/session", (req, res) => {
  res.json(sessions);
});

app.get("/api/v1/session/:name", (req, res) => {
  const sid = req.cookies?.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  res.json(username);
});

app.post("/api/v1/session", (req, res) => {
  const { username } = req.body;

  if (!users.isValidUsername(username)) {
    res.status(400).json({ error: "required-username" });
    return;
  }

  if (username.toLowerCase() === "dog") {
    res.status(403).json({ error: "auth-insufficient" });
    return;
  }

  const sid = sessions.addSession(username);

  res.cookie("sid", sid);
  res.json({ username, sid });
});

app.delete("/api/v1/session", (req, res) => {
  const sid = req.cookies?.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";

  if (sid) {
    res.clearCookie("sid");
  }

  if (username) {
    sessions.deleteSession(sid);
  }

  res.json({ wasLoggedIn: !!username });
});

app.get("/api/v1/message", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";

  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  const previousMessages = users.messageFor;

  res.json({ username, previousMessages });
});

app.post("/api/v1/message", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  const { message } = req.body;

  if (!message || message === "") {
    res.status(400).json({ error: "required-message" });
    return;
  }

  if (!users.messageFor[username]) {
    users.messageFor[username] = [];
  }
  const timeStamp = Date.now();
  users.messageFor[username].push({ timeStamp, message });

  res.json({ username, message });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}/`));
