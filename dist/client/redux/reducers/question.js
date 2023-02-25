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
exports.clearAnswer = exports.setNew = exports.createQuestion = exports.fetchQuestions = void 0;
/* eslint-disable no-unused-vars */
const toolkit_1 = require("@reduxjs/toolkit");
const axios_1 = __importDefault(require("axios"));
const apiRoutes_1 = require("../apiRoutes");
exports.fetchQuestions = (0, toolkit_1.createAsyncThunk)("question/fetchQuestions", () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get((0, apiRoutes_1.questionAPI)());
    return data;
}));
exports.createQuestion = (0, toolkit_1.createAsyncThunk)("question/createQuestion", (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.post((0, apiRoutes_1.questionAPI)(), body);
    // alert("Thank you for your response");
    // window.location.reload();
    return data;
}));
const INIT_STATE = {
    questions: [],
    isLoading: true,
    hasError: false,
};
//Slice
/////////////////////////////////////////////////////////////
const questionSlice = (0, toolkit_1.createSlice)({
    name: "question",
    initialState: INIT_STATE,
    reducers: {
        setNew(state, action) {
            return Object.assign({}, state);
        },
        clearAnswer(state, action) {
            const questionId = action.payload;
            const questions = state.questions.filter((question) => question.id !== questionId);
            return Object.assign(Object.assign({}, state), { questions });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchQuestions.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
            .addCase(exports.fetchQuestions.fulfilled, (state, action) => {
            state.questions = action.payload;
            state.isLoading = false;
            state.hasError = false;
        })
            .addCase(exports.fetchQuestions.rejected, (state, action) => {
            state = INIT_STATE;
        });
    },
});
//Actions
/////////////////////////////////////////////////////////////
_a = questionSlice.actions, exports.setNew = _a.setNew, exports.clearAnswer = _a.clearAnswer;
//Reducer
/////////////////////////////////////////////////////////////
exports.default = questionSlice.reducer;
