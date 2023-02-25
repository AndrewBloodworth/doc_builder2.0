"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const connector = (0, react_redux_1.connect)((state) => ({}), (dispatch) => ({}));
exports.default = connector(({}) => {
    return (react_1.default.createElement("div", { className: "container-fluid", style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
        } },
        react_1.default.createElement("div", { className: "spinner-grow text-dark", role: "status" },
            react_1.default.createElement("span", { className: "visually-hidden" }, "Loading..."))));
});
