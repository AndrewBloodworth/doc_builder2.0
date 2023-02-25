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
exports.user = void 0;
const sequelize_1 = __importStar(require("sequelize"));
const db_1 = __importDefault(require("../db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const types_1 = require("../../types");
const capitalize_1 = __importDefault(require("../../utils/capitalize"));
const SALT_ROUNDS = 5;
class user extends sequelize_1.Model {
    get fullName() {
        if (!this.firstName || !this.lastName) {
            return "No Name";
        }
        return `${(0, capitalize_1.default)(this.firstName)} ${(0, capitalize_1.default)(this.lastName)}`;
    }
}
exports.user = user;
exports.default = user.init({
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: sequelize_1.default.STRING,
    lastName: sequelize_1.default.STRING,
    email: {
        type: sequelize_1.default.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: sequelize_1.default.STRING,
        allowNull: true,
    },
    notifications: {
        type: sequelize_1.default.ENUM(types_1.Notifications.ON, types_1.Notifications.OFF),
        allowNull: false,
        defaultValue: types_1.Notifications.ON,
    },
    status: {
        type: sequelize_1.default.ENUM(types_1.UserStatus.ACTIVE, types_1.UserStatus.PENDING, types_1.UserStatus.SUSPENDED),
        allowNull: false,
        defaultValue: types_1.UserStatus.ACTIVE,
    },
    role: {
        type: sequelize_1.default.ENUM(types_1.UserRole.USER, types_1.UserRole.ADMIN),
        allowNull: false,
        defaultValue: types_1.UserRole.USER,
    },
}, {
    sequelize: db_1.default,
    tableName: "users",
});
/**
 * Instance Methods
 */
user.prototype.correctPassword = function (candidatePwd) {
    return bcrypt_1.default.compare(candidatePwd, this.password);
};
user.prototype.generateToken = function () {
    return jsonwebtoken_1.default.sign({ id: this.id }, String(process.env.JWT));
};
/**
 * Class Methods
 */
user.authenticate = function ({ email, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ where: { email } });
        if (!user || !(yield user.correctPassword(password))) {
            const error = Error("Incorrect email/password");
            error.status = 401;
            throw error;
        }
        if (user && user.status === types_1.UserStatus.SUSPENDED) {
            const error = Error("User has been suspended");
            error.status = 403;
            throw error;
        }
        return user.generateToken();
    });
};
user.findByToken = function (token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = jsonwebtoken_1.default.verify(token, String(process.env.JWT));
            if (typeof payload === "object") {
                const user = yield this.findByPk(payload.id);
                if (!user) {
                    throw "Invalid User Id";
                }
                return user;
            }
        }
        catch (err) {
            const error = Error(err);
            error.status = 401;
            throw error;
        }
    });
};
user.isAdmin = function (token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = jsonwebtoken_1.default.verify(token, String(process.env.JWT));
            if (typeof payload === "object") {
                const user = yield this.findByPk(payload.id);
                if (!user) {
                    throw "Invalid User Id";
                }
                if (user.role !== types_1.UserRole.ADMIN) {
                    throw "Unauthorized. User is not an Admin.";
                }
                return user;
            }
        }
        catch (err) {
            const error = Error(err);
            error.status = 401;
            throw error;
        }
    });
};
/**
 * hooks
 */
const hashPassword = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.changed("password")) {
        user.password = yield bcrypt_1.default.hash(user.password, SALT_ROUNDS);
    }
});
user.beforeCreate(hashPassword);
user.beforeUpdate(hashPassword);
user.beforeBulkCreate((users) => {
    Promise.all(users.map(hashPassword));
});
