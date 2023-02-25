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
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const company_1 = require("../../redux/reducers/company");
const Pagination_1 = __importDefault(require("./Pagination"));
const LoadComponent_1 = __importDefault(require("./LoadComponent"));
const connector = (0, react_redux_1.connect)((state) => {
    const { interestlists, isLoading } = state.company;
    return {
        isLoadingInterestLists: isLoading.interestlists,
        interestlists: interestlists.rows,
        pageCount: interestlists.pageCount,
    };
}, (dispatch) => {
    return {
        getInterestLists(data) {
            dispatch((0, company_1.fetchCompanyInterestLists)(data));
        },
    };
});
const limit = 2;
exports.default = connector(({ companyId, interestlists, pageCount, isLoadingInterestLists, getInterestLists, getCheckedInterests, setInterestCheckboxes, setInterestListName, }) => {
    (0, react_1.useEffect)(() => {
        handleFetch(0);
    }, []);
    const [pageIdx, setPageIdx] = (0, react_1.useState)(0);
    const handleFetch = (offset) => {
        getInterestLists({
            companyId,
            params: {
                offset,
                limit,
            },
        });
    };
    const handleDuplicate = (interestlist) => {
        const resetInterestCheckboxes = () => {
            var _a;
            setInterestListName(`Copy of ${interestlist.name}`);
            setInterestCheckboxes((_a = interestlist.interests) === null || _a === void 0 ? void 0 : _a.reduce((obj, interest) => {
                obj[interest.name] = { interest, checked: true };
                return obj;
            }, {}));
        };
        if (getCheckedInterests().length > 0) {
            sweetalert2_1.default.mixin({
                customClass: {
                    confirmButton: "btn bg-gradient-success",
                    cancelButton: "btn bg-gradient-danger",
                },
                buttonsStyling: false,
            })
                .fire({
                title: "Are you sure?",
                text: "You have an unsaved interest list.",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true,
            })
                .then((result) => {
                if (result.isConfirmed) {
                    resetInterestCheckboxes();
                }
            });
        }
        else {
            resetInterestCheckboxes();
        }
    };
    return (react_1.default.createElement("div", { className: "row mt-4" },
        react_1.default.createElement("div", { className: "col-lg" },
            react_1.default.createElement("div", { className: "card ", style: { height: 300 } },
                react_1.default.createElement("div", { className: "card-header pb-0 p-3" },
                    react_1.default.createElement("div", { className: "d-flex justify-content-between" },
                        react_1.default.createElement("h6", { className: "mb-2" }, "Interest Lists"))),
                react_1.default.createElement(LoadComponent_1.default, { isLoading: isLoadingInterestLists, Component: () => (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement("div", { className: "table-responsive" },
                            react_1.default.createElement("table", { className: "table align-items-center " },
                                react_1.default.createElement("tbody", null, interestlists.map((interestlist) => (react_1.default.createElement("tr", null,
                                    react_1.default.createElement("td", { className: "w-30" },
                                        react_1.default.createElement("div", { className: "d-flex px-2 py-1 align-items-center" },
                                            react_1.default.createElement("div", { className: "ms-4" },
                                                react_1.default.createElement("p", { className: "text-xs font-weight-bold mb-0" }, "Name:"),
                                                react_1.default.createElement("h6", { className: "text-sm mb-0" }, interestlist.name)))),
                                    react_1.default.createElement("td", null,
                                        react_1.default.createElement("div", { className: "text-center" },
                                            react_1.default.createElement("p", { className: "text-xs font-weight-bold mb-0" }, "Quality:"),
                                            react_1.default.createElement("h6", { className: "text-sm mb-0" }, interestlist.quality))),
                                    react_1.default.createElement("td", null,
                                        react_1.default.createElement("div", { className: "text-center" },
                                            react_1.default.createElement("button", { type: "button", className: "btn bg-gradient-primary", onClick: () => handleDuplicate(interestlist) }, "Duplicate"))),
                                    react_1.default.createElement("td", null,
                                        react_1.default.createElement("div", { className: "text-center" },
                                            react_1.default.createElement("button", { type: "button", className: "btn bg-gradient-primary", onClick: () => {
                                                    var _a;
                                                    navigator.clipboard.writeText(((_a = interestlist.interests) === null || _a === void 0 ? void 0 : _a.map(({ name }) => name).join(",")) || "");
                                                } }, "Copy"))))))))),
                        react_1.default.createElement("div", { className: "card-footer py-3" },
                            react_1.default.createElement(Pagination_1.default, { pageIdx: pageIdx, setPageIdx: setPageIdx, pageCount: pageCount, handleFetch: handleFetch })))) })))));
});
