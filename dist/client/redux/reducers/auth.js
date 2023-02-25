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
exports.resetRequestPassword = exports.changeEmail = exports.reset = exports.authenticate = exports.me = exports.receiveToken = exports.requestReset = exports.resetPassword = exports.updateNotifications = exports.resendInvitation = exports.registerInvitation = exports.receiveInvitation = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const axios_1 = __importDefault(require("axios"));
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const apiRoutes_1 = require("../apiRoutes");
exports.receiveInvitation = (0, toolkit_1.createAsyncThunk)("auth/receiveInvitation", ({ accessToken, cb }) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get((0, apiRoutes_1.invitationAPI)(`?accessToken=${accessToken}`));
    const response = data;
    cb(response);
    return response.userId;
}));
exports.registerInvitation = (0, toolkit_1.createAsyncThunk)("auth/registerInvitation", (body) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.put((0, apiRoutes_1.authAPI)(`/register`), body);
    const { data } = yield axios_1.default.get((0, apiRoutes_1.authAPI)(`/me`), { withCredentials: true });
    return data;
}));
exports.resendInvitation = (0, toolkit_1.createAsyncThunk)("auth/resendInvitation", (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.put((0, apiRoutes_1.invitationAPI)(`/refresh/${userId}`));
    return data;
}));
exports.updateNotifications = (0, toolkit_1.createAsyncThunk)("auth/updateNotifications", (status) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.put(`/api/users/notifications?status=${status}`);
    return data;
}));
exports.resetPassword = (0, toolkit_1.createAsyncThunk)("auth/resetPassword", ({ password, userId }) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.put(`/auth/password-reset/${userId}`, { password });
}));
exports.requestReset = (0, toolkit_1.createAsyncThunk)("auth/requestReset", (email) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.post(`/auth/request-reset`, { email });
}));
exports.receiveToken = (0, toolkit_1.createAsyncThunk)("auth/receiveToken", (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(`/auth/tokens?accessToken=${accessToken}`);
    return data;
}));
exports.me = (0, toolkit_1.createAsyncThunk)("auth/me", () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get("/auth/me", { withCredentials: true });
    return data;
}));
exports.authenticate = (0, toolkit_1.createAsyncThunk)("auth/authenticate", ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.post(`/auth/login`, { email, password });
    const { data } = yield axios_1.default.get("/auth/me", { withCredentials: true });
    return data;
}));
exports.reset = (0, toolkit_1.createAsyncThunk)("auth/reset", () => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.delete("/auth/logout");
}));
exports.changeEmail = (0, toolkit_1.createAsyncThunk)("auth/changeEmail", ({ userId, email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.put(`/api/users/changeEmail/${userId}`, { email, password });
}));
const INIT_STATE = {
    auth: {},
    redirectPath: undefined,
    id: null,
    validatingInvitation: true,
    validatingToken: true,
    validToken: false,
    resetPasswordSuccessful: false,
    requestedPasswordReset: false,
    validInvitation: null,
    loggedIn: false,
    preCheck: false,
    isLoading: false,
    hasError: false,
};
//Slice
/////////////////////////////////////////////////////////////
const authSlice = (0, toolkit_1.createSlice)({
    name: "auth",
    initialState: INIT_STATE,
    reducers: {
        resetRequestPassword(state, action) {
            return Object.assign(Object.assign({}, state), { requestedPasswordReset: false });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.me.fulfilled, (state, action) => {
            state.auth = action.payload;
            state.preCheck = true;
            state.validInvitation = null;
            state.isLoading = false;
            state.hasError = false;
        })
            .addCase(exports.me.rejected, (state, action) => {
            state.preCheck = true;
            state.isLoading = false;
            state.hasError = true;
        })
            .addCase(exports.authenticate.fulfilled, (state, action) => {
            state.auth = action.payload;
            state.preCheck = true;
            state.validInvitation = null;
            state.isLoading = false;
            state.hasError = false;
        })
            .addCase(exports.authenticate.rejected, (state, action) => {
            state = INIT_STATE;
            if (action.error.message === "Request failed with status code 403") {
                alert("Your account has been suspended");
            }
            else {
                alert("Incorrect Email and/or Password");
            }
        })
            .addCase(exports.reset.fulfilled, (state, action) => {
            state = INIT_STATE;
        })
            .addCase(exports.receiveInvitation.pending, (state, action) => {
            state.validatingInvitation = true;
            state.validInvitation = false;
            state.isLoading = false;
            state.hasError = false;
        })
            .addCase(exports.receiveInvitation.fulfilled, (state, action) => {
            state.id = action.payload;
            state.validatingInvitation = false;
            state.validInvitation = true;
            state.isLoading = false;
            state.hasError = false;
        })
            .addCase(exports.receiveInvitation.rejected, (state, action) => {
            state.validatingInvitation = false;
            state.validInvitation = false;
            state.isLoading = false;
            state.hasError = true;
        })
            .addCase(exports.resendInvitation.fulfilled, (state, action) => {
            sweetalert2_1.default.fire("Success", "Invitation has been resent.", "success");
            state.isLoading = false;
            state.hasError = false;
        })
            .addCase(exports.resendInvitation.rejected, (state, action) => {
            alert("Something went wrong");
            state.isLoading = false;
            state.hasError = true;
        })
            .addCase(exports.registerInvitation.fulfilled, (state, action) => {
            state.auth = action.payload;
            state.validInvitation = null;
            state.preCheck = true;
            state.isLoading = false;
            state.hasError = false;
            // history.push("/");
            window.location.reload();
        })
            .addCase(exports.registerInvitation.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        })
            .addCase(exports.receiveToken.pending, (state, action) => {
            state.validatingToken = true;
            state.validToken = false;
            state.isLoading = false;
            state.hasError = false;
        })
            .addCase(exports.receiveToken.fulfilled, (state, action) => {
            state.validatingToken = false;
            state.id = action.payload;
            state.validToken = true;
            state.isLoading = false;
            state.hasError = false;
        })
            .addCase(exports.receiveToken.rejected, (state, action) => {
            state.validatingToken = false;
            state.validToken = false;
            state.isLoading = false;
            state.hasError = true;
        })
            .addCase(exports.requestReset.rejected, (state, action) => {
            alert("Email not registered with user account");
            state.requestedPasswordReset = true;
            state.isLoading = false;
            state.hasError = true;
        })
            .addCase(exports.requestReset.fulfilled, (state, action) => {
            alert("Email has been sent");
            state.requestedPasswordReset = true;
            state.isLoading = false;
            state.hasError = false;
        })
            .addCase(exports.resetPassword.fulfilled, (state, action) => {
            alert("Password has been reset");
            state.resetPasswordSuccessful = true;
            state.isLoading = false;
            state.hasError = false;
        })
            .addCase(exports.changeEmail.rejected, (state, action) => {
            alert("Password Incorrect");
            state.isLoading = false;
            state.hasError = true;
        })
            .addCase(exports.changeEmail.fulfilled, (state, action) => {
            alert("Email has been reset");
            state.isLoading = false;
            state.hasError = false;
        });
    },
});
//Actions
/////////////////////////////////////////////////////////////
exports.resetRequestPassword = authSlice.actions.resetRequestPassword;
//Reducer
/////////////////////////////////////////////////////////////
exports.default = authSlice.reducer;
