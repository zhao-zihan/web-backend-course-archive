// This is a sample file that demonstrates
// how you can write an abstraction around
// a fetch() call
// This exported function returns a promise
// that resolves with data
// or rejects with an error object
//
// The caller of this function can decide
// what to do with the data
// or what to do with the error
//
// You can add to this file and use this function
// or write your own files/functions

const view = require("./view");
const { state, ERROR_MESSAGE, PAGES } = require("./state");
const appEl = document.querySelector(".app");

export function fetchLogin(username) {
  return (
    fetch("/api/session/", {
      method: "POST",
      headers: {
        "content-type": "application/json", // set this header when sending JSON in the body of request
      },
      body: JSON.stringify({ username }),
    })
      // fetch() rejects on network error
      // So we convert that to a formatted error object
      // so our caller can handle all "errors" in a similar way
      .catch((err) => Promise.reject({ error: "network-error" }))
      .then((response) => {
        if (!response.ok) {
          // response.ok checks the status code from the service
          // This service returns JSON on errors,
          // so we use that as the error object and reject
          return response.json().then((err) => Promise.reject(err));
        }
        return response.json(); // happy status code means resolve with data from service
      })
  );
}

function fetchUsername() {
  return fetch("/api/session/", {
    method: "GET",
  })
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

function fetchLogout() {
  return fetch("/api/session/", {
    method: "DELETE",
  }).catch((err) => Promise.reject({ error: "network-error" }));
}

function fetchPutWord(word) {
  return fetch("/api/word/", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ word }),
  })
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

function fetchGetWord() {
  return fetch("/api/word/", {
    method: "GET",
  })
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

// ON PAGE LOAD

fetchUsername()
  .then(({ username }) => {
    state.username = username;
    return fetchGetWord();
  })
  .then((response) => {
    const { username, storedWord } = response;
    if (username === state.username) {
      state.storedWord = storedWord;
    }
    view.renderWordView(state.username);
  })
  .catch(({ error }) => {
    view.renderLoginForm();
    const loginErrorEl = document.querySelector(".form__login-error");
    loginErrorEl.innerText = ERROR_MESSAGE[error] || ERROR_MESSAGE.default;
  });

appEl.addEventListener("submit", (event) => {
  const loginBtn = event.target.querySelector(".form__login-button");
  const logoutBtn = event.target.querySelector(".form__logout-button");
  const updateWordBtn = event.target.querySelector(".form__word-button");

  if (loginBtn) {
    event.preventDefault();
    const username = event.target.querySelector(".form__login-input").value;

    fetchLogin(username)
      .then(({ username }) => {
        state.username = username;
        view.renderWordView(username);
        state.page = PAGES.WORD_VIEW;
      })
      .catch(({ error }) => {
        const loginErrorEl = document.querySelector(".form__login-error");
        loginErrorEl.innerText = ERROR_MESSAGE[error] || ERROR_MESSAGE.default;
      });
  }

  if (logoutBtn) {
    event.preventDefault();

    fetchLogout()
      .then(() => {
        view.renderLoginForm();
        state.page = PAGES.LOGIN;
      })
      .catch(({ error }) => {
        const wordViewErrorEl = document.querySelector(".form__word-error");
        wordViewErrorEl.innerText =
          ERROR_MESSAGE[error] || ERROR_MESSAGE.default;
      });
  }

  if (updateWordBtn) {
    event.preventDefault();

    const wordInputEl = document.querySelector(".form__word-input");
    const newWord = wordInputEl.value;

    fetchPutWord(newWord)
      .then((response) => {
        const { username, storedWord } = response;
        state.username = username;
        state.storedWord = storedWord;
        view.updateStoredWord();
        wordInputEl.value = "";
        const wordViewErrorEl = document.querySelector(".form__word-error");
        wordViewErrorEl.innerText = "";
      })
      .catch(({ error }) => {
        const wordViewErrorEl = document.querySelector(".form__word-error");
        wordViewErrorEl.innerText =
          ERROR_MESSAGE[error] || ERROR_MESSAGE.default;
      });
  }
});
