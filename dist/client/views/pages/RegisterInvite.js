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
const auth_1 = require("../../redux/reducers/auth");
const isValidString_1 = __importDefault(require("../../utils/isValidString"));
const connector = (0, react_redux_1.connect)((state) => {
    const { id, validInvitation, validatingInvitation } = state.auth;
    return {
        id,
        validInvitation,
        validatingInvitation,
    };
}, (dispatch) => {
    return {
        recieveAccessToken(data) {
            dispatch((0, auth_1.receiveInvitation)(data));
        },
        register(data) {
            dispatch((0, auth_1.registerInvitation)(data));
        },
    };
});
exports.default = connector(({ match, recieveAccessToken, register, id, validInvitation, validatingInvitation, }) => {
    const { accessToken } = match.params;
    (0, react_1.useEffect)(() => {
        recieveAccessToken({
            accessToken: accessToken,
            cb({ firstName, lastName }) {
                setFormData(Object.assign(Object.assign({}, formData), { firstName,
                    lastName }));
            },
        });
    }, []);
    const [formData, setFormData] = (0, react_1.useState)({
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
    });
    const handleChange = ({ target: { name, value }, }) => {
        setFormData(Object.assign(Object.assign({}, formData), { [name]: value }));
    };
    const handleRegistration = (e) => {
        e.preventDefault();
        register({
            data: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                password: formData.password,
            },
            userId: id,
        });
    };
    if (validatingInvitation) {
        return react_1.default.createElement("p", null, "Validating");
    }
    else if (!validInvitation) {
        return react_1.default.createElement("p", null, "Invalid");
    }
    return (react_1.default.createElement("main", { className: "main-content main-content-bg mt-0" },
        react_1.default.createElement("section", null,
            react_1.default.createElement("div", { className: "page-header min-vh-75" },
                react_1.default.createElement("div", { className: "container" },
                    react_1.default.createElement("div", { className: "row" },
                        react_1.default.createElement("div", { className: "col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto" },
                            react_1.default.createElement("div", { className: "card card-plain py-lg-3" },
                                react_1.default.createElement("div", { className: "card-body text-center" },
                                    react_1.default.createElement("h4", { className: "mb-0 font-weight-bolder" },
                                        formData.firstName,
                                        " ",
                                        formData.lastName),
                                    react_1.default.createElement("p", { className: "mb-4" }, "Enter password to unlock your account."),
                                    react_1.default.createElement("form", { role: "form" },
                                        react_1.default.createElement("div", { className: "mb-3" },
                                            react_1.default.createElement("input", { type: "password", name: "password", className: "form-control", placeholder: "Password", "aria-label": "password", value: formData.password, onChange: handleChange })),
                                        react_1.default.createElement("div", { className: "mb-3" },
                                            react_1.default.createElement("input", { type: "password", name: "confirmPassword", className: "form-control", placeholder: "Confirm password", "aria-label": "confirm-password", value: formData.confirmPassword, onChange: handleChange })),
                                        react_1.default.createElement("div", { className: "text-center" },
                                            react_1.default.createElement("button", { type: "button", className: "btn btn-lg w-100 bg-gradient-dark mb-0", disabled: !(0, isValidString_1.default)(formData.firstName, formData.lastName, formData.password, formData.confirmPassword) ||
                                                    formData.password !== formData.confirmPassword, onClick: handleRegistration }, "Register")))))),
                        react_1.default.createElement("div", { className: "col-md-6" },
                            react_1.default.createElement("div", { className: "oblique position-absolute top-0 h-100 d-md-block d-none me-n8" },
                                react_1.default.createElement("div", { className: "oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6", style: {
                                        backgroundImage: `url('/assets/img/curved-images/curved7.jpg')`,
                                    } })))))))));
});
