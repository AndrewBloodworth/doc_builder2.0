"use strict";
/* eslint-disable no-unused-vars */
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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const db_1 = __importDefault(require("../db"));
const { CompanyCategory } = db_1.default.models;
const middleware_1 = require("./utils/middleware");
/**
 * GET /
 * All Categories
 */
router.get("/", middleware_1.requireToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let categories;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === "Admin") {
            categories = yield CompanyCategory.findAll();
        }
        else {
            // categories = await req.user?.getCategories();
        }
        res.json(categories);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
