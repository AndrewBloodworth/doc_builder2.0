"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
const react_1 = __importDefault(require("react"));
const react_dom_1 = require("react-dom");
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const store_1 = __importDefault(require("./redux/store"));
const Main_1 = __importDefault(require("./interface/Main"));
(0, react_dom_1.render)(react_1.default.createElement(react_redux_1.Provider, { store: store_1.default },
    react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(Main_1.default, null))), document.getElementById("main"));
