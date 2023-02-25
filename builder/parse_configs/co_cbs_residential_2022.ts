declare function require(name: string): any;
declare var __dirname: string;
import { ContractConfig } from "../builder_types/types";
import {
  Inputs,
  ComponentLocations,
  SpacePropertyKeys,
  RowStyles,
  SegmentStyles,
  StaticStyles,
} from "../builder_types/enums";
const config: ContractConfig = {
  excludes: (number) => {
    const DATES_AND_DEADLINES = [106, 159];
    const PURCHASE_PRICE_AND_TERMS = [182, 192];
    return [DATES_AND_DEADLINES, PURCHASE_PRICE_AND_TERMS].some(
      ([start, end]) => number >= start && number <= end
    );
  },
  PageID: "CBS1--6-21.",
  settings: {
    header_regexp: "/^(d+.)/y",

    line_matcher: (line: string) => {
      const matched = line.match(/.*(?<!\d)(\d+).*$/y);
      return {
        matches: !!matched,
        line_number: !!matched && matched.length > 1 ? matched[1] : "",
      };
    },

    component_location: {
      103: ComponentLocations.DEADLINE__COMPONENT,
      124: ComponentLocations.PURCHASE__COMPONENT,
      558: ComponentLocations.SIGNATURE__COMPONENT,
      891: ComponentLocations.BROKERS__ACKNOWLEDGMENTS,
    },

    default_signatures: {
      [SpacePropertyKeys.BUYER_KEY]: {
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
      [SpacePropertyKeys.SELLER_KEY]: {
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
      [SpacePropertyKeys.BUYERS_AGENT_KEY]: {
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
      [SpacePropertyKeys.SELLERS_AGENT_KEY]: {
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
          type: Inputs.DATE__BOX,
          data: { placeholder: "Date" },
        },
      ],
      15: [
        {
          before: 2,
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Buyer",
            auto: "privateSpace.buyers.[fullName]",
            key: SpacePropertyKeys.BUYER_KEY,
          },
        },
      ],
      16: [
        {
          before: 6,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "16_group", value: "joint_tenants" },
        },
        {
          before: 9,
          type: Inputs.RADIO,
          data: {
            placeholder: "",
            name: "16_group",
            value: "tenants_in_common",
          },
        },
        {
          before: 13,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "16_group", value: "other" },
        },
        {
          replace: 15,
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Other",
          },
        },
      ],
      18: [
        {
          before: 2,
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Seller",
            auto: "privateSpace.sellers.[fullName]",
            key: SpacePropertyKeys.SELLER_KEY,
          },
        },
      ],
      20: [
        {
          before: 15,
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "County",
            auto: "privateSpace.property.county",
            key: SpacePropertyKeys.PROPERTY_KEY,
          },
        },
      ],
      22: {
        type: Inputs.SKIP__ROW,
        reformat: Inputs.FULL__LENGTH__PARAGRAPH__7,
        data: {
          placeholder: "",
        },
      },
      24: { type: Inputs.SKIP__ROW, reformat: `${Inputs.SKIP__ROW}`, data: {} },
      25: { type: Inputs.SKIP__ROW, reformat: `${Inputs.SKIP__ROW}`, data: {} },
      23: { type: Inputs.SKIP__ROW, reformat: `${Inputs.SKIP__ROW}`, data: {} },
      26: { type: Inputs.SKIP__ROW, reformat: `${Inputs.SKIP__ROW}`, data: {} },
      27: [
        {
          before: 2,
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Street_Name",
            auto: "privateSpace.property.streetNumber",

            key: SpacePropertyKeys.PROPERTY_KEY,
          },
        },
        {
          before: 3,
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Street_Number",
            auto: "privateSpace.property.streetName",
            key: SpacePropertyKeys.PROPERTY_KEY,
          },
        },
        {
          before: 4,
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "City",
            auto: "privateSpace.property.city",
            key: SpacePropertyKeys.PROPERTY_KEY,
          },
        },
        {
          before: 5,
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "State",
            auto: "privateSpace.property.state",
            key: SpacePropertyKeys.PROPERTY_KEY,
          },
        },
        {
          before: 6,
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Zip",
            auto: "privateSpace.property.zip",
            key: SpacePropertyKeys.PROPERTY_KEY,
          },
        },
      ],
      36: [
        {
          replace: 1,
          type: Inputs.NUMBER_INPUT,
          data: { placeholder: "Remotes" },
        },
        {
          before: 15,
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
        {
          before: 18,
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
      ],
      37: [
        {
          before: 1,
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
        {
          before: 4,
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
      ],
      46: {
        type: Inputs.SKIP__ROW,
        reformat: Inputs.FULL__LENGTH__PARAGRAPH__5,
        data: { placeholder: "Date" },
      },
      47: { type: Inputs.SKIP__ROW, reformat: `${Inputs.SKIP__ROW}`, data: {} },
      48: { type: Inputs.SKIP__ROW, reformat: `${Inputs.SKIP__ROW}`, data: {} },
      49: { type: Inputs.SKIP__ROW, reformat: `${Inputs.SKIP__ROW}`, data: {} },
      50: { type: Inputs.SKIP__ROW, reformat: `${Inputs.SKIP__ROW}`, data: {} },
      51: [
        {
          before: "start",
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
      ],
      56: {
        type: Inputs.SKIP__ROW,
        reformat: Inputs.FULL__LENGTH__PARAGRAPH__3,
        data: { placeholder: "Date" },
      },
      57: { type: Inputs.SKIP__ROW, reformat: `${Inputs.SKIP__ROW}`, data: {} },
      58: { type: Inputs.SKIP__ROW, reformat: `${Inputs.SKIP__ROW}`, data: {} },
      62: [
        {
          before: "start",
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Parking" },
        },
        {
          before: 12,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Storage" },
        },
      ],
      66: {
        type: Inputs.SKIP__ROW,
        reformat: Inputs.FULL__LENGTH__PARAGRAPH__4,
        data: { placeholder: "Date" },
      },
      67: { type: Inputs.SKIP__ROW, reformat: `${Inputs.SKIP__ROW}`, data: {} },
      68: { type: Inputs.SKIP__ROW, reformat: `${Inputs.SKIP__ROW}`, data: {} },
      69: { type: Inputs.SKIP__ROW, reformat: `${Inputs.SKIP__ROW}`, data: {} },
      71: {
        type: Inputs.SKIP__ROW,
        reformat: Inputs.FULL__LENGTH__PARAGRAPH__3,
        data: { placeholder: "Date" },
      },
      72: { type: Inputs.SKIP__ROW, reformat: `${Inputs.SKIP__ROW}`, data: {} },
      73: { type: Inputs.SKIP__ROW, reformat: `${Inputs.SKIP__ROW}`, data: {} },
      75: [
        {
          before: 4,
          type: Inputs.FLOATING_CHECKBOX,
          data: { placeholder: "" },
        },
      ],
      76: {
        type: Inputs.SKIP__ROW,
        reformat: Inputs.FULL__LENGTH__PARAGRAPH__3,
        data: { placeholder: "Date" },
      },
      77: { type: Inputs.SKIP__ROW, reformat: `${Inputs.SKIP__ROW}`, data: {} },
      78: { type: Inputs.SKIP__ROW, reformat: `${Inputs.SKIP__ROW}`, data: {} },
      79: [
        {
          before: 12,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Deed" },
        },
      ],
      80: [
        {
          before: 6,
          type: Inputs.FLOATING_CHECKBOX,
          data: { placeholder: "" },
        },
      ],
      82: {
        type: Inputs.SKIP__ROW,
        reformat: Inputs.FULL__LENGTH__PARAGRAPH__4,
        data: { placeholder: "Date" },
      },
      83: { type: Inputs.SKIP__ROW, reformat: `${Inputs.SKIP__ROW}`, data: {} },
      84: { type: Inputs.SKIP__ROW, reformat: `${Inputs.SKIP__ROW}`, data: {} },
      85: { type: Inputs.SKIP__ROW, reformat: `${Inputs.SKIP__ROW}`, data: {} },
      86: [
        {
          before: 3,
          type: Inputs.FLOATING_CHECKBOX,
          data: { placeholder: "" },
        },
      ],
      92: [
        {
          before: "start",
          type: Inputs.TEXT__BOX__MEDIUM,
          data: { placeholder: "Well_Permit_Number" },
        },
      ],
      93: [
        {
          before: 4,
          type: Inputs.FLOATING_CHECKBOX,
          data: { placeholder: "" },
        },
      ],
      94: {
        type: Inputs.SKIP__ROW,
        reformat: Inputs.FULL__LENGTH__PARAGRAPH__3,
        data: { placeholder: "Date" },
      },
      95: { type: Inputs.SKIP__ROW, reformat: `${Inputs.SKIP__ROW}`, data: {} },
      96: { type: Inputs.SKIP__ROW, reformat: `${Inputs.SKIP__ROW}`, data: {} },
      100: [
        {
          before: 5,
          type: Inputs.RADIO,
          data: {
            placeholder: "",
            name: "100_group",
            value: "does",
          },
        },
        {
          before: 7,
          type: Inputs.RADIO,
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
          type: Inputs.RADIO,
          data: { placeholder: "", name: "121_group", value: "will" },
        },
        {
          before: 3,
          type: Inputs.RADIO,
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
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Money" },
        },
      ],
      131: [
        {
          replace: 16,
          //Before period
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Money" },
        },
      ],
      132: [
        {
          replace: 5,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Earnest_Money_Holder" },
        },
      ],
      162: [
        {
          before: 14,
          type: Inputs.RADIO,
          data: {
            placeholder: "",
            name: "162_group",
            value: "does",
          },
        },
        {
          before: 16,
          type: Inputs.RADIO,
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
          type: Inputs.RADIO,
          data: { placeholder: "", name: "171_group", value: "conventional" },
        },
        {
          before: 2,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "171_group", value: "fha" },
        },
        {
          before: 4,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "171_group", value: "va" },
        },
        {
          before: 6,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "171_group", value: "bond" },
        },
        {
          before: 8,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "171_group", value: "other" },
        },
        {
          before: 10,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Other" },
        },
      ],
      173: [
        {
          before: 20,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Money" },
        },
      ],
      179: [
        {
          replace: 11,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Money" },
        },
        {
          replace: 13,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Money" },
        },
      ],
      180: [
        {
          replace: 5,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Percentage", prefix: "", suffix: "%" },
        },
        {
          before: 17,
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
        {
          before: "end",
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
      ],
      181: [
        {
          before: 3,
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
        {
          before: 8,
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
        {
          before: 9,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Other" },
        },
      ],
      182: [
        {
          replace: 11,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Money", prefix: "$", suffix: "." },
        },
      ],
      183: [
        {
          replace: 2,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Percentage", prefix: "", suffix: "%" },
        },
        {
          replace: 12,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Money", prefix: "$", suffix: "" },
        },
        {
          replace: 14,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Money" },
        },
      ],
      185: [
        {
          replace: 16,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Money", prefix: "$", suffix: "," },
        },
      ],
      187: [
        {
          before: 1,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "187_group", value: "will" },
        },
        {
          before: 3,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "187_group", value: "will_not" },
        },
      ],
      188: [
        {
          before: 7,
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
        {
          before: 15,
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
      ],
      189: [
        {
          before: 16,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Money" },
        },
      ],
      190: [
        {
          replace: 3,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Money", prefix: "$", suffix: "." },
        },
      ],
      196: [
        {
          before: 19,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "196_197_group", value: "buyer" },
        },
      ],
      197: [
        {
          before: "start",
          type: Inputs.RADIO,
          data: { placeholder: "", name: "196_197_group", value: "seller" },
        },
        {
          replace: 16,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Days", prefix: "", suffix: "" },
        },
      ],
      262: [
        {
          replace: 14,
          type: Inputs.TEXT_REPLACE,
          data: { text: "Deadline )." },
        },
      ],
      267: [
        {
          replace: 12,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Days", prefix: "$", suffix: "." },
        },
      ],
      283: [
        {
          before: 22,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "283_284_group", value: "buyer" },
        },
      ],
      284: [
        {
          before: "start",
          type: Inputs.RADIO,
          data: { placeholder: "", name: "283_284_group", value: "seller" },
        },
      ],
      346: [
        {
          before: 6,
          type: Inputs.FLOATING_CHECKBOX,
          data: { placeholder: "" },
        },
      ],
      349: [
        {
          before: 6,
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
      ],
      351: [
        {
          before: 6,
          type: Inputs.FLOATING_CHECKBOX,
          data: { placeholder: "" },
        },
      ],
      355: [
        {
          before: 8,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "355_group", value: "will" },
        },
        {
          before: 10,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "355_group", value: "will_not" },
        },
      ],
      360: [
        {
          before: "start",
          type: Inputs.RADIO,
          data: { placeholder: "", name: "360_group", value: "buyer" },
        },
        {
          before: 2,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "360_group", value: "seller" },
        },
        {
          before: 4,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "360_group", value: "seller_buyer" },
        },

        {
          before: 12,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "360_group", value: "other" },
        },

        {
          replace: 13,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Other", prefix: "Other", suffix: "." },
        },
      ],
      413: [
        {
          before: 9,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "413_group", value: "seller" },
        },
        {
          before: 11,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "413_group", value: "buyer" },
        },
      ],
      472: [
        {
          before: 5,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "472_group", value: "does" },
        },
        {
          before: 7,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "472_group", value: "does_not" },
        },
      ],
      475: [
        {
          before: 12,
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
      ],
      476: [
        {
          before: "start",
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
        {
          replace: 7,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Form_of_Survey", prefix: "", suffix: ";" },
        },
      ],
      477: [
        {
          before: 8,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "477_group", value: "seller" },
        },
        {
          before: 10,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "477_group", value: "buyer" },
        },
      ],
      481: [
        {
          before: 2,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "481_group", value: "seller" },
        },
        {
          before: 4,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "481_group", value: "buyer" },
        },
      ],
      482: {
        type: Inputs.FULL__LENGTH__PARAGRAPH__2,
        reformat: Inputs.FULL__LENGTH__PARAGRAPH__2,
        data: { placeholder: "Date" },
      },
      483: {
        type: Inputs.SKIP__ROW,
        reformat: `${Inputs.SKIP__ROW}`,
        data: {},
      },
      485: [
        {
          replace: 10,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Party" },
        },
      ],
      503: [
        {
          replace: 13,
          type: Inputs.TEXT_REPLACE,
          data: { text: "Deadline )." },
        },
      ],
      515: [
        {
          replace: 9,
          type: Inputs.TEXT_REPLACE,
          data: { text: "“ As" },
        },
        {
          replace: 10,
          type: Inputs.TEXT_REPLACE,
          data: { text: "Is ”" },
        },
        {
          replace: 12,
          type: Inputs.TEXT_REPLACE,
          data: { text: "“ Where" },
        },
        {
          replace: 13,
          type: Inputs.TEXT_REPLACE,
          data: { text: "Is ”" },
        },
        {
          replace: 15,
          type: Inputs.TEXT_REPLACE,
          data: { text: "“ With" },
        },
        {
          replace: 17,
          type: Inputs.TEXT_REPLACE,
          data: { text: "Faults .”" },
        },
      ],
      533: [
        {
          replace: 12,
          type: Inputs.TEXT_REPLACE,
          data: { text: "Deadline )." },
        },
      ],
      551: [
        {
          before: "end",
          type: Inputs.FULL__LENGTH__PARAGRAPH__2,
          data: { placeholder: "" },
        },
      ],
      555: {
        type: Inputs.FULL__LENGTH__PARAGRAPH__2,
        reformat: Inputs.FULL__LENGTH__PARAGRAPH__2,
        data: { placeholder: "" },
      },
      556: {
        type: Inputs.SKIP__ROW,
        reformat: Inputs.SKIP__ROW,
        data: { placeholder: "" },
      },
      559: [
        {
          before: 10,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "559_group", value: "will" },
        },
        {
          before: 12,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "559_group", value: "will_not" },
        },
      ],
      564: [
        {
          before: 15,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "564_group", value: "will" },
        },
        {
          before: 17,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "564_group", value: "will_not" },
        },
      ],
      568: {
        type: Inputs.FULL__LENGTH__PARAGRAPH__4,
        reformat: Inputs.FULL__LENGTH__PARAGRAPH__4,
        data: { placeholder: "" },
      },
      569: {
        type: Inputs.SKIP__ROW,
        reformat: Inputs.SKIP__ROW,
        data: { placeholder: "" },
      },
      570: {
        type: Inputs.SKIP__ROW,
        reformat: Inputs.SKIP__ROW,
        data: { placeholder: "" },
      },
      571: {
        type: Inputs.SKIP__ROW,
        reformat: Inputs.SKIP__ROW,
        data: { placeholder: "" },
      },
      583: [
        {
          replace: 11,
          type: Inputs.TEXT_REPLACE,
          data: { text: "Deadline )." },
        },
      ],
      585: [
        {
          before: 7,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Known_as" },
        },
      ],
      590: [
        {
          before: 12,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "590_group", value: "does" },
        },
        {
          before: 14,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "590_group", value: "does_not" },
        },
      ],
      592: [
        {
          before: 2,
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
        {
          before: 8,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "592_group", value: "does" },
        },
        {
          before: 10,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "592_group", value: "does_not" },
        },
      ],
      632: [
        {
          before: 9,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "632_group", value: "are" },
        },
        {
          before: 11,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "632_group", value: "are_not" },
        },
      ],
      636: [
        {
          replace: 12,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Designation", prefix: "", suffix: "." },
        },
      ],
      643: [
        {
          before: "end",
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
      ],
      644: [
        {
          before: 3,
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
        {
          before: 7,
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
        {
          before: 12,
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
        {
          before: 16,
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
      ],
      645: [
        {
          before: "start",
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
        {
          replace: 1,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Other" },
        },
      ],
      658: [
        {
          before: 17,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "658_659_group", value: "buyer" },
        },
        {
          before: 19,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "658_659_group", value: "seller" },
        },
      ],
      659: [
        {
          before: "start",
          type: Inputs.RADIO,
          data: {
            placeholder: "",
            name: "658_659_group",
            value: "buyer_seller",
          },
        },
        {
          before: 8,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "658_659_group", value: "other" },
        },
        {
          before: 10,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "Other" },
        },
      ],
      663: [
        {
          before: 18,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "663_664_group", value: "buyer" },
        },
      ],
      664: [
        {
          before: "start",
          type: Inputs.RADIO,
          data: { placeholder: "", name: "663_664_group", value: "seller" },
        },
        {
          before: 2,
          type: Inputs.RADIO,
          data: {
            placeholder: "",
            name: "663_664_group",
            value: "buyer_seller",
          },
        },
        {
          before: 10,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "663_664_group", value: "na" },
        },
      ],
      665: [
        {
          before: 12,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "665_666_group", value: "buyer" },
        },
        {
          before: 14,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "665_666_group", value: "seller" },
        },
        {
          before: 16,
          type: Inputs.RADIO,
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
          type: Inputs.RADIO,
          data: { placeholder: "", name: "665_666_group", value: "na" },
        },
      ],
      669: [
        {
          before: 1,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "669_group", value: "buyer" },
        },
        {
          before: 3,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "669_group", value: "seller" },
        },
        {
          before: 5,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "669_group", value: "seller_buyer" },
        },
        {
          before: 13,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "669_group", value: "na" },
        },
      ],
      670: [
        {
          before: "end",
          type: Inputs.RADIO,
          data: { placeholder: "", name: "670_671_group", value: "buyer" },
        },
      ],
      671: [
        {
          before: 1,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "670_671_group", value: "seller" },
        },
        {
          before: 3,
          type: Inputs.RADIO,
          data: {
            placeholder: "",
            name: "670_671_group",
            value: "seller_buyer",
          },
        },
        {
          before: 11,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "670_671_group", value: "na" },
        },
      ],
      672: [
        {
          before: 14,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "672_673_group", value: "buyer" },
        },
        {
          before: 16,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "672_673_group", value: "seller" },
        },
        {
          before: 18,
          type: Inputs.RADIO,
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
          type: Inputs.RADIO,
          data: { placeholder: "", name: "672_673_group", value: "na" },
        },
      ],
      675: [
        {
          before: "start",
          type: Inputs.RADIO,
          data: { placeholder: "", name: "675_group", value: "buyer" },
        },
        {
          before: 2,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "675_group", value: "seller" },
        },
        {
          before: 4,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "675_group", value: "seller_buyer" },
        },
        {
          before: 12,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "675_group", value: "na" },
        },
      ],
      677: [
        {
          before: 16,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "677_678_group", value: "buyer" },
        },
        {
          before: 18,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "677_678_group", value: "seller" },
        },
      ],
      678: [
        {
          before: "start",
          type: Inputs.RADIO,
          data: {
            placeholder: "",
            name: "677_678_group",
            value: "seller_buyer",
          },
        },
        {
          before: 8,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "677_678_group", value: "na" },
        },
      ],
      680: [
        {
          replace: 0,
          type: Inputs.TEXT__BOX__MEDIUM,
          data: { placeholder: "", prefix: "$", suffix: "" },
        },
      ],
      681: [
        {
          before: "start",
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
        {
          before: 3,
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
      ],
      682: [
        {
          before: "start",
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
        {
          before: 3,
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
        {
          before: "end",
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
        {
          before: "end",
          type: Inputs.TEXT__BOX__MEDIUM,
          data: { placeholder: "" },
        },
      ],
      683: [
        {
          before: 7,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "683_group", value: "buyer" },
        },
        {
          before: 9,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "683_group", value: "seller" },
        },
        {
          before: 11,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "683_group", value: "seller_buyer" },
        },
        {
          before: 19,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "683_group", value: "na" },
        },
      ],
      685: [
        {
          before: 2,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "685_group", value: "buyer" },
        },
        {
          before: 4,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "685_group", value: "seller" },
        },
        {
          before: 6,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "685_group", value: "seller_buyer" },
        },
        {
          before: 14,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "685_group", value: "na" },
        },
      ],
      703: [
        {
          before: 7,
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
        {
          before: 16,
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
      ],
      705: [
        {
          before: 3,
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
        {
          before: 5,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "" },
        },
      ],
      706: [
        {
          before: 5,
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
        {
          before: 9,
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
      ],
      709: [
        {
          replace: 13,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "", prefix: "", suffix: "." },
        },
      ],
      715: [
        {
          before: 14,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "715_group", value: "buyer" },
        },
        {
          before: 16,
          type: Inputs.RADIO,
          data: { placeholder: "", name: "715_group", value: "seller" },
        },
      ],
      719: [
        {
          replace: 0,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "", prefix: "", suffix: "." },
        },
      ],
      723: [
        {
          replace: 14,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "", prefix: "$", suffix: "" },
        },
      ],
      726: [
        {
          before: 1,
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
      ],
      727: [
        {
          before: "start",
          type: Inputs.CHECKBOX,
          data: { placeholder: "" },
        },
      ],
      843: [
        {
          replace: 15,
          type: Inputs.TEXT__BOX__LARGE,
          data: { placeholder: "" },
        },
      ],
      862: {
        type: Inputs.FULL__LENGTH__PARAGRAPH__10,
        reformat: Inputs.FULL__LENGTH__PARAGRAPH__10,
        data: { placeholder: "" },
      },
      863: {
        type: Inputs.SKIP__ROW,
        reformat: Inputs.SKIP__ROW,
        data: { placeholder: "" },
      },
      864: {
        type: Inputs.SKIP__ROW,
        reformat: Inputs.SKIP__ROW,
        data: { placeholder: "" },
      },
      865: {
        type: Inputs.SKIP__ROW,
        reformat: Inputs.SKIP__ROW,
        data: { placeholder: "" },
      },
      866: {
        type: Inputs.SKIP__ROW,
        reformat: Inputs.SKIP__ROW,
        data: { placeholder: "" },
      },
      867: {
        type: Inputs.SKIP__ROW,
        reformat: Inputs.SKIP__ROW,
        data: { placeholder: "" },
      },
      868: {
        type: Inputs.SKIP__ROW,
        reformat: Inputs.SKIP__ROW,
        data: { placeholder: "" },
      },
      869: {
        type: Inputs.SKIP__ROW,
        reformat: Inputs.SKIP__ROW,
        data: { placeholder: "" },
      },
      870: {
        type: Inputs.SKIP__ROW,
        reformat: Inputs.SKIP__ROW,
        data: { placeholder: "" },
      },
      871: {
        type: Inputs.SKIP__ROW,
        reformat: Inputs.SKIP__ROW,
        data: { placeholder: "" },
      },
      876: {
        type: Inputs.FULL__LENGTH__PARAGRAPH__4,
        reformat: Inputs.FULL__LENGTH__PARAGRAPH__4,
        data: { placeholder: "" },
      },
      877: {
        type: Inputs.SKIP__ROW,
        reformat: Inputs.SKIP__ROW,
        data: { placeholder: "" },
      },
      878: {
        type: Inputs.SKIP__ROW,
        reformat: Inputs.SKIP__ROW,
        data: { placeholder: "" },
      },
      879: {
        type: Inputs.SKIP__ROW,
        reformat: Inputs.SKIP__ROW,
        data: { placeholder: "" },
      },
      881: {
        type: Inputs.FULL__LENGTH__PARAGRAPH__3,
        reformat: Inputs.FULL__LENGTH__PARAGRAPH__3,
        data: { placeholder: "" },
      },
      882: {
        type: Inputs.SKIP__ROW,
        reformat: Inputs.SKIP__ROW,
        data: { placeholder: "" },
      },
      883: {
        type: Inputs.SKIP__ROW,
        reformat: Inputs.SKIP__ROW,
        data: { placeholder: "" },
      },
    },

    row_styles: {
      1: [
        RowStyles.BORDER__TOP,
        RowStyles.BORDER__LEFT,
        RowStyles.BORDER__RIGHT,
        RowStyles.ZERO__PADDING__RIGHT,
      ],
      2: [
        RowStyles.BORDER__BOTTOM,
        RowStyles.BORDER__LEFT,
        RowStyles.BORDER__RIGHT,
        RowStyles.ZERO__PADDING__RIGHT,
      ],
      4: [RowStyles.ZERO__PADDING__LEFT, RowStyles.FONT__SIZE__LARGE],
      5: [RowStyles.ZERO__PADDING__LEFT, RowStyles.FONT__SIZE__LARGE],
      7: [RowStyles.CENTERED, RowStyles.FONT__SIZE__LARGE__XL],
      8: [RowStyles.CENTERED, RowStyles.FONT__SIZE__LARGE__XL],

      10: [RowStyles.ALIGNED__RIGHT],
      11: [
        RowStyles.CENTERED,
        RowStyles.FONT__SIZE__LARGE,
        RowStyles.INNER_BORDER,
      ],
      28: [RowStyles.INVISIBLE],
      207: [
        RowStyles.CENTERED,
        RowStyles.FONT__SIZE__LARGE,
        RowStyles.INNER_BORDER,
      ],
      // 472: [RowStyles.ALIGNED__LEFT],
      481: [RowStyles.ALIGNED__LEFT],
      504: [
        RowStyles.CENTERED,
        RowStyles.FONT__SIZE__LARGE,
        RowStyles.INNER_BORDER,
      ],
      515: [RowStyles.ALIGNED__LEFT],
      551: [RowStyles.ALIGNED__TOP],
      565: [RowStyles.ALIGNED__LEFT],
      583: [RowStyles.ALIGNED__LEFT],
      603: [RowStyles.ALIGNED__LEFT],
      624: [
        RowStyles.CENTERED,
        RowStyles.FONT__SIZE__LARGE,
        RowStyles.INNER_BORDER,
      ],
      662: [RowStyles.ALIGNED__LEFT],
      664: [RowStyles.ALIGNED__LEFT],
      666: [RowStyles.ALIGNED__LEFT],
      669: [RowStyles.ALIGNED__LEFT],
      671: [RowStyles.ALIGNED__LEFT],
      673: [RowStyles.ALIGNED__LEFT],
      675: [RowStyles.ALIGNED__LEFT],
      678: [RowStyles.ALIGNED__LEFT],
      683: [RowStyles.ALIGNED__LEFT],
      685: [RowStyles.ALIGNED__LEFT],
      728: [
        RowStyles.CENTERED,
        RowStyles.FONT__SIZE__LARGE,
        RowStyles.INNER_BORDER,
      ],
      800: [RowStyles.ALIGNED__LEFT],
      809: [RowStyles.ALIGNED__LEFT],
      820: [RowStyles.ALIGNED__LEFT],
      828: [RowStyles.ALIGNED__LEFT],
      834: [RowStyles.ALIGNED__LEFT],
      839: [RowStyles.ALIGNED__LEFT],
      846: [RowStyles.ALIGNED__LEFT],
      857: [RowStyles.ALIGNED__LEFT],
      859: [
        RowStyles.CENTERED,
        RowStyles.FONT__SIZE__LARGE,
        RowStyles.INNER_BORDER,
      ],
      884: [
        RowStyles.CENTERED,
        RowStyles.FONT__SIZE__LARGE,
        RowStyles.INNER_BORDER,
      ],
      886: [RowStyles.ALIGNED__LEFT],
      888: [
        RowStyles.CENTERED,
        RowStyles.FONT__SIZE__LARGE,
        RowStyles.INNER_BORDER,
      ],
    },

    segment_styles: {
      4: { address: [SegmentStyles.BOLD__ALL] },
      5: { address: [SegmentStyles.BOLD__ALL] },
      7: { address: [SegmentStyles.BOLD__ALL] },
      8: { address: [SegmentStyles.BOLD__ALL] },
      11: { address: [SegmentStyles.BOLD__ALL] },
      16: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Joint|Tenants|In|Common|Other",
          },
        },
      ],
      17: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "IS_NOT|Additional_Provisions.",
          },
        },
      ],
      36: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Solar_Panels|Water",
          },
        },
      ],
      37: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Softeners|Security_Systems|Satellite_Systems",
          },
        },
      ],
      41: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Exclusions:|",
          },
        },
      ],
      100: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Does_Not|Does",
          },
        },
      ],
      101: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Water_Rights_Examination_Deadline.|",
          },
        },
      ],
      104: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Note:|FHA|VA|Appraisal|DO_NOT",
          },
        },
      ],
      114: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Time_of_Day_Deadline|",
          },
        },
      ],
      116: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Time_of_Day_Deadline,|Time_of_%end%",
          },
        },
      ],
      117: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Day_Deadline|",
          },
        },
      ],
      121: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Will_Not|Will",
          },
        },
      ],
      134: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Alternative_Earnest_Money_Deadline|",
          },
        },
      ],
      140: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Alternative_Earnest_Money_Deadline.|",
          },
        },
      ],
      150: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "“If_Seller|",
          },
        },
      ],
      151: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "is_in_Default”,_§_20.2._and_§_21,|",
          },
        },
      ],
      153: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "“If_Buyer|",
          },
        },
      ],
      154: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "is_in_Default,_§_20.1._and_§_21,|",
          },
        },
      ],
      160: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "OR_SUCH|",
          },
        },
      ],
      161: {
        address: [SegmentStyles.BOLD__ALL],
      },
      162: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Does_Not|Does",
          },
        },
      ],
      171: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Conventional|FHA|VA|Bond|Other",
          },
        },
      ],
      180: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Real_Estate_Taxes|",
          },
        },
      ],
      181: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Property_Insurance_Premium|Mortgage_Insurance_Premium|",
          },
        },
      ],
      186: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Closing_Date.|",
          },
        },
      ],
      187: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Will_Not|Will",
          },
        },
      ],
      188: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Loan_Transfer_Approval_Deadline|Closing",
          },
        },
      ],
      192: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "WARNING:",
          },
        },
      ],
      196: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: { patterns: "Buyer_%end%", prefix: "" },
        },
      ],
      197: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Seller_or|Seller_will_!",
          },
        },
      ],
      198: { address: [SegmentStyles.BOLD__ALL] },

      201: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Seller_or_Private_Financing_Deadline,|",
          },
        },
      ],
      205: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Seller",
          },
        },
      ],
      206: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "or_Private_Financing_Deadline,",
          },
        },
      ],
      207: { address: [SegmentStyles.BOLD__ALL] },
      211: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "New_Loan_Application_Deadline",
          },
        },
      ],
      216: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "New_Loan_Terms_Deadline,|",
          },
        },
      ],
      220: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "New_Loan_%end%|",
          },
        },
      ],
      221: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Availability_Deadline|",
          },
        },
      ],
      223: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "IF_SELLER_IS|",
          },
        },
      ],
      224: { address: [SegmentStyles.BOLD__ALL] },
      225: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "EARNEST_MONEY_WILL_BE_NONREFUNDABLE,|",
          },
        },
      ],
      229: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Buyer’s_Credit_Information_Deadline,|",
          },
        },
      ],
      235: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Disapproval_of_Buyer’s_Credit_Information_Deadline.|",
          },
        },
      ],
      237: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Existing_Loan_Deadline.",
          },
        },
      ],
      239: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Existing_Loan_Termination_Deadline,",
          },
        },
      ],
      242: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Loan_Transfer_Approval_Deadline,",
          },
        },
      ],
      253: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Appraisal_Deadline|Appraisal_%end%",
          },
        },
      ],
      254: { address: [SegmentStyles.BOLD__ALL] },
      259: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Appraisal_%end%",
          },
        },
      ],
      260: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Objection_Deadline|Appraisal_Resolution",
          },
        },
      ],
      261: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Deadline,|Appraisal_Resolution_Deadline,",
          },
        },
      ],
      262: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Appraisal_Resolution_Deadline",
          },
        },
      ],
      288: { address: [SegmentStyles.BOLD__ALL] },
      289: { address: [SegmentStyles.BOLD__ALL] },
      290: { address: [SegmentStyles.BOLD__ALL] },
      291: { address: [SegmentStyles.BOLD__ALL] },
      292: { address: [SegmentStyles.BOLD__ALL] },
      293: { address: [SegmentStyles.BOLD__ALL] },
      294: { address: [SegmentStyles.BOLD__ALL] },
      295: { address: [SegmentStyles.BOLD__ALL] },
      296: { address: [SegmentStyles.BOLD__ALL] },
      297: { address: [SegmentStyles.BOLD__ALL] },
      298: { address: [SegmentStyles.BOLD__ALL] },
      299: { address: [SegmentStyles.BOLD__ALL] },
      300: { address: [SegmentStyles.BOLD__ALL] },
      301: { address: [SegmentStyles.BOLD__ALL] },
      302: { address: [SegmentStyles.BOLD__ALL] },
      283: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Buyer",
          },
        },
      ],
      284: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Seller.",
          },
        },
      ],
      304: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Association_Documents_Deadline.|",
          },
        },
      ],
      336: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Association_Documents_Termination_Deadline,",
          },
        },
      ],
      338: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Association_Documents_Deadline,",
          },
        },
      ],
      340: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Closing",
          },
        },
      ],
      341: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Date,",
          },
        },
      ],
      347: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Record_Title_Deadline,",
          },
        },
      ],
      349: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Abstract_of_Title",
          },
        },
      ],
      352: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Record_Title_Deadline,",
          },
        },
      ],
      355: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Will|Not",
          },
        },
      ],
      360: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns:
              "Buyer|Seller|One-Half_by_Buyer_and_One-Half_by_Seller|Other",
          },
        },
      ],
      369: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Record_Title_Deadline,",
          },
        },
      ],
      374: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Record_Title_Deadline.",
          },
        },
      ],
      376: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Record_Title_Objection_Deadline.",
          },
        },
      ],
      379: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Record_Title_Deadline,",
          },
        },
      ],
      389: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Off-Record_Title_Deadline,",
          },
        },
      ],
      392: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "New_ILC|New_Survey",
          },
        },
      ],
      396: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Off-Record",
          },
        },
      ],
      397: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Title_Objection_Deadline.|Off-Record_Title_Deadline,",
          },
        },
      ],
      403: { address: [SegmentStyles.BOLD__ALL] },
      404: { address: [SegmentStyles.BOLD__ALL] },
      405: { address: [SegmentStyles.BOLD__ALL] },
      406: { address: [SegmentStyles.BOLD__ALL] },
      407: { address: [SegmentStyles.BOLD__ALL] },
      408: { address: [SegmentStyles.BOLD__ALL] },
      409: { address: [SegmentStyles.BOLD__ALL] },
      410: { address: [SegmentStyles.BOLD__ALL] },
      411: { address: [SegmentStyles.BOLD__ALL] },
      412: { address: [SegmentStyles.BOLD__ALL] },
      413: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Seller|Buyer,",
          },
        },
      ],
      414: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Record_Title_Deadline.",
          },
        },
      ],
      416: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Record_Title_Objection_Deadline.|Record_Title_Deadline,",
          },
        },
      ],
      419: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Closing_Date,",
          },
        },
      ],
      430: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Third_Party_Right_to_Purchase/Approve_Deadline,",
          },
        },
      ],
      438: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Title_Resolution_Deadline,",
          },
        },
      ],
      440: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Title_Resolution_Deadline.",
          },
        },
      ],
      451: { address: [SegmentStyles.BOLD__ALL] },
      452: { address: [SegmentStyles.BOLD__ALL] },
      453: { address: [SegmentStyles.BOLD__ALL] },
      454: { address: [SegmentStyles.BOLD__ALL] },
      455: { address: [SegmentStyles.BOLD__ALL] },
      456: { address: [SegmentStyles.BOLD__ALL] },
      457: { address: [SegmentStyles.BOLD__ALL] },
      458: { address: [SegmentStyles.BOLD__ALL] },
      459: { address: [SegmentStyles.BOLD__ALL] },
      460: { address: [SegmentStyles.BOLD__ALL] },
      461: { address: [SegmentStyles.BOLD__ALL] },
      462: { address: [SegmentStyles.BOLD__ALL] },
      463: { address: [SegmentStyles.BOLD__ALL] },
      464: { address: [SegmentStyles.BOLD__ALL] },
      465: { address: [SegmentStyles.BOLD__ALL] },
      466: { address: [SegmentStyles.BOLD__ALL] },
      467: { address: [SegmentStyles.BOLD__ALL] },
      468: { address: [SegmentStyles.BOLD__ALL] },
      469: { address: [SegmentStyles.BOLD__ALL] },
      472: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Does|Not",
          },
        },
      ],
      473: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Mineral_Rights_Examination_Deadline.",
          },
        },
      ],
      475: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "New_Improvement_Location_Certificate_(New_ILC);|",
          },
        },
      ],
      476: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "New_Survey|",
          },
        },
      ],
      477: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Seller|Buyer",
          },
        },
      ],
      481: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Seller|Buyer",
          },
        },
      ],
      485: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "New_%end%|",
          },
        },
      ],
      486: { address: [SegmentStyles.BOLD__ALL] },
      490: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "New_ILC_or_New|",
          },
        },
      ],
      491: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Survey_Objection_Deadline.|",
          },
        },
      ],
      499: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "New_ILC_or_New_Survey_Objection",
          },
        },
      ],
      500: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "New_ILC_or_New_Survey_Objection_Deadline",
          },
        },
      ],
      501: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns:
              "New_ILC_or_New_Survey_Resolution_Deadline,|New_ILC_or_New_Survey_%end%",
          },
        },
      ],
      502: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Resolution_Deadline,",
          },
        },
      ],
      503: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "New_ILC_or_New_Survey_Resolution_Deadline",
          },
        },
      ],
      504: { address: [SegmentStyles.BOLD__ALL] },
      505: { address: [SegmentStyles.BOLD__ALL] },
      506: { address: [SegmentStyles.BOLD__ALL] },
      507: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Seller’s_Property_Disclosure_Deadline,|",
          },
        },
      ],
      515: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "As_Is|Where_Is|With_All_Faults",
          },
        },
      ],
      524: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Inspection_Termination_Deadline,|",
          },
        },
      ],
      528: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Inspection_Objection_Deadline,|",
          },
        },
      ],
      530: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Inspection_Objection_%end%|",
          },
        },
      ],
      531: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Deadline|Inspection_Resolution_Deadline,",
          },
        },
      ],
      532: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Inspection_Resolution_Deadline|",
          },
        },
      ],
      533: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Inspection_Resolution_Deadline|",
          },
        },
      ],
      545: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Property_Insurance_Termination|",
          },
        },
      ],
      546: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Deadline,|",
          },
        },
      ],

      550: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Due_Diligence_Documents_Delivery|",
          },
        },
      ],
      551: { address: [SegmentStyles.BOLD__ALL] },

      559: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Due_Diligence_Documents_Delivery_Deadline.|Will|Not",
          },
        },
      ],
      564: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Due_Diligence_Documents_Delivery_Deadline.|Will",
          },
        },
      ],
      565: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Not|",
          },
        },
      ],
      574: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Due_Diligence_Documents_Objection_Deadline:|",
          },
        },
      ],
      580: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Due_Diligence_Documents_Objection_Deadline|",
          },
        },
      ],
      581: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns:
              "Due_Diligence_Documents_Resolution_Deadline,|Due_Diligence_Documents_%end%",
          },
        },
      ],
      582: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Resolution_Deadline|",
          },
        },
      ],
      583: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Due_Diligence_Documents_Resolution_Deadline|",
          },
        },
      ],
      586: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Conditional_Sale|",
          },
        },
      ],
      587: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Deadline|",
          },
        },
      ],
      588: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Conditional_Sale_Deadline|",
          },
        },
      ],
      590: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Does|Not",
          },
        },
      ],
      592: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "No_Well.|Does|Not",
          },
        },
      ],
      593: { address: [SegmentStyles.BOLD__ALL] },
      594: { address: [SegmentStyles.BOLD__ALL] },
      595: { address: [SegmentStyles.BOLD__ALL] },
      596: { address: [SegmentStyles.BOLD__ALL] },
      600: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Lead-Based_Paint_%end%|",
          },
        },
      ],
      601: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Disclosure_Deadline.|",
          },
        },
      ],
      603: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Lead-Based_Paint_Termination_Deadline.|",
          },
        },
      ],
      606: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Lead-Based_Paint_Termination_Deadline.|",
          },
        },
      ],
      610: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Note:|",
          },
        },
      ],
      623: { address: [SegmentStyles.BOLD__ALL] },
      624: { address: [SegmentStyles.BOLD__ALL] },
      632: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Are|Not",
          },
        },
      ],
      653: { address: [SegmentStyles.BOLD__ALL] },
      654: { address: [SegmentStyles.BOLD__ALL] },
      658: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Buyer|Seller",
          },
        },
      ],
      659: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "One-Half_by_Buyer_and_One-Half_by_Seller|Other",
          },
        },
      ],
      660: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Closing_Date,|",
          },
        },
      ],
      663: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Buyer|",
          },
        },
      ],
      664: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Seller|One-Half_by_Buyer_and_One-Half_by_Seller|N/A.",
          },
        },
      ],
      665: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Buyer|Seller|One-Half_by_Buyer",
          },
        },
      ],
      666: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "and_One-Half_by_Seller|N/A.",
          },
        },
      ],
      669: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns:
              "Buyer|Seller|One-Half_by_Buyer_and_One-Half_by_Seller|N/A.",
          },
        },
      ],
      671: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns:
              "Buyer|Seller|One-Half_by_Buyer_and_One-Half_by_Seller|N/A.",
          },
        },
      ],
      672: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Buyer|Seller|One-Half_by",
          },
        },
      ],
      673: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Buyer_and_One-Half_by_Seller|N/A.",
          },
        },
      ],
      675: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns:
              "Buyer|Seller|One-Half_by_Buyer_and_One-Half_by_Seller|N/A.",
          },
        },
      ],
      677: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Buyer|Seller",
          },
        },
      ],
      678: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "One-Half_by_Buyer_and_One-Half_by_Seller|N/A.",
          },
        },
      ],
      683: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns:
              "Buyer|Seller|One-Half_by_Buyer_and_One-Half_by_Seller|N/A.",
          },
        },
      ],
      685: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns:
              "Buyer|Seller|One-Half_by_Buyer_and_One-Half_by_Seller|N/A.",
          },
        },
      ],
      701: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Closing_Date,|",
          },
        },
      ],
      703: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns:
              "Taxes_for_the_Calendar_Year_Immediately_Preceding_Closing|Most_Recent_Mill_Levy",
          },
        },
      ],
      704: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "and_Most_Recent_Assessed_Valuation,|",
          },
        },
      ],
      705: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Other|",
          },
        },
      ],
      706: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Rents_Actually_Received|Accrued.",
          },
        },
      ],
      715: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Closing_Date|Buyer|Seller.",
          },
        },
      ],
      720: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Possession_Date|Possession_Time,",
          },
        },
      ],
      724: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Possession_Date|Possession_Time,",
          },
        },
      ],
      726: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Does_Not|",
          },
        },
      ],
      728: { address: [SegmentStyles.BOLD__ALL] },
      729: { address: [SegmentStyles.BOLD__ALL] },
      730: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "WALK-THROUGH.|",
          },
        },
      ],
      735: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Closing_Date.|",
          },
        },
      ],
      736: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Closing_Date,|",
          },
        },
      ],
      740: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Closing_Date|",
          },
        },
      ],
      751: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Closing_Date,|",
          },
        },
      ],
      757: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Closing_Date,|",
          },
        },
      ],
      782: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns:
              "This_§_20.1.2._applies_unless_the_box_in_§_20.1.1._is_checked.|",
          },
        },
      ],
      799: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Closing_Date,|",
          },
        },
      ],
      852: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Acceptance_Deadline_Date|Acceptance_Deadline_Time.",
          },
        },
      ],
      856: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "Financing_Conditions_and_Obligations;_Title_Insurance,|",
          },
        },
      ],
      857: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns:
              "Record_Title_and_Off-Record_Title;_New_ILC,_New_Survey;|Property_Disclosure,_Inspection,_Indemnity,_Insurability_Due",
          },
        },
      ],
      858: { address: [SegmentStyles.BOLD__ALL] },
      859: { address: [SegmentStyles.BOLD__ALL] },
      873: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "are_a_part|",
          },
        },
      ],
      880: [
        {
          type: SegmentStyles.PATTERN__REPLACE,
          data: {
            patterns: "not|",
          },
        },
      ],
      884: { address: [SegmentStyles.BOLD__ALL] },
      886: { address: [SegmentStyles.BOLD__ALL] },
      888: { address: [SegmentStyles.BOLD__ALL] },
    },

    static_settings: {
      81: [StaticStyles.IGNORE_HEADER],
      329: [StaticStyles.IGNORE_HEADER],
      330: [StaticStyles.IGNORE_TITLE],
      654: [StaticStyles.IGNORE_HEADER],
      861: [StaticStyles.KEEP__SINGLE, StaticStyles.IGNORE_HEADER],
    },
  },
};
module.exports = config;
