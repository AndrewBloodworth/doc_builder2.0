import Section from "../../Section/section";
import MainClass from "../main";

export default class SignatureClass extends MainClass {
  constructor(headers) {
    super();
    this.headers = headers;
  }
  getData(json) {
    return this.init(json, (line, idx, depth) => {
      return {
        text: line.text,
      };
    });
  }
}
