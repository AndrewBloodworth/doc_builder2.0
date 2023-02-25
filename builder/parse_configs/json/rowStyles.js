var fs = require("fs");
const path = require("path");
const files = require("../index");
const main = (fileName, lineNumber, type, data) => {
  const { component_location, input_location, row_styles, segment_styles } =
    files[fileName.replace(".js", "")].settings;
  if (type === "input_location") {
    const reType = (value) => {
      if (Array.isArray(value)) {
        value.map((val) => {
          if (val.reformat) {
            const { reformat } = val;
            val.reformat = `types.${reformat}`;
          } else {
            const { type } = val;
            val.type = `types.${type}`;
          }
        });
      } else {
        if (value.reformat) {
          const { reformat } = value;
          value.reformat = `types.${reformat}`;
        } else {
          const { type } = value;
          value.type = `types.${type}`;
        }
      }
    };
    const { style, input_index, newInput } = data;
    const updates = Object.entries(input_location).map(([key, value]) => {
      if (lineNumber === key) {
        reType(style);
        return { [key]: style };
      } else {
        reType(value);
        return { [key]: value };
      }
    });
    if (newInput) {
      updates.splice(input_index, 0, {
        [lineNumber]: reType(style),
      });
    }

    fs.readFile(
      path.join(__dirname, `../${fileName}`),
      "utf8",
      function (err, data) {
        if (err) {
          return console.log(err);
        }
        const m = data.match(
          /input_location: ((?={)(.|\r\n|\r|\n)*}(?=(.|\r\n|\r|\n)*row_styles))/
        )[1];

        let string = JSON.stringify(
          updates.reduce((obj, val) => ({ ...obj, ...val }))
        ).replace(/\"([^(\")"]+)\":/g, "$1:");
        string = string.replace(/type:"/g, "type: ");
        string = string.replace(/",data:/g, " ,data:");
        string = string.replace(/reformat:"/g, "reformat: ");
        const result = data.replace(m, string);

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
  } else if (type === "segment_styles") {
    const obj = segment_styles;

    // const obj = data.match(
    //   /segment_styles.*((?<!})((.|\r\n|\r|\n)(?!}))*)/
    // )[1];
    // const arr = obj
    //   .split("\n")
    //   .filter((item) => item.includes(":"))
    //   .map((item) => {
    //     const [idx, val] = item.split(":");
    //     return {
    //       idx: Number(idx.trim()),
    //       value: val.replace(",", "").trim(),
    //     };
    //   });

    // let lastSeen;
    // obj.reduce((arr,val) => {

    //   return arr
    // },[])

    // const indexOfElement = arr.findIndex(({ idx, val }, i) => {
    //   if (idx < index) {
    //     lastSeen = i;
    //   }
    //   return idx === Number(index);
    // });
    obj[lineNumber] = data.style;

    const reType = (value) => {
      let retyped = "";
      if (Array.isArray(value)) {
        retyped = value.reduce((str, val) => {
          str += `types.${val},`;
          return str;
        }, "");
      } else {
        retyped = `types.${value}`;
      }
      return `[${retyped}]`;
    };
    const updates = Object.entries(obj)
      .sort((a, b) => a[0] - b[0])
      .reduce((o, [key, val]) => ({ ...o, [key]: reType(val) }), {});

    fs.readFile(
      path.join(__dirname, `../${fileName}`),
      "utf8",
      function (err, data) {
        if (err) {
          return console.log(err);
        }

        const m = data.match(
          /segment_styles: ((?={)(.|\r\n|\r|\n)*}(?=(.|\r\n|\r|\n)*static_settings))/
        )[1];
        let string = JSON.stringify(updates).replace(
          /\"([^(\")"]+)\":/g,
          "$1:"
        );
        string = string.replace(/"/g, "");
        const result = data.replace(m, `${string}`);

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
  }
};
// const m = data.match(
//   /row_styles: ((?={)(.|\r\n|\r|\n)*}(?=(.|\r\n|\r|\n)*segment_styles))/
// )[1];
module.exports = main;
