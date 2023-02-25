import { SectionClass } from "../Section";

export type ComparatorFunction = {
  description: string;
  (nodeValue: Section): boolean;
};
export interface Data {
  line: LineContent;
  idx: number;
  number: string;
  title: string;
  depth: number;
}
export type DataFetchCallBack = {
  (data: Data): ParsableLine;
};

export interface DataInit extends DataFetchCallBack {
  (data: Data): void;
}

export interface DataInit2 extends DataFetchCallBack {
  (data: DataParsable): void;
}

export interface DataInit3 extends DataFetchCallBack {
  (data: DataParsable): SectionClass[];
}
export interface DataParsable2 {
  number: number;
  lines: LineContent[];
  title: string;
  depth: number;
}

export interface DataParsable {
  number: string;
  lines: LineContent[];
  title: string;
  depth: number;
}
export type ParsableDataCallBack = {
  (data: DataParsable): void;
};
export type LineGenerator = {
  (data: Data): ParsableLine;
};
export interface DataInitP extends ParsableDataCallBack {
  (data: Data): void;
}

export interface LineContent {
  number: string;
  data: Line;
}

export interface Parseable {
  count: number;
  content: LineContent[];
}

export interface LineInput {
  type: string;
  data: {
    [key: string]: string | boolean;
  };
  prefix?: number;
  suffix?: number;
  before?: string | number;
  replace?: number;
}

export interface ReformatInput {
  type: string;
  data: {
    [key: string]: string;
  };
  reformat: string;
}

export type IsReformat<R> = [R] extends ReformatInput ? true : false;

export interface CustomRule {
  custom: boolean;
  rules: string[];
}

export const custom_rules_generator = (): CustomRule => ({
  custom: false,
  rules: [],
});

export interface LineMatch {
  matches: boolean;
  line_number: string;
}

export type LineMatcher = (line: string) => LineMatch;

export interface SegmentStyle {
  type: string;
  data: {
    [key: string]: string;
  };
}

export interface Addressable {
  address: string[];
}

export interface SignatureField {
  label: string;
  draw?: boolean;
  imgSrc?: string;
  type: string;
  attribute: string;
  tag: string;
  value: string;
}
export interface SignatureFields {
  [key: string]: SignatureField;
}
export interface DefaultSignature {
  line: number;
  fields: SignatureFields;
}

export interface Settings {
  header_regexp: string;
  line_matcher: LineMatcher;
  component_location: {
    [index: number | string]: string;
  };
  default_signatures: {
    [index: number | string]: DefaultSignature;
  };
  input_location: {
    [index: number | string]: LineInput[] | ReformatInput;
  };
  row_styles: {
    [index: number | string]: string[];
  };
  segment_styles: {
    [index: number]: Addressable | LineInput[];
  };
  static_settings: {
    [index: number | string]: string[];
  };
}

export interface MainConfig {
  input_file_name: string;
  output_file_name: string;
  parse_config_file_name: string;
  writeToJson?: boolean;
  type?: "contract" | "deadline";
  showLineNumber?: boolean;
  showTrueLineNumber?: boolean;
  showText?: boolean;
  showRawText?: boolean;
  first?: number;
  buildToDatabase?: boolean;
  showComments?: boolean;
}

export interface LineObject {
  lineNumber: number | string;
  text: string;
  page: number;
  rules: string;
}

export interface ParsedLine {
  page: number;
  number: number;
  text: string;
  rules: string;
}

export interface ContractConfig {
  excludes: (number: number) => boolean;
  PageID: string;
  settings: Settings;
}

export interface TypeData {
  [index: string]: string;
}

export interface SequelizeContractData {
  [index: string]: string | SequelizeContract;
}

interface CObj {
  [index: string]: string;
}
export type CData = string | CObj[] | CObj;
export interface ContractData {
  id: string;
  [index: string]: CData;
}

export interface SequelizeContract {
  current: string | ContractData | SequelizeContractData;
}

export interface RowSegment {
  id: string | null;
  attribute: string;
  value: string;
  key: string;
  tag: string;
}

export interface ContractProp {
  id: string | null;
  attribute: string;
  value: string;
  key: string;
  tag: string;
}
export type ContractInput = string | ContractProp | ContractProp[];
export interface ContractInputs {
  [index: string]: ContractInput;
}

export interface Line {
  text: string;
  rules: string;
  row_styles: string[];
  segment_styles: string[] | LineInput[];
}
export interface SectionLines {
  [index: string]: Line;
}
export interface Sections {
  [index: string]: Section;
}
export interface Section {
  number: string;
  title: string;
  depth: number;
  lines: SectionLines;
  sections: Sections;
}

export interface Contract {
  component_location: {
    [index: string]: string;
  };
  signature_location: {
    [index: string]: string;
  };
  sections: Sections;
}

export interface ParsableLine {
  lineNumber: string;
  itemNumber?: number;
  item?: string;
  reference?: string;
  event?: string;
  titleNumber?: string;
  sectionTitle?: string;
  lineText?: string;
  lineStyles: string[];
  segmentStyles?: string[] | LineInput[];
  lineData?: any;
  lineSegments?: any[];
  lineDepth: number;
  amountLeft?: boolean;
  amountRight?: boolean;
  referenceInput?: boolean;
  itemInput?: boolean;
  hasDeadline?: boolean;
  hasPurchase?: boolean;
  hasSignature?: string | boolean;
  hasBrokersAcknowledgments?: boolean;
  isHeader?: boolean;
}
