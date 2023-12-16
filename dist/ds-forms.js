/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["DS_Forms"] = factory();
	else
		root["DS_Forms"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ DS_Forms)\n/* harmony export */ });\n/* harmony import */ var _models_events_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/events.js */ \"./src/js/models/events.js\");\n/* harmony import */ var _models_inputs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/inputs.js */ \"./src/js/models/inputs.js\");\n/* harmony import */ var _models_submit_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/submit.js */ \"./src/js/models/submit.js\");\n/* harmony import */ var _models_messages_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models/messages.js */ \"./src/js/models/messages.js\");\n\r\n\r\n\r\n\r\n\r\n \r\nclass DS_Forms {\r\n\r\n    constructor(id, settings) {\r\n        this.args = {};\r\n\r\n        this.applyDefaultSettings();\r\n        this.applySettings(settings);\r\n        this.set(\"id\", id);\r\n\r\n        this.findForm(id);\r\n        this.events();\r\n        this.inputs();\r\n\r\n        this.Submit = new _models_submit_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this);\r\n        this.Messages = new _models_messages_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this);\r\n        \r\n    }\r\n\r\n\r\n    findForm(id) {\r\n        this.set(\"form\", document.getElementById(id));\r\n\r\n        if (this.get(\"messages_container\")) {\r\n            this.set(\"messages_container\", this.get(\"form\").querySelector(this.get(\"messages_container\")));\r\n        }\r\n    }\r\n\r\n    events() {\r\n        var self = this;\r\n\r\n        this.get(\"form\").Events = new _models_events_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this,\r\n            {\r\n                onSubmit: function() {\r\n\r\n                    if (self.get(\"lock\") == true) {\r\n                        return false;\r\n                    }\r\n\r\n                    self.set(\"lock\", true);\r\n\r\n                   \r\n\r\n                    self.submit();\r\n\r\n               \r\n                }\r\n            });\r\n    }\r\n\r\n    inputs() {\r\n        this.get(\"form\").Inputs = new _models_inputs_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this);\r\n    }\r\n\r\n    beforeSubmit() {\r\n\r\n        this.set(\"submitData\", this.Submit.getSubmitData());\r\n\r\n        if (this.get(\"beforeSubmit\") != false) {\r\n            this.get(\"beforeSubmit\")(this);\r\n        }\r\n\r\n        this.checkInputsForErrors();\r\n\r\n        this.formStatus(\"beforeSubmit\");\r\n    }\r\n\r\n    submit() {\r\n        var self = this;\r\n\r\n        self.beforeSubmit();\r\n\r\n        let errors = this.get(\"errors\");\r\n\r\n        if (errors === true) {\r\n            self.afterSubmit(false);\r\n            return false;\r\n        }\r\n\r\n        this.formStatus(\"submit\");\r\n\r\n        this.set(\"lock\", true);\r\n\r\n        this.Submit.submit(function(response) {\r\n            self.afterSubmit(response);\r\n        });\r\n    }\r\n\r\n    afterSubmit(response) {\r\n\r\n        let errors = this.get(\"errors\");\r\n        \r\n        if (errors === true) {\r\n            this.formStatus(\"errors\");\r\n            this.displayMessage();\r\n        }   \r\n        else {\r\n            this.displayMessage();\r\n            this.formStatus(\"success\");\r\n        }   \r\n        \r\n        if (this.get(\"afterSubmit\") != false) {\r\n            this.get(\"afterSubmit\")(this);\r\n        }        \r\n\r\n        this.set(\"lock\", false);\r\n    }\r\n\r\n\r\n    formStatus(status) {\r\n\r\n        this.set(\"lastFormStatus\", status);\r\n\r\n        for (const className of this.get(\"form\").classList) {\r\n            \r\n            if (className.startsWith('status__')) {\r\n                this.get(\"form\").classList.remove(className);\r\n            }\r\n        }     \r\n        \r\n        this.get(\"form\").classList.add(\"status__\" + status);\r\n\r\n    }\r\n\r\n    applyDefaultSettings() {\r\n        this.args = {\r\n            \"autoLock\" : true,\r\n            \"submitUrl\": \"/\",\r\n            \"messages_container\" : \"messages\",\r\n            \"requestHeaders\" : {\r\n                'Accept': 'application/json',\r\n                'Content-Type': 'application/json'\r\n              }\r\n        };\r\n    }\r\n\r\n\r\n    checkInputsForErrors() {\r\n        if (this.get(\"form\").Inputs.validate() === true) {\r\n            \r\n        }\r\n        else {\r\n             \r\n        }\r\n    }\r\n\r\n    displayMessage() {\r\n        \r\n        let msg = this.Messages.getMessage(\"success\");\r\n        let errors = this.get(\"errors\");\r\n\r\n        if (errors === true) {\r\n            msg = this.Messages.getMessage(this.get(\"lastErrorCode\"));\r\n        }\r\n        \r\n\r\n        this.get(\"messages_container\").innerHTML = msg;\r\n\r\n    }\r\n\r\n    removeMessage() {\r\n        this.get(\"messages_container\").innerHTML = \"\";\r\n    }\r\n\r\n\r\n    applySettings(settings) {\r\n        if (typeof settings == \"undefined\") {\r\n            return false;\r\n        }\r\n\r\n        for (let i in settings) {\r\n            this.set(i, settings[i]);\r\n        }\r\n    }\r\n\r\n    set(k, v) {\r\n        this.args[k] = v;\r\n    }\r\n\r\n\r\n    get(k) {\r\n        if (typeof this.args[k] == \"undefined\") {\r\n            return false;\r\n        }\r\n        else {\r\n            return this.args[k];\r\n        }\r\n    }\r\n\r\n}\r\n \r\n\n\n//# sourceURL=webpack://DS_Forms/./src/js/app.js?");

