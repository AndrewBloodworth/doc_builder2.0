"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const types_1 = require("../../../server/types");
const connector = (0, react_redux_1.connect)((state) => ({}), (dispatch) => ({}));
exports.default = connector(({ agencyCompanies }) => {
    const history = (0, react_router_dom_1.useHistory)();
    return (react_1.default.createElement("div", { className: "row mt-4" },
        react_1.default.createElement("div", { className: "col-12 col-lg-12" },
            react_1.default.createElement("div", { className: "card " },
                react_1.default.createElement("div", { className: "card-header pb-0 p-3" },
                    react_1.default.createElement("div", { className: "d-flex justify-content-between" },
                        react_1.default.createElement("h6", { className: "mb-2" }, "Companies"))),
                react_1.default.createElement("div", { className: "table-responsive" },
                    react_1.default.createElement("table", { className: "table align-items-center mb-0" },
                        react_1.default.createElement("thead", null,
                            react_1.default.createElement("tr", null,
                                react_1.default.createElement("th", { className: "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" }, "Name"),
                                react_1.default.createElement("th", { className: "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2" }, "Password"),
                                react_1.default.createElement("th", { className: "text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" }, "Status"),
                                react_1.default.createElement("th", { className: "text-secondary opacity-7" }))),
                        react_1.default.createElement("tbody", null, agencyCompanies === null || agencyCompanies === void 0 ? void 0 : agencyCompanies.map((company) => (react_1.default.createElement("tr", { onClick: () => {
                                history.push(`/dashboard/company/${company.id}`);
                            } },
                            react_1.default.createElement("td", null,
                                react_1.default.createElement("div", { className: "d-flex px-2 py-1" },
                                    react_1.default.createElement("div", null,
                                        react_1.default.createElement("img", { src: "https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/team-2.jpg", className: "avatar avatar-sm me-3" })),
                                    react_1.default.createElement("div", { className: "d-flex flex-column justify-content-center" },
                                        react_1.default.createElement("h6", { className: "mb-0 text-xs" }, company.name),
                                        react_1.default.createElement("p", { className: "text-xs text-secondary mb-0" }, company.companycategory
                                            ? company.companycategory.name
                                            : "No Category")))),
                            react_1.default.createElement("td", { className: "align-middle text-sm" },
                                react_1.default.createElement("p", { className: "text-xs text-secondary mb-0" }, company.password)),
                            react_1.default.createElement("td", { className: "align-middle text-center text-sm" },
                                react_1.default.createElement("span", { className: `badge badge-sm badge-${company.status === types_1.CompanyStatus.ACTIVE
                                        ? "success"
                                        : "danger"}` }, company.status)),
                            react_1.default.createElement("td", { className: "align-middle" },
                                react_1.default.createElement("a", { 
                                    //href="javascript:;"
                                    className: "text-secondary font-weight-bold text-xs", "data-toggle": "tooltip", "data-original-title": "Edit company" }, "Edit")))))))),
                react_1.default.createElement("div", { className: "d-flex justify-content-center" },
                    react_1.default.createElement("div", { className: "pagination-container justify-content-center" },
                        react_1.default.createElement("ul", { className: "pagination pagination-default" },
                            react_1.default.createElement("li", { className: "page-item" },
                                react_1.default.createElement("a", { className: "page-link", "aria-label": "Previous" },
                                    react_1.default.createElement("span", { "aria-hidden": "true" },
                                        react_1.default.createElement("i", { className: "fa fa-angle-left", "aria-hidden": "true" })))),
                            react_1.default.createElement("li", { className: "page-item" },
                                react_1.default.createElement("a", { className: "page-link" }, "1")),
                            react_1.default.createElement("li", { className: "page-item" },
                                react_1.default.createElement("a", { className: "page-link" }, "2")),
                            react_1.default.createElement("li", { className: "page-item active" },
                                react_1.default.createElement("a", { className: "page-link" }, "3")),
                            react_1.default.createElement("li", { className: "page-item" },
                                react_1.default.createElement("a", { className: "page-link" }, "4")),
                            react_1.default.createElement("li", { className: "page-item" },
                                react_1.default.createElement("a", { className: "page-link" }, "5")),
                            react_1.default.createElement("li", { className: "page-item" },
                                react_1.default.createElement("a", { className: "page-link", "aria-label": "Next" },
                                    react_1.default.createElement("span", { "aria-hidden": "true" },
                                        react_1.default.createElement("i", { className: "fa fa-angle-right", "aria-hidden": "true" })))))))))));
});
