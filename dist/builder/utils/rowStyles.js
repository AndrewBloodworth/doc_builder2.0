"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../builder_types/enums");
exports.default = {
    [enums_1.RowStyles.CENTERED]: {
        justifyContent: "center",
        width: "100%",
    },
    [enums_1.RowStyles.ALIGNED__TOP]: {
        alignItems: "start",
    },
    [enums_1.RowStyles.ALIGNED__RIGHT]: {
        justifyContent: "flex-end",
        width: "100%",
    },
    [enums_1.RowStyles.ALIGNED__LEFT]: {
        justifyContent: "flex-start",
    },
    [enums_1.RowStyles.FONT__SIZE__LARGE]: {
        fontSize: "1.2vw",
    },
    [enums_1.RowStyles.FONT__SIZE__LARGE__XL]: {
        fontSize: "2vw",
    },
    [enums_1.RowStyles.ZERO__PADDING__LEFT]: {
        paddingLeft: 0,
    },
    [enums_1.RowStyles.ZERO__PADDING__RIGHT]: {
        paddingRight: 0,
    },
    [enums_1.RowStyles.BORDER__TOP]: {
        borderTop: "1px solid black",
    },
    [enums_1.RowStyles.BORDER__BOTTOM]: {
        borderBottom: "1px solid black",
    },
    [enums_1.RowStyles.BORDER__LEFT]: {
        borderLeft: "1px solid black",
    },
    [enums_1.RowStyles.BORDER__RIGHT]: {
        borderRight: "1px solid black",
    },
    [enums_1.RowStyles.FIT_WIDTH]: {
        width: "fit-content",
    },
    [enums_1.RowStyles.LINE__HEIGHT__LG]: {
        height: 60,
    },
    complexStyles: {
        // Turn all words into span elements
        [enums_1.RowStyles.ALIGNED__LEFT]: true,
        [enums_1.RowStyles.ALIGNED__RIGHT]: true,
        [enums_1.RowStyles.CENTERED]: true,
        [enums_1.RowStyles.FORCE_FULL_WIDTH]: true,
        [enums_1.RowStyles.INNER_BORDER]: true,
        [enums_1.RowStyles.INVISIBLE]: true,
    },
};
