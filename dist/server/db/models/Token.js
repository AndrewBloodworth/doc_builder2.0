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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.token = void 0;
const sequelize_1 = __importStar(require("sequelize"));
const db_1 = __importDefault(require("../db"));
const crypto_1 = __importDefault(require("crypto"));
const hoursToMs_1 = __importDefault(require("../../utils/hoursToMs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class token extends sequelize_1.Model {
    get hasExpired() {
        return Date.now() > this.expires;
    }
}
exports.token = token;
exports.default = token.init({
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    accessToken: {
        type: sequelize_1.default.TEXT,
    },
    expires: {
        type: sequelize_1.default.DATE,
    },
}, {
    sequelize: db_1.default,
    tableName: "tokens",
});
token.generate = function (data) {
    return jsonwebtoken_1.default.sign({ valid: true, data }, String(process.env.JWT));
};
token.prototype.data = function () {
    const verified = jsonwebtoken_1.default.verify(this.accessToken, String(process.env.JWT));
    if (typeof verified === "object") {
        if (!verified.valid) {
            throw Error("Invalid accessToken");
        }
        else {
            return verified.data;
        }
    }
};
/**
 * hooks
 */
const hashToken = (token) => {
    token.accessToken = crypto_1.default.randomBytes(48).toString("hex");
    token.expires = Date.now() + (0, hoursToMs_1.default)(24);
};
token.beforeCreate(hashToken);
token.beforeBulkCreate((tokens) => {
    Promise.all(tokens.map(hashToken));
});
