/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/idb.js":
/*!**************************!*\
  !*** ./public/js/idb.js ***!
  \**************************/
/***/ (() => {

eval("let db;\n\nconst request = indexedDB.open(\"budget\", 1);\n\nrequest.onupgradeneeded = function (event) {\n  const db = event.target.result;\n \n  db.createObjectStore(\"transaction\", { autoIncrement: true });\n};\nrequest.onsuccess = function (event) {\n\n  db = event.target.result;\n\n  if (navigator.onLine) {\n    uploadTransaction();\n  }\n};\n\nrequest.onerror = function (event) {\n  console.log(event.target.errorCode);\n};\n\nfunction saveRecord(record) {\n  const transaction = db.transaction([\"transaction\"], \"readwrite\");\n  const budgetObjectStore = transaction.objectStore(\"transaction\");\n\n  budgetObjectStore.add(record);\n}\n\nfunction uploadTransaction() {\n  const transaction = db.transaction([\"transaction\"], \"readwrite\");\n\n  const budgetObjectStore = transaction.objectStore(\"transaction\");\n\n  const getAll = budgetObjectStore.getAll();\n\n  getAll.onsuccess = function () {\n    if (getAll.result.length > 0) {\n      fetch(\"/api/transaction\", {\n        method: \"POST\",\n        body: JSON.stringify(getAll.result),\n        headers: {\n          Accept: \"application/json, text/plain, */*\",\n          \"Content-Type\": \"application/json\",\n        },\n      })\n        .then((response) => response.json())\n        .then((serverResponse) => {\n          if (serverResponse.message) {\n            throw new Error(serverResponse);\n          }\n          const transaction = db.transaction([\"transaction\"], \"readwrite\");\n          const budgetObjectStore = transaction.objectStore(\"transaction\");\n          budgetObjectStore.clear();\n\n          alert(\"All saved transactions has been submitted!\");\n        })\n        .catch((err) => {\n          console.log(err);\n        });\n    }\n  };\n}\nwindow.addEventListener(\"online\", uploadTransaction);\n\n\n//# sourceURL=webpack://budget-app/./public/js/idb.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/idb.js"]();
/******/ 	
/******/ })()
;