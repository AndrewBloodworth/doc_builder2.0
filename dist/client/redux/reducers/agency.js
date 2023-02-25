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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setNew = exports.sendAgencyUserInvitation = exports.fetchAgencyUsers = exports.fetchAgencyCompanyCategories = exports.fetchAgency = void 0;
/* eslint-disable no-unused-vars */
const toolkit_1 = require("@reduxjs/toolkit");
const axios_1 = __importDefault(require("axios"));
const apiRoutes_1 = require("../apiRoutes");
exports.fetchAgency = (0, toolkit_1.createAsyncThunk)("agency/fetchAgency", () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get((0, apiRoutes_1.agencyAPI)());
    return data;
}));
exports.fetchAgencyCompanyCategories = (0, toolkit_1.createAsyncThunk)("agency/fetchAgencyCompanyCategories", ({ cb }) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get((0, apiRoutes_1.agencyAPI)(`/categories`));
    const response = data;
    cb(response);
    return response;
}));
exports.fetchAgencyUsers = (0, toolkit_1.createAsyncThunk)("agency/fetchAgencyUsers", () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get((0, apiRoutes_1.agencyAPI)("/users"));
    return data;
}));
exports.sendAgencyUserInvitation = (0, toolkit_1.createAsyncThunk)("agency/sendAgencyUserInvitation", (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.post((0, apiRoutes_1.agencyAPI)("/users"), body);
    return data;
}));
const INIT_STATE = {
    agency: {},
    agencyCompanyCategories: [],
    agencyUsers: [],
    isLoading: {
        agency: true,
        agencyCompanyCategories: true,
        agencyUsers: true,
    },
    hasError: {
        agency: false,
        agencyCompanyCategories: false,
        agencyUsers: false,
    },
};
//Slice
/////////////////////////////////////////////////////////////
const agencySlice = (0, toolkit_1.createSlice)({
    name: "agency",
    initialState: INIT_STATE,
    reducers: {
        setNew(state, action) {
            return Object.assign({}, state);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchAgency.pending, (state, action) => {
            state.isLoading.agency = true;
            state.hasError.agency = false;
        })
            .addCase(exports.fetchAgency.fulfilled, (state, action) => {
            state.agency = action.payload;
            state.isLoading.agency = false;
            state.hasError.agency = false;
        })
            .addCase(exports.fetchAgency.rejected, (state, action) => {
            state.isLoading.agency = false;
            state.hasError.agency = true;
        })
            .addCase(exports.fetchAgencyCompanyCategories.pending, (state, action) => {
            state.isLoading.agencyCompanyCategories = true;
            state.hasError.agencyCompanyCategories = false;
        })
            .addCase(exports.fetchAgencyCompanyCategories.fulfilled, (state, action) => {
            state.agencyCompanyCategories = action.payload;
            state.isLoading.agencyCompanyCategories = false;
            state.hasError.agencyCompanyCategories = false;
        })
            .addCase(exports.fetchAgencyCompanyCategories.rejected, (state, action) => {
            state.isLoading.agencyCompanyCategories = false;
            state.hasError.agencyCompanyCategories = true;
        })
            .addCase(exports.fetchAgencyUsers.pending, (state, action) => {
            state.isLoading.agencyUsers = true;
            state.hasError.agencyUsers = false;
        })
            .addCase(exports.fetchAgencyUsers.fulfilled, (state, action) => {
            state.agencyUsers = action.payload;
            state.isLoading.agencyUsers = false;
            state.hasError.agencyUsers = false;
        })
            .addCase(exports.fetchAgencyUsers.rejected, (state, action) => {
            state.isLoading.agencyUsers = false;
            state.hasError.agencyUsers = true;
        })
            .addCase(exports.sendAgencyUserInvitation.fulfilled, (state, action) => {
            state.agencyUsers = [action.payload, ...state.agencyUsers];
            state.isLoading.agencyUsers = false;
            state.hasError.agencyUsers = false;
        });
    },
});
//Actions
/////////////////////////////////////////////////////////////
exports.setNew = agencySlice.actions.setNew;
//Reducer
/////////////////////////////////////////////////////////////
exports.default = agencySlice.reducer;
