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
exports.property = void 0;
const sequelize_1 = __importStar(require("sequelize"));
const db_1 = __importDefault(require("../db"));
class property extends sequelize_1.Model {
    get address() {
        return `${this.streetNumber} ${this.streetName} ${this.city}`;
    }
}
exports.property = property;
exports.default = property.init({
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    streetNumber: {
        type: sequelize_1.default.STRING,
    },
    streetName: {
        type: sequelize_1.default.STRING,
    },
    city: {
        type: sequelize_1.default.STRING,
    },
    state: {
        type: sequelize_1.default.STRING,
    },
    zip: {
        type: sequelize_1.default.STRING,
    },
    county: {
        type: sequelize_1.default.STRING,
    },
    legalDescription: {
        type: sequelize_1.default.STRING,
    },
}, {
    sequelize: db_1.default,
    tableName: "properties",
});
