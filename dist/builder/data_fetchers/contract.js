"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = __importDefault(require("../main"));
const enums_1 = require("../builder_types/enums");
const LineToString_1 = __importDefault(require("../utils/LineToString"));
class ContractClass extends main_1.default {
    constructor(name) {
        super(name);
    }
    getData(contract) {
        const { component_location, signature_location, sections } = contract;
        const ln_gen = ({ line, idx, number, title, depth }) => ({
            isHeader: false,
            lineNumber: line.number,
            titleNumber: idx === 0 && number !== "Header" ? number : "",
            sectionTitle: idx === 0 ? title : "",
            lineText: line.data.text,
            lineStyles: line.data.row_styles,
            segmentStyles: line.data.segment_styles,
            lineDepth: depth,
            lineData: {
                line: {
                    lineNumber: line.number,
                    lineStyles: line.data.row_styles,
                    segmentStyles: line.data.segment_styles,
                },
                segments: this.getRowSegments(line.data.text),
                maxCharacters: 60,
            },
            lineSegments: (0, LineToString_1.default)({
                line: {
                    lineNumber: line.number,
                    lineStyles: line.data.row_styles,
                    segmentStyles: line.data.segment_styles,
                },
                segments: this.getRowSegments(line.data.text),
                maxCharacters: 60,
            }),
            hasDeadline: component_location[line.number] ===
                enums_1.ComponentLocations.DEADLINE__COMPONENT,
            hasPurchase: component_location[line.number] ===
                enums_1.ComponentLocations.PURCHASE__COMPONENT,
            hasSignature: signature_location[line.number] || false,
            hasBrokersAcknowledgments: component_location[line.number] ===
                enums_1.ComponentLocations.BROKERS__ACKNOWLEDGMENTS,
        });
        const fn = (data) => ln_gen(data);
        return this.init(sections, fn);
    }
}
exports.default = ContractClass;
