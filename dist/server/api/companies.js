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
const Op = db_1.default.Op;
const { Company, CompanyCategory, Question, Interest, InterestCategory, Tag, InterestList, } = db_1.default.models;
const middleware_1 = require("./utils/middleware");
const inclusions_1 = require("./utils/inclusions");
const where_1 = __importDefault(require("./utils/where"));
const types_1 = require("../types");
const paginateResponse_1 = __importDefault(require("./utils/paginateResponse"));
/**
 * GET /
 * All Companies
 */
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield Company.findAll(inclusions_1.companyIncluder));
    }
    catch (err) {
        console.log("errr", err);
        next(err);
    }
}));
/**
 * GET /
 * Company by Id
 */
router.get("/:companyId", middleware_1.requireToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyId } = req.params;
        res.json(yield Company.findByPk(companyId, inclusions_1.companyIncluder));
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}));
/**
 * GET /
 * Company Interests
 */
router.get("/:companyId/interests", middleware_1.requireToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyId } = req.params;
        const { dateRange, searchInterest, searchCategory, searchTag, offset, limit, } = req.query;
        const [startDate, endDate] = dateRange === null || dateRange === void 0 ? void 0 : dateRange.split("|");
        const interestOffset = offset ? Number(offset) : 0;
        const interestLimit = limit ? Number(limit) : 2;
        res.json(yield Company.findByPk(companyId, {
            include: [
                {
                    model: Question,
                    attributes: ["id"],
                    include: [
                        Object.assign(Object.assign({ model: Interest }, (0, where_1.default)({ term: searchInterest, dateRange: [startDate, endDate] }, [types_1.WhereType.REGEXP_SEARCH, types_1.WhereType.CREATED_DATE_RANGE])), { attributes: ["id", "name"], include: [
                                Object.assign(Object.assign({ model: InterestCategory }, (0, where_1.default)({ term: searchCategory }, [
                                    types_1.WhereType.REGEXP_SEARCH,
                                ])), { attributes: ["id", "name"] }),
                                Object.assign(Object.assign({ model: Tag }, (0, where_1.default)({ term: searchTag }, [types_1.WhereType.REGEXP_SEARCH])), { attributes: ["id", "name"] }),
                            ] }),
                    ],
                },
            ],
        }).then((company) => {
            const interestMap = {};
            for (const question of company === null || company === void 0 ? void 0 : company.questions) {
                for (const interest of question.interests) {
                    if (interest.id in interestMap)
                        continue;
                    interestMap[interest.id] = interest;
                }
            }
            return (0, paginateResponse_1.default)(Object.values(interestMap), interestOffset, interestLimit);
        }));
    }
    catch (err) {
        next(err);
    }
}));
router.get("/:companyId/interestlists", middleware_1.requireToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyId } = req.params;
        const { offset, limit } = req.query;
        const interestlistOffset = offset ? Number(offset) : 0;
        const interestlistLimit = limit ? Number(limit) : 2;
        res.json(yield Company.findByPk(companyId, {
            include: [
                {
                    model: InterestList,
                    attributes: ["id", "name", "quality"],
                    include: [
                        {
                            model: Interest,
                            attributes: ["id", "name"],
                            include: [
                                { model: InterestCategory, attributes: ["id", "name"] },
                                { model: Tag, attributes: ["id", "name"] },
                            ],
                        },
                    ],
                },
            ],
        }).then((company) => (0, paginateResponse_1.default)(company === null || company === void 0 ? void 0 : company.interestlists, interestlistOffset, interestlistLimit)));
    }
    catch (err) {
        next(err);
    }
}));
/**
 * GET /search/:searchTerm
 * Get comapnies by search term
 */
router.get("/search/:searchTerm", middleware_1.requireToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { searchTerm } = req.params;
        res.send(yield ((_a = req.user) === null || _a === void 0 ? void 0 : _a.getCompanies(Object.assign({ where: {
                [Op.or]: {
                    name: {
                        [Op.regexp]: `(?i)${searchTerm}`,
                    },
                    password: {
                        [Op.regexp]: `(?i)${searchTerm}`,
                    },
                },
            } }, inclusions_1.companyIncluder))));
    }
    catch (e) {
        next(e);
    }
}));
/**
 * GET /
 * All Company by password
 */
router.get("/:password", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.params;
        let company = yield Company.findOne({
            where: { password },
        });
        if (!!company && company.status === types_1.CompanyStatus.INACTIVE) {
            company = null;
        }
        res.json(company);
    }
    catch (err) {
        next(err);
    }
}));
/**
 * GET /
 * Company by Id
 */
router.put("/:companyId", middleware_1.requireToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyId } = req.params;
        const data = req.body;
        const company = yield Company.findByPk(companyId);
        yield (company === null || company === void 0 ? void 0 : company.update({ name: data.name, password: data.password }));
        yield (company === null || company === void 0 ? void 0 : company.setCategoryWithAgency(data.categoryId));
        res.json(yield Company.findByPk(companyId, inclusions_1.companyIncluder));
    }
    catch (err) {
        next(err);
    }
}));
/**
 * POST /
 * Create Company
 */
router.post("/", middleware_1.isAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password, category } = req.body;
        const company = yield Company.create({ name, password });
        const [foundCategory] = yield CompanyCategory.findOrCreate({
            where: { name: category },
            defaults: {
                name: category,
                type: types_1.CategoryType.B2B,
            },
            returning: true,
        });
        if (foundCategory) {
            yield company.setCompanycategory(foundCategory);
        }
        res.json(yield Company.findByPk(company.id, inclusions_1.companyIncluder));
    }
    catch (err) {
        next(err);
    }
}));
/**
 * GET /
 * Company by Id
 */
router.post("/:companyId/interestlists", middleware_1.requireToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyId } = req.params;
        const { interestListName, interestIds } = req.body;
        const company = yield Company.findByPk(companyId);
        const interestList = yield (company === null || company === void 0 ? void 0 : company.createInterestlist({
            name: interestListName,
            quality: types_1.InterestQuality.GOOD_METRICS,
        }));
        yield (interestList === null || interestList === void 0 ? void 0 : interestList.addInterests(interestIds));
        res.json(yield InterestList.findByPk(interestList === null || interestList === void 0 ? void 0 : interestList.id, inclusions_1.interestListIncluder));
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
