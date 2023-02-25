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
const { Company, CompanyCategory, User } = db_1.default.models;
const middleware_1 = require("./utils/middleware");
const types_1 = require("../types");
const attributes_1 = require("./utils/attributes");
const mailer_1 = __importDefault(require("../mailer"));
const domain_1 = __importDefault(require("../utils/domain"));
/**
 * GET /
 * User's Agency
 */
router.get("/", middleware_1.requireToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        res.json(yield ((_a = req.user) === null || _a === void 0 ? void 0 : _a.getAgency({
            include: [
                {
                    model: Company,
                    attributes: attributes_1.companyAttributes,
                    include: [
                        { model: CompanyCategory, attributes: attributes_1.companyCategoryAttributes },
                    ],
                },
            ],
        })));
    }
    catch (err) {
        next(err);
    }
}));
/**
 * GET /
 * User's Agency's Company Categories
 */
router.get("/categories", middleware_1.requireToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        res.json(yield ((_b = req.user) === null || _b === void 0 ? void 0 : _b.getAgency({
            include: [
                { model: CompanyCategory, attributes: attributes_1.companyCategoryAttributes },
            ],
        }).then(({ companycategories }) => companycategories)));
    }
    catch (err) {
        next(err);
    }
}));
/**
 * GET /
 * Agency Members
 */
router.get("/users", middleware_1.requireToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        res.json(yield ((_c = req.user) === null || _c === void 0 ? void 0 : _c.getAgency({
            include: [
                { model: User, as: "admins", attributes: attributes_1.userAttributes },
                { model: User, as: "members", attributes: attributes_1.userAttributes },
            ],
        }).then(({ admins, members }) => {
            const generateUserObject = (user, role) => ({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                fullName: user.fullName,
                email: user.email,
                status: user.status,
                role,
            });
            return [
                ...(admins || []).map((admin) => generateUserObject(admin, types_1.AgencyUserType.ADMIN)),
                ...(members || []).map((member) => generateUserObject(member, types_1.AgencyUserType.MEMBER)),
            ];
        })));
    }
    catch (err) {
        next(err);
    }
}));
/**
 * POST /
 * Agency Members
 */
router.post("/users", middleware_1.requireToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const { firstName, lastName, email, isAdmin } = req.body;
        const user = yield User.create({
            firstName,
            lastName,
            email,
            status: types_1.UserStatus.PENDING,
        });
        const agencyUserType = isAdmin
            ? types_1.AgencyUserType.ADMIN
            : types_1.AgencyUserType.MEMBER;
        yield ((_d = req.user) === null || _d === void 0 ? void 0 : _d.getAgency().then((agency) => __awaiter(void 0, void 0, void 0, function* () {
            yield agency.addUserToAgency(user, agencyUserType);
        })));
        const token = yield user.createToken();
        (0, mailer_1.default)({
            to: user.email,
            subject: "Invite",
            text: `Click on link to register account: ${(0, domain_1.default)(`/invite/${token.accessToken}`).href}`,
        });
        res.json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: user.fullName,
            email: user.email,
            status: user.status,
            role: agencyUserType,
        });
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
