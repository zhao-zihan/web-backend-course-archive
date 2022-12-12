import { MESSAGES } from "./constants";
import "./Status.css";

function Status({
  error,
  gameOver,
  lettersMatched,
  lastGuessedWord,
  madeGuess,
  login,
}) {
  const message = MESSAGES[error] || MESSAGES.default;
  return (
    <div className="game__messages">
      {!login && <span className="game__messages-label">Message Area:</span>}
      {lastGuessedWord && (
        <span className="game__message game__lastGuessed">
          Last Guessed Word: {lastGuessedWord}
        </span>
      )}
      {madeGuess && (
        <span className="game__message">
          Your Guess Matched {lettersMatched ? lettersMatched : 0} Letters of
          the Secret Word
        </span>
      )}
      {error && <span className="game__message">{error && message}</span>}
      {gameOver && (
        <span className="game__message game-over__message">
          Your Guess Was Correct!
        </span>
      )}
    </div>
  );
}

export default Status;
