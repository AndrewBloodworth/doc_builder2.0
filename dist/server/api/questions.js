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
const axios_1 = __importDefault(require("axios"));
const db_1 = __importDefault(require("../db"));
const { User, Question, Interest } = db_1.default.models;
const middleware_1 = require("./utils/middleware");
const facebookAPI = process.env.FACEBOOK_API;
const facebookAccessToken = process.env.FACEBOOK_ACCESS_TOKEN;
const getAudienceSize = (interest) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data: { data: response }, } = yield axios_1.default.get(`${facebookAPI}['${interest}']${facebookAccessToken}`);
        const { audience_size } = response[0];
        if (audience_size) {
            return Number(audience_size);
        }
        else {
            throw Error("Audience size is undefined.");
        }
    }
    catch (error) {
        return null;
    }
});
/**
 * GET /
 * All Questions
 */
router.get("/", middleware_1.requireToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield Question.findAll());
    }
    catch (err) {
        next(err);
    }
}));
/**
 * PUT /
 * Assign Questions with interests & update interests with audience stats
 */
router.put("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questionData = req.body.questionData;
        const interests = req.body.interests;
        const question = yield Question.create(questionData);
        res.sendStatus(200);
        for (const name of interests) {
            const interest = yield Interest.createInterestWithCategory(name);
            try {
                yield question.addInterest(interest);
            }
            catch (error) {
                /**
                 * Duplicate Question <-> Id Associations throws an error
                 */
            }
            yield interest.update({ audience: yield getAudienceSize(name) });
        }
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
