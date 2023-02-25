declare function require(name: string): any;
declare var __dirname: string;
const pdfParse = require("pdf-parse");
import fs = require("fs");
const path = require("path");
import { Inputs, StaticStyles } from "../builder_types/enums";
import {
  LineInput,
  custom_rules_generator,
  CustomRule,
  Settings,
  MainConfig,
  LineObject,
  ParsedLine,
  ContractConfig,
} from "../builder_types/types";

const buildType = (input: LineInput): string => {
  if (input.type === Inputs.TEXT_REPLACE) {
    return String(input.data.text);
  }
  const dataString = Object.entries(input.data).reduce(
    (str, [key, value], idx, arr) => {
      str += `${key}=${value}`;
      return idx < arr.length - 1 ? `${str}%20` : str;
    },
    ""
  );

  if (input.data.prefix || input.data.suffix) {
    return `${
      input.data.prefix ? `${input.data.prefix} ` : ""
    }${`${input.type}{${dataString}}`}${
      input.data.suffix ? ` ${input.data.suffix}` : ""
    }`;
  }
  return `${input.type}{${dataString}}`;
};

const trimLineNumber = (
  lineNumber: number | string,
  line: string,
  type: string,
  settings: Settings,
  custom_rules_instance: CustomRule
): string => {
  const trimmed = line.trim();
  const lineInputs = settings.input_location[lineNumber];

  const staticSettings = settings.static_settings[lineNumber];

  if (trimmed.split(" ").length < 2) {
    if (staticSettings && staticSettings.includes(StaticStyles.IGNORE_HEADER)) {
      return `${trimmed.split(".")[0]}.`;
    } else if (
      staticSettings &&
      staticSettings.includes(StaticStyles.KEEP__SINGLE)
    ) {
      return trimmed;
    }

    if (
      (Array.isArray(lineInputs) && !lineInputs.length) ||
      (!Array.isArray(lineInputs) &&
        lineInputs &&
        type === "contract" &&
        !lineInputs.reformat)
    ) {
      return "";
    }
  }
  let lineArr = trimmed.split(" ").filter((word) => word);

  if (type === "contract") {
    const lastItem = lineArr[lineArr.length - 1];

    if (lastItem && /.*(?<!\d)(\d+).*$/y.test(lastItem)) {
      lineArr.pop();
      const item: string = lastItem.match(/.*(?<!\d)(\d+).*$/y)![1];
      lineArr.push(lastItem.replace(item, "").trim());
    }
    if (!lineArr[lineArr.length - 1]) {
      lineArr.pop();
    }
  }

  if (lineInputs) {
    if (!Array.isArray(lineInputs) && lineInputs.reformat) {
      lineArr = lineInputs.reformat.split(" ");
    } else if (Array.isArray(lineInputs)) {
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
            } else {
              insert_index = 0;
            }
          }
          lineArr.splice(insert_index, 0, buildType(input));
        } else if (input.replace! >= 0) {
          lineArr.splice(input.replace!, 1, buildType(input));
        }
      }
    }
  }
  return lineArr.join(" ");
};

export const parser = async (config: MainConfig): Promise<ParsedLine[]> => {
  const lineObjects: LineObject[] = [];

  const parse_config_file: ContractConfig = require(`../parse_configs/${config.parse_config_file_name}`);

  const excludes = parse_config_file.excludes;
  const PageID = parse_config_file.PageID;
  const settings = parse_config_file.settings;

  await pdfParse(
    fs.readFileSync(
      path.join(__dirname, `../source_pdfs/${config.input_file_name}`)
    )
  ).then(({ text }: { text: string }) => {
    const lines = text.split("\n");
    let lineNumber = 1;
    let page = 0;
    lines.forEach((line, idx) => {
      const [totalPages, _, currentPage] = line.trim().split(" ").reverse();

      const custom_rules_instance = custom_rules_generator();
      if (excludes(lineNumber)) {
        if (line.includes(PageID)) {
          page = Number(currentPage);
        }

        lineNumber++;
      } else {
        const { matches, line_number } = settings.line_matcher(line);

        if (!line.includes(PageID) && matches) {
          const currentLineNumber = line_number;
          const trimmedText = trimLineNumber(
            currentLineNumber,
            line,
            config.type!,
            settings,
            custom_rules_instance
          );
          lineObjects.push({
            lineNumber: currentLineNumber,
            text: trimmedText,
            page,
            rules: custom_rules_instance.rules.length
              ? custom_rules_instance.rules.join(" ")
              : "",
          });

          const {
            showLineNumber,
            showTrueLineNumber,
            showText,
            first,
            showRawText,
            showComments,
          } = config;
          if (!(first && lineNumber > first) && showComments) {
            console.log(
              showLineNumber ? lineNumber : "",
              showTrueLineNumber ? currentLineNumber : "",
              showText ? trimmedText : "",
              showRawText ? line : ""
            );
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
};
