"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionClass = void 0;
class SectionClass {
    constructor(number, title, depth) {
        this.number = number;
        this.title = title;
        this.depth = depth;
        this.lines = { count: 0, content: [] };
        this.content = [];
        this.count = 0;
    }
    insertLine(number, data) {
        this.lines.count += 1;
        this.lines.content = [...this.lines.content, { number, data }];
    }
    insertSection(section) {
        this.count += 1;
        this.content = [...this.content, section];
    }
    traverse(callBack) {
        const { lines, number, title, depth } = this;
        callBack({ number, lines: lines.content, title, depth });
        if (this.count) {
            this.content.forEach((c) => {
                c.traverse(callBack);
            });
        }
    }
}
exports.SectionClass = SectionClass;
