"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (word) => {
    const [firstLetter, ...remainingLetters] = word;
    return (firstLetter.toUpperCase() +
        remainingLetters.map((letter) => letter.toLowerCase()).join(""));
};
