const fs = require("fs");
const { parse } = require("csv-parse");

async function parseData(data) {
  return new Promise((resolve, reject) => {
    parse(data, { columns: false, trim: true }, function (err, rows) {
      if (err) reject(err);
      resolve(
        rows.map((row) => ({
          name: row[0],
        }))
      );
    });
  });
}

async function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + "/interests.csv", async function (err, fileData) {
      if (err) reject(err);
      resolve(await parseData(fileData));
    });
  });
}
const main = async () => {
  await readFile();
};
main();
module.exports = async () => await readFile();
