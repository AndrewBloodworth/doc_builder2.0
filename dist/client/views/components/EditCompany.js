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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const company_1 = require("../../redux/reducers/company");
const connector = (0, react_redux_1.connect)((state) => ({}), (dispatch) => {
    return {
        updateCompany(data) {
            dispatch((0, company_1.putCompany)(data));
        },
    };
});
exports.default = connector(({ companyId, info, setInfo, choicesRef, updateCompany }) => {
    const [isUpdatingCompany, setIsUpdatingCompany] = (0, react_1.useState)(false);
    const handleChange = ({ target: { name, value }, }) => {
        setInfo(Object.assign(Object.assign({}, info), { [name]: name === "categoryId" ? Number(value) : value }));
    };
    const handleUpdate = () => {
        setIsUpdatingCompany(true);
        updateCompany({
            companyId,
            body: {
                name: info.name,
                password: info.password,
                categoryId: info.categoryId,
            },
            cb() {
                setIsUpdatingCompany(false);
            },
        });
    };
    return (react_1.default.createElement("div", { className: "card" },
        react_1.default.createElement("div", { className: "card-header p-3 pb-0" },
            react_1.default.createElement("h6", { className: "mb-1" }, "Edit Company Information"),
            react_1.default.createElement("p", { className: "text-sm mb-0" }, "Update company information.")),
        react_1.default.createElement("div", { className: "card-body p-3" },
            react_1.default.createElement("label", { className: "form-label" }, "Name"),
            react_1.default.createElement("div", { className: "form-group" },
                react_1.default.createElement("input", { className: "form-control", type: "text", placeholder: "Name", name: "name", value: info.name, onChange: handleChange })),
            react_1.default.createElement("label", { className: "form-label" }, "Password"),
            react_1.default.createElement("div", { className: "form-group" },
                react_1.default.createElement("input", { className: "form-control", type: "text", placeholder: "Password", name: "password", value: info.password, onChange: handleChange })),
            react_1.default.createElement("label", { className: "form-label" }, "Category"),
            react_1.default.createElement("div", { className: "form-group" },
                react_1.default.createElement("select", { className: "form-control", ref: choicesRef, placeholder: "Departure", name: "categoryId", onChange: handleChange })),
            react_1.default.createElement("button", { className: "btn bg-gradient-dark w-100 mb-0", onClick: handleUpdate }, isUpdatingCompany ? (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("span", { className: "spinner-grow spinner-grow-sm", role: "status", "aria-hidden": "true" }))) : ("Update company")))));
});
{
    /* <div className="col-md-6 mt-md-0 mt-4">
            <div className="card">
              <div className="card-header p-3 pb-0">
                <h6 className="mb-1">Password requirements</h6>
                <p className="text-sm mb-0">
                  Please follow this guide for a strong password:
                </p>
              </div>
              <div className="card-body p-3">
                <ul className="text-muted ps-4 mb-0">
                  <li>
                    <span className="text-sm">One special characters</span>
                  </li>
                  <li>
                    <span className="text-sm">Min 6 characters</span>
                  </li>
                  <li>
                    <span className="text-sm">
                      One number (2 are recommended)
                    </span>
                  </li>
                  <li>
                    <span className="text-sm">Change it often</span>
                  </li>
                </ul>
              </div>
            </div>
          </div> */
}
