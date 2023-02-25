var fs = require("fs");
const path = require("path");
const main = (fileName, index, key, value) => {
  fs.readFile(
    path.join(__dirname, `../${fileName}`),
    "utf8",
    function (err, data) {
      if (err) {
        return console.log(err);
      }
      const obj = data.match(
        /segment_styles.*((?<!})((.|\r\n|\r|\n)(?!}))*)/
      )[1];
      const arr = obj
        .split("\n")
        .filter((item) => item.includes(":"))
        .map((item) => {
          const [idx, val] = item.split(":");
          return {
            idx: Number(idx.trim()),
            value: val.replace(",", "").trim(),
          };
        });

      let lastSeen;

      const indexOfElement = arr.findIndex(({ idx, val }, i) => {
        if (idx < index) {
          lastSeen = i;
        }
        return idx === Number(index);
      });
      if (indexOfElement === -1) {
        if (lastSeen === arr.length - 1) {
          arr.push({ idx: index, value: `[${value}]` });
        } else {
          arr.splice(lastSeen + 1, 0, { idx: index, value: `[${value}]` });
        }
      } else {
        arr.splice(indexOfElement, 1, { idx: index, value: `[${value}]` });
      }

      const string = arr
        .map(({ idx, value }, i) =>
          i === 0 ? `\n${idx}: ${value},` : `${idx}: ${value},`
        )
        .join("\n")
        .replace(/'/g, "");

      const result = data.replace(obj, `${string}`);

      fs.writeFile(
        path.join(__dirname, `../${fileName}`),
        result,
        "utf8",
        function (err) {
          if (err) return console.log(err);
        }
      );
    }
  );
};
module.exports = main;
