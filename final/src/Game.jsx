import Loading from "./Loading";
import WordList from "./WordList";
import "./Game.css";

function Game({ guessedWords, allWords, isGamePending }) {
  const SHOW = {
    PENDING: "pending",
    GAME: "game",
  };

  let show;
  if (isGamePending) {
    show = SHOW.PENDING;
  } else {
    show = SHOW.GAME;
  }

  const LIST_TYPE = {
    ALL: "all",
    GUESSED: "guessed",
  };

  return (
    <div className="game">
      {show === SHOW.PENDING && (
        <Loading className="game__pending">Loading Game...</Loading>
      )}
      {show === SHOW.GAME && (
        <>
          <div className="game__lists">
            <WordList gameData={allWords} listType={LIST_TYPE.ALL} />
            <WordList gameData={guessedWords} listType={LIST_TYPE.GUESSED} />
          </div>
        </>
      )}
    </div>
  );
}

export default Game;
