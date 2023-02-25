"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const react_router_1 = require("react-router");
const types_1 = require("../../server/types");
const types_2 = require("../types");
const connector = (0, react_redux_1.connect)((state) => ({}), (dispatch) => ({}));
exports.default = connector(({ auth }) => {
    return (react_1.default.createElement(react_router_1.Redirect, { to: !!!auth
            ? types_2.RoutePath.AUTH_LOGIN
            : auth.role === types_1.UserRole.ADMIN
                ? types_2.RoutePath.DASH_ADMIN
                : auth.role === types_1.UserRole.USER
                    ? types_2.RoutePath.DASH_MAIN
                    : types_2.RoutePath.HOME }));
});
