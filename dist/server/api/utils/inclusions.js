"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIncluder = exports.shared_space_includer = exports.private_space_includer = exports.unlocked_includer = exports.contract_includer = exports.signer_includer = exports.limited_contract_attributes = void 0;
const db_1 = __importDefault(require("../../db"));
const Op = db_1.default.Op;
const { User, Contract, Property, PurchasePrice, Deadline, SignableLink, Signer, Space, Template, Token, Unlocked, BrokerAcknowledgment, } = db_1.default.models;
exports.limited_contract_attributes = {
    attributes: ["id", "name", "inputs", "disabled", "fullySigned"],
};
exports.signer_includer = {
    include: [
        { model: User, as: "buyer" },
        { model: User, as: "seller" },
        { model: User, as: "selleragent" },
        { model: User, as: "buyeragent" },
    ],
};
exports.contract_includer = {
    include: [
        Deadline,
        PurchasePrice,
        BrokerAcknowledgment,
        Object.assign({ model: Signer }, exports.signer_includer),
        {
            model: Space,
            as: "privateSpace",
            include: [
                Property,
                Template,
                { model: User, as: "buyers" },
                { model: User, as: "sellers" },
            ],
        },
        { model: Space, as: "sharedSpaces" },
        { model: User, as: "owner" },
        { model: User, as: "buyersAgents" },
        { model: User, as: "sellersAgents" },
        { model: User, as: "buyers" },
        { model: User, as: "sellers" },
    ],
};
exports.unlocked_includer = {
    include: [Signer],
};
exports.private_space_includer = {
    order: [[SignableLink, "createdAt", "DESC"]],
    include: [
        { model: User, as: "owner" },
        { model: User, as: "buyersAgents" },
        { model: User, as: "sellersAgents" },
        { model: User, as: "buyers" },
        { model: User, as: "sellers" },
        {
            model: Space,
            as: "sharedSpaces",
            include: [
                { model: User, as: "buyersAgents" },
                { model: User, as: "sellersAgents" },
                Property,
                {
                    model: Space,
                    as: "privateSpaces",
                    include: [
                        { model: User, as: "owner" },
                        { model: User, as: "buyers" },
                        { model: User, as: "sellers" },
                    ],
                },
            ],
        },
        Property,
        Template,
        { model: SignableLink, include: [Token] },
        Object.assign(Object.assign({ model: Contract, as: "privateContracts" }, exports.limited_contract_attributes), { include: [
                { model: User, as: "owner" },
                Object.assign({ model: Signer }, exports.signer_includer),
            ] }),
        Object.assign(Object.assign({ model: Unlocked }, exports.unlocked_includer), { attributes: ["id", "name"] }),
    ],
};
exports.shared_space_includer = {
    include: [
        {
            model: Space,
            as: "privateSpaces",
        },
        Property,
        Template,
        { model: User, as: "buyersAgents" },
        { model: User, as: "sellersAgents" },
        { model: User, as: "buyers" },
        { model: User, as: "sellers" },
        Object.assign(Object.assign({ model: Contract, as: "sharedContracts" }, exports.limited_contract_attributes), { include: [
                { model: User, as: "owner" },
                Object.assign({ model: Signer }, exports.signer_includer),
            ] }),
        Object.assign(Object.assign({ model: Unlocked }, exports.unlocked_includer), { attributes: ["id", "name"] }),
    ],
};
exports.userIncluder = {
    include: [
        {
            model: Space,
            as: "privateSpaces",
            include: [
                Property,
                {
                    model: Contract,
                    as: "privateContracts",
                    attributes: ["id", "name"],
                },
            ],
        },
    ],
};
