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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const linkedList_1 = require("../LinkedList/linkedList");
const index_1 = require("../parser/index");
const enums_1 = require("../builder_types/enums");
const buildType = (input) => {
    const dataString = Object.entries(input.data).reduce((str, [key, value], idx, arr) => {
        str += `${key}=${value}`;
        return idx < arr.length - 1 ? `${str}%20` : str;
    }, "");
    return `${input.type}{${dataString}}`;
};
module.exports = (config) => __awaiter(void 0, void 0, void 0, function* () {
    const parse_config_file = require(`../parse_configs/${config.parse_config_file_name}`);
    const contract = {
        component_location: parse_config_file.settings.component_location,
        signature_location: Object.entries(parse_config_file.settings.default_signatures).reduce((obj, [key, val]) => {
            const { line } = val;
            obj[line] = key;
            return obj;
        }, {}),
        sections: {},
    };
    yield (0, index_1.parser)(config).then((lines) => {
        contract.sections[0] = {
            number: "Header",
            title: "",
            depth: 0,
            lines: {},
            sections: {},
        };
        let currentSection = contract.sections[0];
        const parents = new linkedList_1.LinkedList();
        parents.addToHead(currentSection);
        lines.forEach((line, idx) => {
            const { page, number, text, rules } = line;
            let headerText = text;
            let isHeader = false;
            const isChildOfParent = (childNumber) => {
                const childNumbers = childNumber.split(".");
                childNumbers.splice(childNumbers.length - 2, 1);
                const potentialParentNumber = childNumbers.join(".");
                return (parents.tail && potentialParentNumber === parents.tail.value.number);
            };
            const static_settings = parse_config_file.settings.static_settings[number];
            if (config.type === "contract" &&
                /^([\d+\.])+/.test(text) &&
                text !== "." &&
                !(static_settings &&
                    static_settings.includes(enums_1.StaticStyles.IGNORE_HEADER))) {
                isHeader = true;
                let childNumber = text.match(/^([\d+\.])+/)[0];
                let fullText = text.substring(childNumber.length);
                let titleLength = fullText.indexOf(".") + 1;
                let titleName = fullText.substring(0, titleLength);
                if (static_settings &&
                    static_settings.includes(enums_1.StaticStyles.IGNORE_TITLE)) {
                    titleLength = 1;
                    titleName = "";
                }
                headerText = fullText.substring(titleLength);
                while (parents.head) {
                    if (isChildOfParent(childNumber))
                        break;
                    parents.removeTail();
                    if (parents.tail) {
                        currentSection = parents.tail.value;
                    }
                }
                if (parents.tail) {
                    const newSectionIndex = Object.keys(currentSection.sections).length;
                    currentSection.sections[newSectionIndex] = {
                        number: childNumber,
                        title: titleName,
                        depth: parents.tail.value.depth + 1,
                        lines: {},
                        sections: {},
                    };
                    currentSection = currentSection.sections[newSectionIndex];
                    parents.addToTail(currentSection);
                }
                else {
                    const newSectionIndex = Object.keys(contract.sections).length;
                    contract.sections[newSectionIndex] = {
                        number: childNumber,
                        title: titleName,
                        depth: 0,
                        lines: {},
                        sections: {},
                    };
                    currentSection = contract.sections[newSectionIndex];
                    parents.addToHead(currentSection);
                }
            }
            const row_styles = parse_config_file.settings.row_styles[number] || [];
            const segment_styles = parse_config_file.settings.segment_styles[number];
            const styles = (s_s) => {
                if (!Array.isArray(s_s) && typeof s_s === "object" && s_s.address) {
                    return s_s.address.map((s) => s);
                }
                else if (Array.isArray(s_s)) {
                    return s_s.reduce((s, input) => {
                        return [...s, buildType(input)];
                    }, []);
                }
            };
            currentSection.lines = Object.assign(Object.assign({}, currentSection.lines), { [number]: {
                    text: headerText,
                    rules,
                    row_styles,
                    segment_styles: styles(segment_styles) || [],
                } });
        });
    });
    const { writeToJson, buildToDatabase } = config;
    if (writeToJson) {
        fs.writeFileSync(path.join(__dirname, `../contract_json/${config.output_file_name}`), JSON.stringify(contract, null, "\t"));
        if (buildToDatabase) {
            const seed = require(path.join(__dirname, `../../server/scripts/seed`));
            yield seed(config.output_file_name.replace(".json", ""));
        }
    }
});
