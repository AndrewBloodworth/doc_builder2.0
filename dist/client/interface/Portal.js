"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const Loading_1 = __importDefault(require("../views/Loading"));
const Navbar_1 = __importDefault(require("./Navbar"));
const Footer_1 = __importDefault(require("./Footer"));
const connector = (0, react_redux_1.connect)((state) => ({}), (dispatch) => ({}));
exports.default = connector(({ Component, props, auth, preCheck }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        props.hasNav && react_1.default.createElement(Navbar_1.default, Object.assign({}, props)),
        react_1.default.createElement("main", null, !preCheck ? (react_1.default.createElement(Loading_1.default, null)) : !auth.id ? (react_1.default.createElement(Component, Object.assign({ auth: null }, props))) : (react_1.default.createElement(Component, Object.assign({ auth: auth }, props)))),
        props.hasFooter && react_1.default.createElement(Footer_1.default, null)));
});
