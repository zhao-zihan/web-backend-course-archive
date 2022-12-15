import { useState } from "react";
import "./GuessWordForm.css";

function GuessWordForm({ onMakeGuess, setLastGuessedWord, setMadeGuess }) {
  const [word, setWord] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    setLastGuessedWord(word);
    setWord("");
    onMakeGuess(word);
    setMadeGuess(true);
  }

  function onTyping(e) {
    setWord(e.target.value.toLowerCase());
  }

  return (
    <form className="guess__form" action="#/guess" onSubmit={onSubmit}>
      <input
        className="guess__form-input"
        value={word}
        onChange={onTyping}
        placeholder="Enter Your Guess Here"
      />
      <button type="submit" className="guess__form-button">
        Guess
      </button>
    </form>
  );
}

export default GuessWordForm;
