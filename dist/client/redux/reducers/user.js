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
exports.setNew = exports.updateUserStatus = exports.updateUser = exports.fetchUserBySearchTerm = exports.fetchUsers = void 0;
/* eslint-disable no-unused-vars */
const toolkit_1 = require("@reduxjs/toolkit");
const axios_1 = __importDefault(require("axios"));
exports.fetchUsers = (0, toolkit_1.createAsyncThunk)("user/fetchUsers", () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(`/api/admin/users`);
    return data;
}));
exports.fetchUserBySearchTerm = (0, toolkit_1.createAsyncThunk)("user/fetchUserBySearchTerm", (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(`/api/admin/users/search/${searchTerm}`);
    return data;
}));
exports.updateUser = (0, toolkit_1.createAsyncThunk)("user/updateUser", ({ limit, userId }) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.put(`/api/admin/users/${userId}`, { limit });
    return data;
}));
exports.updateUserStatus = (0, toolkit_1.createAsyncThunk)("user/updateUserStatus", ({ status, userId }) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.put(`/api/admin/users/${userId}`, { status });
    return data;
}));
const INIT_STATE = {
    users: [],
    isLoading: true,
    hasError: false,
};
//Slice
/////////////////////////////////////////////////////////////
const userSlice = (0, toolkit_1.createSlice)({
    name: "user",
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
            .addCase(exports.fetchUsers.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
            .addCase(exports.fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.isLoading = false;
            state.hasError = false;
        })
            .addCase(exports.fetchUserBySearchTerm.fulfilled, (state, action) => {
            state.users = action.payload;
            state.isLoading = false;
            state.hasError = false;
        })
            .addCase(exports.updateUser.fulfilled, (state, action) => {
            const userIdx = state.users.findIndex((user) => user.id === action.payload.id);
            state.users[userIdx] = action.payload;
            state.isLoading = false;
            state.hasError = false;
        })
            .addCase(exports.updateUserStatus.fulfilled, (state, action) => {
            const userIdx = state.users.findIndex((user) => user.id === action.payload.id);
            state.users[userIdx] = action.payload;
            state.isLoading = false;
            state.hasError = false;
        })
            .addCase(exports.fetchUsers.rejected, (state, action) => {
            state = INIT_STATE;
        });
    },
});
//Actions
/////////////////////////////////////////////////////////////
exports.setNew = userSlice.actions.setNew;
//Reducer
/////////////////////////////////////////////////////////////
exports.default = userSlice.reducer;
