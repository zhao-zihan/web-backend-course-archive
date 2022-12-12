import "./Controls.css";

function Controls({ onLogout, onRefresh, onRestart, setMadeGuess }) {
  function onClick(e) {
    e.preventDefault();
    if (e.target.classList.contains("controls__refresh")) {
      onRefresh();
    }
    if (e.target.classList.contains("controls__logout")) {
      onLogout();
    }
    if (e.target.classList.contains("controls__new-game")) {
      setMadeGuess(false);
      onRestart();
    }
  }

  return (
    <div onClick={onClick} className="controls">
      <button type="submit" className="controls__button controls__refresh">
        Refresh
      </button>
      <button type="submit" className="controls__button controls__logout">
        Logout
      </button>
      <button type="submit" className="controls__button controls__new-game">
        New Game
      </button>
    </div>
  );
}

export default Controls;
