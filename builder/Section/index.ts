import { Parseable, Line, ParsableDataCallBack } from "../builder_types/types";

export class SectionClass {
  number: string;
  title: string;
  depth: number;
  lines: Parseable;
  content: SectionClass[];
  count: number;
  constructor(number: string, title: string, depth: number) {
    this.number = number;
    this.title = title;
    this.depth = depth;
    this.lines = { count: 0, content: [] };
    this.content = [];
    this.count = 0;
  }
  insertLine(number: string, data: Line) {
    this.lines.count += 1;
    this.lines.content = [...this.lines.content, { number, data }];
  }
  insertSection(section: SectionClass) {
    this.count += 1;
    this.content = [...this.content, section];
  }
  traverse(callBack: ParsableDataCallBack) {
    const { lines, number, title, depth } = this;
    callBack({ number, lines: lines.content, title, depth });
    if (this.count) {
      this.content.forEach((c) => {
        c.traverse(callBack);
      });
    }
  }
}
