"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const types_1 = require("../../types");
const DashboardNav_1 = __importDefault(require("../navigation/DashboardNav"));
const RightSideNav_1 = __importDefault(require("../navigation/RightSideNav"));
const SideNav_1 = __importDefault(require("../navigation/SideNav"));
const AgencyDashboard_1 = __importDefault(require("./AgencyDashboard"));
const CompanyDashboard_1 = __importDefault(require("./CompanyDashboard"));
const MembersDashboard_1 = __importDefault(require("./MembersDashboard"));
const connector = (0, react_redux_1.connect)((state) => {
    const { company } = state.company;
    const { agency } = state.agency;
    return {
        agencyName: agency.name,
        companyName: company.name,
    };
}, (dispatch) => ({}));
exports.default = connector(({ agencyName, companyName, location }) => {
    const { pathname } = location;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(SideNav_1.default, null),
        react_1.default.createElement("main", { className: "main-content position-relative max-height-vh-100 h-100 border-radius-lg " },
            react_1.default.createElement(DashboardNav_1.default, { pageName: (() => /\/dashboard$/.test(pathname)
                    ? agencyName
                    : /\/dashboard\/company\/.*/.test(pathname)
                        ? companyName
                        : /\/dashboard\/members/.test(pathname)
                            ? "Agency Members"
                            : "Dashboard")() }),
            react_1.default.createElement(react_router_dom_1.Switch, null,
                react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: types_1.RoutePath.DASH_MAIN, render: (props) => react_1.default.createElement(AgencyDashboard_1.default, Object.assign({}, props)) }),
                react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: types_1.RoutePath.DASH_COMPANY, render: (props) => react_1.default.createElement(CompanyDashboard_1.default, Object.assign({}, props)) }),
                react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: types_1.RoutePath.DASH_MEMBERS, render: (props) => react_1.default.createElement(MembersDashboard_1.default, Object.assign({}, props)) }))),
        react_1.default.createElement(RightSideNav_1.default, null)));
});
