const ERROR_MESSAGE = {
  "auth-missing": "You haven't logged in, please log in",
  "required-username": "Username can only be alphanumeric",
  "auth-insufficient": "Dog can never be a correct username",
  "network-error": "Server unavailable, please try again",
  "required-word": "Word cannot be an empty string",
  "invalid-word": "Word can only contain letters",
  default: "Something went wrong, please try again",
};

const PAGES = {
  LOGIN: "login",
  WORD_VIEW: "word",
};

const state = {
  username: "",
  storedWord: "",
  page: PAGES.LOGIN,
};

module.exports = {
  ERROR_MESSAGE,
  PAGES,
  state,
};
