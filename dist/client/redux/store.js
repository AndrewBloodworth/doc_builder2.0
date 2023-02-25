"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const redux_logger_1 = require("redux-logger");
const redux_thunk_1 = __importDefault(require("redux-thunk"));
const reducers_1 = __importDefault(require("./reducers"));
const types_1 = require("../../server/types");
const middleware = [redux_thunk_1.default];
if (process.env.NODE_ENV === types_1.Environment.DEVELOPMENT) {
    middleware.push((0, redux_logger_1.createLogger)({ collapsed: true }));
}
const store = (0, toolkit_1.configureStore)({
    reducer: reducers_1.default,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleware),
});
exports.default = store;
