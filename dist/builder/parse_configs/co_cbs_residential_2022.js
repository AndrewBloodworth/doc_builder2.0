"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../builder_types/enums");
const config = {
    excludes: (number) => {
        const DATES_AND_DEADLINES = [106, 159];
        const PURCHASE_PRICE_AND_TERMS = [182, 192];
        return [DATES_AND_DEADLINES, PURCHASE_PRICE_AND_TERMS].some(([start, end]) => number >= start && number <= end);
    },
    PageID: "CBS1--6-21.",
    settings: {
        header_regexp: "/^(d+.)/y",
        line_matcher: (line) => {
            const matched = line.match(/.*(?<!\d)(\d+).*$/y);
            return {
                matches: !!matched,
                line_number: !!matched && matched.length > 1 ? matched[1] : "",
            };
        },
        component_location: {
            103: enums_1.ComponentLocations.DEADLINE__COMPONENT,
            124: enums_1.ComponentLocations.PURCHASE__COMPONENT,
            558: enums_1.ComponentLocations.SIGNATURE__COMPONENT,
            891: enums_1.ComponentLocations.BROKERS__ACKNOWLEDGMENTS,
        },
        default_signatures: {
            [enums_1.SpacePropertyKeys.BUYER_KEY]: {
                line: 885,
                fields: {
                    name: {
                        label: "Buyer's Name:",
                        type: "text",
                        attribute: "fullName",
                        tag: "privateSpace.buyers.[fullName]",
                        value: "",
                    },
                    signature: {
                        label: "Buyer's Signature",
                        draw: false,
                        attribute: "fullName",
                        type: "signature",
                        imgSrc: "",
                        tag: "",
                        value: "",
                    },
                    address: {
                        label: "Address",
                        attribute: "",
                        type: "text",
                        imgSrc: "",
                        tag: "",
                        value: "",
                    },
                    phone: {
                        label: "Phone No.:",
                        attribute: "",
                        type: "text",
                        imgSrc: "",
                        tag: "",
                        value: "",
                    },
                    fax: {
                        label: "Fax No.:",
                        attribute: "",
                        type: "text",
                        imgSrc: "",
                        tag: "",
                        value: "",
                    },
                    email: {
                        label: "Email Address:",
                        type: "email",
                        value: "",
                        attribute: "email",
                        tag: "privateSpace.buyers.[email]",
                    },
                },
            },
            [enums_1.SpacePropertyKeys.SELLER_KEY]: {
                line: 886,
                fields: {
                    name: {
                        label: "Seller's Name:",
                        type: "text",
                        attribute: "fullName",
                        tag: "privateSpace.sellers.[fullName]",
                        value: "",
                    },
                    signature: {
                        label: "Seller's Signature",
                        attribute: "fullName",
                        draw: false,
                        imgSrc: "",
                        type: "signature",
                        tag: "",
                        value: "",
                    },
                    address: {
                        label: "Address",
                        attribute: "",
                        draw: false,
                        imgSrc: "",
                        type: "text",
                        tag: "",
                        value: "",
                    },
                    phone: {
                        label: "Phone No.:",
                        attribute: "",
                        draw: false,
                        imgSrc: "",
                        type: "phone",
                        tag: "",
                        value: "",
                    },
                    fax: {
                        label: "Fax No.:",
                        attribute: "",
                        draw: false,
                        imgSrc: "",
                        type: "phone",
                        tag: "",
                        value: "",
                    },
                    email: {
                        label: "Email Address:",
                        type: "email",
                        value: "",
                        attribute: "email",
                        tag: "privateSpace.sellers.[email]",
                    },
                },
            },
            [enums_1.SpacePropertyKeys.BUYERS_AGENT_KEY]: {
                line: 898,
                fields: {
                    brokerageName: {
                        label: "Brokerage Firm’s Name:",
                        attribute: "",
                        draw: false,
                        imgSrc: "",
                        type: "text",
                        tag: "",
                        value: "",
                    },
                    brokerageLicenseNumber: {
                        label: "Brokerage Firm’s License #:",
                        attribute: "",
                        draw: false,
                        imgSrc: "",
                        type: "text",
                        tag: "",
                        value: "",
                    },
                    name: {
                        label: "Broker’s Name:",
                        attribute: "",
                        draw: false,
                        imgSrc: "",
                        type: "text",
                        tag: "",
                        value: "",
                    },
                    licenseNumber: {
                        label: "Broker’s License #:",
                        attribute: "",
                        draw: false,
                        imgSrc: "",
                        type: "text",
                        tag: "",
                        value: "",
                    },
                    address: {
                        label: "Address",
                        attribute: "",
                        draw: false,
                        imgSrc: "",
                        type: "text",
                        tag: "",
                        value: "",
                    },
                    phone: {
                        label: "Phone No.:",
                        attribute: "",
                        draw: false,
                        imgSrc: "",
                        type: "text",
                        tag: "",
                        value: "",
                    },
                    fax: {
                        label: "Fax No.:",
                        attribute: "",
                        draw: false,
                        imgSrc: "",
                        type: "text",
                        tag: "",
                        value: "",
                    },
                    email: {
                        label: "Email Address:",
                        attribute: "",
                        draw: false,
                        imgSrc: "",
                        type: "text",
                        tag: "",
                        value: "",
                    },
                },
            },
            [enums_1.SpacePropertyKeys.SELLERS_AGENT_KEY]: {
                line: 898,
                fields: {
                    brokerageName: {
                        label: "Brokerage Firm’s Name:",
                        attribute: "",
                        draw: false,
                        imgSrc: "",
                        type: "text",
                        tag: "",
                        value: "",
                    },
                    brokerageLicenseNumber: {
                        label: "Brokerage Firm’s License #:",
                        attribute: "",
                        draw: false,
                        imgSrc: "",
                        type: "text",
                        tag: "",
                        value: "",
                    },
                    name: {
                        label: "Broker’s Name:",
                        attribute: "",
                        draw: false,
                        imgSrc: "",
                        type: "text",
                        tag: "",
                        value: "",
                    },
                    licenseNumber: {
                        label: "Broker’s License #:",
                        attribute: "",
                        draw: false,
                        imgSrc: "",
                        type: "text",
                        tag: "",
                        value: "",
                    },
                    address: {
                        label: "Address",
                        attribute: "",
                        draw: false,
                        imgSrc: "",
                        type: "text",
                        tag: "",
                        value: "",
                    },
                    phone: {
                        label: "Phone No.:",
                        attribute: "",
                        draw: false,
                        imgSrc: "",
                        type: "text",
                        tag: "",
                        value: "",
                    },
                    fax: {
                        label: "Fax No.:",
                        attribute: "",
                        draw: false,
                        imgSrc: "",
                        type: "text",
                        tag: "",
                        value: "",
                    },
                    email: {
                        label: "Email Address:",
                        attribute: "",
                        draw: false,
                        imgSrc: "",
                        type: "text",
                        tag: "",
                        value: "",
                    },
                },
            },
        },
        input_location: {
            10: [
                {
                    before: "end",
                    type: enums_1.Inputs.DATE__BOX,
                    data: { placeholder: "Date" },
                },
            ],
            15: [
                {
                    before: 2,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "Buyer",
                        auto: "privateSpace.buyers.[fullName]",
                        key: enums_1.SpacePropertyKeys.BUYER_KEY,
                    },
                },
            ],
            16: [
                {
                    before: 6,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "16_group", value: "joint_tenants" },
                },
                {
                    before: 9,
                    type: enums_1.Inputs.RADIO,
                    data: {
                        placeholder: "",
                        name: "16_group",
                        value: "tenants_in_common",
                    },
                },
                {
                    before: 13,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "16_group", value: "other" },
                },
                {
                    replace: 15,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "Other",
                    },
                },
            ],
            18: [
                {
                    before: 2,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "Seller",
                        auto: "privateSpace.sellers.[fullName]",
                        key: enums_1.SpacePropertyKeys.SELLER_KEY,
                    },
                },
            ],
            20: [
                {
                    before: 15,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "County",
                        auto: "privateSpace.property.county",
                        key: enums_1.SpacePropertyKeys.PROPERTY_KEY,
                    },
                },
            ],
            22: {
                type: enums_1.Inputs.SKIP__ROW,
                reformat: enums_1.Inputs.FULL__LENGTH__PARAGRAPH__7,
                data: {
                    placeholder: "",
                },
            },
            24: { type: enums_1.Inputs.SKIP__ROW, reformat: `${enums_1.Inputs.SKIP__ROW}`, data: {} },
            25: { type: enums_1.Inputs.SKIP__ROW, reformat: `${enums_1.Inputs.SKIP__ROW}`, data: {} },
            23: { type: enums_1.Inputs.SKIP__ROW, reformat: `${enums_1.Inputs.SKIP__ROW}`, data: {} },
            26: { type: enums_1.Inputs.SKIP__ROW, reformat: `${enums_1.Inputs.SKIP__ROW}`, data: {} },
            27: [
                {
                    before: 2,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "Street_Name",
                        auto: "privateSpace.property.streetNumber",
                        key: enums_1.SpacePropertyKeys.PROPERTY_KEY,
                    },
                },
                {
                    before: 3,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "Street_Number",
                        auto: "privateSpace.property.streetName",
                        key: enums_1.SpacePropertyKeys.PROPERTY_KEY,
                    },
                },
                {
                    before: 4,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "City",
                        auto: "privateSpace.property.city",
                        key: enums_1.SpacePropertyKeys.PROPERTY_KEY,
                    },
                },
                {
                    before: 5,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "State",
                        auto: "privateSpace.property.state",
                        key: enums_1.SpacePropertyKeys.PROPERTY_KEY,
                    },
                },
                {
                    before: 6,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: {
                        placeholder: "Zip",
                        auto: "privateSpace.property.zip",
                        key: enums_1.SpacePropertyKeys.PROPERTY_KEY,
                    },
                },
            ],
            36: [
                {
                    replace: 1,
                    type: enums_1.Inputs.NUMBER_INPUT,
                    data: { placeholder: "Remotes" },
                },
                {
                    before: 15,
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
                {
                    before: 18,
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
            ],
            37: [
                {
                    before: 1,
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
                {
                    before: 4,
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
            ],
            46: {
                type: enums_1.Inputs.SKIP__ROW,
                reformat: enums_1.Inputs.FULL__LENGTH__PARAGRAPH__5,
                data: { placeholder: "Date" },
            },
            47: { type: enums_1.Inputs.SKIP__ROW, reformat: `${enums_1.Inputs.SKIP__ROW}`, data: {} },
            48: { type: enums_1.Inputs.SKIP__ROW, reformat: `${enums_1.Inputs.SKIP__ROW}`, data: {} },
            49: { type: enums_1.Inputs.SKIP__ROW, reformat: `${enums_1.Inputs.SKIP__ROW}`, data: {} },
            50: { type: enums_1.Inputs.SKIP__ROW, reformat: `${enums_1.Inputs.SKIP__ROW}`, data: {} },
            51: [
                {
                    before: "start",
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
            ],
            56: {
                type: enums_1.Inputs.SKIP__ROW,
                reformat: enums_1.Inputs.FULL__LENGTH__PARAGRAPH__3,
                data: { placeholder: "Date" },
            },
            57: { type: enums_1.Inputs.SKIP__ROW, reformat: `${enums_1.Inputs.SKIP__ROW}`, data: {} },
            58: { type: enums_1.Inputs.SKIP__ROW, reformat: `${enums_1.Inputs.SKIP__ROW}`, data: {} },
            62: [
                {
                    before: "start",
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Parking" },
                },
                {
                    before: 12,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Storage" },
                },
            ],
            66: {
                type: enums_1.Inputs.SKIP__ROW,
                reformat: enums_1.Inputs.FULL__LENGTH__PARAGRAPH__4,
                data: { placeholder: "Date" },
            },
            67: { type: enums_1.Inputs.SKIP__ROW, reformat: `${enums_1.Inputs.SKIP__ROW}`, data: {} },
            68: { type: enums_1.Inputs.SKIP__ROW, reformat: `${enums_1.Inputs.SKIP__ROW}`, data: {} },
            69: { type: enums_1.Inputs.SKIP__ROW, reformat: `${enums_1.Inputs.SKIP__ROW}`, data: {} },
            71: {
                type: enums_1.Inputs.SKIP__ROW,
                reformat: enums_1.Inputs.FULL__LENGTH__PARAGRAPH__3,
                data: { placeholder: "Date" },
            },
            72: { type: enums_1.Inputs.SKIP__ROW, reformat: `${enums_1.Inputs.SKIP__ROW}`, data: {} },
            73: { type: enums_1.Inputs.SKIP__ROW, reformat: `${enums_1.Inputs.SKIP__ROW}`, data: {} },
            75: [
                {
                    before: 4,
                    type: enums_1.Inputs.FLOATING_CHECKBOX,
                    data: { placeholder: "" },
                },
            ],
            76: {
                type: enums_1.Inputs.SKIP__ROW,
                reformat: enums_1.Inputs.FULL__LENGTH__PARAGRAPH__3,
                data: { placeholder: "Date" },
            },
            77: { type: enums_1.Inputs.SKIP__ROW, reformat: `${enums_1.Inputs.SKIP__ROW}`, data: {} },
            78: { type: enums_1.Inputs.SKIP__ROW, reformat: `${enums_1.Inputs.SKIP__ROW}`, data: {} },
            79: [
                {
                    before: 12,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Deed" },
                },
            ],
            80: [
                {
                    before: 6,
                    type: enums_1.Inputs.FLOATING_CHECKBOX,
                    data: { placeholder: "" },
                },
            ],
            82: {
                type: enums_1.Inputs.SKIP__ROW,
                reformat: enums_1.Inputs.FULL__LENGTH__PARAGRAPH__4,
                data: { placeholder: "Date" },
            },
            83: { type: enums_1.Inputs.SKIP__ROW, reformat: `${enums_1.Inputs.SKIP__ROW}`, data: {} },
            84: { type: enums_1.Inputs.SKIP__ROW, reformat: `${enums_1.Inputs.SKIP__ROW}`, data: {} },
            85: { type: enums_1.Inputs.SKIP__ROW, reformat: `${enums_1.Inputs.SKIP__ROW}`, data: {} },
            86: [
                {
                    before: 3,
                    type: enums_1.Inputs.FLOATING_CHECKBOX,
                    data: { placeholder: "" },
                },
            ],
            92: [
                {
                    before: "start",
                    type: enums_1.Inputs.TEXT__BOX__MEDIUM,
                    data: { placeholder: "Well_Permit_Number" },
                },
            ],
            93: [
                {
                    before: 4,
                    type: enums_1.Inputs.FLOATING_CHECKBOX,
                    data: { placeholder: "" },
                },
            ],
            94: {
                type: enums_1.Inputs.SKIP__ROW,
                reformat: enums_1.Inputs.FULL__LENGTH__PARAGRAPH__3,
                data: { placeholder: "Date" },
            },
            95: { type: enums_1.Inputs.SKIP__ROW, reformat: `${enums_1.Inputs.SKIP__ROW}`, data: {} },
            96: { type: enums_1.Inputs.SKIP__ROW, reformat: `${enums_1.Inputs.SKIP__ROW}`, data: {} },
            100: [
                {
                    before: 5,
                    type: enums_1.Inputs.RADIO,
                    data: {
                        placeholder: "",
                        name: "100_group",
                        value: "does",
                    },
                },
                {
                    before: 7,
                    type: enums_1.Inputs.RADIO,
                    data: {
                        placeholder: "",
                        name: "100_group",
                        value: "does_not",
                    },
                },
            ],
            121: [
                {
                    before: 1,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "121_group", value: "will" },
                },
                {
                    before: 3,
                    type: enums_1.Inputs.RADIO,
                    data: {
                        placeholder: "",
                        name: "121_group",
                        value: "will_not",
                    },
                },
            ],
            125: [
                {
                    replace: 10,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Money" },
                },
            ],
            131: [
                {
                    replace: 16,
                    //Before period
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Money" },
                },
            ],
            132: [
                {
                    replace: 5,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Earnest_Money_Holder" },
                },
            ],
            162: [
                {
                    before: 14,
                    type: enums_1.Inputs.RADIO,
                    data: {
                        placeholder: "",
                        name: "162_group",
                        value: "does",
                    },
                },
                {
                    before: 16,
                    type: enums_1.Inputs.RADIO,
                    data: {
                        placeholder: "",
                        name: "162_group",
                        value: "does_not",
                    },
                },
            ],
            171: [
                {
                    before: "start",
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "171_group", value: "conventional" },
                },
                {
                    before: 2,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "171_group", value: "fha" },
                },
                {
                    before: 4,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "171_group", value: "va" },
                },
                {
                    before: 6,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "171_group", value: "bond" },
                },
                {
                    before: 8,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "171_group", value: "other" },
                },
                {
                    before: 10,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Other" },
                },
            ],
            173: [
                {
                    before: 20,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Money" },
                },
            ],
            179: [
                {
                    replace: 11,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Money" },
                },
                {
                    replace: 13,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Money" },
                },
            ],
            180: [
                {
                    replace: 5,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Percentage", prefix: "", suffix: "%" },
                },
                {
                    before: 17,
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
                {
                    before: "end",
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
            ],
            181: [
                {
                    before: 3,
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
                {
                    before: 8,
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
                {
                    before: 9,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Other" },
                },
            ],
            182: [
                {
                    replace: 11,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Money", prefix: "$", suffix: "." },
                },
            ],
            183: [
                {
                    replace: 2,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Percentage", prefix: "", suffix: "%" },
                },
                {
                    replace: 12,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Money", prefix: "$", suffix: "" },
                },
                {
                    replace: 14,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Money" },
                },
            ],
            185: [
                {
                    replace: 16,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Money", prefix: "$", suffix: "," },
                },
            ],
            187: [
                {
                    before: 1,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "187_group", value: "will" },
                },
                {
                    before: 3,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "187_group", value: "will_not" },
                },
            ],
            188: [
                {
                    before: 7,
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
                {
                    before: 15,
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
            ],
            189: [
                {
                    before: 16,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Money" },
                },
            ],
            190: [
                {
                    replace: 3,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Money", prefix: "$", suffix: "." },
                },
            ],
            196: [
                {
                    before: 19,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "196_197_group", value: "buyer" },
                },
            ],
            197: [
                {
                    before: "start",
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "196_197_group", value: "seller" },
                },
                {
                    replace: 16,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Days", prefix: "", suffix: "" },
                },
            ],
            262: [
                {
                    replace: 14,
                    type: enums_1.Inputs.TEXT_REPLACE,
                    data: { text: "Deadline )." },
                },
            ],
            267: [
                {
                    replace: 12,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Days", prefix: "$", suffix: "." },
                },
            ],
            283: [
                {
                    before: 22,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "283_284_group", value: "buyer" },
                },
            ],
            284: [
                {
                    before: "start",
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "283_284_group", value: "seller" },
                },
            ],
            346: [
                {
                    before: 6,
                    type: enums_1.Inputs.FLOATING_CHECKBOX,
                    data: { placeholder: "" },
                },
            ],
            349: [
                {
                    before: 6,
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
            ],
            351: [
                {
                    before: 6,
                    type: enums_1.Inputs.FLOATING_CHECKBOX,
                    data: { placeholder: "" },
                },
            ],
            355: [
                {
                    before: 8,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "355_group", value: "will" },
                },
                {
                    before: 10,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "355_group", value: "will_not" },
                },
            ],
            360: [
                {
                    before: "start",
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "360_group", value: "buyer" },
                },
                {
                    before: 2,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "360_group", value: "seller" },
                },
                {
                    before: 4,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "360_group", value: "seller_buyer" },
                },
                {
                    before: 12,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "360_group", value: "other" },
                },
                {
                    replace: 13,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Other", prefix: "Other", suffix: "." },
                },
            ],
            413: [
                {
                    before: 9,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "413_group", value: "seller" },
                },
                {
                    before: 11,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "413_group", value: "buyer" },
                },
            ],
            472: [
                {
                    before: 5,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "472_group", value: "does" },
                },
                {
                    before: 7,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "472_group", value: "does_not" },
                },
            ],
            475: [
                {
                    before: 12,
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
            ],
            476: [
                {
                    before: "start",
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
                {
                    replace: 7,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Form_of_Survey", prefix: "", suffix: ";" },
                },
            ],
            477: [
                {
                    before: 8,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "477_group", value: "seller" },
                },
                {
                    before: 10,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "477_group", value: "buyer" },
                },
            ],
            481: [
                {
                    before: 2,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "481_group", value: "seller" },
                },
                {
                    before: 4,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "481_group", value: "buyer" },
                },
            ],
            482: {
                type: enums_1.Inputs.FULL__LENGTH__PARAGRAPH__2,
                reformat: enums_1.Inputs.FULL__LENGTH__PARAGRAPH__2,
                data: { placeholder: "Date" },
            },
            483: {
                type: enums_1.Inputs.SKIP__ROW,
                reformat: `${enums_1.Inputs.SKIP__ROW}`,
                data: {},
            },
            485: [
                {
                    replace: 10,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Party" },
                },
            ],
            503: [
                {
                    replace: 13,
                    type: enums_1.Inputs.TEXT_REPLACE,
                    data: { text: "Deadline )." },
                },
            ],
            515: [
                {
                    replace: 9,
                    type: enums_1.Inputs.TEXT_REPLACE,
                    data: { text: "“ As" },
                },
                {
                    replace: 10,
                    type: enums_1.Inputs.TEXT_REPLACE,
                    data: { text: "Is ”" },
                },
                {
                    replace: 12,
                    type: enums_1.Inputs.TEXT_REPLACE,
                    data: { text: "“ Where" },
                },
                {
                    replace: 13,
                    type: enums_1.Inputs.TEXT_REPLACE,
                    data: { text: "Is ”" },
                },
                {
                    replace: 15,
                    type: enums_1.Inputs.TEXT_REPLACE,
                    data: { text: "“ With" },
                },
                {
                    replace: 17,
                    type: enums_1.Inputs.TEXT_REPLACE,
                    data: { text: "Faults .”" },
                },
            ],
            533: [
                {
                    replace: 12,
                    type: enums_1.Inputs.TEXT_REPLACE,
                    data: { text: "Deadline )." },
                },
            ],
            551: [
                {
                    before: "end",
                    type: enums_1.Inputs.FULL__LENGTH__PARAGRAPH__2,
                    data: { placeholder: "" },
                },
            ],
            555: {
                type: enums_1.Inputs.FULL__LENGTH__PARAGRAPH__2,
                reformat: enums_1.Inputs.FULL__LENGTH__PARAGRAPH__2,
                data: { placeholder: "" },
            },
            556: {
                type: enums_1.Inputs.SKIP__ROW,
                reformat: enums_1.Inputs.SKIP__ROW,
                data: { placeholder: "" },
            },
            559: [
                {
                    before: 10,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "559_group", value: "will" },
                },
                {
                    before: 12,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "559_group", value: "will_not" },
                },
            ],
            564: [
                {
                    before: 15,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "564_group", value: "will" },
                },
                {
                    before: 17,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "564_group", value: "will_not" },
                },
            ],
            568: {
                type: enums_1.Inputs.FULL__LENGTH__PARAGRAPH__4,
                reformat: enums_1.Inputs.FULL__LENGTH__PARAGRAPH__4,
                data: { placeholder: "" },
            },
            569: {
                type: enums_1.Inputs.SKIP__ROW,
                reformat: enums_1.Inputs.SKIP__ROW,
                data: { placeholder: "" },
            },
            570: {
                type: enums_1.Inputs.SKIP__ROW,
                reformat: enums_1.Inputs.SKIP__ROW,
                data: { placeholder: "" },
            },
            571: {
                type: enums_1.Inputs.SKIP__ROW,
                reformat: enums_1.Inputs.SKIP__ROW,
                data: { placeholder: "" },
            },
            583: [
                {
                    replace: 11,
                    type: enums_1.Inputs.TEXT_REPLACE,
                    data: { text: "Deadline )." },
                },
            ],
            585: [
                {
                    before: 7,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Known_as" },
                },
            ],
            590: [
                {
                    before: 12,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "590_group", value: "does" },
                },
                {
                    before: 14,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "590_group", value: "does_not" },
                },
            ],
            592: [
                {
                    before: 2,
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
                {
                    before: 8,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "592_group", value: "does" },
                },
                {
                    before: 10,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "592_group", value: "does_not" },
                },
            ],
            632: [
                {
                    before: 9,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "632_group", value: "are" },
                },
                {
                    before: 11,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "632_group", value: "are_not" },
                },
            ],
            636: [
                {
                    replace: 12,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Designation", prefix: "", suffix: "." },
                },
            ],
            643: [
                {
                    before: "end",
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
            ],
            644: [
                {
                    before: 3,
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
                {
                    before: 7,
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
                {
                    before: 12,
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
                {
                    before: 16,
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
            ],
            645: [
                {
                    before: "start",
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
                {
                    replace: 1,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Other" },
                },
            ],
            658: [
                {
                    before: 17,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "658_659_group", value: "buyer" },
                },
                {
                    before: 19,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "658_659_group", value: "seller" },
                },
            ],
            659: [
                {
                    before: "start",
                    type: enums_1.Inputs.RADIO,
                    data: {
                        placeholder: "",
                        name: "658_659_group",
                        value: "buyer_seller",
                    },
                },
                {
                    before: 8,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "658_659_group", value: "other" },
                },
                {
                    before: 10,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "Other" },
                },
            ],
            663: [
                {
                    before: 18,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "663_664_group", value: "buyer" },
                },
            ],
            664: [
                {
                    before: "start",
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "663_664_group", value: "seller" },
                },
                {
                    before: 2,
                    type: enums_1.Inputs.RADIO,
                    data: {
                        placeholder: "",
                        name: "663_664_group",
                        value: "buyer_seller",
                    },
                },
                {
                    before: 10,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "663_664_group", value: "na" },
                },
            ],
            665: [
                {
                    before: 12,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "665_666_group", value: "buyer" },
                },
                {
                    before: 14,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "665_666_group", value: "seller" },
                },
                {
                    before: 16,
                    type: enums_1.Inputs.RADIO,
                    data: {
                        placeholder: "",
                        name: "665_666_group",
                        value: "seller_buyer",
                    },
                },
            ],
            666: [
                {
                    before: 4,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "665_666_group", value: "na" },
                },
            ],
            669: [
                {
                    before: 1,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "669_group", value: "buyer" },
                },
                {
                    before: 3,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "669_group", value: "seller" },
                },
                {
                    before: 5,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "669_group", value: "seller_buyer" },
                },
                {
                    before: 13,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "669_group", value: "na" },
                },
            ],
            670: [
                {
                    before: "end",
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "670_671_group", value: "buyer" },
                },
            ],
            671: [
                {
                    before: 1,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "670_671_group", value: "seller" },
                },
                {
                    before: 3,
                    type: enums_1.Inputs.RADIO,
                    data: {
                        placeholder: "",
                        name: "670_671_group",
                        value: "seller_buyer",
                    },
                },
                {
                    before: 11,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "670_671_group", value: "na" },
                },
            ],
            672: [
                {
                    before: 14,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "672_673_group", value: "buyer" },
                },
                {
                    before: 16,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "672_673_group", value: "seller" },
                },
                {
                    before: 18,
                    type: enums_1.Inputs.RADIO,
                    data: {
                        placeholder: "",
                        name: "672_673_group",
                        value: "seller_buyer",
                    },
                },
            ],
            673: [
                {
                    before: 5,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "672_673_group", value: "na" },
                },
            ],
            675: [
                {
                    before: "start",
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "675_group", value: "buyer" },
                },
                {
                    before: 2,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "675_group", value: "seller" },
                },
                {
                    before: 4,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "675_group", value: "seller_buyer" },
                },
                {
                    before: 12,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "675_group", value: "na" },
                },
            ],
            677: [
                {
                    before: 16,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "677_678_group", value: "buyer" },
                },
                {
                    before: 18,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "677_678_group", value: "seller" },
                },
            ],
            678: [
                {
                    before: "start",
                    type: enums_1.Inputs.RADIO,
                    data: {
                        placeholder: "",
                        name: "677_678_group",
                        value: "seller_buyer",
                    },
                },
                {
                    before: 8,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "677_678_group", value: "na" },
                },
            ],
            680: [
                {
                    replace: 0,
                    type: enums_1.Inputs.TEXT__BOX__MEDIUM,
                    data: { placeholder: "", prefix: "$", suffix: "" },
                },
            ],
            681: [
                {
                    before: "start",
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
                {
                    before: 3,
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
            ],
            682: [
                {
                    before: "start",
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
                {
                    before: 3,
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
                {
                    before: "end",
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
                {
                    before: "end",
                    type: enums_1.Inputs.TEXT__BOX__MEDIUM,
                    data: { placeholder: "" },
                },
            ],
            683: [
                {
                    before: 7,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "683_group", value: "buyer" },
                },
                {
                    before: 9,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "683_group", value: "seller" },
                },
                {
                    before: 11,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "683_group", value: "seller_buyer" },
                },
                {
                    before: 19,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "683_group", value: "na" },
                },
            ],
            685: [
                {
                    before: 2,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "685_group", value: "buyer" },
                },
                {
                    before: 4,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "685_group", value: "seller" },
                },
                {
                    before: 6,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "685_group", value: "seller_buyer" },
                },
                {
                    before: 14,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "685_group", value: "na" },
                },
            ],
            703: [
                {
                    before: 7,
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
                {
                    before: 16,
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
            ],
            705: [
                {
                    before: 3,
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
                {
                    before: 5,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "" },
                },
            ],
            706: [
                {
                    before: 5,
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
                {
                    before: 9,
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
            ],
            709: [
                {
                    replace: 13,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "", prefix: "", suffix: "." },
                },
            ],
            715: [
                {
                    before: 14,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "715_group", value: "buyer" },
                },
                {
                    before: 16,
                    type: enums_1.Inputs.RADIO,
                    data: { placeholder: "", name: "715_group", value: "seller" },
                },
            ],
            719: [
                {
                    replace: 0,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "", prefix: "", suffix: "." },
                },
            ],
            723: [
                {
                    replace: 14,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "", prefix: "$", suffix: "" },
                },
            ],
            726: [
                {
                    before: 1,
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
            ],
            727: [
                {
                    before: "start",
                    type: enums_1.Inputs.CHECKBOX,
                    data: { placeholder: "" },
                },
            ],
            843: [
                {
                    replace: 15,
                    type: enums_1.Inputs.TEXT__BOX__LARGE,
                    data: { placeholder: "" },
                },
            ],
            862: {
                type: enums_1.Inputs.FULL__LENGTH__PARAGRAPH__10,
                reformat: enums_1.Inputs.FULL__LENGTH__PARAGRAPH__10,
                data: { placeholder: "" },
            },
            863: {
                type: enums_1.Inputs.SKIP__ROW,
                reformat: enums_1.Inputs.SKIP__ROW,
                data: { placeholder: "" },
            },
            864: {
                type: enums_1.Inputs.SKIP__ROW,
                reformat: enums_1.Inputs.SKIP__ROW,
                data: { placeholder: "" },
            },
            865: {
                type: enums_1.Inputs.SKIP__ROW,
                reformat: enums_1.Inputs.SKIP__ROW,
                data: { placeholder: "" },
            },
            866: {
                type: enums_1.Inputs.SKIP__ROW,
                reformat: enums_1.Inputs.SKIP__ROW,
                data: { placeholder: "" },
            },
            867: {
                type: enums_1.Inputs.SKIP__ROW,
                reformat: enums_1.Inputs.SKIP__ROW,
                data: { placeholder: "" },
            },
            868: {
                type: enums_1.Inputs.SKIP__ROW,
                reformat: enums_1.Inputs.SKIP__ROW,
                data: { placeholder: "" },
            },
            869: {
                type: enums_1.Inputs.SKIP__ROW,
                reformat: enums_1.Inputs.SKIP__ROW,
                data: { placeholder: "" },
            },
            870: {
                type: enums_1.Inputs.SKIP__ROW,
                reformat: enums_1.Inputs.SKIP__ROW,
                data: { placeholder: "" },
            },
            871: {
                type: enums_1.Inputs.SKIP__ROW,
                reformat: enums_1.Inputs.SKIP__ROW,
                data: { placeholder: "" },
            },
            876: {
                type: enums_1.Inputs.FULL__LENGTH__PARAGRAPH__4,
                reformat: enums_1.Inputs.FULL__LENGTH__PARAGRAPH__4,
                data: { placeholder: "" },
            },
            877: {
                type: enums_1.Inputs.SKIP__ROW,
                reformat: enums_1.Inputs.SKIP__ROW,
                data: { placeholder: "" },
            },
            878: {
                type: enums_1.Inputs.SKIP__ROW,
                reformat: enums_1.Inputs.SKIP__ROW,
                data: { placeholder: "" },
            },
            879: {
                type: enums_1.Inputs.SKIP__ROW,
                reformat: enums_1.Inputs.SKIP__ROW,
                data: { placeholder: "" },
            },
            881: {
                type: enums_1.Inputs.FULL__LENGTH__PARAGRAPH__3,
                reformat: enums_1.Inputs.FULL__LENGTH__PARAGRAPH__3,
                data: { placeholder: "" },
            },
            882: {
                type: enums_1.Inputs.SKIP__ROW,
                reformat: enums_1.Inputs.SKIP__ROW,
                data: { placeholder: "" },
            },
            883: {
                type: enums_1.Inputs.SKIP__ROW,
                reformat: enums_1.Inputs.SKIP__ROW,
                data: { placeholder: "" },
            },
        },
        row_styles: {
            1: [
                enums_1.RowStyles.BORDER__TOP,
                enums_1.RowStyles.BORDER__LEFT,
                enums_1.RowStyles.BORDER__RIGHT,
                enums_1.RowStyles.ZERO__PADDING__RIGHT,
            ],
            2: [
                enums_1.RowStyles.BORDER__BOTTOM,
                enums_1.RowStyles.BORDER__LEFT,
                enums_1.RowStyles.BORDER__RIGHT,
                enums_1.RowStyles.ZERO__PADDING__RIGHT,
            ],
            4: [enums_1.RowStyles.ZERO__PADDING__LEFT, enums_1.RowStyles.FONT__SIZE__LARGE],
            5: [enums_1.RowStyles.ZERO__PADDING__LEFT, enums_1.RowStyles.FONT__SIZE__LARGE],
            7: [enums_1.RowStyles.CENTERED, enums_1.RowStyles.FONT__SIZE__LARGE__XL],
            8: [enums_1.RowStyles.CENTERED, enums_1.RowStyles.FONT__SIZE__LARGE__XL],
            10: [enums_1.RowStyles.ALIGNED__RIGHT],
            11: [
                enums_1.RowStyles.CENTERED,
                enums_1.RowStyles.FONT__SIZE__LARGE,
                enums_1.RowStyles.INNER_BORDER,
            ],
            28: [enums_1.RowStyles.INVISIBLE],
            207: [
                enums_1.RowStyles.CENTERED,
                enums_1.RowStyles.FONT__SIZE__LARGE,
                enums_1.RowStyles.INNER_BORDER,
            ],
            // 472: [RowStyles.ALIGNED__LEFT],
            481: [enums_1.RowStyles.ALIGNED__LEFT],
            504: [
                enums_1.RowStyles.CENTERED,
                enums_1.RowStyles.FONT__SIZE__LARGE,
                enums_1.RowStyles.INNER_BORDER,
            ],
            515: [enums_1.RowStyles.ALIGNED__LEFT],
            551: [enums_1.RowStyles.ALIGNED__TOP],
            565: [enums_1.RowStyles.ALIGNED__LEFT],
            583: [enums_1.RowStyles.ALIGNED__LEFT],
            603: [enums_1.RowStyles.ALIGNED__LEFT],
            624: [
                enums_1.RowStyles.CENTERED,
                enums_1.RowStyles.FONT__SIZE__LARGE,
                enums_1.RowStyles.INNER_BORDER,
            ],
            662: [enums_1.RowStyles.ALIGNED__LEFT],
            664: [enums_1.RowStyles.ALIGNED__LEFT],
            666: [enums_1.RowStyles.ALIGNED__LEFT],
            669: [enums_1.RowStyles.ALIGNED__LEFT],
            671: [enums_1.RowStyles.ALIGNED__LEFT],
            673: [enums_1.RowStyles.ALIGNED__LEFT],
            675: [enums_1.RowStyles.ALIGNED__LEFT],
            678: [enums_1.RowStyles.ALIGNED__LEFT],
            683: [enums_1.RowStyles.ALIGNED__LEFT],
            685: [enums_1.RowStyles.ALIGNED__LEFT],
            728: [
                enums_1.RowStyles.CENTERED,
                enums_1.RowStyles.FONT__SIZE__LARGE,
                enums_1.RowStyles.INNER_BORDER,
            ],
            800: [enums_1.RowStyles.ALIGNED__LEFT],
            809: [enums_1.RowStyles.ALIGNED__LEFT],
            820: [enums_1.RowStyles.ALIGNED__LEFT],
            828: [enums_1.RowStyles.ALIGNED__LEFT],
            834: [enums_1.RowStyles.ALIGNED__LEFT],
            839: [enums_1.RowStyles.ALIGNED__LEFT],
            846: [enums_1.RowStyles.ALIGNED__LEFT],
            857: [enums_1.RowStyles.ALIGNED__LEFT],
            859: [
                enums_1.RowStyles.CENTERED,
                enums_1.RowStyles.FONT__SIZE__LARGE,
                enums_1.RowStyles.INNER_BORDER,
            ],
            884: [
                enums_1.RowStyles.CENTERED,
                enums_1.RowStyles.FONT__SIZE__LARGE,
                enums_1.RowStyles.INNER_BORDER,
            ],
            886: [enums_1.RowStyles.ALIGNED__LEFT],
            888: [
                enums_1.RowStyles.CENTERED,
                enums_1.RowStyles.FONT__SIZE__LARGE,
                enums_1.RowStyles.INNER_BORDER,
            ],
        },
        segment_styles: {
            4: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            5: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            7: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            8: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            11: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            16: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Joint|Tenants|In|Common|Other",
                    },
                },
            ],
            17: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "IS_NOT|Additional_Provisions.",
                    },
                },
            ],
            36: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Solar_Panels|Water",
                    },
                },
            ],
            37: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Softeners|Security_Systems|Satellite_Systems",
                    },
                },
            ],
            41: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Exclusions:|",
                    },
                },
            ],
            100: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Does_Not|Does",
                    },
                },
            ],
            101: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Water_Rights_Examination_Deadline.|",
                    },
                },
            ],
            104: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Note:|FHA|VA|Appraisal|DO_NOT",
                    },
                },
            ],
            114: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Time_of_Day_Deadline|",
                    },
                },
            ],
            116: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Time_of_Day_Deadline,|Time_of_%end%",
                    },
                },
            ],
            117: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Day_Deadline|",
                    },
                },
            ],
            121: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Will_Not|Will",
                    },
                },
            ],
            134: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Alternative_Earnest_Money_Deadline|",
                    },
                },
            ],
            140: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Alternative_Earnest_Money_Deadline.|",
                    },
                },
            ],
            150: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "“If_Seller|",
                    },
                },
            ],
            151: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "is_in_Default”,_§_20.2._and_§_21,|",
                    },
                },
            ],
            153: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "“If_Buyer|",
                    },
                },
            ],
            154: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "is_in_Default,_§_20.1._and_§_21,|",
                    },
                },
            ],
            160: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "OR_SUCH|",
                    },
                },
            ],
            161: {
                address: [enums_1.SegmentStyles.BOLD__ALL],
            },
            162: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Does_Not|Does",
                    },
                },
            ],
            171: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Conventional|FHA|VA|Bond|Other",
                    },
                },
            ],
            180: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Real_Estate_Taxes|",
                    },
                },
            ],
            181: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Property_Insurance_Premium|Mortgage_Insurance_Premium|",
                    },
                },
            ],
            186: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Closing_Date.|",
                    },
                },
            ],
            187: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Will_Not|Will",
                    },
                },
            ],
            188: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Loan_Transfer_Approval_Deadline|Closing",
                    },
                },
            ],
            192: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "WARNING:",
                    },
                },
            ],
            196: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: { patterns: "Buyer_%end%", prefix: "" },
                },
            ],
            197: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Seller_or|Seller_will_!",
                    },
                },
            ],
            198: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            201: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Seller_or_Private_Financing_Deadline,|",
                    },
                },
            ],
            205: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Seller",
                    },
                },
            ],
            206: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "or_Private_Financing_Deadline,",
                    },
                },
            ],
            207: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            211: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "New_Loan_Application_Deadline",
                    },
                },
            ],
            216: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "New_Loan_Terms_Deadline,|",
                    },
                },
            ],
            220: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "New_Loan_%end%|",
                    },
                },
            ],
            221: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Availability_Deadline|",
                    },
                },
            ],
            223: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "IF_SELLER_IS|",
                    },
                },
            ],
            224: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            225: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "EARNEST_MONEY_WILL_BE_NONREFUNDABLE,|",
                    },
                },
            ],
            229: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Buyer’s_Credit_Information_Deadline,|",
                    },
                },
            ],
            235: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Disapproval_of_Buyer’s_Credit_Information_Deadline.|",
                    },
                },
            ],
            237: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Existing_Loan_Deadline.",
                    },
                },
            ],
            239: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Existing_Loan_Termination_Deadline,",
                    },
                },
            ],
            242: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Loan_Transfer_Approval_Deadline,",
                    },
                },
            ],
            253: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Appraisal_Deadline|Appraisal_%end%",
                    },
                },
            ],
            254: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            259: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Appraisal_%end%",
                    },
                },
            ],
            260: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Objection_Deadline|Appraisal_Resolution",
                    },
                },
            ],
            261: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Deadline,|Appraisal_Resolution_Deadline,",
                    },
                },
            ],
            262: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Appraisal_Resolution_Deadline",
                    },
                },
            ],
            288: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            289: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            290: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            291: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            292: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            293: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            294: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            295: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            296: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            297: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            298: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            299: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            300: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            301: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            302: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            283: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Buyer",
                    },
                },
            ],
            284: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Seller.",
                    },
                },
            ],
            304: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Association_Documents_Deadline.|",
                    },
                },
            ],
            336: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Association_Documents_Termination_Deadline,",
                    },
                },
            ],
            338: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Association_Documents_Deadline,",
                    },
                },
            ],
            340: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Closing",
                    },
                },
            ],
            341: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Date,",
                    },
                },
            ],
            347: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Record_Title_Deadline,",
                    },
                },
            ],
            349: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Abstract_of_Title",
                    },
                },
            ],
            352: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Record_Title_Deadline,",
                    },
                },
            ],
            355: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Will|Not",
                    },
                },
            ],
            360: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Buyer|Seller|One-Half_by_Buyer_and_One-Half_by_Seller|Other",
                    },
                },
            ],
            369: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Record_Title_Deadline,",
                    },
                },
            ],
            374: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Record_Title_Deadline.",
                    },
                },
            ],
            376: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Record_Title_Objection_Deadline.",
                    },
                },
            ],
            379: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Record_Title_Deadline,",
                    },
                },
            ],
            389: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Off-Record_Title_Deadline,",
                    },
                },
            ],
            392: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "New_ILC|New_Survey",
                    },
                },
            ],
            396: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Off-Record",
                    },
                },
            ],
            397: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Title_Objection_Deadline.|Off-Record_Title_Deadline,",
                    },
                },
            ],
            403: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            404: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            405: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            406: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            407: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            408: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            409: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            410: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            411: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            412: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            413: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Seller|Buyer,",
                    },
                },
            ],
            414: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Record_Title_Deadline.",
                    },
                },
            ],
            416: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Record_Title_Objection_Deadline.|Record_Title_Deadline,",
                    },
                },
            ],
            419: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Closing_Date,",
                    },
                },
            ],
            430: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Third_Party_Right_to_Purchase/Approve_Deadline,",
                    },
                },
            ],
            438: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Title_Resolution_Deadline,",
                    },
                },
            ],
            440: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Title_Resolution_Deadline.",
                    },
                },
            ],
            451: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            452: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            453: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            454: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            455: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            456: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            457: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            458: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            459: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            460: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            461: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            462: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            463: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            464: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            465: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            466: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            467: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            468: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            469: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            472: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Does|Not",
                    },
                },
            ],
            473: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Mineral_Rights_Examination_Deadline.",
                    },
                },
            ],
            475: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "New_Improvement_Location_Certificate_(New_ILC);|",
                    },
                },
            ],
            476: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "New_Survey|",
                    },
                },
            ],
            477: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Seller|Buyer",
                    },
                },
            ],
            481: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Seller|Buyer",
                    },
                },
            ],
            485: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "New_%end%|",
                    },
                },
            ],
            486: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            490: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "New_ILC_or_New|",
                    },
                },
            ],
            491: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Survey_Objection_Deadline.|",
                    },
                },
            ],
            499: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "New_ILC_or_New_Survey_Objection",
                    },
                },
            ],
            500: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "New_ILC_or_New_Survey_Objection_Deadline",
                    },
                },
            ],
            501: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "New_ILC_or_New_Survey_Resolution_Deadline,|New_ILC_or_New_Survey_%end%",
                    },
                },
            ],
            502: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Resolution_Deadline,",
                    },
                },
            ],
            503: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "New_ILC_or_New_Survey_Resolution_Deadline",
                    },
                },
            ],
            504: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            505: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            506: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            507: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Seller’s_Property_Disclosure_Deadline,|",
                    },
                },
            ],
            515: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "As_Is|Where_Is|With_All_Faults",
                    },
                },
            ],
            524: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Inspection_Termination_Deadline,|",
                    },
                },
            ],
            528: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Inspection_Objection_Deadline,|",
                    },
                },
            ],
            530: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Inspection_Objection_%end%|",
                    },
                },
            ],
            531: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Deadline|Inspection_Resolution_Deadline,",
                    },
                },
            ],
            532: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Inspection_Resolution_Deadline|",
                    },
                },
            ],
            533: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Inspection_Resolution_Deadline|",
                    },
                },
            ],
            545: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Property_Insurance_Termination|",
                    },
                },
            ],
            546: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Deadline,|",
                    },
                },
            ],
            550: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Due_Diligence_Documents_Delivery|",
                    },
                },
            ],
            551: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            559: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Due_Diligence_Documents_Delivery_Deadline.|Will|Not",
                    },
                },
            ],
            564: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Due_Diligence_Documents_Delivery_Deadline.|Will",
                    },
                },
            ],
            565: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Not|",
                    },
                },
            ],
            574: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Due_Diligence_Documents_Objection_Deadline:|",
                    },
                },
            ],
            580: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Due_Diligence_Documents_Objection_Deadline|",
                    },
                },
            ],
            581: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Due_Diligence_Documents_Resolution_Deadline,|Due_Diligence_Documents_%end%",
                    },
                },
            ],
            582: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Resolution_Deadline|",
                    },
                },
            ],
            583: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Due_Diligence_Documents_Resolution_Deadline|",
                    },
                },
            ],
            586: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Conditional_Sale|",
                    },
                },
            ],
            587: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Deadline|",
                    },
                },
            ],
            588: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Conditional_Sale_Deadline|",
                    },
                },
            ],
            590: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Does|Not",
                    },
                },
            ],
            592: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "No_Well.|Does|Not",
                    },
                },
            ],
            593: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            594: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            595: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            596: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            600: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Lead-Based_Paint_%end%|",
                    },
                },
            ],
            601: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Disclosure_Deadline.|",
                    },
                },
            ],
            603: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Lead-Based_Paint_Termination_Deadline.|",
                    },
                },
            ],
            606: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Lead-Based_Paint_Termination_Deadline.|",
                    },
                },
            ],
            610: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Note:|",
                    },
                },
            ],
            623: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            624: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            632: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Are|Not",
                    },
                },
            ],
            653: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            654: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            658: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Buyer|Seller",
                    },
                },
            ],
            659: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "One-Half_by_Buyer_and_One-Half_by_Seller|Other",
                    },
                },
            ],
            660: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Closing_Date,|",
                    },
                },
            ],
            663: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Buyer|",
                    },
                },
            ],
            664: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Seller|One-Half_by_Buyer_and_One-Half_by_Seller|N/A.",
                    },
                },
            ],
            665: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Buyer|Seller|One-Half_by_Buyer",
                    },
                },
            ],
            666: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "and_One-Half_by_Seller|N/A.",
                    },
                },
            ],
            669: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Buyer|Seller|One-Half_by_Buyer_and_One-Half_by_Seller|N/A.",
                    },
                },
            ],
            671: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Buyer|Seller|One-Half_by_Buyer_and_One-Half_by_Seller|N/A.",
                    },
                },
            ],
            672: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Buyer|Seller|One-Half_by",
                    },
                },
            ],
            673: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Buyer_and_One-Half_by_Seller|N/A.",
                    },
                },
            ],
            675: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Buyer|Seller|One-Half_by_Buyer_and_One-Half_by_Seller|N/A.",
                    },
                },
            ],
            677: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Buyer|Seller",
                    },
                },
            ],
            678: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "One-Half_by_Buyer_and_One-Half_by_Seller|N/A.",
                    },
                },
            ],
            683: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Buyer|Seller|One-Half_by_Buyer_and_One-Half_by_Seller|N/A.",
                    },
                },
            ],
            685: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Buyer|Seller|One-Half_by_Buyer_and_One-Half_by_Seller|N/A.",
                    },
                },
            ],
            701: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Closing_Date,|",
                    },
                },
            ],
            703: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Taxes_for_the_Calendar_Year_Immediately_Preceding_Closing|Most_Recent_Mill_Levy",
                    },
                },
            ],
            704: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "and_Most_Recent_Assessed_Valuation,|",
                    },
                },
            ],
            705: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Other|",
                    },
                },
            ],
            706: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Rents_Actually_Received|Accrued.",
                    },
                },
            ],
            715: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Closing_Date|Buyer|Seller.",
                    },
                },
            ],
            720: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Possession_Date|Possession_Time,",
                    },
                },
            ],
            724: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Possession_Date|Possession_Time,",
                    },
                },
            ],
            726: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Does_Not|",
                    },
                },
            ],
            728: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            729: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            730: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "WALK-THROUGH.|",
                    },
                },
            ],
            735: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Closing_Date.|",
                    },
                },
            ],
            736: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Closing_Date,|",
                    },
                },
            ],
            740: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Closing_Date|",
                    },
                },
            ],
            751: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Closing_Date,|",
                    },
                },
            ],
            757: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Closing_Date,|",
                    },
                },
            ],
            782: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "This_§_20.1.2._applies_unless_the_box_in_§_20.1.1._is_checked.|",
                    },
                },
            ],
            799: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Closing_Date,|",
                    },
                },
            ],
            852: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Acceptance_Deadline_Date|Acceptance_Deadline_Time.",
                    },
                },
            ],
            856: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Financing_Conditions_and_Obligations;_Title_Insurance,|",
                    },
                },
            ],
            857: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "Record_Title_and_Off-Record_Title;_New_ILC,_New_Survey;|Property_Disclosure,_Inspection,_Indemnity,_Insurability_Due",
                    },
                },
            ],
            858: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            859: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            873: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "are_a_part|",
                    },
                },
            ],
            880: [
                {
                    type: enums_1.SegmentStyles.PATTERN__REPLACE,
                    data: {
                        patterns: "not|",
                    },
                },
            ],
            884: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            886: { address: [enums_1.SegmentStyles.BOLD__ALL] },
            888: { address: [enums_1.SegmentStyles.BOLD__ALL] },
        },
        static_settings: {
            81: [enums_1.StaticStyles.IGNORE_HEADER],
            329: [enums_1.StaticStyles.IGNORE_HEADER],
            330: [enums_1.StaticStyles.IGNORE_TITLE],
            654: [enums_1.StaticStyles.IGNORE_HEADER],
            861: [enums_1.StaticStyles.KEEP__SINGLE, enums_1.StaticStyles.IGNORE_HEADER],
        },
    },
};
module.exports = config;
