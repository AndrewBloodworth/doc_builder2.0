declare function require(name: string): any;
declare var __dirname: string;
import { SectionClass } from "../Section/";
import {
  Section,
  Data,
  ParsableDataCallBack,
  DataFetchCallBack,
  LineGenerator,
  LineContent,
  Sections,
  ParsableLine,
  TypeData,
  SequelizeContract,
  ContractInput,
  ContractInputs,
  ContractProp,
  ContractData,
} from "../builder_types/types";
import { Inputs } from "../builder_types/enums";
export default class MainClass {
  name: string;
  sections: SectionClass[];
  lines: ParsableLine[];
  inputs: ContractInputs;
  buffer_length: number;
  constructor(name: string) {
    this.name = name;
    this.sections = [];
    this.lines = [];
    this.inputs = {};
    this.buffer_length = 100;
  }

  init(json: Sections, fetch: DataFetchCallBack) {
    const ln_data: ParsableLine[] = [];
    this.sections = this.jsonToSections(json);
    this.sections.reduce((sections, section) => {
      const ln_gen: LineGenerator = (ln) => fetch(ln);
      const cb: ParsableDataCallBack = (p_data) => {
        p_data.lines.forEach((line: LineContent, idx: number) => {
          ln_data.push(
            ln_gen({
              line: line,
              idx: idx,
              number: p_data.number,
              title: p_data.title,
              depth: p_data.depth,
            })
          );
        });
      };
      section.traverse(cb);
      return sections;
    }, [] as SectionClass[]);
    this.lines = ln_data;
  }
  jsonToSections(json: Sections) {
    const sections: SectionClass[] = [];
    for (const key of Object.keys(json)) {
      sections.push(this.createSection(json[key]));
    }
    return sections;
  }
  createSection(current: Section) {
    const section = new SectionClass(
      current.number,
      current.title,
      current.depth
    );
    Object.keys(current.lines).forEach((number) => {
      section.insertLine(number, current.lines[number]);
    });
    Object.keys(current.sections).forEach((key) => {
      section.insertSection(this.createSection(current.sections[key]));
    });
    return section;
  }
  getBufferLengths(count: number) {
    Math.floor(this.lines.length / 100) + (this.lines.length % 100) === 0
      ? 0
      : 1;
    const full_groups = Math.floor(this.lines.length / 100);
    const end_group = this.lines.length % 100;
    const buffer_lengths = [
      ...Array(full_groups)
        .fill("")
        .map((_, i) => (i + 1) * 100),
      end_group ? full_groups * 100 + end_group : full_groups * 100,
    ];
    // console.log(this.lines.length);
    return buffer_lengths[count];
  }
  initLines() {
    // const thi = [
    //   0,
    //   ...Array(sec)
    //     .fill("")
    //     .map((_, i) => (i + 1) * 100),
    //   oth ? sec * 100 + oth : 0,
    // ];
    // const newLines = [];
    // for (let i = 1; i < thi.length; i++) {
    //   newLines.push(lines.slice(thi[i - 1], thi[i]));
    // }
  }
  initInputs(contract: any, component_lines: ParsableLine[][]) {
    const map_lengths = [
      this.lines.length,
      ...component_lines.map(({ length }) => length),
    ].reduce((cur: number[], length, i) => {
      if (i === 0) return [length];
      const newNum = cur[i - 1] + length;
      return [...cur, newNum];
    }, []);

    const lines = component_lines.length
      ? [...this.lines, ...component_lines.flatMap((lines) => lines)]
      : this.lines;

    const prefix = (() => {
      let component_count = 0;
      const component_names = [
        "",
        "brokers_acknowlegements_",
        "deadlines_",
        "purchase_price_",
      ];

      return (index: number) => {
        if (index < map_lengths[component_count]) {
          return component_names[component_count];
        } else {
          component_count++;
          return component_names[component_count];
        }
      };
    })();

    lines.forEach(({ lineText: lt, lineNumber }, index) => {
      let idx = 0;
      lt?.split(" ").map((lineText) => {
        this.getRowSegments(lineText).map((segment) => {
          if (typeof segment === "string") {
            const { key: typeKey, data } = this.parseType(segment);
            if (typeKey === Inputs.RADIO) {
              this.inputs[data.name] = "";
              idx++;
            } else {
              this.inputs[`${prefix(index)}${lineNumber}-${idx++}`] = data.auto
                ? data.auto.split(".").reduce((cur, key, i, keys) => {
                    if (key.substring(0, 1) === "[") {
                      const attribute = key.substring(1, key.length - 1);
                      const inputs: ContractProp[] = cur.map((obj: any) => ({
                        id: obj.id,
                        attribute,
                        value: obj[attribute],
                        key: data.key,
                        tag: data.auto,
                      }));
                      return inputs.length
                        ? inputs
                        : [
                            {
                              id: null,
                              attribute,
                              value: "",
                              key: data.key,
                              tag: data.auto,
                            },
                          ];
                    }

                    if (i === keys.length - 2) {
                      if (typeof cur[key] === "object") {
                        const lastKey = keys[keys.length - 1];
                        if (
                          cur[key] !== null &&
                          typeof cur[key][lastKey] === "string"
                        ) {
                          const prop: ContractProp = {
                            id: cur.id,
                            attribute: lastKey,
                            value: cur[key][lastKey],
                            key: data.key,
                            tag: data.auto,
                          };
                          return prop;
                        } else if (cur[key] === null) {
                          const prop: ContractProp = {
                            id: null,
                            attribute: lastKey,
                            value: "",
                            key: data.key,
                            tag: data.auto,
                          };
                          return prop;
                        }
                      }
                    }
                    if (
                      i === keys.length - 1 &&
                      typeof cur === "object" &&
                      cur.attribute === key
                    ) {
                      return cur;
                    }

                    return typeof cur === "object" && cur[key]
                      ? cur[key]
                      : i === keys.length - 1
                      ? ""
                      : {};
                  }, contract)
                : "";
            }
          }
        });
      });
    });
    return this.inputs;
  }
  getRowSegments(lineText: string) {
    let segment: any[] = [];
    const rowSegments: any[] = [];
    const addSegment = () => {
      if (segment.length) {
        rowSegments.push(segment);
      }
    };
    lineText.split(" ").forEach((word) => {
      if (this.isInput(word) || this.isTextArea(word) || this.isAddress(word)) {
        addSegment();
        rowSegments.push(word);
        segment = [];
      } else {
        if (word !== "") {
          segment.push(word);
        }
      }
    });
    addSegment();
    return rowSegments;
  }
  isInput(word: string) {
    word = word.replace(/[\.,:\?!-]/, "");
    return [
      Inputs.TEXT__BOX__SMALL,
      Inputs.TEXT__BOX__LARGE,
      Inputs.TEXT__BOX__MEDIUM,
      Inputs.DATE__BOX,
      Inputs.NUMBER_INPUT,
      Inputs.CHECKBOX,
      Inputs.FLOATING_CHECKBOX,
      Inputs.RADIO,
    ].some((type) => type === this.parseType(word).key);
  }
  isTextArea(word: string) {
    return [
      Inputs.FULL__LENGTH__PARAGRAPH__2,
      Inputs.FULL__LENGTH__PARAGRAPH__3,
      Inputs.FULL__LENGTH__PARAGRAPH__7,
      Inputs.FULL__LENGTH__PARAGRAPH__5,
      Inputs.FULL__LENGTH__PARAGRAPH__4,
      Inputs.FULL__LENGTH__PARAGRAPH__10,
    ].some((type) => type === this.parseType(word).key);
  }