/***/ }),

/***/ "./src/js/models/events.js":
/*!*********************************!*\
  !*** ./src/js/models/events.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Events)\n/* harmony export */ });\nclass Events {\r\n\r\n    constructor(app, settings) {\r\n        this.app = app;\r\n        this.args = {};\r\n        this.applySettings(settings);\r\n        this.listenSubmit();\r\n    }\r\n\r\n    listenSubmit() {\r\n        var self = this;\r\n\r\n        let form = this.app.get(\"form\");\r\n\r\n        form.addEventListener(\"submit\", function(e) {\r\n            e.preventDefault();\r\n\r\n            let onSubmit = self.get(\"onSubmit\");\r\n            \r\n\r\n            if (onSubmit != false) {\r\n                onSubmit();\r\n            }\r\n        });\r\n    }\r\n\r\n\r\n    applySettings(settings) {\r\n        for (let i in settings) {\r\n            this.set(i, settings[i]);\r\n        }\r\n    }   \r\n\r\n    set(k, v) {\r\n        this.args[k] = v;\r\n    }\r\n\r\n\r\n    get(k) {\r\n        if (typeof this.args[k] == \"undefined\") {\r\n            return false;\r\n        }\r\n        else {\r\n            return this.args[k];\r\n        }\r\n    }\r\n\r\n}\n\n//# sourceURL=webpack://DS_Forms/./src/js/models/events.js?");

/***/ }),

