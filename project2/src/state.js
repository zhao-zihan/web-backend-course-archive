const ERROR_MESSAGE = {
  "auth-missing": "You haven't logged in, please log in",
  "required-username": "Username can only be alphanumeric",
  "auth-insufficient": "Dog can never be a correct username",
  "network-error": "Server unavailable, please try again",
  "required-message": "Word cannot be an empty string",
  default: "Something went wrong, please try again",
};

const PAGES = {
  LOGIN: "login",
  MESSAGE_VIEW: "message",
};

const state = {
  currentUser: "",
  allLoginUsers: {},
  postedMessages: [],
  page: PAGES.LOGIN,
};

module.exports = {
  ERROR_MESSAGE,
  PAGES,
  state,
};
