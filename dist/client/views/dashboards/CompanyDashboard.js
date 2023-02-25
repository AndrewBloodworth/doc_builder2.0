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
const agency_1 = require("../../redux/reducers/agency");
const company_1 = require("../../redux/reducers/company");
const EditCompany_1 = __importDefault(require("../components/EditCompany"));
const InterestBuilder_1 = __importDefault(require("../components/InterestBuilder"));
const choices_js_1 = __importDefault(require("choices.js"));
const connector = (0, react_redux_1.connect)((state) => ({}), (dispatch) => {
    return {
        getCompany(data) {
            dispatch((0, company_1.fetchCompany)(data));
        },
        getAgencyCompanyCategories(data) {
            dispatch((0, agency_1.fetchAgencyCompanyCategories)(data));
        },
    };
});
exports.default = connector(({ match, getCompany, getAgencyCompanyCategories }) => {
    const { companyId } = match.params;
    const [info, setInfo] = (0, react_1.useState)({
        name: "",
        password: "",
        categoryId: -1,
    });
    const choicesRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        getCompany({
            companyId: Number(companyId),
            cb(company) {
                var _a;
                const companyInfo = {
                    name: company.name || "",
                    password: company.password || "",
                    categoryId: ((_a = company.companycategory) === null || _a === void 0 ? void 0 : _a.id) || -1,
                };
                setInfo(companyInfo);
                getAgencyCompanyCategories({
                    cb(categories) {
                        new choices_js_1.default(choicesRef.current, {
                            position: "bottom",
                            choices: categories.map((category) => {
                                return {
                                    label: category.name,
                                    value: category.id,
                                    selected: category.id === companyInfo.categoryId,
                                };
                            }),
                        });
                    },
                });
            },
        });
    }, []);
    return (react_1.default.createElement("div", { className: "container-fluid py-4" },
        react_1.default.createElement("div", { className: "row gx-4 mt-4" },
            react_1.default.createElement("div", { className: "col-md-6" },
                react_1.default.createElement(EditCompany_1.default, { companyId: Number(companyId), info: info, setInfo: setInfo, choicesRef: choicesRef }))),
        react_1.default.createElement(InterestBuilder_1.default, { companyId: Number(companyId) })));
});
