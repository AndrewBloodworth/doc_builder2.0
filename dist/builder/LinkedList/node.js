"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.previous = null;
    }
}
exports.Node = Node;
