"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCompany = exports.setNew = exports.fetchUserCompanyBySearchTerm = exports.fetchCompanyBySearchTerm = exports.fetchCompanyPassword = exports.createCompany = exports.updateCompanyPassword = exports.updateCompanyStatus = exports.createUserCompany = exports.fetchUserCompanies = exports.putCompany = exports.postInterestList = exports.fetchCompanyInterestLists = exports.fetchCompanyInterests = exports.fetchCompany = exports.fetchCompanies = void 0;
/* eslint-disable no-unused-vars */
const toolkit_1 = require("@reduxjs/toolkit");
const axios_1 = __importDefault(require("axios"));
const paramify_1 = __importDefault(require("../../utils/paramify"));
const apiRoutes_1 = require("../apiRoutes");
exports.fetchCompanies = (0, toolkit_1.createAsyncThunk)("company/fetchCompanies", () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(`/api/admin/companies`);
    return data;
}));
exports.fetchCompany = (0, toolkit_1.createAsyncThunk)("company/fetchCompany", ({ companyId, cb }) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get((0, apiRoutes_1.companyAPI)(`/${companyId}`));
    const response = data;
    cb(response);
    return response;
}));
exports.fetchCompanyInterests = (0, toolkit_1.createAsyncThunk)("company/fetchCompanyInterests", ({ companyId, params }) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get((0, apiRoutes_1.companyAPI)(`/${companyId}/interests?${(0, paramify_1.default)(params)}`));
    return data;
}));
exports.fetchCompanyInterestLists = (0, toolkit_1.createAsyncThunk)("company/fetchCompanyInterestLists", ({ companyId, params }) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get((0, apiRoutes_1.companyAPI)(`/${companyId}/interestlists?${(0, paramify_1.default)(params)}`));
    return data;
}));
exports.postInterestList = (0, toolkit_1.createAsyncThunk)("company/postInterestList", ({ companyId, body, cb }) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.post((0, apiRoutes_1.companyAPI)(`/${companyId}/interestlists`), body);
    cb();
    return data;
}));
exports.putCompany = (0, toolkit_1.createAsyncThunk)("company/putCompany", ({ companyId, body, cb }) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.put((0, apiRoutes_1.companyAPI)(`/${companyId}`), body);
    cb();
    return data;
}));
exports.fetchUserCompanies = (0, toolkit_1.createAsyncThunk)("company/fetchUserCompanies", () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get((0, apiRoutes_1.userAPI)(`/companies`));
    return data;
}));
exports.createUserCompany = (0, toolkit_1.createAsyncThunk)("company/createUserCompany", (formData) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.post((0, apiRoutes_1.userAPI)(`/companies`), formData);
    return data;
}));
exports.updateCompanyStatus = (0, toolkit_1.createAsyncThunk)("company/updateCompanyStatus", (companyId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.put((0, apiRoutes_1.userAPI)(`/companies/${companyId}/status`));
    return data;
}));
exports.updateCompanyPassword = (0, toolkit_1.createAsyncThunk)("company/updateCompanyPassword", ({ companyId, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.put((0, apiRoutes_1.userAPI)(`/companies/${companyId}/password`), { password });
    return data;
}));
exports.createCompany = (0, toolkit_1.createAsyncThunk)("company/createCompany", (formData) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.post(`/api/admin/companies`, formData);
    return data;
}));
exports.fetchCompanyPassword = (0, toolkit_1.createAsyncThunk)("company/fetchCompanyPassword", (password) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get((0, apiRoutes_1.companyAPI)(`/${password}`));
    if (!data.id)
        alert("Password Incorrect");
    return data;
}));
exports.fetchCompanyBySearchTerm = (0, toolkit_1.createAsyncThunk)("company/fetchCompanyBySearchTerm", (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(`/api/admin/companies/search/${searchTerm}`);
    return data;
}));
exports.fetchUserCompanyBySearchTerm = (0, toolkit_1.createAsyncThunk)("company/fetchUserCompanyBySearchTerm", (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get((0, apiRoutes_1.companyAPI)(`/search/${searchTerm}`));
    return data;
}));
const INIT_STATE = {
    companies: [],
    company: {},
    interests: {
        rows: [],
        pageCount: 0,
    },
    interestlists: {
        rows: [],
        pageCount: 0,
    },
    passwordCorrect: false,
    isLoading: {
        company: true,
        interests: true,
        interestlists: true,
    },
    hasError: {
        company: false,
        interests: false,
        interestlists: false,
    },
};
//Slice
/////////////////////////////////////////////////////////////
const companySlice = (0, toolkit_1.createSlice)({
    name: "company",
    initialState: INIT_STATE,
    reducers: {
        setNew(state, action) {
            return Object.assign({}, state);
        },
        clearCompany(state, action) {
            return INIT_STATE;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchCompany.pending, (state, action) => {
            state.isLoading.company = true;
            state.hasError.company = false;
        })
            .addCase(exports.fetchCompany.fulfilled, (state, action) => {
            state.company = action.payload;
            state.isLoading.company = false;
            state.hasError.company = false;
        })
            .addCase(exports.fetchCompany.rejected, (state, action) => {
            state.isLoading.company = false;
            state.hasError.company = true;
        })
            .addCase(exports.fetchCompanyInterests.fulfilled, (state, action) => {
            state.interests = action.payload;
            state.isLoading.interests = false;
            state.hasError.interests = false;
        })
            .addCase(exports.fetchCompanyInterests.rejected, (state, action) => {
            state.isLoading.interests = false;
            state.hasError.interests = true;
        })
            .addCase(exports.fetchCompanyInterests.pending, (state, action) => {
            state.isLoading.interests = true;
            state.hasError.interests = false;
        })
            .addCase(exports.fetchCompanyInterestLists.pending, (state, action) => {
            state.isLoading.interestlists = true;
            state.hasError.interestlists = false;
        })
            .addCase(exports.fetchCompanyInterestLists.fulfilled, (state, action) => {
            state.interestlists = action.payload;
            state.isLoading.interestlists = false;
            state.hasError.interestlists = false;
        })
            .addCase(exports.fetchCompanyInterestLists.rejected, (state, action) => {
            state.isLoading.interestlists = false;
            state.hasError.interestlists = true;
        })
            .addCase(exports.postInterestList.rejected, (state, action) => {
            state.isLoading.interestlists = false;
            state.hasError.interestlists = true;
        })
            .addCase(exports.postInterestList.fulfilled, (state, action) => {
            state.interestlists = {
                rows: [action.payload, ...state.interestlists.rows],
                pageCount: state.interestlists.pageCount,
            };
            state.isLoading.interestlists = false;
            state.hasError.interestlists = false;
        })
            .addCase(exports.putCompany.fulfilled, (state, action) => {
            state.company = action.payload;
        })
            .addCase(exports.fetchUserCompanies.fulfilled, (state, action) => {
            state.companies = action.payload;
        })
            .addCase(exports.createUserCompany.fulfilled, (state, action) => {
            state.companies = [...state.companies, action.payload];
        })
            .addCase(exports.createCompany.fulfilled, (state, action) => {
            state.companies = [...state.companies, action.payload];
        })
            .addCase(exports.fetchCompanyPassword.fulfilled, (state, action) => {
            state.company = action.payload;
            state.passwordCorrect = true;
        })
            .addCase(exports.fetchCompanyBySearchTerm.fulfilled, (state, action) => {
            state.companies = action.payload;
        })
            .addCase(exports.fetchUserCompanyBySearchTerm.fulfilled, (state, action) => {
            state.companies = action.payload;
        })
            .addCase(exports.fetchCompanies.rejected, (state, action) => {
            state = INIT_STATE;
        })
            .addCase(exports.updateCompanyStatus.fulfilled, (state, action) => {
            const companyIdx = state.companies.findIndex((company) => company.id === action.payload.id);
            state.companies[companyIdx] = action.payload;
        })
            .addCase(exports.updateCompanyPassword.fulfilled, (state, action) => {
            const companyIdx = state.companies.findIndex((company) => company.id === action.payload.id);
            state.companies[companyIdx] = action.payload;
        });
    },
});
//Actions
/////////////////////////////////////////////////////////////
_a = companySlice.actions, exports.setNew = _a.setNew, exports.clearCompany = _a.clearCompany;
//Reducer
/////////////////////////////////////////////////////////////
exports.default = companySlice.reducer;
