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
    return (react_1.default.createElement("footer", { className: "footer py-5" },
        react_1.default.createElement("div", { className: "container" },
            react_1.default.createElement("div", { className: "row" },
                react_1.default.createElement("div", { className: "col-lg-8 mb-4 mx-auto text-center" },
                    react_1.default.createElement("a", { target: "_blank", className: "text-secondary me-xl-5 me-3 mb-sm-0 mb-2" }, "Company"),
                    react_1.default.createElement("a", { target: "_blank", className: "text-secondary me-xl-5 me-3 mb-sm-0 mb-2" }, "About Us"),
                    react_1.default.createElement("a", { target: "_blank", className: "text-secondary me-xl-5 me-3 mb-sm-0 mb-2" }, "Team"),
                    react_1.default.createElement("a", { target: "_blank", className: "text-secondary me-xl-5 me-3 mb-sm-0 mb-2" }, "Products"),
                    react_1.default.createElement("a", { target: "_blank", className: "text-secondary me-xl-5 me-3 mb-sm-0 mb-2" }, "Blog"),
                    react_1.default.createElement("a", { target: "_blank", className: "text-secondary me-xl-5 me-3 mb-sm-0 mb-2" }, "Pricing")),
                react_1.default.createElement("div", { className: "col-lg-8 mx-auto text-center mb-4 mt-2" },
                    react_1.default.createElement("a", { target: "_blank", className: "text-secondary me-xl-4 me-4" },
                        react_1.default.createElement("span", { className: "text-lg fab fa-dribbble" })),
                    react_1.default.createElement("a", { target: "_blank", className: "text-secondary me-xl-4 me-4" },
                        react_1.default.createElement("span", { className: "text-lg fab fa-twitter" })),
                    react_1.default.createElement("a", { target: "_blank", className: "text-secondary me-xl-4 me-4" },
                        react_1.default.createElement("span", { className: "text-lg fab fa-instagram" })),
                    react_1.default.createElement("a", { target: "_blank", className: "text-secondary me-xl-4 me-4" },
                        react_1.default.createElement("span", { className: "text-lg fab fa-pinterest" })),
                    react_1.default.createElement("a", { target: "_blank", className: "text-secondary me-xl-4 me-4" },
                        react_1.default.createElement("span", { className: "text-lg fab fa-github" })))),
            react_1.default.createElement("div", { className: "row" },
                react_1.default.createElement("div", { className: "col-8 mx-auto text-center mt-1" },
                    react_1.default.createElement("p", { className: "mb-0 text-secondary" },
                        "Copyright \u00A9 ",
                        react_1.default.createElement("script", null, new Date().getFullYear()),
                        " Kollektor"))))));
});
