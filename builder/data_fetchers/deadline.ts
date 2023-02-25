import MainClass from "../main";

import {
  Contract,
  DataFetchCallBack,
  ParsableLine,
  LineGenerator,
} from "../builder_types/types";
import LineToString from "../utils/LineToString";

export default class DeadlineTable extends MainClass {
  constructor(name: string) {
    super(name);
  }
  getData(contract: Contract) {
    const { sections } = contract;
    const ln_gen: LineGenerator = ({ line, idx, number, title, depth }) => {
      const rules = line.data.rules;
      let words = line.data.text.split(" ");
      let lineNumber: string = words.shift() || "";

      const matched = words.join(" ").match(/§ *(\d*)(.*)/);
      let reference = "";
      let event = line.data.text;
      if (!!matched) {
        reference = matched[1];
        event = matched[2];
      } else {
        lineNumber = "";
      }
      const isHeader = !!!lineNumber;
      const p_line: ParsableLine = {
        lineNumber,
        reference,
        event,
        lineText: rules.length ? rules : "",
        lineDepth: depth,
        lineSegments: LineToString({
          line: {
            lineNumber: line.number,
            lineStyles: line.data.row_styles,
            segmentStyles: line.data.segment_styles,
          },
          segments: this.getRowSegments(line.data.text),
          maxCharacters: 60,
        }),
        lineStyles: line.data.row_styles,
        segmentStyles: line.data.segment_styles,
        isHeader,
      };
      return p_line;
    };
    const fn: DataFetchCallBack = (data) => ln_gen(data);
    return this.init(sections, fn);
  }
}
