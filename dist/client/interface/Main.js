"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
const react_1 = __importStar(require("react"));
// import Routes from "../routes/Routes";
function createHiPPICanvas(canvas, width, height) {
    var _a;
    const ratio = window.devicePixelRatio;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    (_a = canvas.getContext("2d")) === null || _a === void 0 ? void 0 : _a.scale(ratio, ratio);
    return canvas;
}
var SegmentType;
(function (SegmentType) {
    SegmentType["TEXT"] = "TEXT";
    SegmentType["INPUT"] = "INPUT";
})(SegmentType || (SegmentType = {}));
var TextStyle;
(function (TextStyle) {
    TextStyle["NORMAL"] = "NORMAL";
    TextStyle["BOLD"] = "BOLD";
})(TextStyle || (TextStyle = {}));
const data = [
    {
        lineNumber: "1",
        titleNumber: "1.0",
        title: "Title",
        segments: [
            {
                type: SegmentType.TEXT,
                style: TextStyle.NORMAL,
                text: "Please enter the ",
            },
            { type: SegmentType.TEXT, style: TextStyle.BOLD, text: "text " },
            { type: SegmentType.INPUT, style: TextStyle.NORMAL, name: "one" },
            {
                type: SegmentType.TEXT,
                style: TextStyle.NORMAL,
                text: " for the first time",
            },
        ],
    },
    {
        lineNumber: "2",
        titleNumber: "2.0",
        title: "Another",
        segments: [
            { type: SegmentType.TEXT, style: TextStyle.NORMAL, text: "This is the " },
            { type: SegmentType.TEXT, style: TextStyle.BOLD, text: "second " },
            { type: SegmentType.INPUT, style: TextStyle.NORMAL, name: "two" },
            {
                type: SegmentType.TEXT,
                style: TextStyle.NORMAL,
                text: " section of text.",
            },
        ],
    },
];
const linesData = require("../../lines.json");
const Main = () => {
    const [inputData, setInputData] = (0, react_1.useState)({
        one: "default",
        two: "",
    });
    const handleChange = (e) => {
        const target = e.target;
        setInputData((current) => {
            return Object.assign(Object.assign({}, current), { [target.name]: target.value });
        });
    };
    const contractRef = (0, react_1.useRef)(null);
    const canvasContainerRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        var _a, _b;
        const lineHeight = 30;
        const canvas = createHiPPICanvas(contractRef.current, window.innerWidth, linesData.length * lineHeight);
        const context = canvas.getContext("2d");
        const setFont = (font) => {
            if (context === null || context === void 0 ? void 0 : context.font) {
                context.font = font;
            }
        };
        ("10px sans-serif");
        setFont(`normal 12px sans-serif`);
        const getTextWidth = (text) => context === null || context === void 0 ? void 0 : context.measureText(text).width;
        for (let i = 0; i < linesData.length; i++) {
            let currentX = 0;
            let currentY = lineHeight * (i + 1);
            context === null || context === void 0 ? void 0 : context.moveTo(currentX, currentY);
            const line = linesData[i];
            // const line = data[i];
            context === null || context === void 0 ? void 0 : context.fillText(line.lineNumber, currentX, currentY);
            currentX += 20;
            context === null || context === void 0 ? void 0 : context.moveTo(currentX, currentY);
            currentX += getTextWidth(line.lineNumber);
            context === null || context === void 0 ? void 0 : context.fillText(line.titleNumber, currentX, currentY);
            currentX += getTextWidth(line.titleNumber);
            context === null || context === void 0 ? void 0 : context.fillText(line.sectionTitle, currentX, currentY);
            currentX += getTextWidth(line.sectionTitle);
            for (const segment of line.lineData.segments) {
                if (Array.isArray(segment)) {
                    // setFont(
                    //   segment.style === TextStyle.BOLD
                    //     ? `bold 12px sans-serif`
                    //     : `normal 12px sans-serif`
                    // );
                    const text = segment.join(" ");
                    context === null || context === void 0 ? void 0 : context.fillText(text, currentX, currentY);
                    currentX += getTextWidth(text);
                }
                else if (typeof segment === "string") {
                    const input = document.createElement("input");
                    input.oninput = handleChange;
                    // input.value = inputData[segment.name!];
                    // input.name = segment.name!;
                    input.type = "text";
                    input.style.position = "absolute";
                    input.style.left = currentX + "px";
                    const [height, width] = [15, 122];
                    input.style.height = height + "px";
                    input.style.width = width + "px";
                    input.style.top = currentY - height + "px";
                    (_a = canvasContainerRef.current) === null || _a === void 0 ? void 0 : _a.appendChild(input);
                    currentX += input.offsetWidth;
                }
            }
            setFont(`normal 12px sans-serif`);
        }
        return;
        for (let i = 0; i < data.length; i++) {
            let currentX = 0;
            let currentY = lineHeight * (i + 1);
            context === null || context === void 0 ? void 0 : context.moveTo(currentX, currentY);
            const line = data[i];
            context === null || context === void 0 ? void 0 : context.fillText(line.lineNumber, currentX, currentY);
            currentX += 20;
            context === null || context === void 0 ? void 0 : context.moveTo(currentX, currentY);
            currentX += getTextWidth(line.lineNumber);
            context === null || context === void 0 ? void 0 : context.fillText(line.titleNumber, currentX, currentY);
            currentX += getTextWidth(line.titleNumber);
            context === null || context === void 0 ? void 0 : context.fillText(line.title, currentX, currentY);
            currentX += getTextWidth(line.title);
            for (const segment of line.segments) {
                if (segment.type === SegmentType.TEXT) {
                    setFont(segment.style === TextStyle.BOLD
                        ? `bold 12px sans-serif`
                        : `normal 12px sans-serif`);
                    context === null || context === void 0 ? void 0 : context.fillText(segment.text, currentX, currentY);
                    currentX += getTextWidth(segment.text);
                }
                else if (segment.type === SegmentType.INPUT) {
                    const input = document.createElement("input");
                    input.oninput = handleChange;
                    input.value = inputData[segment.name];
                    input.name = segment.name;
                    input.type = "text";
                    input.style.position = "absolute";
                    input.style.left = currentX + "px";
                    const [height, width] = [15, 122];
                    input.style.height = height + "px";
                    input.style.width = width + "px";
                    input.style.top = currentY - height + "px";
                    (_b = canvasContainerRef.current) === null || _b === void 0 ? void 0 : _b.appendChild(input);
                    currentX += input.offsetWidth;
                }
            }
            setFont(`normal 12px sans-serif`);
        }
    }, []);
    console.log(inputData);
    return (react_1.default.createElement("div", { ref: canvasContainerRef, style: { position: "relative" } },
        react_1.default.createElement("canvas", { ref: contractRef })));
};
exports.default = Main;
