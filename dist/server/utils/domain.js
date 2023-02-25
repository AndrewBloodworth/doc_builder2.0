"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
exports.default = (pathname) => {
    const origin = process.env.NODE_ENV === types_1.Environment.PRODUCTION
        ? String(process.env.PROD_BASE_URL)
        : String(process.env.DEV_BASE_URL);
    return { href: origin + pathname, origin, host: origin.split("://").pop() };
};
