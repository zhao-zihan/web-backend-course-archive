/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PAGES": () => (/* binding */ PAGES),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var PAGES = {
  PRODUCTS: "products",
  CART: "cart"
};
var state = {
  cats: [{
    name: "Fluffball",
    imageUrl: "http://placekitten.com/150/150?image=1",
    price: 0.99,
    quantity: 0
  }, {
    name: "Meyhem",
    imageUrl: "http://placekitten.com/150/150?image=2",
    price: 3.14,
    quantity: 0
  }, {
    name: "Alice",
    imageUrl: "http://placekitten.com/150/150?image=3",
    price: 2.73,
    quantity: 0
  }],
  page: PAGES.PRODUCTS,
  cartTotal: 0
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var appEl = document.querySelector(".main");
function render() {
  if (_state__WEBPACK_IMPORTED_MODULE_0__["default"].page === _state__WEBPACK_IMPORTED_MODULE_0__.PAGES.PRODUCTS) {
    renderProducts();
  }
  if (_state__WEBPACK_IMPORTED_MODULE_0__["default"].page === _state__WEBPACK_IMPORTED_MODULE_0__.PAGES.CART) {
    renderCart();
  }
}
function renderProducts() {
  var listHtml = _state__WEBPACK_IMPORTED_MODULE_0__["default"].cats.map(function (cat, index) {
    return "\n    <li>\n      <img src=\"".concat(cat.imageUrl, "\" alt=\"").concat(cat.name, "\" class=\"cat__image\">\n      <h2 class=\"cat__name\">").concat(cat.name, "</h2>\n      <span class=\"cat__price\">$").concat(cat.price, " for each</span>\n      <button class=\"cat__add-cart\" data-index=\"").concat(index, "\">Add to Cart</button>\n    </li>\n    ");
  }).join("");
  var html = "\n  <ul class=\"cats\">".concat(listHtml, "</ul>\n  <button class=\"view-cart\">View Cart (").concat(_state__WEBPACK_IMPORTED_MODULE_0__["default"].cartTotal, ")</button>\n  ");
  appEl.innerHTML = html;
}
function renderCart() {
  var cartEmpty = _state__WEBPACK_IMPORTED_MODULE_0__["default"].cartTotal === 0;
  if (cartEmpty) {
    appEl.innerHTML = "\n    <p class=\"empty-message\">Nothing in the cart</p>\n    <button class=\"hide-cart\">Hide Cart</button>\n    ";
  } else {
    renderCatInCart();
  }
}
function renderCatInCart() {
  var listHtml = _state__WEBPACK_IMPORTED_MODULE_0__["default"].cats.map(function (cat, index) {
    var totalPrice = cat.price * cat.quantity;
    console.log(_typeof(totalPrice));
    return cat.quantity > 0 ? "\n    <li>\n      <img src=\"".concat(cat.imageUrl, "\" alt=\"").concat(cat.name, "\" class=\"cat__image\">\n      <h2 class=\"cat__name\">").concat(cat.name, "</h2>\n      <div class=\"cat__quantity-modifier\">\n        <button class=\"quantity-button cat__quantity-minus\" data-index=\"").concat(index, "\">-</button>\n        <span class=\"cat__quantity\">Quantity: ").concat(cat.quantity, "</span>\n        <button class=\"quantity-button cat__quantity-plus\" data-index=\"").concat(index, "\">+</button>\n      </div>\n      <span class=\"cat__price-total\">Total: ").concat(parseFloat(totalPrice).toFixed(2), "</span>\n    </li>\n    ") : "";
  }).join("");
  var totalPrice = 0;
  var totalCats = 0;
  _state__WEBPACK_IMPORTED_MODULE_0__["default"].cats.forEach(function (cat) {
    totalPrice += cat.price * cat.quantity;
    totalCats += cat.quantity;
  });
  var html = "\n  <ul class=\"cats\">".concat(listHtml, "</ul>\n  <span class=\"cart__price\">Total cats: ").concat(totalCats, "; Total price: ").concat(parseFloat(totalPrice).toFixed(2), "</span>\n  <div class=\"cart__buttons\">\n    <button class=\"hide-cart\">Hide Cart</button>\n    <button class=\"checkout\">Checkout</button>\n  </div>\n  ");
  appEl.innerHTML = html;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/cats.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ "./src/view.js");


var appEl = document.querySelector(".main");
appEl.addEventListener("click", function (event) {
  if (event.target.classList.contains("view-cart")) {
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].page = _state__WEBPACK_IMPORTED_MODULE_0__["default"].page === _state__WEBPACK_IMPORTED_MODULE_0__.PAGES.PRODUCTS ? _state__WEBPACK_IMPORTED_MODULE_0__.PAGES.CART : _state__WEBPACK_IMPORTED_MODULE_0__.PAGES.PRODUCTS;
    (0,_view__WEBPACK_IMPORTED_MODULE_1__["default"])();
    return;
  }
  if (event.target.classList.contains("hide-cart")) {
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].page = _state__WEBPACK_IMPORTED_MODULE_0__["default"].page === _state__WEBPACK_IMPORTED_MODULE_0__.PAGES.PRODUCTS ? _state__WEBPACK_IMPORTED_MODULE_0__.PAGES.CART : _state__WEBPACK_IMPORTED_MODULE_0__.PAGES.PRODUCTS;
    (0,_view__WEBPACK_IMPORTED_MODULE_1__["default"])();
    return;
  }
  if (event.target.classList.contains("cat__add-cart")) {
    var index = event.target.dataset.index;
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].cats[index].quantity++;
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].cartTotal++;
    (0,_view__WEBPACK_IMPORTED_MODULE_1__["default"])();
    return;
  }
  if (event.target.classList.contains("cat__quantity-minus")) {
    var _index = event.target.dataset.index;
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].cats[_index].quantity--;
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].cartTotal--;
    console.log(_state__WEBPACK_IMPORTED_MODULE_0__["default"].cats);
    (0,_view__WEBPACK_IMPORTED_MODULE_1__["default"])();
    return;
  }
  if (event.target.classList.contains("cat__quantity-plus")) {
    var _index2 = event.target.dataset.index;
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].cats[_index2].quantity++;
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].cartTotal++;
    (0,_view__WEBPACK_IMPORTED_MODULE_1__["default"])();
    return;
  }
  if (event.target.classList.contains("checkout")) {
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].cats.forEach(function (cat) {
      cat.quantity = 0;
    });
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].cartTotal = 0;
    (0,_view__WEBPACK_IMPORTED_MODULE_1__["default"])();
    return;
  }
});
(0,_view__WEBPACK_IMPORTED_MODULE_1__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=cats.js.map