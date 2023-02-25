"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const auth_1 = require("../redux/reducers/auth");
const Portal_1 = __importDefault(require("../interface/Portal"));
// import AuthForm from "../views/AuthForm";
// import FourOhFour from "../views/FourOhFour";
// import Home from "../views/Home";
const Authenticate_1 = __importDefault(require("../views/Authenticate"));
const types_1 = require("../types");
// import RegisterInvite from "../views/pages/RegisterInvite";
const connector = (0, react_redux_1.connect)((state) => {
    const { auth, preCheck } = state.auth;
    const isLoggedIn = !!auth.id;
    return {
        isLoggedIn,
        auth,
        preCheck,
    };
}, (dispatch) => {
    return {
        getMe() {
            dispatch((0, auth_1.me)());
        },
    };
});
exports.default = connector(({ getMe, isLoggedIn, preCheck, auth }) => {
    (0, react_1.useEffect)(() => {
        if (!isLoggedIn) {
            getMe();
        }
    }, [isLoggedIn]);
    const renderer = (Component, props) => react_1.default.createElement(Portal_1.default, Object.assign({}, { Component, props, preCheck, auth }));
    const applyProps = (props, types) => {
        for (const type of types.split(",")) {
            switch (type) {
                case "nav": {
                    props.hasNav = true;
                    break;
                }
                case "footer": {
                    props.hasFooter = true;
                    break;
                }
                default:
                    break;
            }
        }
        return props;
    };
    return (react_1.default.createElement(react_1.default.Fragment, null, isLoggedIn ? (react_1.default.createElement(react_router_dom_1.Switch, null,
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: types_1.RoutePath.AUTH_WILDCARD, render: (props) => renderer(Authenticate_1.default, props) }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: types_1.RoutePath.INVITE_WILDCARD, render: (props) => renderer(Authenticate_1.default, props) }))) : (react_1.default.createElement(react_router_dom_1.Switch, null,
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: types_1.RoutePath.UNAUTHORIZED_WILDCARD, render: (props) => renderer(Authenticate_1.default, props) })))));
});
