"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../builder_types/enums");
const config = {
    excludes: (number) => {
        return [
            [-Infinity, 1011],
            [1026, 1043],
            [1058, Infinity],
        ].some(([start, end]) => number >= start && number <= end);
    },
    PageID: "CBS1--6-21.",
    settings: {
        header_regexp: "/^(d+.)/y",
        line_matcher: (line) => {
            let count = 1;
            let ref = this;
            if (ref.line_counter) {
                count = ref.line_counter();
            }
            else {
                ref.line_counter = (() => {
                    let count = 1;
                    return () => {
                        return ++count;
                    };
                })();
            }
            return {
                matches: !line.includes(":") && !line.includes("Broker’s Signature"),
                line_number: String(count),
            };
        },
        component_location: {},
        default_signatures: {
            [enums_1.SpacePropertyKeys.BUYERS_AGENT_KEY]: {
                line: 14,
                fields: {
                    brokerageName: {
                        label: "Brokerage Firm’s Name:",
                        type: "text",
                        attribute: "",
                        tag: "",
                        value: "",
                    },
                    brokerageLicenseNumber: {
                        label: "Brokerage Firm’s License #:",
                        type: "text",
                        attribute: "",
                        tag: "",
                        value: "",
                    },
                    name: {
                        label: "Broker’s Name:",
                        type: "text",
                        attribute: "",
                        tag: "",
                        value: "",
                    },
                    licenseNumber: {
                        label: "Broker’s License #:",
                        type: "text",
                        attribute: "",
                        tag: "",
                        value: "",
                    },
                    address: {
                        label: "Address",
                        type: "text",
                        attribute: "",
                        tag: "",
                        value: "",
                    },
                    phone: {
                        label: "Phone No.:",
                        type: "phone",
                        attribute: "",
                        tag: "",
                        value: "",
                    },
                    fax: {
                        label: "Fax No.:",
                        type: "phone",
                        attribute: "",
                        tag: "",
                        value: "",
                    },
                    email: {
                        label: "Email Address:",
                        type: "email",
                        attribute: "",
                        tag: "",
                        value: "",
                    },
                },
            },
            [enums_1.SpacePropertyKeys.SELLERS_AGENT_KEY]: {
                line: 28,
                fields: {
                    brokerageName: {
                        label: "Brokerage Firm’s Name:",
                        type: "text",
                        attribute: "",
                        tag: "",
                        value: "",
                    },
                    brokerageLicenseNumber: {
                        label: "Brokerage Firm’s License #:",
                        type: "text",
                        attribute: "",
                        tag: "",
                        value: "",
                    },
                    name: {
                        label: "Broker’s Name:",
                        type: "text",
                        attribute: "",
                        tag: "",
                        value: "",
                    },
                    licenseNumber: {
                        label: "Broker’s License #:",
                        type: "text",
                        attribute: "",
                        tag: "",
                        value: "",
                    },
                    address: {
                        label: "Address",
                        type: "text",
                        attribute: "",
                        tag: "",
                        value: "",
                    },
                    phone: {
                        label: "Phone No.:",
                        type: "phone",
                        attribute: "",
                        tag: "",
                        value: "",
                    },
                    fax: {
                        label: "Fax No.:",
                        type: "phone",
                        attribute: "",
                        tag: "",
                        value: "",
                    },
                    email: {
                        label: "Email Address:",
                        type: "email",
                        attribute: "",
                        tag: "",
                        value: "",
                    },
                },
            },
        },
        input_location: {
            4: [
                {
                    before: 1,
                    type: enums_1.Inputs.CHECKBOX,
                    data: {
                        placeholder: "Seller",
                    },
                },
                {
                    before: 3,
                    type: enums_1.Inputs.CHECKBOX,
                    data: {
                        placeholder: "Seller",
                    },
                },
            ],
            9: [
                {
                    before: 7,
                    type: enums_1.Inputs.CHECKBOX,
                    data: {
                        placeholder: "Seller",
                    },
                },
                {
                    before: 10,
                    type: enums_1.Inputs.CHECKBOX,
                    data: {
                        placeholder: "Seller",
                    },
                },
            ],
            10: [
                {
                    before: "start",
                    type: enums_1.Inputs.CHECKBOX,
                    data: {
                        placeholder: "Seller",
                    },
                },
            ],
            11: [
                {
                    before: 10,
                    type: enums_1.Inputs.CHECKBOX,
                    data: {
                        placeholder: "Seller",
                    },
                },
                {
                    before: 14,
                    type: enums_1.Inputs.CHECKBOX,
                    data: {
                        placeholder: "Seller",
                    },
                },
                {
                    before: 16,
                    type: enums_1.Inputs.CHECKBOX,
                    data: {
                        placeholder: "Seller",
                    },
                },
                {
                    before: 18,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "Seller",
                    },
                },
            ],
            25: [
                {
                    before: 14,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "Seller",
                    },
                },
            ],
        },
        row_styles: {
            1: [
                enums_1.RowStyles.CENTERED,
                enums_1.RowStyles.FONT__SIZE__LARGE,
                enums_1.RowStyles.BORDER__TOP,
            ],
            3: [enums_1.RowStyles.LINE__HEIGHT__LG],
            9: [enums_1.RowStyles.LINE__HEIGHT__LG],
            10: [enums_1.RowStyles.LINE__HEIGHT__LG],
            16: [enums_1.RowStyles.LINE__HEIGHT__LG, enums_1.RowStyles.BORDER__TOP],
        },
        segment_styles: {
            1: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            3: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            4: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Does|Not",
                    },
                },
            ],
            9: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Buyer’s|Agent|Transaction-Broker",
                    },
                },
            ],
            10: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Customer.",
                    },
                },
            ],
            11: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Listing_Brokerage_Firm|Buyer|Other",
                        excludes: "",
                    },
                },
            ],
            16: { address: [enums_1.SegmentStyles.BOLD__ALL] },
        },
        static_settings: {
            14: [enums_1.StaticStyles.KEEP__SINGLE],
            28: [enums_1.StaticStyles.KEEP__SINGLE],
        },
    },
};
module.exports = config;
