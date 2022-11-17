/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((module) => {

var ERROR_MESSAGE = {
  "auth-missing": "You haven't logged in, please log in",
  "required-username": "Username can only be alphanumeric",
  "auth-insufficient": "Dog can never be a correct username",
  "network-error": "Server unavailable, please try again",
  "required-word": "Word cannot be an empty string",
  "invalid-word": "Word can only contain letters",
  "default": "Something went wrong, please try again"
};
var PAGES = {
  LOGIN: "login",
  WORD_VIEW: "word"
};
var state = {
  username: "",
  storedWord: "",
  page: PAGES.LOGIN
};
module.exports = {
  ERROR_MESSAGE: ERROR_MESSAGE,
  PAGES: PAGES,
  state: state
};

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(/*! ./state */ "./src/state.js"),
  state = _require.state;
var appEl = document.querySelector(".app");
function renderLoginForm() {
  var html = "\n  <form class=\"form__login\">\n    <label class=\"submission-username\">\n      Login:\n      <input class=\"form__login-input\" type=\"text\" name=\"username\" placeholder=\"Your username here\">\n    </label>\n    <button class=\"form__login-button\" type=\"submit\">Login</button>\n    <div class=\"form__login-error\"></div>\n  </form>\n  ";
  appEl.innerHTML = html;
}
function renderWordView(username) {
  var html = "\n  ".concat(displayUsername(username), "\n  ").concat(displayLogoutBtn(), "\n  <div class=\"stored-word-container\">\n    ").concat(displayStoredWord(), "\n  </div>\n  ").concat(displayWordForm(), "\n  ");
  appEl.innerHTML = html;
}
function displayUsername(username) {
  return "\n  <p class=\"word__username\"> You are logged in: ".concat(username, " </p>\n  ");
}
function displayLogoutBtn() {
  return "\n  <form class=\"form__logout\" action=\"/logout\" method=\"POST\">\n    <button class=\"form__logout-button\" type=\"submit\">Logout</button>\n  </form>\n  ";
}
function displayStoredWord() {
  return "\n  <p class=\"word__word\"> Your stored word is: ".concat(state.storedWord, " </p>\n  ");
}
function updateStoredWord() {
  var storedWordContainerEl = document.querySelector(".stored-word-container");
  var html = "\n  <p class=\"word__word\"> Your stored word is: ".concat(state.storedWord, " </p>\n  ");
  storedWordContainerEl.innerHTML = html;
}
function displayWordForm() {
  return "\n  <form class=\"form__word\">\n    <label class=\"form__word-label\">\n      Update word:\n      <input class=\"form__word-input\" type=\"text\" placeholder=\"Type in new word\">\n    </label>\n    <button class=\"form__word-button\" type=\"submit\">Update</button>\n  </form>\n  <div class=\"form__word-error\"></div>\n  ";
}
module.exports = {
  renderLoginForm: renderLoginForm,
  renderWordView: renderWordView,
  updateStoredWord: updateStoredWord
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin)
/* harmony export */ });
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

var view = __webpack_require__(/*! ./view */ "./src/view.js");
var _require = __webpack_require__(/*! ./state */ "./src/state.js"),
  state = _require.state,
  ERROR_MESSAGE = _require.ERROR_MESSAGE,
  PAGES = _require.PAGES;
var appEl = document.querySelector(".app");
function fetchLogin(username) {
  return fetch("/api/session/", {
    method: "PUT",
    headers: {
      "content-type": "application/json" // set this header when sending JSON in the body of request
    },

    body: JSON.stringify({
      username: username
    })
  })
  // fetch() rejects on network error
  // So we convert that to a formatted error object
  // so our caller can handle all "errors" in a similar way
  ["catch"](function (err) {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (response) {
    if (!response.ok) {
      // response.ok checks the status code from the service
      // This service returns JSON on errors,
      // so we use that as the error object and reject
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json(); // happy status code means resolve with data from service
  });
}

function fetchUsername() {
  return fetch("/api/session/", {
    method: "GET"
  })["catch"](function (err) {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchLogout() {
  return fetch("/api/session/", {
    method: "DELETE"
  })["catch"](function (err) {
    return Promise.reject({
      error: "network-error"
    });
  });
}
function fetchPostWord(word) {
  return fetch("/api/word/", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      word: word
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchGetWord() {
  return fetch("/api/word/", {
    method: "GET"
  })["catch"](function (err) {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}

// ON PAGE LOAD

fetchUsername().then(function (_ref) {
  var username = _ref.username;
  state.username = username;
  return fetchGetWord();
}).then(function (response) {
  var username = response.username,
    storedWord = response.storedWord;
  if (username === state.username) {
    state.storedWord = storedWord;
  }
  view.renderWordView(state.username);
})["catch"](function (_ref2) {
  var error = _ref2.error;
  view.renderLoginForm();
  var loginErrorEl = document.querySelector(".form__login-error");
  loginErrorEl.innerText = ERROR_MESSAGE[error] || ERROR_MESSAGE["default"];
});
appEl.addEventListener("submit", function (event) {
  var loginBtn = event.target.querySelector(".form__login-button");
  var logoutBtn = event.target.querySelector(".form__logout-button");
  var updateWordBtn = event.target.querySelector(".form__word-button");
  if (loginBtn) {
    event.preventDefault();
    var username = event.target.querySelector(".form__login-input").value;
    fetchLogin(username).then(function (_ref3) {
      var username = _ref3.username;
      state.username = username;
      view.renderWordView(username);
      state.page = PAGES.WORD_VIEW;
    })["catch"](function (_ref4) {
      var error = _ref4.error;
      var loginErrorEl = document.querySelector(".form__login-error");
      loginErrorEl.innerText = ERROR_MESSAGE[error] || ERROR_MESSAGE["default"];
    });
  }
  if (logoutBtn) {
    event.preventDefault();
    fetchLogout().then(function () {
      view.renderLoginForm();
      state.page = PAGES.LOGIN;
    })["catch"](function (_ref5) {
      var error = _ref5.error;
      var wordViewErrorEl = document.querySelector(".form__word-error");
      wordViewErrorEl.innerText = ERROR_MESSAGE[error] || ERROR_MESSAGE["default"];
    });
  }
  if (updateWordBtn) {
    event.preventDefault();
    var wordInputEl = document.querySelector(".form__word-input");
    var newWord = wordInputEl.value;
    fetchPostWord(newWord).then(function (response) {
      var username = response.username,
        storedWord = response.storedWord;
      state.username = username;
      state.storedWord = storedWord;
      view.updateStoredWord();
      wordInputEl.value = "";
      var wordViewErrorEl = document.querySelector(".form__word-error");
      wordViewErrorEl.innerText = "";
    })["catch"](function (_ref6) {
      var error = _ref6.error;
      var wordViewErrorEl = document.querySelector(".form__word-error");
      wordViewErrorEl.innerText = ERROR_MESSAGE[error] || ERROR_MESSAGE["default"];
    });
  }
});
})();

/******/ })()
;
//# sourceMappingURL=services.js.map