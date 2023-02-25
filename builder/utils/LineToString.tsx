const React = require("react");
const ReactDOMServer = require("react-dom/server");
// const crypto = require("crypto");
import crypto from "crypto";
import { RowStyles, SegmentStyles } from "../builder_types/enums";
// require("babel-register")({
//   presets: ["@babel/preset-react"],
// });
// const rowStyles = require("./rowStyles");
import rowStyles from "./rowStyles";

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
      }, {} as { [index: string]: string }),
  };
};
const getComplexRowStyles = (lineStyles: any[]) => {
  return lineStyles.reduce(
    (stylesObj, styleType) => ({
      ...stylesObj,
      [styleType]: rowStyles.complexStyles[styleType],
    }),
    {}
  );
};

const getRowStyles = (lineStyles: any[], lineNumber: number) => {
  return lineStyles.reduce(
    (stylesObj, styleType) => ({ ...stylesObj, ...rowStyles[styleType] }),
    { justifyContent: "between", alignItems: "center", paddingRight: 0 }
  );
};

const getSegmentStyles = (
  segmentStyles: any,
  key: any,
  segment: any,
  complexRowStyles: any,
  character_count = 0,
  word_count = 0,
  maxCharacters: any,
  isEnd: any
) => {
  let elements: any = [];
  let additionalStyles = {};
  let TYPE = "p";
  const getStrongStyle = () => {
    if (complexRowStyles[RowStyles.FORCE_FULL_WIDTH]) {
      return {
        justifyContent: "space-between",
        display: "flex",
        width: "100%",
      };
    } else {
      return {};
    }
  };
  const wrapAllWords = (words: string) =>
    Array.isArray(words)
      ? words.map((word, idx) => <span key={`${word}-${idx}`}>{word}</span>)
      : words
          .split(" ")
          .filter((word) => word)
          .map((word, idx) => <span key={`${word}-${idx}`}>{word}</span>);

  const wrapAllWordsStrong = (words: string) =>
    Array.isArray(words)
      ? words.map((word, idx) => (
          <strong key={`strong-${word}-${idx}`}>{word}</strong>
        ))
      : words
          .split(" ")
          .filter((word) => word)
          .map((word, idx) => (
            <strong key={`strong-${word}-${idx}`}>{word}</strong>
          ));

  if (segmentStyles.length) {
    segmentStyles.forEach((style: string) => {
      const { key } = parseType(style);
      switch (key) {
        case SegmentStyles.PATTERN__REPLACE: {
          const { data } = parseType(style);

          const ranges: any = [];
          const findPattern = (() => {
            let start = 0;
            return (isPattern: boolean, idx: number, word: string) => {
              if (isPattern) {
                ranges.push(
                  <React.Fragment key={`${idx}${word}`}>
                    {wrapAllWords(segment.slice(start, idx))}
                  </React.Fragment>
                );

                const phrase = word.split("_");
                if (phrase[phrase.length - 1] === "!") {
                  start = i + 1;
                } else if (phrase[phrase.length - 1] === "%end%") {
                  start = i + phrase.length - 1;
                } else {
                  start = i + phrase.length;
                }

                if (phrase.length === 1 || phrase[phrase.length - 1] === "!") {
                  ranges.push(
                    <strong
                      key={`${idx}${word}`}
                      style={{
                        whiteSpace: "nowrap",
                        marginBottom: 0,
                      }}
                    >
                      <React.Fragment key={`${idx}${word}`}>
                        {segment[idx]}
                      </React.Fragment>
                    </strong>
                  );
                } else if (
                  phrase[phrase.length - 1] === "%end%" &&
                  phrase.slice(0, phrase.length - 1).join(" ") ===
                    segment.slice(idx, idx + phrase.length - 1).join(" ")
                ) {
                  ranges.push(
                    <strong
                      key={`${idx}${word}`}
                      style={{
                        whiteSpace: "nowrap",
                        marginBottom: 0,
                      }}
                    >
                      <React.Fragment key={`${idx}${word}`}>
                        {segment.slice(idx, idx + phrase.length - 1).join(" ")}
                      </React.Fragment>
                    </strong>
                  );
                } else if (
                  phrase.join(" ") ===
                  segment.slice(idx, idx + phrase.length).join(" ")
                ) {
                  ranges.push(
                    <strong
                      key={`${idx}${word}`}
                      style={{
                        whiteSpace: "nowrap",
                        marginBottom: 0,
                      }}
                    >
                      <React.Fragment key={`${idx}${word}`}>
                        {segment.slice(idx, idx + phrase.length).join(" ")}
                      </React.Fragment>
                    </strong>
                  );
                }
              } else if (idx === segment.length - 1) {
                ranges.push(
                  <React.Fragment key={`${idx}${word}`}>
                    {wrapAllWords(segment.slice(start))}
                  </React.Fragment>
                );
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
              if (
                phrase.length > 1 &&
                phrase.every((w, wIdx, { length }) => {
                  if (segment.length > i + wIdx) {
                    return wIdx === length - 1 && w === "!"
                      ? true
                      : w === segment[i + wIdx];
                  } else if (wIdx === length - 1 && w === "%end%") {
                    return true;
                  } else {
                    return false;
                  }
                })
              ) {
                findPattern(true, i, patterns[j]);

                if (phrase[phrase.length - 1] === "!") {
                  i++;
                } else if (phrase[phrase.length - 1] === "%end%") {
                  i += phrase.length - 1;
                } else {
                  i += phrase.length;
                }
                foundPattern = true;
                continue loop;
              } else if (patterns[j] === word) {
                findPattern(true, i, patterns[j]);
                i++;
                foundPattern = true;
                continue loop;
              } else {
                if (
                  i === segment.length - 1 &&
                  j === patterns.length - 1 &&
                  !foundPattern
                ) {
                  findPattern(false, i, "");
                  break loop;
                }
              }
            }
            i++;
          }
          elements.push(
            ReactDOMServer.renderToString(
              <React.Fragment key={`${segment.join(" ")}`}>
                {ranges}
              </React.Fragment>
            )
          );
          break;
        }

        case SegmentStyles.BOLD__ALL: {
          elements.push(
            ReactDOMServer.renderToString(
              <React.Fragment key={`${segment.join(" ")}`}>
                {wrapAllWordsStrong(segment.join(" "))}
              </React.Fragment>
            )
          );

          break;
        }
      }
    });
    elements.join("");
  } else {
    elements = ReactDOMServer.renderToString(
      <React.Fragment key={key}>{wrapAllWords(segment)}</React.Fragment>
    );
  }
  if (complexRowStyles[RowStyles.FORCE_FULL_WIDTH]) {
    additionalStyles = {
      ...additionalStyles,
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    };
  }
  if (complexRowStyles[RowStyles.CENTERED]) {
    additionalStyles = {
      ...additionalStyles,
      justifyContent: "center",
      flexGrow: 0,
    };
  }
  if (complexRowStyles[RowStyles.ALIGNED__RIGHT]) {
    additionalStyles = {
      ...additionalStyles,
      flexGrow: 0,
    };
  }
  if (complexRowStyles[RowStyles.ALIGNED__LEFT]) {
    additionalStyles = {
      ...additionalStyles,
      flexGrow: 0,
    };
  }
  if (complexRowStyles[RowStyles.INNER_BORDER]) {
    additionalStyles = {
      ...additionalStyles,
      border: "1px solid black",
      padding: 3,
    };
  }
  if (complexRowStyles[RowStyles.INVISIBLE]) {
    elements = "";
  }

  // console.log("CW", lineRef.current);
  return TYPE === "p" ? (
    <p
      key={`segment-${key}-${Math.random() * 1000 * Math.random()}`}
      className="line-thing"
      style={{
        whiteSpace: "nowrap",
        marginBottom: 0,
        flexGrow: word_count === 1 ? 0 : 1,
        flexShrink: 3,
        // letterSpacing: 1,
        display: "flex",
        justifyContent: isEnd
          ? character_count > maxCharacters
            ? "space-between"
            : "flex-start"
          : "space-between",

        // columnGap: "1px",
        //word_count >= lineCutOff ? "space-between" : "flex-start",
        // overflow: "hidden",
        // wordSpacing: 1,
        //`calc(0.01vw * ${word_count})`,
        // width: "fit-content",
        ...additionalStyles,
      }}
      dangerouslySetInnerHTML={{ __html: elements }}
    ></p>
  ) : (
    <React.Fragment key={key}>
      {elements}
      <div style={{ flexShrink: 1, flexGrow: 1 }}></div>
    </React.Fragment>
  );
};

export default ({ line, segments, maxCharacters }: any) => {
  const { lineNumber, lineStyles, segmentStyles } = line;
  const newSegments = segments.map((segment: any, index: number) => {
    if (Array.isArray(segment)) {
      return ReactDOMServer.renderToString(
        getSegmentStyles(
          segmentStyles,
          `${lineNumber}-${index}`,
          segment,
          getComplexRowStyles(lineStyles),
          segment.join(" ").length,
          segment.length,
          maxCharacters,
          index === segments.length - 1
        )
      );
    } else if (typeof segment === "string") {
      return segment;
    }
  });
  return newSegments.join("|");
};
