import Section from "../../Section/section";
import MainClass from "../main";

export default class PurchasePriceTable extends MainClass {
  constructor(headers) {
    super();
    this.headers = headers;
  }
  getData(json) {
    return this.init(json, (line, idx, depth) => {
      let words = line.text.split(" ");
      const lineNumber = words.shift();
      let reference = words.filter(
        (word) => word === "§" || [...word].includes(".")
      );
      const tableRow = words.slice(reference.length + 1);
      return {
        lineNumber,
        reference,
        tableRow,
        lineDepth: depth,
        isTitle: idx === 7 || idx === 8,
        rawText: line.text,
        isHeader: line.text === "___PURCHASE_PRICE_ONE_HEADERS___",
      };
    });
  }
}
