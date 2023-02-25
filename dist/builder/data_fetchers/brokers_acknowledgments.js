"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = __importDefault(require("../main"));
const LineToString_1 = __importDefault(require("../utils/LineToString"));
class BrokersAcknowlegmentsClass extends main_1.default {
    constructor(name) {
        super(name);
    }
    getData(contract) {
        const { signature_location, sections } = contract;
        const ln_gen = ({ line, depth }) => {
            const p_line = {
                lineNumber: line.number,
                lineText: line.data.text,
                lineStyles: line.data.row_styles,
                lineSegments: (0, LineToString_1.default)({
                    line: {
                        lineNumber: line.number,
                        lineStyles: line.data.row_styles,
                        segmentStyles: line.data.segment_styles,
                    },
                    segments: this.getRowSegments(line.data.text),
                    maxCharacters: 60,
                }),
                segmentStyles: line.data.segment_styles,
                lineDepth: depth,
                hasSignature: signature_location[line.number] || false,
            };
            return p_line;
        };
        const fn = (data) => ln_gen(data);
        return this.init(sections, fn);
    }
}
exports.default = BrokersAcknowlegmentsClass;
