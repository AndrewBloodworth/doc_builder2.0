"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const qs_1 = __importDefault(require("qs"));
const connector = (0, react_redux_1.connect)((state) => ({}), (dispatch) => ({}));
exports.default = connector(({ match, location }) => {
    const { any } = match.params;
    const query = qs_1.default.parse(location.search, { ignoreQueryPrefix: true });
    let message = any;
    if (query.id) {
        message += " with id: " + query.id;
    }
    return react_1.default.createElement("div", null,
        message,
        " - Does not exist");
});
