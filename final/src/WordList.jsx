import "./WordList.css";

function WordList({ gameData, listType }) {
  const className =
    listType === "all" ? "word-list__all" : "word-list__guessed";
  const labelText =
    listType === "all" ? "All Possible Words:" : "Guessed Words:";

  const list = gameData.map((word) => {
    return (
      <li className="word-list__item" key={word}>
        {word}
      </li>
    );
  });

  return (
    <div className={`word-list__container ${className}`}>
      <span className="words-list__label">{labelText}</span>
      <ul className="words-list">{list}</ul>
    </div>
  );
}

export default WordList;
