"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
const node_1 = require("./node");
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    addToTail(value) {
        const node = new node_1.Node(value);
        if (!this.tail) {
            this.head = node;
            this.tail = node;
        }
        else {
            const currentTail = this.tail;
            currentTail.next = node;
            this.tail = node;
            this.tail.previous = currentTail;
        }
    }
    addToHead(value) {
        const node = new node_1.Node(value);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        }
        else {
            const currentHead = this.head;
            currentHead.previous = node;
            this.head = node;
            this.head.next = currentHead;
        }
    }
    removeHead() {
        if (!this.head) {
            return null;
        }
        else {
            const headToRemove = this.head;
            this.head = headToRemove.next;
            if (this.head) {
                this.head.previous = null;
            }
            else {
                this.tail = null;
            }
            return headToRemove.value;
        }
    }
    removeTail() {
        if (!this.tail) {
            return null;
        }
        else {
            const tailToRemove = this.tail;
            this.tail = tailToRemove.previous;
            if (this.tail) {
                this.tail.next = null;
            }
            else {
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
    search(comparator) {
        if (typeof comparator === "string") {
            let currentNode = this.head;
            while (currentNode) {
                if (currentNode.value === comparator)
                    return currentNode.value;
                currentNode = currentNode.next;
            }
            return null;
        }
        else if (typeof comparator === "function") {
            let currentNode = this.head;
            while (currentNode) {
                if (comparator(currentNode.value))
                    return currentNode.value;
                currentNode = currentNode.next;
            }
            return null;
        }
    }
}
exports.LinkedList = LinkedList;
