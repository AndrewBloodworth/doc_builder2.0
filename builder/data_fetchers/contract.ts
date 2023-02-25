import MainClass from "../main";

import { ComponentLocations } from "../builder_types/enums";

import {
  Contract,
  DataFetchCallBack,
  ParsableLine,
  LineGenerator,
} from "../builder_types/types";
import LineToString from "../utils/LineToString";

export default class ContractClass extends MainClass {
  constructor(name: string) {
    super(name);
  }

  getData(contract: Contract) {
    const { component_location, signature_location, sections } = contract;

    const ln_gen: LineGenerator = ({ line, idx, number, title, depth }) =>
      ({
        isHeader: false,
        lineNumber: line.number,
        titleNumber: idx === 0 && number !== "Header" ? number : "",
        sectionTitle: idx === 0 ? title : "",
        lineText: line.data.text,
        lineStyles: line.data.row_styles,
        segmentStyles: line.data.segment_styles,
        lineDepth: depth,
        lineData: {
          line: {
            lineNumber: line.number,
            lineStyles: line.data.row_styles,
            segmentStyles: line.data.segment_styles,
          },
          segments: this.getRowSegments(line.data.text),
          maxCharacters: 60,
        },
        lineSegments: LineToString({
          line: {
            lineNumber: line.number,
            lineStyles: line.data.row_styles,
            segmentStyles: line.data.segment_styles,
          },
          segments: this.getRowSegments(line.data.text),
          maxCharacters: 60,
        }),
        hasDeadline:
          component_location[line.number] ===
          ComponentLocations.DEADLINE__COMPONENT,
        hasPurchase:
          component_location[line.number] ===
          ComponentLocations.PURCHASE__COMPONENT,
        hasSignature: signature_location[line.number] || false,
        hasBrokersAcknowledgments:
          component_location[line.number] ===
          ComponentLocations.BROKERS__ACKNOWLEDGMENTS,
      } as ParsableLine);

    const fn: DataFetchCallBack = (data) => ln_gen(data);
    return this.init(sections, fn);
  }
}
