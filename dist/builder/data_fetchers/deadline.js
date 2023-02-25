"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = __importDefault(require("../main"));
const LineToString_1 = __importDefault(require("../utils/LineToString"));
class DeadlineTable extends main_1.default {
    constructor(name) {
        super(name);
    }
    getData(contract) {
        const { sections } = contract;
        const ln_gen = ({ line, idx, number, title, depth }) => {
            const rules = line.data.rules;
            let words = line.data.text.split(" ");
            let lineNumber = words.shift() || "";
            const matched = words.join(" ").match(/§ *(\d*)(.*)/);
            let reference = "";
            let event = line.data.text;
            if (!!matched) {
                reference = matched[1];
                event = matched[2];
            }
            else {
                lineNumber = "";
            }
            const isHeader = !!!lineNumber;
            const p_line = {
                lineNumber,
                reference,
                event,
                lineText: rules.length ? rules : "",
                lineDepth: depth,
                lineSegments: (0, LineToString_1.default)({
                    line: {
                        lineNumber: line.number,
                        lineStyles: line.data.row_styles,
                        segmentStyles: line.data.segment_styles,
                    },
                    segments: this.getRowSegments(line.data.text),
                    maxCharacters: 60,
                }),
                lineStyles: line.data.row_styles,
                segmentStyles: line.data.segment_styles,
                isHeader,
            };
            return p_line;
        };
        const fn = (data) => ln_gen(data);
        return this.init(sections, fn);
    }
}
exports.default = DeadlineTable;
