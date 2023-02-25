"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../builder_types/enums");
const config = {
    excludes: (number) => {
        return [
            [-Infinity, 185],
            [196, Infinity],
        ].some(([start, end]) => number >= start && number <= end);
    },
    PageID: "CBS1--6-21.",
    settings: {
        header_regexp: "/^(d+.)/y",
        line_matcher: (line) => {
            let count = 0;
            let ref = this;
            if (ref.line_counter) {
                count = ref.line_counter();
            }
            else {
                ref.line_counter = (() => {
                    let count = 0;
                    return () => {
                        return ++count;
                    };
                })();
            }
            const matched = line.match(/.*(?<!§)(?<!\d)(\d+).*$/y);
            const titles = line.match(/(Title|Owners' Association|Seller's Disclosures|Loan and Credit|Appraisal|Survey|Inspection and Due Diligence|Closing and Possession)/g);
            return {
                matches: !!matched || !!titles,
                line_number: String(count),
            };
        },
        component_location: {},
        default_signatures: {},
        input_location: {
            1: [
                {
                    before: "custom",
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "Amount",
                        amountLeft: true,
                        amountRight: false,
                        referenceInput: false,
                        itemInput: false,
                    },
                },
            ],
            2: [
                {
                    before: "custom",
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "Amount",
                        amountLeft: false,
                        amountRight: true,
                        referenceInput: false,
                        itemInput: false,
                    },
                },
            ],
            3: [
                {
                    before: "custom",
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "Amount",
                        amountLeft: false,
                        amountRight: true,
                        referenceInput: false,
                        itemInput: false,
                    },
                },
            ],
            4: [
                {
                    before: "custom",
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "Amount",
                        amountLeft: false,
                        amountRight: true,
                        referenceInput: false,
                        itemInput: false,
                    },
                },
            ],
            5: [
                {
                    before: "custom",
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "Amount",
                        amountLeft: false,
                        amountRight: true,
                        referenceInput: false,
                        itemInput: false,
                    },
                },
            ],
            6: [
                {
                    before: "custom",
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "Amount",
                        amountLeft: false,
                        amountRight: true,
                        referenceInput: false,
                        itemInput: false,
                    },
                },
            ],
            7: [
                {
                    before: "custom",
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "Reference",
                        amountLeft: true,
                        amountRight: true,
                        referenceInput: true,
                        itemInput: true,
                    },
                },
                {
                    before: "custom",
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "Item",
                        amountLeft: true,
                        amountRight: true,
                        referenceInput: true,
                        itemInput: true,
                    },
                },
                {
                    before: "custom",
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "Amount",
                        amountLeft: true,
                        amountRight: true,
                        referenceInput: true,
                        itemInput: true,
                    },
                },
                {
                    before: "custom",
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "Amount",
                        amountLeft: true,
                        amountRight: true,
                        referenceInput: true,
                        itemInput: true,
                    },
                },
            ],
            8: [
                {
                    before: "custom",
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "Reference",
                        amountLeft: true,
                        amountRight: true,
                        referenceInput: true,
                        itemInput: true,
                    },
                },
                {
                    before: "custom",
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "Item",
                        amountLeft: true,
                        amountRight: true,
                        referenceInput: true,
                        itemInput: true,
                    },
                },
                {
                    before: "custom",
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "Amount",
                        amountLeft: true,
                        amountRight: true,
                        referenceInput: true,
                        itemInput: true,
                    },
                },
                {
                    before: "custom",
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "Amount",
                        amountLeft: true,
                        amountRight: true,
                        referenceInput: true,
                        itemInput: true,
                    },
                },
            ],
            9: [
                {
                    before: "custom",
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "Amount",
                        amountLeft: false,
                        amountRight: true,
                        referenceInput: true,
                        itemInput: true,
                    },
                },
            ],
            10: [
                {
                    before: "custom",
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "Amount",
                        amountLeft: true,
                        amountRight: true,
                        referenceInput: true,
                        itemInput: true,
                    },
                },
                {
                    before: "custom",
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "Amount",
                        amountLeft: true,
                        amountRight: true,
                        referenceInput: true,
                        itemInput: true,
                    },
                },
            ],
        },
        row_styles: {},
        segment_styles: {},
        static_settings: {},
    },
};
module.exports = config;
