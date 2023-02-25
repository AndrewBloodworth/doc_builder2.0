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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const auth_1 = require("../../redux/reducers/auth");
const connector = (0, react_redux_1.connect)((state) => ({}), (dispatch) => {
    return {
        authenticateUser(formData) {
            dispatch((0, auth_1.authenticate)(formData));
        },
    };
});
exports.default = connector(({ authenticateUser }) => {
    const [formData, setFormData] = (0, react_1.useState)({
        email: "",
        password: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser(formData);
    };
    const handleChange = ({ target: { name, value }, }) => {
        setFormData(Object.assign(Object.assign({}, formData), { [name]: value }));
    };
    return (react_1.default.createElement("main", { className: "main-content  mt-0" },
        react_1.default.createElement("div", { className: "page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg", style: {
                backgroundImage: ` url('/assets/img/curved-images/curved9.jpg')`,
            } },
            react_1.default.createElement("span", { className: "mask bg-gradient-dark opacity-6" }),
            react_1.default.createElement("div", { className: "container" },
                react_1.default.createElement("div", { className: "row justify-content-center" },
                    react_1.default.createElement("div", { className: "col-lg-5 text-center mx-auto" },
                        react_1.default.createElement("h1", { className: "text-white mb-2 mt-5" }, "Welcome to Kollektor"),
                        react_1.default.createElement("p", { className: "text-lead text-white" }, "Signin to your account."))))),
        react_1.default.createElement("div", { className: "container" },
            react_1.default.createElement("div", { className: "row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center" },
                react_1.default.createElement("div", { className: "col-xl-4 col-lg-5 col-md-7 mx-auto" },
                    react_1.default.createElement("div", { className: "card z-index-0" },
                        react_1.default.createElement("div", { className: "card-header text-center pt-4" },
                            react_1.default.createElement("h5", null, "Sign in")),
                        react_1.default.createElement("div", { className: "card-body" },
                            react_1.default.createElement("form", { role: "form", className: "text-start" },
                                react_1.default.createElement("div", { className: "mb-3" },
                                    react_1.default.createElement("input", { type: "email", name: "email", value: formData.email, onChange: handleChange, className: "form-control", placeholder: "Email", "aria-label": "Email" })),
                                react_1.default.createElement("div", { className: "mb-3" },
                                    react_1.default.createElement("input", { type: "password", name: "password", value: formData.password, onChange: handleChange, className: "form-control", placeholder: "Password", "aria-label": "Password" })),
                                react_1.default.createElement("div", { className: "form-check form-switch" },
                                    react_1.default.createElement("input", { className: "form-check-input", type: "checkbox", id: "rememberMe" }),
                                    react_1.default.createElement("label", { className: "form-check-label", htmlFor: "rememberMe" }, "Remember me")),
                                react_1.default.createElement("div", { className: "text-center" },
                                    react_1.default.createElement("button", { type: "button", className: "btn bg-gradient-info w-100 my-4 mb-2", onClick: handleSubmit }, "Sign in")),
                                react_1.default.createElement("div", { className: "mb-2 position-relative text-center" },
                                    react_1.default.createElement("p", { className: "text-sm font-weight-bold mb-2 text-secondary text-border d-inline z-index-2 bg-white px-3" }, "or")),
                                react_1.default.createElement("div", { className: "text-center" },
                                    react_1.default.createElement("button", { type: "button", className: "btn bg-gradient-dark w-100 mt-2 mb-4" }, "Sign up"))))))))));
});
