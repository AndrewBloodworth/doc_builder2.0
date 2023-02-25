"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dates) => {
    const formatedDates = [];
    for (const date of dates) {
        formatedDates.push(date.toISOString().split("T").shift());
    }
    return formatedDates;
};
