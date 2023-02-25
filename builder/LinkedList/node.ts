declare function require(name: string): any;
declare var __dirname: string;
import { Section } from "../builder_types/types";
export class Node {
  value: Section;
  next: Node | null;
  previous: Node | null;
  constructor(value: Section) {
    this.value = value;
    this.next = null;
    this.previous = null;
  }
}
