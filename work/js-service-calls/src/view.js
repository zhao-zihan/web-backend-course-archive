const { state } = require("./state");

const appEl = document.querySelector(".app");

function renderLoginForm() {
  const html = `
  <form class="form__login">
    <label class="submission-username">
      Login:
      <input class="form__login-input" type="text" name="username" placeholder="Your username here">
    </label>
    <button class="form__login-button" type="submit">Login</button>
    <div class="form__login-error"></div>
  </form>
  `;
  appEl.innerHTML = html;
}

function renderWordView(username) {
  const html = `
  ${displayUsername(username)}
  ${displayLogoutBtn()}
  <div class="stored-word-container">
    ${displayStoredWord()}
  </div>
  ${displayWordForm()}
  `;
  appEl.innerHTML = html;
}

function displayUsername(username) {
  return `
  <p class="word__username"> You are logged in: ${username} </p>
  `;
}

function displayLogoutBtn() {
  return `
  <form class="form__logout" action="/logout" method="POST">
    <button class="form__logout-button" type="submit">Logout</button>
  </form>
  `;
}

function displayStoredWord() {
  return `
  <p class="word__word"> Your stored word is: ${state.storedWord} </p>
  `;
}

function updateStoredWord() {
  const storedWordContainerEl = document.querySelector(
    ".stored-word-container"
  );
  const html = `
  <p class="word__word"> Your stored word is: ${state.storedWord} </p>
  `;
  storedWordContainerEl.innerHTML = html;
}

function displayWordForm() {
  return `
  <form class="form__word">
    <label class="form__word-label">
      Update word:
      <input class="form__word-input" type="text" placeholder="Type in new word">
    </label>
    <button class="form__word-button" type="submit">Update</button>
  </form>
  <div class="form__word-error"></div>
  `;
}

module.exports = {
  renderLoginForm,
  renderWordView,
  updateStoredWord,
};
