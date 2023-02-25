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
Object.defineProperty(exports, "__esModule", { value: true });
exports.parser = void 0;
const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");
const enums_1 = require("../builder_types/enums");
const types_1 = require("../builder_types/types");
const buildType = (input) => {
    if (input.type === enums_1.Inputs.TEXT_REPLACE) {
        return String(input.data.text);
    }
    const dataString = Object.entries(input.data).reduce((str, [key, value], idx, arr) => {
        str += `${key}=${value}`;
        return idx < arr.length - 1 ? `${str}%20` : str;
    }, "");
    if (input.data.prefix || input.data.suffix) {
        return `${input.data.prefix ? `${input.data.prefix} ` : ""}${`${input.type}{${dataString}}`}${input.data.suffix ? ` ${input.data.suffix}` : ""}`;
    }
    return `${input.type}{${dataString}}`;
};
const trimLineNumber = (lineNumber, line, type, settings, custom_rules_instance) => {
    const trimmed = line.trim();
    const lineInputs = settings.input_location[lineNumber];
    const staticSettings = settings.static_settings[lineNumber];
    if (trimmed.split(" ").length < 2) {
        if (staticSettings && staticSettings.includes(enums_1.StaticStyles.IGNORE_HEADER)) {
            return `${trimmed.split(".")[0]}.`;
        }
        else if (staticSettings &&
            staticSettings.includes(enums_1.StaticStyles.KEEP__SINGLE)) {
            return trimmed;
        }
        if ((Array.isArray(lineInputs) && !lineInputs.length) ||
            (!Array.isArray(lineInputs) &&
                lineInputs &&
                type === "contract" &&
                !lineInputs.reformat)) {
            return "";
        }
    }
    let lineArr = trimmed.split(" ").filter((word) => word);
    if (type === "contract") {
        const lastItem = lineArr[lineArr.length - 1];
        if (lastItem && /.*(?<!\d)(\d+).*$/y.test(lastItem)) {
            lineArr.pop();
            const item = lastItem.match(/.*(?<!\d)(\d+).*$/y)[1];
            lineArr.push(lastItem.replace(item, "").trim());
        }
        if (!lineArr[lineArr.length - 1]) {
            lineArr.pop();
        }
    }
    if (lineInputs) {
        if (!Array.isArray(lineInputs) && lineInputs.reformat) {
            lineArr = lineInputs.reformat.split(" ");
        }
        else if (Array.isArray(lineInputs)) {
            for (const input of lineInputs) {
                if (input.before) {
                    let insert_index = input.before;
                    if (input.before === "custom") {
                        custom_rules_instance.custom = true;
                        custom_rules_instance.rules.push(buildType(input));
                        continue;
                    }
                    if (typeof insert_index !== "number") {
                        if (insert_index === "end") {
                            lineArr.push(buildType(input));
                            continue;
                        }
                        else {
                            insert_index = 0;
                        }
                    }
                    lineArr.splice(insert_index, 0, buildType(input));
                }
                else if (input.replace >= 0) {
                    lineArr.splice(input.replace, 1, buildType(input));
                }
            }
        }
    }
    return lineArr.join(" ");
};
const parser = (config) => __awaiter(void 0, void 0, void 0, function* () {
    const lineObjects = [];
    const parse_config_file = require(`../parse_configs/${config.parse_config_file_name}`);
    const excludes = parse_config_file.excludes;
    const PageID = parse_config_file.PageID;
    const settings = parse_config_file.settings;
    yield pdfParse(fs.readFileSync(path.join(__dirname, `../source_pdfs/${config.input_file_name}`))).then(({ text }) => {
        const lines = text.split("\n");
        let lineNumber = 1;
        let page = 0;
        lines.forEach((line, idx) => {
            const [totalPages, _, currentPage] = line.trim().split(" ").reverse();
            const custom_rules_instance = (0, types_1.custom_rules_generator)();
            if (excludes(lineNumber)) {
                if (line.includes(PageID)) {
                    page = Number(currentPage);
                }
                lineNumber++;
            }
            else {
                const { matches, line_number } = settings.line_matcher(line);
                if (!line.includes(PageID) && matches) {
                    const currentLineNumber = line_number;
                    const trimmedText = trimLineNumber(currentLineNumber, line, config.type, settings, custom_rules_instance);
                    lineObjects.push({
                        lineNumber: currentLineNumber,
                        text: trimmedText,
                        page,
                        rules: custom_rules_instance.rules.length
                            ? custom_rules_instance.rules.join(" ")
                            : "",
                    });
                    const { showLineNumber, showTrueLineNumber, showText, first, showRawText, showComments, } = config;
                    if (!(first && lineNumber > first) && showComments) {
                        console.log(showLineNumber ? lineNumber : "", showTrueLineNumber ? currentLineNumber : "", showText ? trimmedText : "", showRawText ? line : "");
                    }
                    lineNumber++;
                }
                if (line.includes(PageID)) {
                    page = Number(currentPage);
                    lineNumber++;
                }
            }
        });
    });
    return lineObjects.map((line, idx) => {
        const { page, text, rules } = line;
        const number = idx + 1;
        return { page, number, text, rules };
    });
});
exports.parser = parser;
