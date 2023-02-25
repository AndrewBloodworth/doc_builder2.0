"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const types_1 = require("../types");
const connector = (0, react_redux_1.connect)((state) => {
    const { auth } = state.auth;
    const isLoggedIn = !!auth.id;
    return {
        isLoggedIn,
    };
}, (dispatch) => ({}));
exports.default = connector(({ isLoggedIn, location }) => {
    return (react_1.default.createElement("nav", { className: "navbar navbar-expand-lg position-absolute top-0 z-index-3 w-100 shadow-none my-3  navbar-transparent mt-4" },
        react_1.default.createElement("div", { className: "container" },
            react_1.default.createElement(react_router_dom_1.Link, { className: "navbar-brand font-weight-bolder ms-lg-0 ms-3 text-white", to: types_1.RoutePath.HOME }, "Kollektor"),
            react_1.default.createElement("button", { className: "navbar-toggler shadow-none ms-2", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#navigation", "aria-controls": "navigation", "aria-expanded": "false", "aria-label": "Toggle navigation" },
                react_1.default.createElement("span", { className: "navbar-toggler-icon mt-2" },
                    react_1.default.createElement("span", { className: "navbar-toggler-bar bar1" }),
                    react_1.default.createElement("span", { className: "navbar-toggler-bar bar2" }),
                    react_1.default.createElement("span", { className: "navbar-toggler-bar bar3" }))),
            react_1.default.createElement("div", { className: "collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0", id: "navigation" },
                react_1.default.createElement("ul", { className: "navbar-nav navbar-nav-hover mx-auto" },
                    react_1.default.createElement("li", { className: "nav-item dropdown dropdown-hover mx-2" }, location.pathname !== types_1.RoutePath.AUTH_LOGIN && (react_1.default.createElement(react_router_dom_1.Link, { className: "nav-link ps-2 d-flex justify-content-between cursor-pointer align-items-center ", to: "/authenticate/login" }, isLoggedIn ? "Dashboard" : "Login")))),
                react_1.default.createElement("ul", { className: "navbar-nav d-lg-block d-none" },
                    react_1.default.createElement("li", { className: "nav-item" }, location.pathname !== types_1.RoutePath.AUTH_LOGIN && (react_1.default.createElement(react_router_dom_1.Link, { className: "btn btn-sm  bg-gradient-primary  btn-round mb-0 me-1", to: "/authenticate/login" }, isLoggedIn ? "Dashboard" : "Login"))))))));
});
