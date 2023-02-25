"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (object) => Object.entries(object)
    .map(([key, val]) => `${key}=${val}`)
    .join("&");
