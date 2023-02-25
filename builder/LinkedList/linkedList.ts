declare function require(name: string): any;
declare var __dirname: string;

import { Node } from "./node";
import { ComparatorFunction, Section } from "../builder_types/types";
export class LinkedList {
  head: Node | null;
  tail: Node | null;
  constructor() {
    this.head = null;
    this.tail = null;
  }
  addToTail(value: Section) {
    const node: Node = new Node(value);

    if (!this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      const currentTail = this.tail;
      currentTail.next = node;
      this.tail = node;
      this.tail.previous = currentTail;
    }
  }

  addToHead(value: Section) {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      const currentHead = this.head;
      currentHead.previous = node;
      this.head = node;
      this.head.next = currentHead;
    }
  }

  removeHead() {
    if (!this.head) {
      return null;
    } else {
      const headToRemove = this.head;
      this.head = headToRemove.next;
      if (this.head) {
        this.head.previous = null;
      } else {
        this.tail = null;
      }
      return headToRemove.value;
    }
  }

  removeTail() {
    if (!this.tail) {
      return null;
    } else {
      const tailToRemove = this.tail;
      this.tail = tailToRemove.previous;
      if (this.tail) {
        this.tail.next = null;
      } else {
        this.head = null;
      }
      return tailToRemove.value;
    }
  }
  print() {
    let currentNode = this.head;
    let toBePrinted = [];
    while (currentNode) {
      toBePrinted.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return toBePrinted;
  }
  size() {
    let currentNode = this.head;
    let count = 0;
    while (currentNode) {
      count++;
      currentNode = currentNode.next;
    }
    return count;
  }
  search(comparator: Section | ComparatorFunction) {
    if (typeof comparator === "string") {
      let currentNode = this.head;
      while (currentNode) {
        if (currentNode.value === comparator) return currentNode.value;
        currentNode = currentNode.next;
      }
      return null;
    } else if (typeof comparator === "function") {
      let currentNode = this.head;
      while (currentNode) {
        if (comparator(currentNode.value)) return currentNode.value;
        currentNode = currentNode.next;
      }
      return null;
    }
  }
}

export {};