  isAddress(word: string) {
    return [Inputs.ADDRESS_BLOCK].some(
      (type: string) => type === this.parseType(word).key
    );
  }
  parseType(type: string) {
    const idx = type.indexOf("{");
    const typeData: TypeData = type
      .substring(idx + 1, type.length - 1)
      .split("%20")
      .reduce((obj: TypeData, keyPair) => {
        const [key, value] = keyPair.split("=");
        obj[key] = value;
        return obj;
      }, {});
    return {
      key: idx === -1 ? type : type.substring(0, idx),
      data: typeData,
    };
  }
  inputSettings(word: string) {
    switch (this.parseType(word).key) {
      case Inputs.TEXT__BOX__LARGE:
        return {
          type: "text",
          styles: {
            width: "100%",
            color: "#4650dd",
            borderRadius: "0.6vw",
          },
        };
      case Inputs.TEXT__BOX__MEDIUM:
        return {
          type: "text",
          styles: {
            width: "100%",
            color: "#4650dd",
            borderRadius: "0.6vw",
          },
        };
      case Inputs.TEXT__BOX__SMALL:
        return {
          type: "text",
          styles: {
            width: "100%",
            color: "#4650dd",
            borderRadius: "0.6vw",
          },
        };
      case Inputs.FULL__LENGTH__PARAGRAPH__2:
        return {
          type: "textarea",
          styles: {
            width: "100%",
            height: "100%",
            color: "#4650dd",
            borderRadius: "0.6vw",
          },
        };
      case Inputs.FULL__LENGTH__PARAGRAPH__3:
        return {
          type: "textarea",
          styles: {
            width: "100%",
            height: "100%",
            color: "#4650dd",
            borderRadius: "0.6vw",
          },
        };
      case Inputs.FULL__LENGTH__PARAGRAPH__4:
        return {
          type: "textarea",
          styles: {
            width: "100%",
            height: "100%",
            color: "#4650dd",
            borderRadius: "0.6vw",
          },
        };
      case Inputs.FULL__LENGTH__PARAGRAPH__5:
        return {
          type: "textarea",
          styles: {
            width: "100%",
            height: "100%",
            color: "#4650dd",
            borderRadius: "0.6vw",
          },
        };
      case Inputs.FULL__LENGTH__PARAGRAPH__7:
        return {
          type: "textarea",
          styles: {
            width: "100%",
            height: "100%",
            color: "#4650dd",
            borderRadius: "0.6vw",
          },
        };
      case Inputs.FULL__LENGTH__PARAGRAPH__10:
        return {
          type: "textarea",
          styles: {
            width: "100%",
            height: "100%",
            color: "#4650dd",
            borderRadius: "0.6vw",
          },
        };
      case Inputs.CHECKBOX:
        return {
          type: "checkbox",
          styles: {
            height: "1.4vw",
            width: "1.4vw",
            margin: 0,
            cursor: "pointer",
          },
        };
      case Inputs.FLOATING_CHECKBOX:
        return {
          type: "checkbox",
          styles: {
            height: "1.4vw",
            width: "1.4vw",
            position: "absolute",
            bottom: "0.3vw",
            left: "5vw",
            margin: 0,
            cursor: "pointer",
          },
        };

      case Inputs.RADIO:
        return {
          type: "radio",
          styles: {
            height: "1.4vw",
            width: "1.4vw",
            margin: 0,
            cursor: "pointer",
          },
        };
      case Inputs.DATE__BOX:
        return {
          type: "date",
          styles: { borderRadius: "0.6vw" },
        };
      case Inputs.NUMBER_INPUT:
        return {
          type: "number",
          styles: {
            width: "100%",
            color: "#4650dd",
            borderRadius: "0.6vw",
          },
        };
      case Inputs.ADDRESS_BLOCK:
        return {
          type: "text",
          styles: {
            width: "100%",
            color: "#4650dd",
            borderRadius: "0.6vw",
          },
        };
      default:
        return { type: "text", styles: {} };
    }
  }
  setInput(id: string, value: string, isArray: boolean, isProp: boolean) {
    if (isArray) {
      const parts = id.split("-");
      const [i, d] = parts;
      let props = this.inputs[`${i}-${d}`];
      if (Array.isArray(props)) {
        let last = Number(parts[2]);
        props[last] = { ...props[last], value };
      }
      this.inputs[`${i}-${d}`] = props;
    } else {
      let input = this.inputs[id];
      if (isProp && !Array.isArray(input) && typeof input !== "string") {
        this.inputs[id] = { ...input, value };
      } else {
        this.inputs[id] = value;
      }
    }
  }
  setNewProp(id: string, prop: ContractProp) {
    const [first, second, third] = id.split("-");
    const props = this.inputs[`${first}-${second}`];
    if (Array.isArray(props)) {
      this.inputs[`${first}-${second}`] = [...props, prop];
    }
  }
  getInput(id: string, segment: string) {
    const { type, styles } = this.inputSettings(segment);
    const parseType = this.parseType(segment);
    return {
      id,
      placeholder:
        parseType.data.placeholder &&
        parseType.data.placeholder.split("_").join(" "),
      type,
      data: parseType.data,
      typeKey: parseType.key,
      style: styles,
      isArray: Array.isArray(this.inputs[id]),
      isProp: typeof this.inputs[id] === "object",
      value:
        parseType.key === Inputs.RADIO
          ? this.inputs[parseType.data.name]
          : this.inputs[id],
      inputType: this.isInput(segment)
        ? "input"
        : this.isTextArea(segment)
        ? "textarea"
        : "none",
    };
  }
  // search(lineNumber) {
  //   return this.lines[Number(lineNumber) - 1];
  // }
}
