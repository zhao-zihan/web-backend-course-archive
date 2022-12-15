export const LOGIN_STATUS = {
  PENDING: "pending",
  NOT_LOGGED_IN: "notLoggedIn",
  IS_LOGGED_IN: "loggedIn",
};

export const SERVER = {
  AUTH_MISSING: "auth-missing",
  AUTH_INSUFFICIENT: "auth-insufficient",
  REQUIRED_USERNAME: "required-username",
  REQUIRED_TASK: "required-word",
  DUPLICATE_GUESS: "duplicate-guess",
  IMPOSSIBLE_GUESS: "impossible-guess",
  TASK_MISSING: "noSuchId",
};

export const CLIENT = {
  NETWORK_ERROR: "networkError",
  NO_SESSION: "noSession",
};

export const MESSAGES = {
  [CLIENT.NETWORK_ERROR]:
    "Trouble connecting to the network.  Please try again",
  [SERVER.AUTH_INSUFFICIENT]:
    "Your username/password combination does not match any records, please try again.",
  [SERVER.REQUIRED_USERNAME]:
    "Please enter a valid (letters and/or numbers) username",
  [SERVER.REQUIRED_TASK]: "Please enter your guess of word",
  default: "Something went wrong.  Please try again",
  [SERVER.DUPLICATE_GUESS]:
    "You already guessed this word, please choose a new one",
  [SERVER.IMPOSSIBLE_GUESS]: "Your guess was not from the possible words list",
};
