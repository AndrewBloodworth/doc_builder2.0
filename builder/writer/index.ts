declare function require(name: string): any;
declare var __dirname: string;
import * as fs from "fs";
import * as path from "path";
import { LinkedList } from "../LinkedList/linkedList";
import { parser } from "../parser/index";
import { StaticStyles } from "../builder_types/enums";

import {
  LineInput,
  MainConfig,
  ParsedLine,
  ContractConfig,
  Section,
  Contract,
  Sections,
  Addressable,
} from "../builder_types/types";

const buildType = (input: LineInput): string => {
  const dataString = Object.entries(input.data).reduce(
    (str, [key, value], idx, arr) => {
      str += `${key}=${value}`;
      return idx < arr.length - 1 ? `${str}%20` : str;
    },
    ""
  );
  return `${input.type}{${dataString}}`;
};

module.exports = async (config: MainConfig): Promise<void> => {
  const parse_config_file: ContractConfig = require(`../parse_configs/${config.parse_config_file_name}`);
  const contract: Contract = {
    component_location: parse_config_file.settings.component_location,
    signature_location: Object.entries(
      parse_config_file.settings.default_signatures
    ).reduce((obj: { [index: number]: string }, [key, val]) => {
      const { line } = val;
      obj[line] = key;
      return obj;
    }, {}),
    sections: {},
  };

  await parser(config).then((lines: ParsedLine[]) => {
    contract.sections[0] = {
      number: "Header",
      title: "",
      depth: 0,
      lines: {},
      sections: {},
    };

    let currentSection: Section = contract.sections[0];
    const parents = new LinkedList();
    parents.addToHead(currentSection);

    lines.forEach((line, idx) => {
      const { page, number, text, rules } = line;
      let headerText = text;
      let isHeader = false;

      const isChildOfParent = (childNumber: string): boolean => {
        const childNumbers = childNumber.split(".");
        childNumbers.splice(childNumbers.length - 2, 1);
        const potentialParentNumber = childNumbers.join(".");
        return (
          parents.tail! && potentialParentNumber === parents.tail.value.number
        );
      };
      const static_settings =
        parse_config_file.settings.static_settings[number];
      if (
        config.type === "contract" &&
        /^([\d+\.])+/.test(text) &&
        text !== "." &&
        !(
          static_settings &&
          static_settings.includes(StaticStyles.IGNORE_HEADER)
        )
      ) {
        isHeader = true;
        let childNumber = text.match(/^([\d+\.])+/)![0];
        let fullText = text.substring(childNumber.length);
        let titleLength = fullText.indexOf(".") + 1;
        let titleName = fullText.substring(0, titleLength);
        if (
          static_settings &&
          static_settings.includes(StaticStyles.IGNORE_TITLE)
        ) {
          titleLength = 1;
          titleName = "";
        }

        headerText = fullText.substring(titleLength);

        while (parents.head) {
          if (isChildOfParent(childNumber)) break;
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
            depth: parents.tail.value.depth! + 1,
            lines: {},
            sections: {},
          };

          currentSection = currentSection.sections[newSectionIndex];
          parents.addToTail(currentSection);
        } else {
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

      const styles = (s_s: Addressable | LineInput[]) => {
        if (!Array.isArray(s_s) && typeof s_s === "object" && s_s.address) {
          return s_s.address.map((s) => s);
        } else if (Array.isArray(s_s)) {
          return s_s.reduce((s: string[], input: LineInput) => {
            return [...s, buildType(input)];
          }, []);
        }
      };

      currentSection.lines = {
        ...currentSection.lines,
        [number]: {
          text: headerText,
          rules,
          row_styles,
          segment_styles: styles(segment_styles) || [],
        },
      };
    });
  });
  const { writeToJson, buildToDatabase } = config;
  if (writeToJson) {
    fs.writeFileSync(
      path.join(__dirname, `../contract_json/${config.output_file_name}`),
      JSON.stringify(contract, null, "\t")
    );

    if (buildToDatabase) {
      const seed = require(path.join(__dirname, `../../server/scripts/seed`));
      await seed(config.output_file_name.replace(".json", ""));
    }
  }
};
