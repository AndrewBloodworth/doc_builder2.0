"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const writer = require("./writer/index");
const config_init = (() => ({
    input_file_name: `${process.argv[2]}.pdf`,
    output_file_name: `${process.argv[2]}.json`,
    parse_config_file_name: `${process.argv[2]}`,
}))();
const config = process.argv.reduce((obj, input) => {
    if (input.includes("-")) {
        switch (input.slice(1)) {
            case "w": {
                obj = Object.assign(Object.assign({}, obj), { writeToJson: true });
                break;
            }
            case "c": {
                obj = Object.assign(Object.assign({}, obj), { type: "contract" });
                break;
            }
            case "d": {
                obj = Object.assign(Object.assign({}, obj), { type: "deadline" });
                break;
            }
            case "L": {
                obj = Object.assign(Object.assign({}, obj), { showLineNumber: true });
                break;
            }
            case "l": {
                obj = Object.assign(Object.assign({}, obj), { showTrueLineNumber: true });
                break;
            }
            case "t": {
                obj = Object.assign(Object.assign({}, obj), { showText: true });
                break;
            }
            case "T": {
                obj = Object.assign(Object.assign({}, obj), { showRawText: true });
                break;
            }
            case "f100": {
                obj = Object.assign(Object.assign({}, obj), { first: 100 });
                break;
            }
            case "f200": {
                obj = Object.assign(Object.assign({}, obj), { first: 200 });
                break;
            }
            case "f300": {
                obj = Object.assign(Object.assign({}, obj), { first: 300 });
                break;
            }
            case "b": {
                obj = Object.assign(Object.assign({}, obj), { buildToDatabase: true });
                break;
            }
            case "C": {
                obj = Object.assign(Object.assign({}, obj), { showComments: true });
                break;
            }
        }
    }
    return obj;
}, config_init);
(() => {
    writer(config);
})();
