"use strict";
/* eslint-disable no-unused-vars */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const types_1 = require("./types");
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import auth from "./auth";
// import api from "./api";
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ credentials: true, origin: "*" }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "../../public")));
// app.use(API_ROUTE.AUTH, auth);
// app.use(API_ROUTE.API, api);
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../public/index.html"));
});
app.use((err, req, res, next) => {
    if (process.env.NODE_ENV !== types_1.Environment.TEST)
        console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error");
});
module.exports = app;
