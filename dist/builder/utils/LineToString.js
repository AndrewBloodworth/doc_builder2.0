"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const enums_1 = require("../builder_types/enums");
// require("babel-register")({
//   presets: ["@babel/preset-react"],
// });
// const rowStyles = require("./rowStyles");
const rowStyles_1 = __importDefault(require("./rowStyles"));
const parseType = (type = "") => {
    const idx = type.indexOf("{");
    return {
        key: idx === -1 ? type : type.substring(0, idx),
        data: type
            .substring(idx + 1, type.length - 1)
            .split("%20")
            .reduce((obj, keyPair) => {
            const [key, value] = keyPair.split("=");
            obj[key] = value;
            return obj;
        }, {}),
    };
};
const getComplexRowStyles = (lineStyles) => {
    return lineStyles.reduce((stylesObj, styleType) => (Object.assign(Object.assign({}, stylesObj), { [styleType]: rowStyles_1.default.complexStyles[styleType] })), {});
};
const getRowStyles = (lineStyles, lineNumber) => {
    return lineStyles.reduce((stylesObj, styleType) => (Object.assign(Object.assign({}, stylesObj), rowStyles_1.default[styleType])), { justifyContent: "between", alignItems: "center", paddingRight: 0 });
};
const getSegmentStyles = (segmentStyles, key, segment, complexRowStyles, character_count = 0, word_count = 0, maxCharacters, isEnd) => {
    let elements = [];
    let additionalStyles = {};
    let TYPE = "p";
    const getStrongStyle = () => {
        if (complexRowStyles[enums_1.RowStyles.FORCE_FULL_WIDTH]) {
            return {
                justifyContent: "space-between",
                display: "flex",
                width: "100%",
            };
        }
        else {
            return {};
        }
    };
    const wrapAllWords = (words) => Array.isArray(words)
        ? words.map((word, idx) => React.createElement("span", { key: `${word}-${idx}` }, word))
        : words
            .split(" ")
            .filter((word) => word)
            .map((word, idx) => React.createElement("span", { key: `${word}-${idx}` }, word));
    const wrapAllWordsStrong = (words) => Array.isArray(words)
        ? words.map((word, idx) => (React.createElement("strong", { key: `strong-${word}-${idx}` }, word)))
        : words
            .split(" ")
            .filter((word) => word)
            .map((word, idx) => (React.createElement("strong", { key: `strong-${word}-${idx}` }, word)));
    if (segmentStyles.length) {
        segmentStyles.forEach((style) => {
            const { key } = parseType(style);
            switch (key) {
                case enums_1.SegmentStyles.PATTERN__REPLACE: {
                    const { data } = parseType(style);
                    const ranges = [];
                    const findPattern = (() => {
                        let start = 0;
                        return (isPattern, idx, word) => {
                            if (isPattern) {
                                ranges.push(React.createElement(React.Fragment, { key: `${idx}${word}` }, wrapAllWords(segment.slice(start, idx))));
                                const phrase = word.split("_");
                                if (phrase[phrase.length - 1] === "!") {
                                    start = i + 1;
                                }
                                else if (phrase[phrase.length - 1] === "%end%") {
                                    start = i + phrase.length - 1;
                                }
                                else {
                                    start = i + phrase.length;
                                }
                                if (phrase.length === 1 || phrase[phrase.length - 1] === "!") {
                                    ranges.push(React.createElement("strong", { key: `${idx}${word}`, style: {
                                            whiteSpace: "nowrap",
                                            marginBottom: 0,
                                        } },
                                        React.createElement(React.Fragment, { key: `${idx}${word}` }, segment[idx])));
                                }
                                else if (phrase[phrase.length - 1] === "%end%" &&
                                    phrase.slice(0, phrase.length - 1).join(" ") ===
                                        segment.slice(idx, idx + phrase.length - 1).join(" ")) {
                                    ranges.push(React.createElement("strong", { key: `${idx}${word}`, style: {
                                            whiteSpace: "nowrap",
                                            marginBottom: 0,
                                        } },
                                        React.createElement(React.Fragment, { key: `${idx}${word}` }, segment.slice(idx, idx + phrase.length - 1).join(" "))));
                                }
                                else if (phrase.join(" ") ===
                                    segment.slice(idx, idx + phrase.length).join(" ")) {
                                    ranges.push(React.createElement("strong", { key: `${idx}${word}`, style: {
                                            whiteSpace: "nowrap",
                                            marginBottom: 0,
                                        } },
                                        React.createElement(React.Fragment, { key: `${idx}${word}` }, segment.slice(idx, idx + phrase.length).join(" "))));
                                }
                            }
                            else if (idx === segment.length - 1) {
                                ranges.push(React.createElement(React.Fragment, { key: `${idx}${word}` }, wrapAllWords(segment.slice(start))));
                            }
                        };
                    })();
                    let i = 0;
                    loop: while (i < segment.length) {
                        const word = segment[i];
                        let foundPattern = false;
                        const patterns = data.patterns.split("|");
                        for (let j = 0; j < patterns.length; j++) {
                            const phrase = patterns[j].split("_");
                            if (phrase.length > 1 &&
                                phrase.every((w, wIdx, { length }) => {
                                    if (segment.length > i + wIdx) {
                                        return wIdx === length - 1 && w === "!"
                                            ? true
                                            : w === segment[i + wIdx];
                                    }
                                    else if (wIdx === length - 1 && w === "%end%") {
                                        return true;
                                    }
                                    else {
                                        return false;
                                    }
                                })) {
                                findPattern(true, i, patterns[j]);
                                if (phrase[phrase.length - 1] === "!") {
                                    i++;
                                }
                                else if (phrase[phrase.length - 1] === "%end%") {
                                    i += phrase.length - 1;
                                }
                                else {
                                    i += phrase.length;
                                }
                                foundPattern = true;
                                continue loop;
                            }
                            else if (patterns[j] === word) {
                                findPattern(true, i, patterns[j]);
                                i++;
                                foundPattern = true;
                                continue loop;
                            }
                            else {
                                if (i === segment.length - 1 &&
                                    j === patterns.length - 1 &&
                                    !foundPattern) {
                                    findPattern(false, i, "");
                                    break loop;
                                }
                            }
                        }
                        i++;
                    }
                    elements.push(ReactDOMServer.renderToString(React.createElement(React.Fragment, { key: `${segment.join(" ")}` }, ranges)));
                    break;
                }
                case enums_1.SegmentStyles.BOLD__ALL: {
                    elements.push(ReactDOMServer.renderToString(React.createElement(React.Fragment, { key: `${segment.join(" ")}` }, wrapAllWordsStrong(segment.join(" ")))));
                    break;
                }
            }
        });
        elements.join("");
    }
    else {
        elements = ReactDOMServer.renderToString(React.createElement(React.Fragment, { key: key }, wrapAllWords(segment)));
    }
    if (complexRowStyles[enums_1.RowStyles.FORCE_FULL_WIDTH]) {
        additionalStyles = Object.assign(Object.assign({}, additionalStyles), { display: "flex", justifyContent: "space-between", width: "100%" });
    }
    if (complexRowStyles[enums_1.RowStyles.CENTERED]) {
        additionalStyles = Object.assign(Object.assign({}, additionalStyles), { justifyContent: "center", flexGrow: 0 });
    }
    if (complexRowStyles[enums_1.RowStyles.ALIGNED__RIGHT]) {
        additionalStyles = Object.assign(Object.assign({}, additionalStyles), { flexGrow: 0 });
    }
    if (complexRowStyles[enums_1.RowStyles.ALIGNED__LEFT]) {
        additionalStyles = Object.assign(Object.assign({}, additionalStyles), { flexGrow: 0 });
    }
    if (complexRowStyles[enums_1.RowStyles.INNER_BORDER]) {
        additionalStyles = Object.assign(Object.assign({}, additionalStyles), { border: "1px solid black", padding: 3 });
    }
    if (complexRowStyles[enums_1.RowStyles.INVISIBLE]) {
        elements = "";
    }
    // console.log("CW", lineRef.current);
    return TYPE === "p" ? (React.createElement("p", { key: `segment-${key}-${Math.random() * 1000 * Math.random()}`, className: "line-thing", style: Object.assign({ whiteSpace: "nowrap", marginBottom: 0, flexGrow: word_count === 1 ? 0 : 1, flexShrink: 3, 
            // letterSpacing: 1,
            display: "flex", justifyContent: isEnd
                ? character_count > maxCharacters
                    ? "space-between"
                    : "flex-start"
                : "space-between" }, additionalStyles), dangerouslySetInnerHTML: { __html: elements } })) : (React.createElement(React.Fragment, { key: key },
        elements,
        React.createElement("div", { style: { flexShrink: 1, flexGrow: 1 } })));
};
exports.default = ({ line, segments, maxCharacters }) => {
    const { lineNumber, lineStyles, segmentStyles } = line;
    const newSegments = segments.map((segment, index) => {
        if (Array.isArray(segment)) {
            return ReactDOMServer.renderToString(getSegmentStyles(segmentStyles, `${lineNumber}-${index}`, segment, getComplexRowStyles(lineStyles), segment.join(" ").length, segment.length, maxCharacters, index === segments.length - 1));
        }
        else if (typeof segment === "string") {
            return segment;
        }
    });
    return newSegments.join("|");
};
