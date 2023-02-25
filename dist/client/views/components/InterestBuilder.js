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
const react_flatpickr_1 = __importDefault(require("react-flatpickr"));
const company_1 = require("../../redux/reducers/company");
const LoadComponent_1 = __importDefault(require("./LoadComponent"));
const Pagination_1 = __importDefault(require("./Pagination"));
const InterestListTable_1 = __importDefault(require("../components/InterestListTable"));
const connector = (0, react_redux_1.connect)((state) => {
    const { interests, isLoading } = state.company;
    return {
        isLoadingInterests: isLoading.interests,
        interests: interests.rows,
        pageCount: interests.pageCount,
    };
}, (dispatch) => {
    return {
        getInterests(data) {
            dispatch((0, company_1.fetchCompanyInterests)(data));
        },
        createInterestList(data) {
            dispatch((0, company_1.postInterestList)(data));
        },
    };
});
const limit = 2;
exports.default = connector(({ getInterests, createInterestList, isLoadingInterests, companyId, interests, pageCount, }) => {
    (0, react_1.useEffect)(() => {
        handleFetch(0);
    }, []);
    const [interestCheckboxes, setInterestCheckboxes] = (0, react_1.useState)({});
    const [searchTerms, setSearchTerms] = (0, react_1.useState)({
        searchInterest: "",
        searchCategory: "",
        searchTag: "",
    });
    const [interestListName, setInterestListName] = (0, react_1.useState)("");
    const [pageIdx, setPageIdx] = (0, react_1.useState)(0);
    const [dates, setDates] = (0, react_1.useState)([
        new Date(new Date().toLocaleDateString()),
    ]);
    const handleFetch = (offset) => {
        const { searchInterest, searchCategory, searchTag } = searchTerms;
        const [startDate, endDate] = dates.map((date) => date.toISOString());
        getInterests({
            companyId,
            params: {
                offset,
                limit,
                searchInterest,
                searchCategory,
                searchTag,
                dateRange: `${startDate}|${endDate || ""}`,
            },
        });
    };
    const getCheckedInterests = () => Object.values(interestCheckboxes).filter(({ checked }) => checked);
    const handleChangeSearchTerms = ({ target: { name, value }, }) => {
        setSearchTerms(Object.assign(Object.assign({}, searchTerms), { [name]: value }));
    };
    const handleCheck = ({ target: { name, checked } }, interest) => {
        if (getCheckedInterests().length >= 25) {
            alert("Interest lists have a maximum of 25.");
        }
        else {
            setInterestCheckboxes(Object.assign(Object.assign({}, interestCheckboxes), { [name]: { interest, checked } }));
        }
    };
    const handleRemoveInterest = (name) => {
        setInterestCheckboxes(Object.assign(Object.assign({}, interestCheckboxes), { [name]: Object.assign(Object.assign({}, interestCheckboxes[name]), { checked: false }) }));
    };
    const handleCreateInterestList = (e) => {
        e.preventDefault();
        createInterestList({
            companyId,
            body: {
                interestListName,
                interestIds: getCheckedInterests().map(({ interest }) => interest.id),
            },
            cb() {
                setInterestCheckboxes({});
                setInterestListName("");
            },
        });
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(InterestListTable_1.default, { companyId: companyId, getCheckedInterests: getCheckedInterests, setInterestCheckboxes: setInterestCheckboxes, setInterestListName: setInterestListName }),
        react_1.default.createElement("div", { className: "row mt-4" },
            react_1.default.createElement("div", { className: "col-sm-6" },
                react_1.default.createElement("div", { className: "card h-100" },
                    react_1.default.createElement("div", { className: "card-header pb-0 p-3" },
                        react_1.default.createElement("div", { className: "row mb-2" },
                            react_1.default.createElement("div", { className: "col-md-6 d-flex align-items-center" },
                                react_1.default.createElement("h6", { className: "mb-0" }, "Company Interests")),
                            react_1.default.createElement("div", { className: "col-md-6 d-flex justify-content-end align-items-center" },
                                react_1.default.createElement("button", { className: "btn btn-secondary btn-sm mb-0", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#collapseFilters", "aria-expanded": "false", "aria-controls": "collapseExample" }, "Filters"))),
                        react_1.default.createElement("div", { className: "collapse", id: "collapseFilters" },
                            react_1.default.createElement("div", { className: "card card-body" },
                                react_1.default.createElement("p", { className: "mb-2" }, "Search Terms"),
                                react_1.default.createElement("div", { className: "row" },
                                    react_1.default.createElement("div", { className: "col-md-6" },
                                        react_1.default.createElement("div", { className: "form-group" },
                                            react_1.default.createElement("input", { type: "text", name: "searchInterest", value: searchTerms.searchInterest, onChange: handleChangeSearchTerms, placeholder: "Interest", className: "form-control" }))),
                                    react_1.default.createElement("div", { className: "col-md-6" },
                                        react_1.default.createElement("div", { className: "form-group" },
                                            react_1.default.createElement("input", { type: "text", name: "searchCategory", value: searchTerms.searchCategory, onChange: handleChangeSearchTerms, placeholder: "Category", className: "form-control" })))),
                                react_1.default.createElement("div", { className: "row" },
                                    react_1.default.createElement("div", { className: "col-md-6" },
                                        react_1.default.createElement("div", { className: "form-group" },
                                            react_1.default.createElement("input", { type: "text", name: "searchTag", value: searchTerms.searchTag, onChange: handleChangeSearchTerms, placeholder: "Tag", className: "form-control" })))),
                                react_1.default.createElement("div", { className: "row" },
                                    react_1.default.createElement("div", { className: "col-md-6" },
                                        react_1.default.createElement("div", { className: "form-group" },
                                            react_1.default.createElement(react_flatpickr_1.default, { className: "form-control", options: {
                                                    mode: "range",
                                                }, value: dates, onChange: (data) => {
                                                    const [start, end] = data;
                                                    if (!!start &&
                                                        !!end &&
                                                        start.toISOString() === end.toISOString()) {
                                                        setDates([start]);
                                                    }
                                                    else {
                                                        setDates(data);
                                                    }
                                                } })))),
                                react_1.default.createElement("div", { className: "row" },
                                    react_1.default.createElement("div", { className: "col-md-6" },
                                        react_1.default.createElement("div", { className: "form-group" },
                                            react_1.default.createElement("button", { className: "btn btn-primary btn-sm", onClick: () => {
                                                    setPageIdx(0);
                                                    handleFetch(0);
                                                } }, "Apply"))))))),
                    react_1.default.createElement("div", { className: "card-body p-3", style: { overflow: "scroll", height: 300 } },
                        react_1.default.createElement(LoadComponent_1.default, { isLoading: isLoadingInterests, Component: () => (react_1.default.createElement("ul", { className: "list-group" }, interests.map((interest) => {
                                var _a;
                                return (react_1.default.createElement("li", { className: "list-group-item border-0 justify-content-between ps-0 pb-0 border-radius-lg" },
                                    react_1.default.createElement("div", { className: "d-flex" },
                                        react_1.default.createElement("div", { className: "d-flex align-items-center" },
                                            react_1.default.createElement("div", { className: "form-check" },
                                                react_1.default.createElement("input", { className: "form-check-input", name: interest.name, type: "checkbox", value: "", checked: !!(interest.name in interestCheckboxes)
                                                        ? interestCheckboxes[interest.name]
                                                            .checked
                                                        : false, onChange: (e) => handleCheck(e, interest) })),
                                            react_1.default.createElement("div", { className: "d-flex flex-column" },
                                                react_1.default.createElement("h6", { className: "mb-1 text-dark text-sm", onMouseDown: (e) => e.preventDefault(), onContextMenu: (e) => e.preventDefault() }, interest.name),
                                                react_1.default.createElement("span", { className: "text-xs", onMouseDown: (e) => e.preventDefault(), onContextMenu: (e) => e.preventDefault() }, interest.interestcategory
                                                    ? interest.interestcategory.name
                                                    : "No Category"))),
                                        react_1.default.createElement("div", { className: "d-flex align-items-center justify-content-end flex-wrap text-sm font-weight-bold ms-auto col-4 gap-1" }, (_a = interest.tags) === null || _a === void 0 ? void 0 : _a.map((tag) => (react_1.default.createElement("span", { className: "badge badge-dark" }, tag.name))))),
                                    react_1.default.createElement("hr", { className: "horizontal dark mt-3 mb-2" })));
                            }))) })),
                    react_1.default.createElement("div", { className: "card-footer py-3" },
                        react_1.default.createElement(Pagination_1.default, { pageIdx: pageIdx, setPageIdx: setPageIdx, pageCount: pageCount, handleFetch: handleFetch })))),
            react_1.default.createElement("div", { className: "col-sm-6 mt-sm-0 mt-4" },
                react_1.default.createElement("div", { className: "card h-100" },
                    react_1.default.createElement("div", { className: "card-header pb-0 p-3" },
                        react_1.default.createElement("div", { className: "row" },
                            react_1.default.createElement("div", { className: "col-md-6 d-flex align-items-center" },
                                react_1.default.createElement("h6", { className: "mb-0" }, "Selected Interests")),
                            react_1.default.createElement("div", { className: "col-md-6 d-flex justify-content-end align-items-center" },
                                react_1.default.createElement("input", { type: "text", value: interestListName, onChange: (e) => setInterestListName(e.target.value), placeholder: "Interest List Name", className: "form-control form-control-sm" })))),
                    react_1.default.createElement("div", { className: "card-body p-3", style: { overflow: "scroll", height: 300 } },
                        react_1.default.createElement("ul", { className: "list-group" }, getCheckedInterests().map(({ interest }) => {
                            var _a;
                            return (react_1.default.createElement("li", { className: "list-group-item border-0 justify-content-between ps-0 pb-0 border-radius-lg" },
                                react_1.default.createElement("div", { className: "d-flex" },
                                    react_1.default.createElement("div", { className: "d-flex align-items-center" },
                                        react_1.default.createElement("div", { className: "d-flex" },
                                            react_1.default.createElement("i", { className: "ni ni-fat-remove", style: { fontSize: 30, cursor: "pointer" }, onClick: () => handleRemoveInterest(interest.name) })),
                                        react_1.default.createElement("div", { className: "d-flex flex-column" },
                                            react_1.default.createElement("h6", { className: "mb-1 text-dark text-sm", onMouseDown: (e) => e.preventDefault(), onContextMenu: (e) => e.preventDefault() }, interest.name),
                                            react_1.default.createElement("span", { className: "text-xs", onMouseDown: (e) => e.preventDefault(), onContextMenu: (e) => e.preventDefault() }, interest.interestcategory
                                                ? interest.interestcategory.name
                                                : "No Category"))),
                                    react_1.default.createElement("div", { className: "d-flex align-items-center justify-content-end flex-wrap text-sm font-weight-bold ms-auto col-4 gap-1" }, (_a = interest.tags) === null || _a === void 0 ? void 0 : _a.map((tag) => (react_1.default.createElement("span", { className: "badge badge-dark" }, tag.name))))),
                                react_1.default.createElement("hr", { className: "horizontal dark mt-3 mb-2" })));
                        }))),
                    react_1.default.createElement("div", { className: "card-footer py-3" },
                        react_1.default.createElement("div", { className: "d-flex justify-content-center align-items-center" },
                            react_1.default.createElement("button", { className: "btn btn-primary btn-sm mb-0", type: "button", disabled: getCheckedInterests().length === 0 || !!!interestListName, onClick: handleCreateInterestList }, "Create"))))))));
});
