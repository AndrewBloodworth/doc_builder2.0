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
const Op = db_1.default.Op;
const { Company, CompanyCategory } = db_1.default.models;
const middleware_1 = require("./utils/middleware");
const types_1 = require("../types");
const inclusions_1 = require("./utils/inclusions");
/**
 * GET /
 * All Companies
 */
router.get("/companies", middleware_1.requireToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // res.json(await req.user?.getCompanies(companyIncluder));
    }
    catch (err) {
        next(err);
    }
}));
/**
 * GET /search/:searchTerm
 * Get comapnies by search term
 */
router.get("/search/:searchTerm", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { searchTerm } = req.params;
        // res.send(
        //   await req.user?.getCompanies({
        //     where: {
        //       [Op.or]: {
        //         name: {
        //           [Op.regexp]: `(?i)${searchTerm}`,
        //         },
        //         password: {
        //           [Op.regexp]: `(?i)${searchTerm}`,
        //         },
        //       },
        //     },
        //     ...companyIncluder,
        //   })
        // );
    }
    catch (e) {
        next(e);
    }
}));
/**
 * POST /
 * Create Company
 */
router.post("/companies", middleware_1.requireToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { name, password, category } = req.body;
        // const company = await Company.create({
        //   name,
        //   password,
        //   userId: req.user?.id,
        // });
        // const [cat, created] = await Category.findOrCreate({
        //   where: { name: category },
        //   defaults: {
        //     name: category,
        //   },
        //   returning: true,
        // });
        // await req.user?.addCategory(cat);
        // await company.setCategory(cat);
        // res.json(await Company.findByPk(company.id, companyIncluder));
    }
    catch (err) {
        next(err);
    }
}));
/**
 * PUT /
 * Update Company Status
 */
router.put("/companies/:companyId/status", middleware_1.requireToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyId } = req.params;
        const company = yield Company.findByPk(companyId);
        if (!company) {
            const error = Error("Company does not exist");
            error.status = 404;
            throw error;
        }
        yield company.update({
            status: company.status === types_1.CompanyStatus.ACTIVE
                ? types_1.CompanyStatus.INACTIVE
                : types_1.CompanyStatus.ACTIVE,
        });
        res.json(yield Company.findByPk(companyId, inclusions_1.companyIncluder));
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}));
router.put("/companies/:companyId/password", middleware_1.requireToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyId } = req.params;
        const company = yield Company.findByPk(companyId);
        if (!company) {
            const error = Error("Company does not exist");
            error.status = 404;
            throw error;
        }
        yield company.update(req.body);
        res.json(yield Company.findByPk(companyId, inclusions_1.companyIncluder));
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}));
router.put("/notifications", middleware_1.requireToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const notifications = req.query.status;
        yield ((_a = req.user) === null || _a === void 0 ? void 0 : _a.update({ notifications }));
        res.sendStatus(204);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}));
exports.default = router;
