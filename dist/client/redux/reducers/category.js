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
exports.setNew = exports.fetchCategories = void 0;
/* eslint-disable no-unused-vars */
const toolkit_1 = require("@reduxjs/toolkit");
const axios_1 = __importDefault(require("axios"));
const apiRoutes_1 = require("../apiRoutes");
exports.fetchCategories = (0, toolkit_1.createAsyncThunk)("category/fetchCategories", () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get((0, apiRoutes_1.categoryAPI)());
    return data;
}));
const INIT_STATE = {
    categories: [],
    isLoading: true,
    hasError: false,
};
//Slice
/////////////////////////////////////////////////////////////
const categorySlice = (0, toolkit_1.createSlice)({
    name: "category",
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
            .addCase(exports.fetchCategories.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
            .addCase(exports.fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.isLoading = false;
            state.hasError = false;
        })
            .addCase(exports.fetchCategories.rejected, (state, action) => {
            state = INIT_STATE;
        });
    },
});
//Actions
/////////////////////////////////////////////////////////////
exports.setNew = categorySlice.actions.setNew;
//Reducer
/////////////////////////////////////////////////////////////
exports.default = categorySlice.reducer;
