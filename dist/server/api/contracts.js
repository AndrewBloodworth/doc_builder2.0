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
const { Contract, Signer, User, Property, Template, Space, Unlocked, Token } = db_1.default.models;
const types = require("../../../utils/Contract/utils/types");
const types_1 = require("../types");
const inclusions_1 = require("./utils/inclusions");
router.get("/:contractId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contractId } = req.params;
        const contract = yield Contract.findByPk(contractId, Object.assign({ attributes: { exclude: ["lines"] } }, inclusions_1.contract_includer));
        res.json(contract);
    }
    catch (e) {
        next(e);
    }
}));
router.get("/:contractId/lines", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { offset } = req.query;
        const numOffset = Number(offset);
        const { contractId } = req.params;
        const contract = yield Contract.findByPk(contractId, {
            attributes: ["lines"],
        });
        const lines = JSON.parse(contract === null || contract === void 0 ? void 0 : contract.lines.toString());
        const sec = Math.floor(lines.length / 100);
        const oth = lines.length % 100;
        const thi = [
            0,
            ...Array(sec)
                .fill("")
                .map((_, i) => (i + 1) * 100),
            oth ? sec * 100 + oth : 0,
        ];
        res.json(lines.slice(thi[numOffset], thi[numOffset + 1]));
    }
    catch (e) {
        next(e);
    }
}));
router.put("/:contractId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contractId } = req.params;
        const contract = yield Contract.findByPk(contractId, Object.assign({ attributes: { exclude: ["lines"] } }, inclusions_1.contract_includer));
        let { inputs, data } = req.body;
        for (const input_data of data) {
            if (!input_data || !input_data.prop)
                continue;
            const { i, prop } = input_data;
            const { attribute, value, key, tag } = prop;
            inputs = Contract.updateInputs({
                tag,
                inputs,
                inner: false,
                payload: Object.assign({}, prop),
                i,
            });
            if (key === types_1.SpacePropertyType.BUYER_KEY ||
                key === types_1.SpacePropertyType.SELLER_KEY) {
                yield User.update({ [attribute]: value }, { where: { id: prop.id } });
                const [f, ...l] = key;
                const signer = yield Signer.findOne(Object.assign(Object.assign({}, inclusions_1.signer_includer), { where: { [`${f.toLowerCase()}${l.join("")}Id`]: prop.id } }));
                console.log(`${f.toLowerCase()}${l.join("")}Id`, prop.id);
                yield (signer === null || signer === void 0 ? void 0 : signer.update({
                    fields: Signer.updateFields({
                        attribute,
                        fields: signer.fields,
                        payload: { value },
                    }),
                }));
            }
            else if (key === types.PROPERTY_KEY) {
                yield Property.update({ [attribute]: value }, { where: { id: prop.id } });
            }
        }
        yield (contract === null || contract === void 0 ? void 0 : contract.update({ inputs }));
        // await contract.reload();
        // res.set("Content-Encoding", "gzip");
        res.json({ inputs, signers: contract === null || contract === void 0 ? void 0 : contract.signers });
    }
    catch (e) {
        next(e);
    }
}));
router.put("/:contractId/deadline-template/:templateId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { contractId, templateId } = req.params;
        const { startDate } = req.body;
        const contract = yield Contract.findByPk(contractId, inclusions_1.contract_includer);
        let deal = [0, 1];
        let ins = (() => {
            let i = 0;
            return (key, idx) => {
                if (key.includes("deadlines_") && i === 0 && i++ === 0) {
                    deal = [idx, idx + 1];
                }
                else if (!key.includes("deadlines_") && i > 0) {
                    deal[1] = idx + 1;
                }
                return key.includes("deadlines_");
            };
        })();
        // const [month, day, year] = startDate.split("-");
        //[year, month, day].join("-")
        let date = new Date(startDate);
        // date = new Date(date.valueOf());
        console.log(date);
        let dateCopy = date;
        const dayNames = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        //`${dateCopy.getMonth()}-${dateCopy.getUTCDate()}-${dateCopy.getFullYear()}`
        const contract_inputs = Object.entries(contract === null || contract === void 0 ? void 0 : contract.inputs).reduce((obj, [key, val], idx) => {
            if (ins(key, idx)) {
                dateCopy.setUTCDate(dateCopy.getUTCDate() + 1);
                // .setDate(dateCopy.getDate() + 1);
                // dateCopy = new Date(
                //   `${dateCopy.getMonth()}-${
                //     dateCopy.getDate()
                //   }-${dateCopy.getFullYear()}`
                // );
                while (dateCopy.getDay() === 0 || dateCopy.getDay() === 6) {
                    dateCopy.setUTCDate(dateCopy.getUTCDate() + 1);
                }
                console.log(dateCopy.toDateString());
                console.log(dayNames[dateCopy.getDay()]);
                // const day = dateCopy.getUTCDate();
                const month = dateCopy.getMonth();
                const year = dateCopy.getFullYear();
                // `${month}-${day}-${year}`,
                return Object.assign(Object.assign({}, obj), { [key]: dateCopy.toDateString() });
            }
            else {
                return Object.assign(Object.assign({}, obj), { [key]: val });
            }
        }, {});
        yield ((_a = contract === null || contract === void 0 ? void 0 : contract.deadline) === null || _a === void 0 ? void 0 : _a.update({
            inputs: Object.entries(contract_inputs)
                .slice(deal[0], deal[1])
                .reduce((obj, [key, val]) => {
                return Object.assign(Object.assign({}, obj), { [key]: val });
            }, {}),
        }));
        yield (contract === null || contract === void 0 ? void 0 : contract.update({
            inputs: contract_inputs,
        }));
        res.json({
            inputs: contract_inputs,
            signers: contract === null || contract === void 0 ? void 0 : contract.signers,
        });
    }
    catch (e) {
        next(e);
    }
}));
router.post("/:contractId/save-template", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { contractId } = req.params;
        const { inputs } = req.body;
        const template = yield Template.create({
            name: "ugh_inputs",
            contractId: Number(contractId),
            inputs,
        });
        const contract = yield Contract.findByPk(contractId, inclusions_1.contract_includer);
        yield ((_b = contract === null || contract === void 0 ? void 0 : contract.privateSpace) === null || _b === void 0 ? void 0 : _b.addTemplate(template));
        yield (contract === null || contract === void 0 ? void 0 : contract.reload());
        res.json(contract);
    }
    catch (e) {
        next(e);
    }
}));
router.get("/:contractId/templates/:templateId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contractId, templateId } = req.params;
        const template = yield Template.findByPk(templateId);
        const contract = yield Contract.findByPk(contractId);
        yield (contract === null || contract === void 0 ? void 0 : contract.update({ inputs: template === null || template === void 0 ? void 0 : template.inputs }));
        res.json({ inputs: template === null || template === void 0 ? void 0 : template.inputs });
    }
    catch (e) {
        next(e);
    }
}));
router.post("/:contractId/space-props/:spaceId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contractId, spaceId } = req.params;
        const { prop, i } = req.body;
        const { attribute, value, key, tag, } = prop;
        const space = yield Space.findByPk(spaceId);
        const contract = yield Contract.findByPk(contractId, Object.assign({ attributes: { exclude: ["lines"] } }, inclusions_1.contract_includer));
        if (key === types_1.SpacePropertyType.BUYER_KEY ||
            key === types_1.SpacePropertyType.SELLER_KEY) {
            const { default_signatures } = require(`../../../utils/Contract/utils/parse_configs/${contract === null || contract === void 0 ? void 0 : contract.name}.js`).settings;
            const { fields } = default_signatures[key];
            const signer = yield Signer.create({
                type: key,
                contractId: contract === null || contract === void 0 ? void 0 : contract.id,
                fields: Signer.updateFields({
                    attribute,
                    fields,
                    payload: { value },
                }),
            });
            const user = yield signer[`create${key}`]({
                [attribute]: value,
            });
            yield space[`add${key}`](user);
            yield (contract === null || contract === void 0 ? void 0 : contract.update({
                inputs: Contract.updateInputs({
                    tag,
                    inputs: contract.inputs,
                    inner: false,
                    payload: Object.assign(Object.assign({}, prop), { id: user.id }),
                    i,
                }),
            }));
        }
        else if (key === types_1.SpacePropertyType.PROPERTY_KEY) {
            const property = yield space[`create${key}`]({
                [attribute]: value,
            });
            yield space[`set${key}`](property);
            yield (contract === null || contract === void 0 ? void 0 : contract.update({
                inputs: Contract.updateInputs({
                    tag,
                    inputs: contract === null || contract === void 0 ? void 0 : contract.inputs,
                    inner: false,
                    payload: Object.assign(Object.assign({}, prop), { id: property.id }),
                    i,
                }),
            }));
        }
        yield (contract === null || contract === void 0 ? void 0 : contract.reload());
        res.json(contract);
    }
    catch (e) {
        next(e);
    }
}));
router.put("/:contractId/signers/:signerId/fields", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contractId, signerId } = req.params;
        const contract = yield Contract.findByPk(contractId, Object.assign({ attributes: { exclude: ["lines"] } }, inclusions_1.contract_includer));
        const { fields, attribute, value, key, tag, i, } = req.body;
        const inputs = Contract.updateInputs({
            tag,
            inputs: contract === null || contract === void 0 ? void 0 : contract.inputs,
            inner: true,
            payload: { value },
            i,
        });
        const beforeUpdate = Contract.createInputsHash(contract === null || contract === void 0 ? void 0 : contract.inputs);
        const afterUpdate = Contract.createInputsHash(inputs);
        const canUpdate = !(contract === null || contract === void 0 ? void 0 : contract.disabled);
        if (canUpdate || beforeUpdate === afterUpdate) {
            const signer = yield Signer.findByPk(signerId, inclusions_1.signer_includer);
            yield (signer === null || signer === void 0 ? void 0 : signer.updateSigner(key, {
                [attribute]: value,
            }));
            yield (signer === null || signer === void 0 ? void 0 : signer.update({ fields }));
            yield (contract === null || contract === void 0 ? void 0 : contract.update({
                inputs,
            }));
            yield (contract === null || contract === void 0 ? void 0 : contract.reload());
        }
        res.json(contract);
    }
    catch (e) {
        next(e);
    }
}));
router.put("/:contractId/signers/:signerId/sign", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contractId, signerId } = req.params;
        const signer = yield Signer.findByPk(signerId);
        const contract = yield Contract.findByPk(contractId, Object.assign({ attributes: { exclude: ["lines"] } }, inclusions_1.contract_includer));
        const hash = contract === null || contract === void 0 ? void 0 : contract.createHash();
        if (contract === null || contract === void 0 ? void 0 : contract.validateSigners(hash)) {
            const { timestamp, ipAddress } = req.body;
            yield (signer === null || signer === void 0 ? void 0 : signer.update({
                signed: true,
                timestamp,
                ipAddress,
                publicKey: signer === null || signer === void 0 ? void 0 : signer.createPublicKey(hash),
            }));
            yield contract.reload();
            res.json(contract);
        }
        else {
            throw Error("Invalid Signature");
        }
    }
    catch (e) {
        next(e);
    }
}));
router.put("/:contractId/unlock", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contractId } = req.params;
        const contract = yield Contract.findByPk(contractId, Object.assign({}, inclusions_1.contract_includer));
        if (contract === null || contract === void 0 ? void 0 : contract.fullySigned) {
            throw Error("Can not unlock signed contract");
        }
        const { name, lines, inputs } = contract;
        const contractSharedSpace = contract === null || contract === void 0 ? void 0 : contract.sharedSpace;
        const contractPrivateSpace = contract === null || contract === void 0 ? void 0 : contract.privateSpace;
        const unlocked_contract = yield Unlocked.create({
            name,
            lines,
            inputs,
            contractId: contract === null || contract === void 0 ? void 0 : contract.id,
        });
        yield unlocked_contract.setSpace(contractSharedSpace ? contractSharedSpace : contractPrivateSpace);
        for (const signer of contract === null || contract === void 0 ? void 0 : contract.signers) {
            if (signer.signed) {
                yield Signer.create({
                    type: signer.type,
                    unlockedId: unlocked_contract.id,
                    fields: signer.fields,
                });
            }
            yield signer.update({
                ipAddress: null,
                timestamp: null,
                publicKey: null,
                signed: false,
            });
        }
        yield (contract === null || contract === void 0 ? void 0 : contract.removeSharedSpace(contractSharedSpace));
        yield (contract === null || contract === void 0 ? void 0 : contract.reload());
        res.json(contract);
    }
    catch (e) {
        next(e);
    }
}));
router.get("/token-data/:accessToken", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { accessToken } = req.params;
        const token = yield Token.findOne({
            where: { accessToken },
        });
        if (!token || token.hasExpired) {
            const error = Error("Invalid token");
            error.status = 401;
            throw error;
        }
        const contractId = (_c = token.data()) === null || _c === void 0 ? void 0 : _c.contractId;
        const contract = yield Contract.findByPk(contractId, Object.assign({ attributes: { exclude: ["lines"] } }, inclusions_1.contract_includer));
        res.json(contract);
    }
    catch (e) {
        next(e);
    }
}));
exports.default = router;
