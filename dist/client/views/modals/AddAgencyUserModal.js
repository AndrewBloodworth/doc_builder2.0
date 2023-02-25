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
const react_bootstrap_1 = require("react-bootstrap");
const agency_1 = require("../../redux/reducers/agency");
const isValidEmail_1 = __importDefault(require("../../utils/isValidEmail"));
const isValidString_1 = __importDefault(require("../../utils/isValidString"));
const connector = (0, react_redux_1.connect)((state) => {
    return {};
}, (dispatch) => {
    return {
        sendInvitation(data) {
            dispatch((0, agency_1.sendAgencyUserInvitation)(data));
        },
    };
});
exports.default = connector(({ sendInvitation }) => {
    (0, react_1.useEffect)(() => { }, []);
    const [modalShow, setModalShow] = (0, react_1.useState)(false);
    const [formData, setFormData] = (0, react_1.useState)({
        firstName: "",
        lastName: "",
        email: "",
        isAdmin: false,
    });
    const handleChange = ({ target: { name, value, checked }, }) => {
        setFormData(Object.assign(Object.assign({}, formData), { [name]: name === "isAdmin" ? checked : value }));
    };
    const handleSend = () => {
        sendInvitation(formData);
        setModalShow(false);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_bootstrap_1.Button, { className: "btn btn-block btn-dark mb-0 btn btn-primary", onClick: () => setModalShow(true) }, "New User"),
        react_1.default.createElement(react_bootstrap_1.Modal, { show: modalShow, onHide: () => setModalShow(false), size: "sm", centered: true },
            react_1.default.createElement(react_bootstrap_1.Modal.Body, { className: "p-0" },
                react_1.default.createElement("div", { className: "card card-plain" },
                    react_1.default.createElement("div", { className: "card-header pb-0 text-left" },
                        react_1.default.createElement("h3", { className: "font-weight-bolder text-info text-gradient" }, "Add New User"),
                        react_1.default.createElement("p", { className: "mb-0" }, "Enter an email to send the invitation.")),
                    react_1.default.createElement("div", { className: "card-body" },
                        react_1.default.createElement("form", { role: "form text-left" },
                            react_1.default.createElement("label", null, "First Name"),
                            react_1.default.createElement("div", { className: "input-group mb-3" },
                                react_1.default.createElement("input", { type: "text", name: "firstName", className: "form-control", placeholder: "First name", "aria-label": "First name", "aria-describedby": "first-name", value: formData.firstName, onChange: handleChange })),
                            react_1.default.createElement("label", null, "Last Name"),
                            react_1.default.createElement("div", { className: "input-group mb-3" },
                                react_1.default.createElement("input", { type: "text", name: "lastName", className: "form-control", placeholder: "Last name", "aria-label": "Last name", "aria-describedby": "last-name", value: formData.lastName, onChange: handleChange })),
                            react_1.default.createElement("label", null, "Email"),
                            react_1.default.createElement("div", { className: "input-group mb-3" },
                                react_1.default.createElement("input", { type: "email", name: "email", className: "form-control", placeholder: "Email", "aria-label": "Email", "aria-describedby": "email-addon", value: formData.email, onChange: handleChange })),
                            react_1.default.createElement("div", { className: "form-check form-switch" },
                                react_1.default.createElement("input", { className: "form-check-input", type: "checkbox", name: "isAdmin", id: "agencyAdmin", checked: formData.isAdmin, onChange: handleChange }),
                                react_1.default.createElement("label", { className: "form-check-label", htmlFor: "agencyAdmin" }, "Admin")),
                            react_1.default.createElement("div", { className: "text-center" },
                                react_1.default.createElement("button", { type: "button", className: "btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0", onClick: handleSend, disabled: !(0, isValidEmail_1.default)(formData.email) ||
                                        !(0, isValidString_1.default)(formData.firstName, formData.firstName) }, "Send")))))))));
});