/***/ "./src/js/models/input.js":
/*!********************************!*\
  !*** ./src/js/models/input.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Input)\n/* harmony export */ });\nclass Input {\r\n\r\n    constructor(element) {\r\n        this.el = element;\r\n        this.args = {};\r\n\r\n        \r\n        this.onkeyup_tm = false;\r\n        this.listenOnKeyUp();\r\n\r\n    }\r\n\r\n\r\n    listenOnKeyUp() {\r\n        var self = this;\r\n\r\n        if (this.el.getAttribute(\"data-onkeyup\") == \"false\") {\r\n            return false;\r\n        }\r\n\r\n        \r\n\r\n        this.el.addEventListener(\"keyup\", function() {\r\n\r\n            if (self.onkeyup_tm == false) {\r\n                clearTimeout(self.onkeyup_tm);\r\n            }\r\n\r\n            self.onkeyup_tm = setTimeout(function() {\r\n                self.validate();\r\n            }, 500);\r\n            \r\n        });\r\n    }\r\n\r\n    applyErrorClass() {\r\n        this.el.classList.add(\"error\");\r\n        this.el.classList.add(\"error--\" + this.get(\"lastErrorCode\"));\r\n        this.el.classList.remove(\"valid\");\r\n\r\n        // Let's see of there is container\r\n        let containerID = this.el.getAttribute(\"data-container\");\r\n\r\n        if (containerID) {\r\n            let cnt = document.getElementById(containerID);\r\n            cnt.classList.add(\"error\");\r\n            cnt.classList.add(\"error--\" + this.get(\"lastErrorCode\"));\r\n            cnt.classList.remove(\"valid\");\r\n        }\r\n    }\r\n\r\n    removeErrorClass() {\r\n        this.el.classList.remove(\"error\");\r\n        this.el.classList.add(\"valid\");\r\n\r\n        // Let's see of there is container\r\n        let containerID = this.el.getAttribute(\"data-container\");\r\n        var cnt = false;\r\n\r\n        if (containerID) {\r\n            cnt = document.getElementById(containerID);\r\n            cnt.classList.remove(\"error\");\r\n            cnt.classList.add(\"valid\");\r\n        }        \r\n\r\n        for (const className of this.el.classList) {\r\n            \r\n            if (className.startsWith('error')) {\r\n                this.el.classList.remove(className);\r\n\r\n                if (cnt != false) {\r\n                    cnt.classList.remove(className);\r\n                }\r\n            }\r\n        }\r\n\r\n    }\r\n\r\n\r\n    validate() {\r\n        if (this.isValid() == false) {\r\n            this.applyErrorClass();\r\n            return false;\r\n        }\r\n        else {\r\n            this.removeErrorClass();\r\n            return true;\r\n        }\r\n    }\r\n\r\n    isValid() {\r\n\r\n        this.set(\"lastErrorCode\", false);\r\n\r\n        if (this.isRequired() == true && this.isEmpty() === true) {\r\n            this.set(\"lastErrorCode\", \"required\");\r\n            return false;\r\n        }\r\n\r\n\r\n        if (this.isEmailValid() === false && this.isEmpty() === false) {\r\n\r\n            this.set(\"lastErrorCode\", \"email\");\r\n            return false;\r\n        }\r\n\r\n\r\n        return true;\r\n    }\r\n\r\n\r\n    isEmailValid() {\r\n\r\n        if (this.el.type != \"email\") {\r\n            return true;\r\n        }\r\n\r\n        if (this.el.value.match(\r\n            /^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/\r\n        )) {\r\n            return true;\r\n        }\r\n        else {\r\n            \r\n            return false;\r\n        }\r\n    }\r\n\r\n    isRequired() {\r\n        \r\n        if (this.el.getAttribute(\"data-required\") == \"1\") {\r\n            return true;\r\n        }\r\n        else {\r\n            return false;\r\n        }\r\n    }\r\n\r\n    isPasswordStrong() {\r\n\r\n        if (this.el.type != \"password\") {\r\n            return true;\r\n        }\r\n\r\n        const password = this.el.value;\r\n\r\n        // Define your password strength criteria\r\n        const minLength = 8;\r\n        const hasUpperCase = /[A-Z]/.test(password);\r\n        const hasLowerCase = /[a-z]/.test(password);\r\n        const hasNumber = /\\d/.test(password);\r\n        const hasSpecialCharacter = /[!@#$%^&*(),.?\":{}|<>]/.test(password);\r\n    \r\n        // Check the criteria\r\n        const isStrongPassword = (\r\n          password.length >= minLength &&\r\n          hasUpperCase &&\r\n          hasLowerCase &&\r\n          hasNumber &&\r\n          hasSpecialCharacter\r\n        );\r\n    \r\n        // Output the result\r\n        if (isStrongPassword) {\r\n         return true;\r\n        } else {\r\n          return false;\r\n        }        \r\n    }\r\n\r\n    isEmpty() {\r\n        if (this.el.value == \"\") {\r\n            return true;\r\n        }\r\n        else {\r\n            return false;\r\n        }\r\n    }\r\n\r\n    set(k, v) {\r\n        this.args[k] = v;\r\n    }\r\n\r\n\r\n    get(k) {\r\n        if (typeof this.args[k] == \"undefined\") {\r\n            return false;\r\n        }\r\n        else {\r\n            return this.args[k];\r\n        }\r\n    }\r\n\r\n}\n\n//# sourceURL=webpack://DS_Forms/./src/js/models/input.js?");

/***/ }),

/***/ "./src/js/models/inputs.js":
/*!*********************************!*\
  !*** ./src/js/models/inputs.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Inputs)\n/* harmony export */ });\n/* harmony import */ var _input_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input.js */ \"./src/js/models/input.js\");\n\r\n\r\nclass Inputs {\r\n\r\n    constructor(app) {\r\n        this.app = app;\r\n        this.args = {};\r\n\r\n        \r\n        this.inputs = [];\r\n\r\n        this.findInputs();\r\n    }\r\n\r\n    findInputs() {\r\n       \r\n        let form = this.app.get(\"form\");\r\n\r\n        for (let element of form.elements) {\r\n           \r\n            element.model = new _input_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](element);\r\n        }\r\n\r\n    }\r\n\r\n    validate() {\r\n\r\n        this.app.set(\"errors\", false);\r\n        let form = this.app.get(\"form\");\r\n\r\n        let errorsArray = [];\r\n        let errors = 0;\r\n\r\n        for (let element of form.elements) {\r\n          \r\n            if (element.model.validate() === false) {\r\n                this.app.set(\"lastErrorCode\", element.model.get(\"lastErrorCode\"));\r\n                errorsArray.push(element);\r\n                errors++;\r\n            }\r\n        }\r\n\r\n        if (errors > 1) {\r\n            this.app.set(\"lastErrorCode\", \"many_errors\");\r\n        }\r\n\r\n        this.set(\"errorsArray\", errorsArray);\r\n\r\n        if (errors > 0) {\r\n            this.app.set(\"errors\", true);\r\n            return false;\r\n        }\r\n        else {\r\n            this.app.set(\"errors\", false);\r\n            return true;\r\n        }\r\n    }\r\n\r\n    checkRequired() {\r\n        let form = this.app.get(\"form\");\r\n    }\r\n \r\n    set(k, v) {\r\n        this.args[k] = v;\r\n    }\r\n\r\n\r\n    get(k) {\r\n        if (typeof this.args[k] == \"undefined\") {\r\n            return false;\r\n        }\r\n        else {\r\n            return this.args[k];\r\n        }\r\n    }\r\n\r\n}\n\n//# sourceURL=webpack://DS_Forms/./src/js/models/inputs.js?");

