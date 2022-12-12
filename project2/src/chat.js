const {
  fetchUsers,
  fetchUser,
  fetchLogin,
  fetchLogout,
  fetchGetMessage,
  fetchPostMessage,
} = require("./services");
const view = require("./view");
const sessions = require("./../sessions");
const { state, ERROR_MESSAGE, PAGES } = require("./state");
const appEl = document.querySelector(".app");

let timer;

function init() {
  view.renderLoadingIndicator();

  fetchUser()
    .then(({ username }) => {
      state.currentUser = username;
      return fetchGetMessage();
    })
    .then((response) => {
      view.renderMessageView();
      state.page = PAGES.MESSAGE_VIEW;
      pollUsersAndMessages();
    })
    .catch(({ error }) => {
      view.renderLoginForm();
      state.page = PAGES.LOGIN;
      stopPolling();
      const loginErrorEl = document.querySelector(".form__login-error");
      loginErrorEl.innerText = ERROR_MESSAGE[error] || ERROR_MESSAGE.default;
    });

  appEl.addEventListener("submit", (event) => {
    const loginBtn = event.target.querySelector(".form__login-button");
    const logoutBtn = event.target.querySelector(".form__logout-button");
    const sendMessageBtn = event.target.querySelector(".form__message-button");

    if (loginBtn) {
      event.preventDefault();
      const username = event.target.querySelector(".form__login-input").value;

      fetchLogin(username)
        .then(({ username, sid }) => {
          view.renderLoadingIndicator();
          state.currentUser = username;
          state.allLoginUsers[username] = [sid];
          state.page = PAGES.MESSAGE_VIEW;
          view.renderMessageView();
          pollUsersAndMessages();
        })
        .catch(({ error }) => {
          stopPolling();
          const loginErrorEl = document.querySelector(".form__login-error");
          loginErrorEl.innerText =
            ERROR_MESSAGE[error] || ERROR_MESSAGE.default;
        });
    }

    if (logoutBtn) {
      event.preventDefault();

      fetchLogout()
        .then(() => {
          view.renderLoginForm();
          state.currentUser = "";
          state.page = PAGES.LOGIN;
          stopPolling();
          return fetchUsers();
        })
        .then(({ sessions }) => {
          updateLoginSessionsToState(sessions);
        })
        .catch(({ error }) => {
          const messageViewErrorEl = document.querySelector(
            ".form__message-error"
          );
          messageViewErrorEl.innerText =
            ERROR_MESSAGE[error] || ERROR_MESSAGE.default;
        });
    }

    if (sendMessageBtn) {
      event.preventDefault();
      const messageInput = event.target.querySelector(".form__message-input");
      const message = messageInput.value;

      fetchPostMessage(message)
        .then((response) => {
          messageInput.value = "";
          return fetchGetMessage();
        })
        .then(({ username, previousMessages }) => {
          updateMessagesToState(previousMessages);
        })
        .catch(({ error }) => {
          const messageViewErrorEl = document.querySelector(
            ".form__message-error"
          );
          messageViewErrorEl.innerText =
            ERROR_MESSAGE[error] || ERROR_MESSAGE.default;
        });
    }
  });
}

init();

function updateMessagesToState(previousMessages) {
  state.postedMessages = [];
  Object.keys(previousMessages).forEach((user) => {
    previousMessages[user].forEach(({ timeStamp, message }) => {
      const messageInfo = {};
      messageInfo[timeStamp] = { user, message };
      state.postedMessages.push(messageInfo);
    });
  });
  state.postedMessages = state.postedMessages.sort(
    (a, b) => Object.keys(b)[0] - Object.keys(a)[0]
  );
}

function updateLoginSessionsToState(sessions) {
  state.allLoginUsers = {};
  Object.entries(sessions).forEach(([sid, { username }]) => {
    if (!state.allLoginUsers[username]) {
      state.allLoginUsers[username] = [sid];
    } else if (!state.allLoginUsers[username].includes(sid)) {
      state.allLoginUsers[username].push(sid);
    }
  });
}

function refreshUsers() {
  fetchUsers()
    .then(({ sessions }) => {
      updateLoginSessionsToState(sessions);
      return fetchGetMessage();
    })
    .then(({ username, previousMessages }) => {
      updateMessagesToState(previousMessages);
      view.renderUsersAndMessages();
    })
    .catch((error) => {
      stopPolling();
    });
}

function pollUsersAndMessages() {
  refreshUsers();
  timer = setTimeout(pollUsersAndMessages, 5000);
}

function stopPolling() {
  if (!timer) {
    return;
  }
  clearTimeout(timer);
  timer = null;
}
