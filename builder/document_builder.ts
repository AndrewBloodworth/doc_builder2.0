declare function require(name: string): any;
declare var __dirname: string;

import { MainConfig } from "./builder_types/types";
const writer = require("./writer/index");

const config_init: MainConfig = (() => ({
  input_file_name: `${process.argv[2]}.pdf`,
  output_file_name: `${process.argv[2]}.json`,
  parse_config_file_name: `${process.argv[2]}`,
}))();

const config: MainConfig = process.argv.reduce((obj, input) => {
  if (input.includes("-")) {
    switch (input.slice(1)) {
      case "w": {
        obj = { ...obj, writeToJson: true };
        break;
      }
      case "c": {
        obj = { ...obj, type: "contract" };
        break;
      }
      case "d": {
        obj = { ...obj, type: "deadline" };
        break;
      }
      case "L": {
        obj = { ...obj, showLineNumber: true };
        break;
      }
      case "l": {
        obj = { ...obj, showTrueLineNumber: true };
        break;
      }
      case "t": {
        obj = { ...obj, showText: true };
        break;
      }
      case "T": {
        obj = { ...obj, showRawText: true };
        break;
      }
      case "f100": {
        obj = { ...obj, first: 100 };
        break;
      }
      case "f200": {
        obj = { ...obj, first: 200 };
        break;
      }
      case "f300": {
        obj = { ...obj, first: 300 };
        break;
      }
      case "b": {
        obj = { ...obj, buildToDatabase: true };
        break;
      }
      case "C": {
        obj = { ...obj, showComments: true };
        break;
      }
    }
  }
  return obj;
}, config_init);
(() => {
  writer(config);
})();
