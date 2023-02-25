const { Client } = require("pg");
const axios = require("axios");
require("dotenv").config();

const facebookAPI = process.env.FACEBOOK_API;
const facebookAccessToken = process.env.FACEBOOK_ACCESS_TOKEN;

const client = new Client({
  user: process.env.DATABASE_USER_NAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

const facebookCall = async (interest) => {
  try {
    const {
      data: { data: response },
    } = await axios.get(`${facebookAPI}['${interest}']${facebookAccessToken}`);

    //https://graph.facebook.com/v14.0/search?type=adinterestvalid&interest_list=['interest']&access_token=EAAHTJV9gddUBAKZBuMVsBQ5sVBjx3qqrvOPXxlUJ1PNZB79WPDLxpSU2ByZBGaTQxoWjzQpIXzQT9n0qTep5WrW2ZCrtlsWotxGXiPWGioKDRPMGZB1lZAjT4qZAV9qfZAE4XahyNX7buPQQTDu8NWK768FhZCMzRcLayHzej7uKvPR3rV1lxh04ZB4Ttpb0SFrTUZD
    return response[0].audience_size;
  } catch (error) {
    console.error(error);
  }
};

const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected Successfully");
    await client.query("BEGIN");
    const { rows: allInterests } = await client.query(
      "select * from interests"
    );
    const nullAudienceInterests = allInterests.filter(
      (interest) => interest.audience === null
    );
    for (const interestItem of nullAudienceInterests) {
      let audienceSize = await facebookCall(interestItem.name);
      console.log(interestItem.name);
      console.log(!!audienceSize);
      if (!audienceSize) audienceSize = null;
      await client.query(
        `update interests set audience = ${audienceSize} WHERE id = '${interestItem.id}'`
      );
    }
    await client.query("COMMIT");
  } catch (error) {
    console.error(`Something wrong happened here. ${error}`);
    await client.query("ROLLBACK");
  } finally {
    await client.end();
    console.log("Client disconnected successfully");
  }
};

module.exports = connectDB;
