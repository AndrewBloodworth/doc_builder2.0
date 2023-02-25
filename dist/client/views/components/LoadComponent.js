"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const connector = (0, react_redux_1.connect)((state) => ({}), (dispatch) => ({}));
exports.default = connector(({ isLoading, Component }) => {
    return isLoading ? (react_1.default.createElement("div", { className: "d-flex justify-content-center align-items-center", style: { height: "100%" } },
        react_1.default.createElement("div", { className: "spinner-border text-default", role: "status" }))) : (react_1.default.createElement(Component, null));
});
