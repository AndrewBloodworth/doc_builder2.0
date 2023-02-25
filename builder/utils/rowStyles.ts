import { RowStyles } from "../builder_types/enums";

export default {
  [RowStyles.CENTERED]: {
    justifyContent: "center",
    width: "100%",
  },
  [RowStyles.ALIGNED__TOP]: {
    alignItems: "start",
  },
  [RowStyles.ALIGNED__RIGHT]: {
    justifyContent: "flex-end",
    width: "100%",
  },
  [RowStyles.ALIGNED__LEFT]: {
    justifyContent: "flex-start",
  },
  [RowStyles.FONT__SIZE__LARGE]: {
    fontSize: "1.2vw",
  },
  [RowStyles.FONT__SIZE__LARGE__XL]: {
    fontSize: "2vw",
  },
  [RowStyles.ZERO__PADDING__LEFT]: {
    paddingLeft: 0,
  },
  [RowStyles.ZERO__PADDING__RIGHT]: {
    paddingRight: 0,
  },
  [RowStyles.BORDER__TOP]: {
    borderTop: "1px solid black",
  },
  [RowStyles.BORDER__BOTTOM]: {
    borderBottom: "1px solid black",
  },
  [RowStyles.BORDER__LEFT]: {
    borderLeft: "1px solid black",
  },
  [RowStyles.BORDER__RIGHT]: {
    borderRight: "1px solid black",
  },
  [RowStyles.FIT_WIDTH]: {
    width: "fit-content",
  },
  [RowStyles.LINE__HEIGHT__LG]: {
    height: 60,
  },
  complexStyles: {
    // Turn all words into span elements
    [RowStyles.ALIGNED__LEFT]: true,
    [RowStyles.ALIGNED__RIGHT]: true,
    [RowStyles.CENTERED]: true,
    [RowStyles.FORCE_FULL_WIDTH]: true,
    [RowStyles.INNER_BORDER]: true,
    [RowStyles.INVISIBLE]: true,
  },
} as any;
