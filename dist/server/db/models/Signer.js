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
exports.signer = void 0;
const sequelize_1 = __importStar(require("sequelize"));
const db_1 = __importDefault(require("../db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const types_1 = require("../../types");
class signer extends sequelize_1.Model {
}
exports.signer = signer;
exports.default = signer.init({
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    fields: {
        type: sequelize_1.default.JSON,
        defaultValue: {},
        allowNull: false,
    },
    ipAddress: {
        type: sequelize_1.default.STRING,
        allowNull: true,
    },
    timestamp: {
        type: sequelize_1.default.DATE,
        allowNull: true,
    },
    signed: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    publicKey: {
        type: sequelize_1.default.TEXT,
        allowNull: true,
    },
}, {
    sequelize: db_1.default,
    tableName: "signers",
});
signer.prototype.createPublicKey = function (hash) {
    return jsonwebtoken_1.default.sign({ hash }, String(process.env.PRIVATE_KEY));
};
signer.prototype.verifyHash = function (verify_hash) {
    const payload = jsonwebtoken_1.default.verify(this.publicKey, String(process.env.PRIVATE_KEY));
    return typeof payload === "object" && payload.hash === verify_hash;
};
signer.prototype.updateSigner = function (key, payload) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        switch (key) {
            case types_1.SpacePropertyType.BUYER_KEY: {
                yield ((_a = this.buyer) === null || _a === void 0 ? void 0 : _a.update(payload));
                break;
            }
            case types_1.SpacePropertyType.SELLER_KEY: {
                yield ((_b = this.seller) === null || _b === void 0 ? void 0 : _b.update(payload));
                break;
            }
        }
    });
};
signer.updateFields = function (data) {
    const { attribute, fields, payload } = data;
    return Object.entries(fields).reduce((obj, [key, val]) => {
        if (val.attribute === attribute) {
            obj[key] = Object.assign(Object.assign({}, val), payload);
        }
        else {
            obj[key] = Object.assign({}, val);
        }
        return obj;
    }, {});
};
