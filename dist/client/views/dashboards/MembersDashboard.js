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
const types_1 = require("../../../server/types");
const agency_1 = require("../../redux/reducers/agency");
const auth_1 = require("../../redux/reducers/auth");
const AddAgencyUserModal_1 = __importDefault(require("../modals/AddAgencyUserModal"));
const connector = (0, react_redux_1.connect)((state) => {
    const { agencyUsers } = state.agency;
    return {
        agencyUsers,
    };
}, (dispatch) => {
    return {
        getAgencyUsers() {
            dispatch((0, agency_1.fetchAgencyUsers)());
        },
        resendInvite(data) {
            dispatch((0, auth_1.resendInvitation)(data));
        },
    };
});
exports.default = connector(({ getAgencyUsers, agencyUsers, resendInvite }) => {
    (0, react_1.useEffect)(() => {
        getAgencyUsers();
    }, []);
    return (react_1.default.createElement("div", { className: "container-fluid py-4" },
        react_1.default.createElement("div", { className: "row my-4" },
            react_1.default.createElement("div", { className: "col-12 d-flex justify-content-end" },
                react_1.default.createElement(AddAgencyUserModal_1.default, null))),
        react_1.default.createElement("div", { className: "row my-4" },
            react_1.default.createElement("div", { className: "col-12" },
                react_1.default.createElement("div", { className: "card" },
                    react_1.default.createElement("div", { className: "table-responsive" },
                        react_1.default.createElement("table", { className: "table align-items-center mb-0" },
                            react_1.default.createElement("thead", null,
                                react_1.default.createElement("tr", null,
                                    react_1.default.createElement("th", { className: "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" }, "Name"),
                                    react_1.default.createElement("th", { className: "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2" }, "Role"),
                                    react_1.default.createElement("th", { className: "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2" }, "Status"),
                                    react_1.default.createElement("th", { className: "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2" }, "Email"))),
                            react_1.default.createElement("tbody", null, agencyUsers.map((user) => {
                                const isPending = user.status === types_1.UserStatus.PENDING;
                                return (react_1.default.createElement("tr", null,
                                    react_1.default.createElement("td", null,
                                        react_1.default.createElement("div", { className: "d-flex px-2 py-1" },
                                            react_1.default.createElement("div", { className: "d-flex flex-column justify-content-center" },
                                                react_1.default.createElement("h6", { className: "mb-0 text-sm" }, user.fullName)))),
                                    react_1.default.createElement("td", null,
                                        react_1.default.createElement("p", { className: "text-sm text-secondary mb-0" }, user.role)),
                                    react_1.default.createElement("td", null,
                                        react_1.default.createElement("span", { className: "badge badge-dot me-4" },
                                            react_1.default.createElement("i", { className: `bg-${isPending ? "warning" : "success"}` }),
                                            react_1.default.createElement("span", { className: "text-dark text-xs" }, user.status)),
                                        isPending && (react_1.default.createElement("span", { className: "text-xs", style: { cursor: "pointer" }, onMouseEnter: (e) => {
                                                e.currentTarget.style.textDecoration =
                                                    "underline";
                                            }, onMouseLeave: (e) => {
                                                e.currentTarget.style.textDecoration = "none";
                                            }, onClick: () => resendInvite(user.id) }, "Resend"))),
                                    react_1.default.createElement("td", { className: "text-sm" },
                                        react_1.default.createElement("p", { className: "text-secondary mb-0 text-sm" }, user.email))));
                            })))))))));
});
