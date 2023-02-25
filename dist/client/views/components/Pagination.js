"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const connector = (0, react_redux_1.connect)((state) => ({}), (dispatch) => ({}));
exports.default = connector(({ pageIdx, setPageIdx, pageCount, handleFetch }) => {
    return (react_1.default.createElement("div", { className: "d-flex justify-content-center" },
        react_1.default.createElement("div", { className: "pagination-container justify-content-center" },
            react_1.default.createElement("ul", { className: "pagination pagination-default mb-0" },
                react_1.default.createElement("li", { className: "page-item" },
                    react_1.default.createElement("button", { disabled: pageIdx === 0, className: "page-link m-0", "aria-label": "Previous", onClick: () => {
                            setPageIdx(pageIdx - 1);
                            handleFetch(pageIdx - 1);
                        } },
                        react_1.default.createElement("span", { "aria-hidden": "true" },
                            react_1.default.createElement("i", { className: "fa fa-angle-left", "aria-hidden": "true" })))),
                react_1.default.createElement("li", { className: "d-flex align-items-center px-3" },
                    react_1.default.createElement("small", null, `${pageIdx + 1} of ${pageCount}`)),
                react_1.default.createElement("li", { className: "page-item" },
                    react_1.default.createElement("button", { className: "page-link m-0", "aria-label": "Next", disabled: pageIdx + 1 === pageCount, onClick: () => {
                            setPageIdx(pageIdx + 1);
                            handleFetch(pageIdx + 1);
                        } },
                        react_1.default.createElement("span", { "aria-hidden": "true" },
                            react_1.default.createElement("i", { className: "fa fa-angle-right", "aria-hidden": "true" }))))))));
});
