"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./User"));
const Contract_1 = __importDefault(require("./Contract"));
const Property_1 = __importDefault(require("./Property"));
const PurchasePrice_1 = __importDefault(require("./PurchasePrice"));
const Deadline_1 = __importDefault(require("./Deadline"));
const SignableLink_1 = __importDefault(require("./SignableLink"));
const Signer_1 = __importDefault(require("./Signer"));
const Space_1 = __importDefault(require("./Space"));
const Template_1 = __importDefault(require("./Template"));
const Token_1 = __importDefault(require("./Token"));
const Unlocked_1 = __importDefault(require("./Unlocked"));
const BrokerAcknowledgment_1 = __importDefault(require("./BrokerAcknowledgment"));
exports.default = {
    User: User_1.default,
    Contract: Contract_1.default,
    Property: Property_1.default,
    PurchasePrice: PurchasePrice_1.default,
    Deadline: Deadline_1.default,
    SignableLink: SignableLink_1.default,
    Signer: Signer_1.default,
    Space: Space_1.default,
    Template: Template_1.default,
    Token: Token_1.default,
    Unlocked: Unlocked_1.default,
    BrokerAcknowledgment: BrokerAcknowledgment_1.default,
};
