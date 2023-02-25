declare function require(name: string): any;
declare var __dirname: string;
import { ContractConfig } from "../builder_types/types";
import { Inputs, SegmentStyles, StaticStyles } from "../builder_types/enums";
const config: ContractConfig = {
  excludes: (number) => {
    return [
      [-Infinity, 108],
      [159, Infinity],
    ].some(([start, end]) => number >= start && number <= end);
  },
  PageID: "CBS1--6-21.",
  settings: {
    header_regexp: "/^(d+.)/y",
    line_matcher: (line) => {
      const matched = line.match(/.*(?<!§)(?<!\d)(\d+).*$/y);
      const titles = line.match(
        /(Title|Owners' Association|Seller's Disclosures|Loan and Credit|Appraisal|Survey|Inspection and Due Diligence|Closing and Possession)/g
      );
      return {
        matches: !!matched || !!titles,
        line_number:
          (!!matched && matched.length ? matched[1] : "") ||
          (!!titles ? StaticStyles.LINE_NUMBER_UNSET : ""),
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
            placeholder: "Date or Deadline",
          },
        },
      ],
      2: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      3: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      4: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      5: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      6: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      7: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      8: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      9: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      10: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      11: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      12: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      13: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      14: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      15: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      16: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      17: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      18: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      19: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      20: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      21: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      22: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      23: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      24: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      25: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      26: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      27: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      28: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      29: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      30: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      31: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      32: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      33: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      34: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      35: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      36: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      37: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      38: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      39: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      40: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      41: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      42: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
      43: [
        {
          before: "custom",
          type: Inputs.TEXT__BOX__LARGE,
          data: {
            placeholder: "Date or Deadline",
          },
        },
      ],
    },
    row_styles: {},
    segment_styles: {
      48: { address: [SegmentStyles.BOLD__ALL] },
      49: { address: [SegmentStyles.BOLD__ALL] },
    },
    static_settings: {
      [StaticStyles.LINE_NUMBER_UNSET]: [StaticStyles.KEEP__SINGLE],
    },
  },
};
module.exports = config;
