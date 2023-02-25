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
      let ref: any = this;
      if (ref.line_counter) {
        count = ref.line_counter();
      } else {
        ref.line_counter = (() => {
          let count = 0;
          return () => {
            return ++count;
          };
        })();
      }
      const matched = line.match(/.*(?<!§)(?<!\d)(\d+).*$/y);
      const titles = line.match(
        /(Title|Owners' Association|Seller's Disclosures|Loan and Credit|Appraisal|Survey|Inspection and Due Diligence|Closing and Possession)/g
      );
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
          type: Inputs.TEXT__BOX__LARGE,
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
          type: Inputs.TEXT__BOX__LARGE,
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
          type: Inputs.TEXT__BOX__LARGE,
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
          type: Inputs.TEXT__BOX__LARGE,
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
          type: Inputs.TEXT__BOX__LARGE,
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
          type: Inputs.TEXT__BOX__LARGE,
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
          type: Inputs.TEXT__BOX__LARGE,
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
          type: Inputs.TEXT__BOX__LARGE,
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
          type: Inputs.TEXT__BOX__LARGE,
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
          type: Inputs.TEXT__BOX__LARGE,
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
          type: Inputs.TEXT__BOX__LARGE,
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
          type: Inputs.TEXT__BOX__LARGE,
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
          type: Inputs.TEXT__BOX__LARGE,
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
          type: Inputs.TEXT__BOX__LARGE,
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
          type: Inputs.TEXT__BOX__LARGE,
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
          type: Inputs.TEXT__BOX__LARGE,
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
          type: Inputs.TEXT__BOX__LARGE,
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
