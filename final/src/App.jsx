import logo from "./logo.svg";
import { useState, useEffect } from "react";
import "./App.css";

import { LOGIN_STATUS, CLIENT, SERVER } from "./constants";
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchGameData,
  fetchRestartGame,
  fetchMakeGuess,
} from "./services";
import Loading from "./Loading";
import LoginForm from "./LoginForm";
import Status from "./Status";
import Controls from "./Controls";
import Game from "./Game";
import GuessWordForm from "./GuessWordForm";

function App() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING); // one variable covers multiple cases
  const [isGamePending, setIsGamePending] = useState(false);
  const [lastGuessedWord, setLastGuessedWord] = useState("");
  const [guessedWords, setGuessedWords] = useState([]);
  const [allWords, setAllWords] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [lettersMatched, setLettersMatched] = useState("0");
  const [madeGuess, setMadeGuess] = useState(false);

  function updateState(gameData) {
    setLastGuessedWord(gameData.lastGuess);
    setAllWords([...gameData.words]);
    setGuessedWords([...gameData.guessedWords]);
    setGameOver(gameData.gameOver);
    setLettersMatched(gameData.lettersMatched);
  }

  function onLogin(username) {
    setIsGamePending(true);
    fetchLogin(username)
      .then((fetchedGameData) => {
        setError("");
        updateState(fetchedGameData);
        setIsGamePending(false);
        setUsername(username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
        setIsGamePending(false);
      });
  }

  function onLogout() {
    setError("");
    setUsername("");
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setLastGuessedWord("");
    fetchLogout().catch((err) => {
      setError(err?.error || "ERROR");
    });
  }

  function onRefresh() {
    setError("");
    setIsGamePending(true);
    fetchGameData()
      .then((gameData) => {
        updateState(gameData);
        setIsGamePending(false);
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
      });
  }

  function onMakeGuess(word) {
    setError("");

    fetchMakeGuess(word)
      .then(({ gameData }) => {
        updateState(gameData);
        if (gameOver) {
          setLettersMatched("");
        }
      })
      .catch((err) => {
        setLettersMatched("");
        setError(err?.error || "ERROR");
      });
  }

  function onRestart() {
    setError("");
    setIsGamePending(true);
    fetchRestartGame()
      .then(() => {
        return fetchGameData();
      })
      .then((gameData) => {
        updateState(gameData);
        console.log("secret word: " + gameData.secretWord);
        setIsGamePending(false);
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
      });
  }

  function checkForSession() {
    fetchSession()
      .then((session) => {
        setUsername(session.username);
        return fetchGameData();
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION });
        }
        return Promise.reject(err);
      })
      .then((gameData) => {
        updateState(gameData);
        if (gameOver) {
          setLettersMatched("");
        }
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        console.log("secret word: " + gameData.secretWord);
      })
      .catch((err) => {
        if (err?.error === CLIENT.NO_SESSION) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          return;
        }
        setError(err?.error || "ERROR");
      });
  }

  useEffect(() => {
    checkForSession();
  }, []);

  return (
    <div className="app">
      <main className="main">
        {loginStatus === LOGIN_STATUS.PENDING && (
          <Loading className="login__waiting">Loading user...</Loading>
        )}
        {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
          <LoginForm onLogin={onLogin} error={error} />
        )}
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="content">
            <p className="login__info">Hello, {username}</p>
            <Controls
              onLogout={onLogout}
              onRefresh={onRefresh}
              onRestart={onRestart}
              setMadeGuess={setMadeGuess}
            />
            <Game
              isGamePending={isGamePending}
              guessedWords={guessedWords}
              allWords={allWords}
              gameOver={gameOver}
              lettersMatched={lettersMatched}
              lastGuessedWord={lastGuessedWord}
            />
            <Status
              error={error}
              gameOver={gameOver}
              lettersMatched={lettersMatched}
              lastGuessedWord={lastGuessedWord}
              madeGuess={madeGuess}
            />

            <GuessWordForm
              onMakeGuess={onMakeGuess}
              setMadeGuess={setMadeGuess}
              setLastGuessedWord={setLastGuessedWord}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
