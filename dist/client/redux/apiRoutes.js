"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invitationAPI = exports.companyAPI = exports.authAPI = void 0;
const types_1 = require("../../server/types");
const formatAPIRoute_1 = __importDefault(require("../utils/formatAPIRoute"));
exports.authAPI = (0, formatAPIRoute_1.default)(types_1.API_ROUTE.AUTH);
exports.companyAPI = (0, formatAPIRoute_1.default)(types_1.API_ROUTE.COMPANY);
exports.invitationAPI = (0, formatAPIRoute_1.default)(types_1.API_ROUTE.INVITATION);
