import MainClass from "../main";

import LineToString from "../utils/LineToString";
import { ComponentLocations } from "../builder_types/enums";

import {
  Contract,
  DataFetchCallBack,
  ParsableLine,
  LineGenerator,
} from "../builder_types/types";

export default class BrokersAcknowlegmentsClass extends MainClass {
  constructor(name: string) {
    super(name);
  }
  getData(contract: Contract) {
    const { signature_location, sections } = contract;
    const ln_gen: LineGenerator = ({ line, depth }) => {
      const p_line: ParsableLine = {
        lineNumber: line.number,
        lineText: line.data.text,
        lineStyles: line.data.row_styles,
        lineSegments: LineToString({
          line: {
            lineNumber: line.number,
            lineStyles: line.data.row_styles,
            segmentStyles: line.data.segment_styles,
          },
          segments: this.getRowSegments(line.data.text),
          maxCharacters: 60,
        }),
        segmentStyles: line.data.segment_styles,
        lineDepth: depth,
        hasSignature: signature_location[line.number] || false,
      };
      return p_line;
    };
    const fn: DataFetchCallBack = (data) => ln_gen(data);
    return this.init(sections, fn);
  }
}
