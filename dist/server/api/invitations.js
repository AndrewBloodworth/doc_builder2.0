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
/* eslint-disable no-unused-vars */
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const db_1 = __importDefault(require("../db"));
const { User, Token } = db_1.default.models;
const mailer_1 = __importDefault(require("../mailer"));
const domain_1 = __importDefault(require("../utils/domain"));
const middleware_1 = require("./utils/middleware");
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.query.accessToken;
        const token = yield Token.findOne({ where: { accessToken } });
        if (!token || token.hasExpired) {
            if (token && token.hasExpired) {
                yield token.destroy();
            }
            const error = Error("Invalid token");
            error.status = 401;
            throw error;
        }
        const user = yield User.findByPk(token.userId, {
            attributes: ["id", "firstName", "lastName"],
        });
        res.json({
            userId: user === null || user === void 0 ? void 0 : user.id,
            firstName: user === null || user === void 0 ? void 0 : user.firstName,
            lastName: user === null || user === void 0 ? void 0 : user.lastName,
        });
    }
    catch (err) {
        next(err);
    }
}));
router.put("/refresh/:userId", middleware_1.requireToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield User.findByPk(userId, { include: [Token] });
        if (!user) {
            const error = Error("User does not exist");
            error.status = 401;
            throw error;
        }
        if (user.token) {
            user.token.destroy();
        }
        const token = yield user.createToken();
        (0, mailer_1.default)({
            to: user.email,
            subject: "Invite",
            text: `Click on link to register account: ${(0, domain_1.default)(`/invite/${token.accessToken}`).href}`,
        });
        res.sendStatus(200);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
