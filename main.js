if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: require("path").join(__dirname, ".env") });
}
const app = require("./dist/server");
const seed = require("./dist/server/scripts/seed");
const schedule = require("node-schedule");
const axios = require("axios");
const db = require("./dist/server/db").default.db;
const PORT = process.env.PORT || 8080;
const init = async () => {
  try {
    if (process.env.SEED === "TRUE") {
      await seed();
    } else {
      await db.sync();
    }

    app.listen(PORT, () => console.log(`Serving on port ${PORT}`));
  } catch (ex) {
    console.log("Err", ex);
    // console.log(ex);
  }
};

init();
