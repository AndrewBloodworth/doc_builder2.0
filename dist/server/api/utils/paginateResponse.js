"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function paginateResponse(items, offset, limit) {
    const start = offset * limit;
    const end = start + limit;
    return {
        rows: items.slice(start, end),
        pageCount: Math.ceil(items.length / limit) || 1,
    };
}
exports.default = paginateResponse;
