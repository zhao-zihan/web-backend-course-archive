const { state, ERROR_MESSAGE, PAGES } = require("./state");

const appEl = document.querySelector(".app");

function renderLoadingIndicator() {
  const html = `
    <p class="loading__indicator">Loading...</p>
  `;

  appEl.innerHTML = html;
}

function renderLoginForm() {
  const html = `
  <form class="form__login">
    <label class="form__login-label">
      Login:
      <input class="form__login-input" type="text" name="username" placeholder="Your username here">
    </label>
    <button class="form__login-button" type="submit">Login</button>
    <div class="form__login-error"></div>
  </form>
  `;
  appEl.innerHTML = html;
}

function renderMessageView() {
  const html = `
    <div class="users__container">

      ${renderCurrentUsers()}
    </div>
    <div class="messages__container">

      ${renderPostedMessages()}
    </div>
    <div class="user__container">
      ${displayUsername()}
      ${displayLogoutBtn()}
      ${displayMessageForm()}
  `;
  appEl.innerHTML = html;
}

function renderUsersAndMessages() {
  const usersContainerEl = document.querySelector(".users__container");
  const messagesContainerEl = document.querySelector(".messages__container");
  const currentUserEl = document.querySelector(".word__username");
  const userHtml = renderCurrentUsers();
  const messageHtml = renderPostedMessages();
  const usernameHtml = displayUsername();

  usersContainerEl.innerHTML = userHtml;
  messagesContainerEl.innerHTML = messageHtml;
  currentUserEl.innerHTML = usernameHtml;
}

function renderCurrentUsers() {
  const listHtml = Array.from(Object.keys(state.allLoginUsers))
    .map((name) => {
      return `
      <li class="user">
        <span class="user__name">${name}</span>
      </li>
    `;
    })
    .join("");

  const html = `
    <h2 class="users__heading">Current Logged-in Users: </h2>
    <ul class="users">${listHtml}</ul>
  `;

  return html;
}

function renderPostedMessages() {
  const listHtml = state.postedMessages
    .map((el) => {
      const messageInfo = Object.values(el)[0];
      return `
      <li class="message">
        <span class="message__sender">${messageInfo.user}: </span>
        <span class="message__text">${messageInfo.message}</span>
      </li>
    `;
    })
    .join("");

  const html = `
    <h2 class="messages__heading">Previous Messages: </h2>
    <ul class="messages">${listHtml}</ul>
  `;

  return html;
}

function displayUsername() {
  return `
  <p class="word__username"> You are logged in: ${state.currentUser} </p>
  `;
}

function displayLogoutBtn() {
  return `
  <form class="form__logout">
    <button class="form__logout-button" type="submit">Logout</button>
  </form>
  `;
}

function displayMessageForm() {
  return `
  <form class="form__message">
    <label class="form__message-label">
      Send message:
      <input class="form__message-input" type="text" placeholder="Type in new message">
    </label>
    <button class="form__message-button" type="submit">Send</button>
  </form>
  <div class="form__message-error"></div>
  `;
}

module.exports = {
  renderLoadingIndicator,
  renderLoginForm,
  renderMessageView,
  renderUsersAndMessages,
  renderCurrentUsers,
  renderPostedMessages,
};
