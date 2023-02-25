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
exports.contract = void 0;
const sequelize_1 = __importStar(require("sequelize"));
const db_1 = __importDefault(require("../db"));
const crypto_1 = __importDefault(require("crypto"));
class contract extends sequelize_1.Model {
    get disabled() {
        return !!(this.signers && this.signers.some(({ signed }) => signed));
    }
    get fullySigned() {
        return !!(this.signers &&
            this.signers.length > 0 &&
            this.signers.every(({ signed }) => signed));
    }
}
exports.contract = contract;
exports.default = contract.init({
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    lines: {
        type: sequelize_1.default.BLOB,
        allowNull: false,
    },
    sections: {
        type: sequelize_1.default.JSON,
        allowNull: false,
    },
    groupLength: {
        type: sequelize_1.default.INTEGER,
        defaultValue: 0,
    },
    inputs: {
        type: sequelize_1.default.JSON,
        allowNull: false,
    },
    mapper: {
        type: sequelize_1.default.JSON,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    tableName: "contracts",
});
contract.prototype.createHash = function () {
    const key = `${this.lines.toString()}${JSON.stringify(this.inputs)}`;
    return crypto_1.default.createHash("sha256").update(key, "binary").digest("base64");
};
contract.prototype.validateSigners = function (hash) {
    return true;
    // return this.signers.every((signer: any) =>
    //   !signer.signed ? true : signer.verifyHash(hash)
    // );
};
contract.createInputsHash = function (inputs) {
    return crypto_1.default
        .createHash("sha256")
        .update(JSON.stringify(inputs), "binary")
        .digest("base64");
};
contract.updateInputs = function (data) {
    const { tag, inputs, inner, payload, i } = data;
    return Object.entries(inputs).reduce((obj, [key, input]) => {
        if (Array.isArray(input)) {
            const idx = input.length === i && input.length > 0 ? input.length - 1 : i;
            if (input[idx] && input[idx].tag === tag) {
                obj[key] = [...input];
                obj[key][i] = inner ? Object.assign(Object.assign({}, input[i]), payload) : Object.assign({}, payload);
            }
            else {
                obj[key] = [...input];
            }
        }
        else {
            if (typeof input === "object" && input.tag === tag) {
                obj[key] = inner ? Object.assign(Object.assign({}, input), payload) : Object.assign({}, payload);
            }
            else if (typeof input === "object" &&
                input.key === payload.key &&
                payload.id) {
                obj[key] = Object.assign(Object.assign({}, input), { id: payload.id });
            }
            else {
                obj[key] = input;
            }
        }
        return obj;
    }, {});
};
contract.pack = function (lines) {
    var _a;
    const map = {
        "<span>": true,
        "</span>": true,
        "<strong>": true,
        "</strong>": true,
    };
    const unpacked_str = JSON.stringify(lines
        .filter(({ lineText }) => lineText !== "SKIP__ROW")
        .map((line) => {
        const n = Object.assign({}, line);
        delete n.lineText;
        delete n.segmentStyles;
        return n;
    }));
    (_a = unpacked_str === null || unpacked_str === void 0 ? void 0 : unpacked_str.match(/((p|strong)( class=\\"[\w|-]*\\" | )style=\\"[\w| |=|:|;|-]*\\")/g)) === null || _a === void 0 ? void 0 : _a.filter((t) => !(t === "p" || t === "strong")).map((repeated_str) => {
        map[repeated_str] = true;
    });
    const alpha = "abcdefghijklmnopqrstuvwxyz";
    const reversed_map = Object.keys(map).reduce((reverse_map, repeated_string, i) => {
        reverse_map[`_${alpha[i]}_`] = repeated_string;
        return reverse_map;
    }, {});
    return {
        lines: Object.entries(reversed_map).reduce((unpacked, [alpha_key, to_pack]) => {
            const regexp = new RegExp(to_pack.replace(/"/g, '\\"'), "g");
            return unpacked.replace(regexp, alpha_key);
        }, unpacked_str),
        mapper: JSON.parse(JSON.stringify(reversed_map).replace(/\\\\\\/g, "\\")),
        groupLength: Math.ceil(lines.filter(({ lineText }) => lineText !== "SKIP__ROW").length / 100),
    };
};
