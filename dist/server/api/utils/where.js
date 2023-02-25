"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../db"));
const types_1 = require("../../types");
const Op = db_1.default.Op;
const dateStr = (date) => date.split("T")[0];
const datePlus = (days, date) => {
    const d = new Date(dateStr(date));
    d.setDate(d.getDate() + days);
    return dateStr(d.toISOString());
};
exports.default = (data, types) => {
    const whereObj = {};
    for (const type of types) {
        switch (type) {
            case types_1.WhereType.REGEXP_SEARCH: {
                if (!!data.term) {
                    whereObj.where = Object.assign(Object.assign({}, whereObj.where), { name: {
                            [Op.regexp]: `(?i)${data.term}`,
                        } });
                }
                break;
            }
            case types_1.WhereType.CREATED_DATE_RANGE: {
                if (!!data.dateRange) {
                    const [start, end] = data.dateRange;
                    if (!!start) {
                        whereObj.where = Object.assign(Object.assign({}, whereObj.where), { createdAt: {
                                [Op.and]: [
                                    { [Op.gte]: dateStr(start) },
                                    { [Op.lt]: datePlus(1, !!end ? end : start) },
                                ],
                            } });
                    }
                }
                break;
            }
        }
    }
    return whereObj;
};