/***/ }),

/***/ "./src/js/models/messages.js":
/*!***********************************!*\
  !*** ./src/js/models/messages.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Messages)\n/* harmony export */ });\nclass Messages {\r\n\r\n    constructor(app) {\r\n        this.app = app;\r\n        \r\n        this.locale = this.app.get(\"locale\");\r\n\r\n        this.buildMessages();\r\n\r\n        let messages = this.app.get(\"messages\");\r\n\r\n        for (let i in messages) {\r\n            this.messages[i] = messages[i];\r\n        }\r\n    }\r\n\r\n\r\n    getMessage(code) {\r\n        if (typeof this.messages[code] == \"undefined\") {\r\n            return \"No code : \" + code;\r\n        }\r\n        else {\r\n            return this.messages[code];\r\n        }\r\n    }\r\n\r\n\r\n\r\n    buildMessages() {\r\n \r\n        this.messages = {\r\n            \"many_errors\" : \"It looks like there are errors in the form. Please review and correct them.\",\r\n            \"email\"       : \"the email address you entered seems to be invalid. Please double-check.\",\r\n            \"required\"    : \"You missed some required fields. Please fill them in.\",\r\n            \"success\"     : \"Your form has been successfully submitted.\"\r\n        };\r\n    }\r\n\r\n \r\n \r\n}\n\n//# sourceURL=webpack://DS_Forms/./src/js/models/messages.js?");

/***/ }),

/***/ "./src/js/models/submit.js":
/*!*********************************!*\
  !*** ./src/js/models/submit.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Submit)\n/* harmony export */ });\nclass Submit {\r\n    constructor(app) {\r\n        this.app = app;\r\n    }\r\n\r\n\r\n    async submit(callback) {\r\n\r\n        var response = false;\r\n\r\n        \r\n        try {\r\n            let submitData = this.app.get(\"submitData\");\r\n\r\n            const rawResponse = await fetch(this.app.get(\"submitUrl\"), {\r\n                method: 'POST',\r\n                headers: this.app.get(\"requestHeaders\"),\r\n                body: JSON.stringify(submitData)\r\n            });\r\n            \r\n            response = await rawResponse.json();\t\r\n\r\n            this.validateResponse(response);\r\n        }\r\n        catch(e) {\r\n            console.log(e);\r\n        }\r\n\r\n\r\n        callback(response);\r\n    }\r\n\r\n    validateResponse(response) {\r\n        if (typeof response.status == \"undefined\") {\r\n            return false;\r\n        }\r\n\r\n        if (typeof response.msg != \"undefined\") {\r\n            this.app.set(\"lastServerMessage\", response.msg);\r\n        }          \r\n\r\n        if (response.status == \"error\") {\r\n            this.app.set(\"errors\", true);\r\n\r\n            if (typeof response.error_code != \"undefined\") {\r\n                this.app.set(\"lastErrorCode\", response.error_code);\r\n            }\r\n        }\r\n        else \r\n        if (response.stauts == \"success\") {\r\n\r\n        }\r\n    }\r\n\r\n\r\n    getSubmitData() {\r\n\t\tlet formElements = Array.from(this.app.get(\"form\").elements);\r\n\r\n\t\tlet inputs = {};\r\n\r\n\t\tfor (let i in formElements) {\r\n\r\n\t\t\tlet element = formElements[i];\r\n\t\t\tlet name = element.getAttribute(\"name\");\r\n\t\t\tlet val  = element.value;\r\n\r\n\t\t\tif (val == '')\r\n\t\t\t\tcontinue;\r\n\r\n\t\t\tinputs[name] = val;\r\n\r\n\r\n\t\t} \r\n        \r\n        return inputs;\r\n    }\r\n}\n\n//# sourceURL=webpack://DS_Forms/./src/js/models/submit.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/app.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});