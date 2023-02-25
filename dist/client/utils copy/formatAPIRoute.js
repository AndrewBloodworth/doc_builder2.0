"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../server/types");
exports.default = (route) => {
    const basePath = route === types_1.API_ROUTE.AUTH ? route : `${types_1.API_ROUTE.API}${route}`;
    return (path) => basePath + (path ? path : "");
};
