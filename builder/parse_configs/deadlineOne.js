const PageID = "CP40-6-18.   COUNTERPROPOSAL    Page";

const excludes = (number) =>
  [
    [-Infinity, 39],
    [68, 80],
    [105, Infinity],
  ].some(([start, end]) => number >= start && number <= end);

module.exports = {
  excludes,
  PageID,
};
