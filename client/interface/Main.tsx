/* eslint-disable no-unused-vars */
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { ParsableLine } from "../../builder/builder_types/types";
// import Routes from "../routes/Routes";
function createHiPPICanvas(
  canvas: HTMLCanvasElement,
  width: number,
  height: number
) {
  const ratio = window.devicePixelRatio;

  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  canvas.getContext("2d")?.scale(ratio, ratio);

  return canvas;
}
enum SegmentType {
  TEXT = "TEXT",
  INPUT = "INPUT",
}
enum TextStyle {
  NORMAL = "NORMAL",
  BOLD = "BOLD",
}
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
const linesData: ParsableLine[] = require("../../lines.json");
const Main = () => {
  const [inputData, setInputData] = useState<{ [index: string]: string }>({
    one: "default",
    two: "",
  });

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;

    setInputData((current) => {
      return {
        ...current,
        [target.name]: target.value,
      };
    });
  };
  const contractRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const lineHeight = 30;

    const canvas = createHiPPICanvas(
      contractRef.current!,
      window.innerWidth,
      linesData.length * lineHeight
    );
    const context = canvas.getContext("2d");
    const setFont = (font: string) => {
      if (context?.font) {
        context.font = font;
      }
    };

    ("10px sans-serif");

    setFont(`normal 12px sans-serif`);

    const getTextWidth = (text: string) => context?.measureText(text).width!;

    for (let i = 0; i < linesData.length; i++) {
      let currentX = 0;
      let currentY = lineHeight * (i + 1);
      context?.moveTo(currentX, currentY);

      const line = linesData[i];
      // const line = data[i];

      context?.fillText(line.lineNumber, currentX, currentY);

      currentX += 20;
      context?.moveTo(currentX, currentY);
      currentX += getTextWidth(line.lineNumber);
      context?.fillText(line.titleNumber!, currentX, currentY);
      currentX += getTextWidth(line.titleNumber!);
      context?.fillText(line.sectionTitle!, currentX, currentY);
      currentX += getTextWidth(line.sectionTitle!);
      for (const segment of line.lineData.segments!) {
        if (Array.isArray(segment)) {
          // setFont(
          //   segment.style === TextStyle.BOLD
          //     ? `bold 12px sans-serif`
          //     : `normal 12px sans-serif`
          // );

          const text = segment.join(" ");
          context?.fillText(text, currentX, currentY);
          currentX += getTextWidth(text);
        } else if (typeof segment === "string") {
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
          canvasContainerRef.current?.appendChild(input);

          currentX += input.offsetWidth;
        }
      }
      setFont(`normal 12px sans-serif`);
    }

    return;
    for (let i = 0; i < data.length; i++) {
      let currentX = 0;
      let currentY = lineHeight * (i + 1);
      context?.moveTo(currentX, currentY);
      const line = data[i];

      context?.fillText(line.lineNumber, currentX, currentY);

      currentX += 20;
      context?.moveTo(currentX, currentY);
      currentX += getTextWidth(line.lineNumber);
      context?.fillText(line.titleNumber, currentX, currentY);
      currentX += getTextWidth(line.titleNumber);
      context?.fillText(line.title, currentX, currentY);
      currentX += getTextWidth(line.title);
      for (const segment of line.segments!) {
        if (segment.type === SegmentType.TEXT) {
          setFont(
            segment.style === TextStyle.BOLD
              ? `bold 12px sans-serif`
              : `normal 12px sans-serif`
          );

          context?.fillText(segment.text!, currentX, currentY);
          currentX += getTextWidth(segment.text!);
        } else if (segment.type === SegmentType.INPUT) {
          const input = document.createElement("input");

          input.oninput = handleChange;
          input.value = inputData[segment.name!];
          input.name = segment.name!;
          input.type = "text";
          input.style.position = "absolute";
          input.style.left = currentX + "px";
          const [height, width] = [15, 122];

          input.style.height = height + "px";
          input.style.width = width + "px";
          input.style.top = currentY - height + "px";
          canvasContainerRef.current?.appendChild(input);

          currentX += input.offsetWidth;
        }
      }
      setFont(`normal 12px sans-serif`);
    }
  }, []);
  console.log(inputData);
  return (
    <div ref={canvasContainerRef} style={{ position: "relative" }}>
      <canvas ref={contractRef}></canvas>
    </div>
  );
};

export default Main;
