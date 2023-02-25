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
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const scripts_1 = require("../utils/scripts");
const ThreeDCard_1 = __importDefault(require("./ThreeDCard"));
const connector = (0, react_redux_1.connect)((state) => ({}), (dispatch) => ({}));
exports.default = connector(({}) => {
    (0, react_1.useEffect)(() => {
        const scripts = ["/assets/js/plugins/tilt.min.js"];
        (0, scripts_1.loadScripts)(scripts);
        return () => {
            (0, scripts_1.removeScripts)(scripts);
        };
    }, []);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("header", { className: "header-2" },
            react_1.default.createElement("div", { className: "page-header min-vh-75 relative", style: {
                    backgroundImage: `url(/assets/img/curved-images/curved1.jpg)`,
                } },
                react_1.default.createElement("span", { className: "mask bg-gradient-primary" }),
                react_1.default.createElement("div", { className: "container" },
                    react_1.default.createElement("div", { className: "row" },
                        react_1.default.createElement("div", { className: "col-lg-7 text-center mx-auto" },
                            react_1.default.createElement("h1", { className: "text-white pt-3 mt-n5" }, "Software Design"),
                            react_1.default.createElement("p", { className: "lead text-white mt-3" },
                                "Super-Charge your Development Process",
                                react_1.default.createElement("br", null))))),
                react_1.default.createElement("div", { className: "position-absolute w-100 z-index-1 bottom-0" },
                    react_1.default.createElement("svg", { className: "waves", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", viewBox: "0 24 150 40", preserveAspectRatio: "none", shapeRendering: "auto" },
                        react_1.default.createElement("defs", null,
                            react_1.default.createElement("path", { id: "gentle-wave", d: "M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" })),
                        react_1.default.createElement("g", { className: "moving-waves" },
                            react_1.default.createElement("use", { xlinkHref: "#gentle-wave", x: "48", y: "47", fill: "rgba(255,255,255,0.40" }),
                            react_1.default.createElement("use", { xlinkHref: "#gentle-wave", x: "48", y: "3", fill: "rgba(255,255,255,0.35)" }),
                            react_1.default.createElement("use", { xlinkHref: "#gentle-wave", x: "48", y: "5", fill: "rgba(255,255,255,0.25)" }),
                            react_1.default.createElement("use", { xlinkHref: "#gentle-wave", x: "48", y: "8", fill: "rgba(255,255,255,0.20)" }),
                            react_1.default.createElement("use", { xlinkHref: "#gentle-wave", x: "48", y: "13", fill: "rgba(255,255,255,0.15)" }),
                            react_1.default.createElement("use", { xlinkHref: "#gentle-wave", x: "48", y: "16", fill: "rgba(255,255,255,0.95" })))))),
        react_1.default.createElement("section", { className: "pt-3 pb-4", id: "count-stats" },
            react_1.default.createElement("div", { className: "container" },
                react_1.default.createElement("div", { className: "row" },
                    react_1.default.createElement("div", { className: "\n              col-lg-9\n              z-index-2\n              border-radius-xl\n              mt-n10\n              mx-auto\n              py-3\n              blur\n              shadow-blur\n            " },
                        react_1.default.createElement("div", { className: "row" },
                            react_1.default.createElement("div", { className: "col-md-4 position-relative" },
                                react_1.default.createElement("div", { className: "p-3 text-center" },
                                    react_1.default.createElement("h1", { className: "text-gradient text-primary" },
                                        react_1.default.createElement("span", { id: "state1" }, "300"),
                                        "+"),
                                    react_1.default.createElement("h5", { className: "mt-3" }, "Satisfied Customers"),
                                    react_1.default.createElement("p", { className: "text-sm" }, "Test")),
                                react_1.default.createElement("hr", { className: "vertical dark" })),
                            react_1.default.createElement("div", { className: "col-md-4 position-relative" },
                                react_1.default.createElement("div", { className: "p-3 text-center" },
                                    react_1.default.createElement("h1", { className: "text-gradient text-primary" },
                                        react_1.default.createElement("span", { id: "state2" }, "100"),
                                        "+"),
                                    react_1.default.createElement("h5", { className: "mt-3" }, "Projects"),
                                    react_1.default.createElement("p", { className: "text-sm" }, "Test")),
                                react_1.default.createElement("hr", { className: "vertical dark" })),
                            react_1.default.createElement("div", { className: "col-md-4" },
                                react_1.default.createElement("div", { className: "p-3 text-center" },
                                    react_1.default.createElement("h1", { className: "text-gradient text-primary", id: "state3" }, "39"),
                                    react_1.default.createElement("h5", { className: "mt-3" }, "Weeks Saved"),
                                    react_1.default.createElement("p", { className: "text-sm" }, "Test")))))))),
        react_1.default.createElement(ThreeDCard_1.default, null)));
});
