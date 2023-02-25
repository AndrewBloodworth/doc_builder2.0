const PageID = "CP40-6-18.   COUNTERPROPOSAL    Page";

const excludes = (number) =>
  [
    [-Infinity, 107],
    [119, Infinity],
  ].some(([start, end]) => number >= start && number <= end);

module.exports = {
  excludes,
  PageID,
};
