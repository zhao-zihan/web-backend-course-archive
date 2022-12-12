import { useState } from "react";
import "./LoginForm.css";
import Status from "./Status";

function LoginForm({ onLogin, error }) {
  const [username, setUsername] = useState("");

  function onChange(e) {
    setUsername(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (username) {
      onLogin(username);
    }
  }

  return (
    <div className="login">
      <form className="login__form" action="#/login" onSubmit={onSubmit}>
        <label className="login__form-label">
          <span className="login__label-text">Username:</span>
          <input
            className="login__form-input"
            value={username}
            onChange={onChange}
            placeholder="Your username here"
          />
        </label>
        <button className="login__form-button" type="submit">
          Login
        </button>
      </form>
      <Status error={error} login={true} />
    </div>
  );
}

export default LoginForm;
