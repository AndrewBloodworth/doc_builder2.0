import MainClass from "../main";

import { ComponentLocations } from "../builder_types/enums";

import {
  Contract,
  DataFetchCallBack,
  ParsableLine,
  LineGenerator,
} from "../builder_types/types";

export default class PurchasePriceTable extends MainClass {
  constructor(name: string) {
    super(name);
  }
  getData(contract: Contract) {
    const { sections } = contract;
    const ln_gen: LineGenerator = ({ line, idx, number, title, depth }) => {
      const rules = line.data.rules;
      let words = line.data.text.split(" ");
      words.shift();
      const matched = words.join(" ").match(/§ *([\d|\.]*)(.*)(?=\$)/);
      let reference = "";
      let item = line.data.text;
      if (!!matched) {
        reference = matched[1];
        item = matched[2].trim();
      } else {
        item = idx === 9 ? "TOTAL" : "";
      }
      console.log(rules);
      const p_line: ParsableLine = {
        itemNumber: idx + 1,
        lineNumber: String(idx + 1),
        reference,
        item,
        lineText: rules.length ? rules : "",
        lineDepth: depth,
        amountLeft: idx === 0 || idx === 6 || idx === 7 || idx === 9,
        amountRight: idx > 0,
        referenceInput: idx === 6 || idx === 7,
        itemInput: idx === 6 || idx === 7,
        lineStyles: line.data.row_styles,
        segmentStyles: line.data.segment_styles,
        isHeader: idx === 9,
      };
      return p_line;
    };
    const fn: DataFetchCallBack = (data) => ln_gen(data);
    return this.init(sections, fn);
  }
}
