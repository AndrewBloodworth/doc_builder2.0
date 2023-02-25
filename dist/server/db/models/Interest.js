"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.interest = void 0;
const sequelize_1 = __importStar(require("sequelize"));
const db_1 = __importDefault(require("../db"));
const InterestCategory_1 = __importDefault(require("./InterestCategory"));
class interest extends sequelize_1.Model {
}
exports.interest = interest;
exports.default = interest.init({
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        unique: true,
    },
    audience: {
        type: sequelize_1.default.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    createdAt: sequelize_1.default.DATE,
}, {
    sequelize: db_1.default,
    tableName: "interests",
});
interest.createInterestWithCategory = function (name) {
    return __awaiter(this, void 0, void 0, function* () {
        const matchArray = name.match(/.*\((.*)\).*/);
        const categoryName = matchArray ? matchArray[1] : "";
        if (!!categoryName) {
            const [interest] = yield this.findOrCreate({
                where: { name: name.substring(0, name.indexOf("(")).trim() },
            });
            const [interestCateogry] = yield InterestCategory_1.default.findOrCreate({
                where: { name: categoryName },
            });
            yield interest.setInterestcategory(interestCateogry);
            return interest;
        }
        else {
            const [interest] = yield this.findOrCreate({
                where: { name },
            });
            return interest;
        }
    });
};
// const createInterest = async (interest: interest) => {
//   const { name } = interest;
//   const matchArray = name.match(/.*\((.*)\).*/);
//   const interestCategory = matchArray ? matchArray[1] : "";
//   if (!!interestCategory) {
//     interest.name = name.substring(0, name.indexOf("(")).trim();
//     const [ic, created] = await InterestCategory.findOrCreate({
//       where: { name: interestCategory },
//     });
//     interest.interestcategoryId = ic.id;
//   }
// };
// interest.beforeCreate(createInterest);
// interest.beforeBulkCreate(async (interests: interest[]) => {
//   for (const i of interests) {
//     await createInterest(i);
//   }
// });
