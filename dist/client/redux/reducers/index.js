"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const auth_1 = __importDefault(require("./auth"));
const contract_1 = __importDefault(require("./contract"));
exports.default = (0, redux_1.combineReducers)({
    auth: auth_1.default,
    contract: contract_1.default,
});
