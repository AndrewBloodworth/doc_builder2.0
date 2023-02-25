import database from "../db";

import fs from "fs";
import path from "path";
const db = database.db;
const Op = database.Op;
const {
  User,
  Contract,
  Property,
  PurchasePrice,
  Deadline,
  SignableLink,
  Signer,
  Space,
  Template,
  Token,
  Unlocked,
  BrokerAcknowledgment,
} = database.models;

import contractClass from "../../builder/data_fetchers/contract";
import deadlineClass from "../../builder/data_fetchers/deadline";
import purchasePriceClass from "../../builder/data_fetchers/purchase_price_and_terms";
import brokersAcknowledgmentClass from "../../builder/data_fetchers/brokers_acknowledgments";
import { contract_includer } from "../api/utils/inclusions";
import { SpacePropertyType } from "../types";
import { Settings } from "../../builder/builder_types/types";
const main = async () => {
  await db.sync({ force: true });
  // const contract_name = "co_cbs_residential_2022";
  // const contract_json = require(path.join(
  //   __dirname,
  //   `../../builder/contract_json/${contract_name}.json`
  // ));

  // const { default_signatures } =
  //   require(`../../builder/parse_configs/${contract_name}.js`).settings;

  // const contract = new contractClass(contract_name);
  // contract.getData(contract_json);
  // // console.log(contract.sections);
  // // delete contract.sections;

  // fs.writeFileSync(
  //   path.join(__dirname, "..", "..", "..", "lines.json"),
  //   JSON.stringify(JSON.parse(Contract.pack(contract.lines).lines), null, 2)
  // );
  // let c = await Contract.create({
  //   name: contract_name,
  //   ...{ ...Contract.pack(contract.lines) },
  //   inputs: {},
  //   sections: contract.sections,
  // });

  require("dotenv").config({ path: `${__dirname}/../.env` });

  const {
    users_data,
    spaces_data,
    property_data,
    templates_data,
  } = require("./seed_data");

  const [user1, user2, user3, user4] = await User.bulkCreate(users_data, {
    returning: true,
  });
  const [private_space_one, private_space_two, shared_space] =
    await Space.bulkCreate(spaces_data, {
      returning: true,
    });
  const [property1] = await Property.bulkCreate(property_data, {
    returning: true,
  });

  const [tmp1, tmp2] = await Template.bulkCreate(templates_data, {
    returning: true,
  });

  const contract_name = "co_cbs_residential_2022";
  const contract_json = require(path.join(
    __dirname,
    `../../ts/contract_json/${contract_name}.json`
  ));

  const { default_signatures }: Settings =
    require(`../../ts/parse_configs/${contract_name}.js`).settings;

  const contract = new contractClass(contract_name);
  contract.getData(contract_json);

  let c = await Contract.create(
    {
      name: contract_name,
      ...{ ...Contract.pack(contract.lines) },
      inputs: {},
      sections: contract.sections,
    },
    contract_includer
  );

  await Signer.create({
    type: SpacePropertyType.SELLERS_AGENT_KEY,
    contractId: c.id,
    fields: default_signatures[SpacePropertyType.SELLERS_AGENT_KEY].fields,
  });
  await Signer.create({
    type: SpacePropertyType.BUYER_KEY,
    contractId: c.id,
    buyerId: user4.id,
    fields: Signer.updateFields({
      attribute: "fullName",
      fields: default_signatures[SpacePropertyType.BUYER_KEY].fields,
      payload: { value: user4.fullName },
    }),
  });
  await Signer.create({
    type: SpacePropertyType.SELLER_KEY,
    contractId: c.id,
    sellerId: user3.id,
    fields: Signer.updateFields({
      attribute: "fullName",
      fields: default_signatures[SpacePropertyType.SELLER_KEY].fields,
      payload: { value: user3.fullName },
    }),
  });
  await Signer.create({
    type: SpacePropertyType.BUYERS_AGENT_KEY,
    contractId: c.id,
    fields: default_signatures[SpacePropertyType.BUYERS_AGENT_KEY].fields,
  });

  const deadline_name = "co_cbs_residential_deadline_2022";
  const deadline_json = require(path.join(
    __dirname,
    `../../ts/contract_json/${deadline_name}.json`
  ));

  const deadline = new deadlineClass(deadline_name);
  deadline.getData(deadline_json);
  //delete deadline.sections;

  const d = await Deadline.create({
    name: deadline_name,
    content: deadline,
    inputs: {},
  });

  await c.setDeadline(d);

  const purchase_price_name =
    "co_cbs_residential_purchase_price_and_terms_2022";
  const purchase_price_json = require(path.join(
    __dirname,
    `../../ts/contract_json/${purchase_price_name}.json`
  ));

  const purchase_price = new purchasePriceClass(purchase_price_name);
  purchase_price.getData(purchase_price_json);
  //delete purchase_price.sections;

  const p = await PurchasePrice.create({
    name: purchase_price_name,
    content: purchase_price,
    inputs: {},
  });

  // console.log(c.__proto__);
  await c.setPurchaseprice(p);

  const broker_acknowledgments_name =
    "co_cbs_residential_brokers_acknowledgments_2022";
  const broker_acknowledgments_json = require(path.join(
    __dirname,
    `../../ts/contract_json/${broker_acknowledgments_name}.json`
  ));

  const broker_acknowledgment = new brokersAcknowledgmentClass(
    broker_acknowledgments_name
  );
  broker_acknowledgment.getData(broker_acknowledgments_json);
  //delete broker_acknowledgment.sections;

  console.log(broker_acknowledgment.lines);
  const bA = await BrokerAcknowledgment.create({
    name: broker_acknowledgments_name,
    ...{ ...Contract.pack(broker_acknowledgment.lines) },
  });

  // console.log(c.__proto__);
  await c.setBrokeracknowledgment(bA);
  await c.setOwner(user1);

  // await c.addBuyersAgent(user1);
  // await c.addSellersAgent(user2);
  // await c.addSeller(user3);
  //await c.addBuyer(user4);
  await user1.addPrivateSpace(private_space_one);
  await private_space_one.addBuyersAgent(user1);
  await private_space_one.addBuyer(user4);
  await shared_space.addBuyersAgent(user1);
  await shared_space.addBuyer(user4);

  // console.log(user2.__proto__);
  await user2.addPrivateSpace(private_space_two);
  await private_space_two.addSellersAgent(user2);
  await private_space_two.addSeller(user3);
  await shared_space.addSellersAgent(user2);
  await shared_space.addSeller(user3);

  //await space1.setProperty(property1);
  //await space1.addBuyer(user4);
  await private_space_one.addPrivateContract(c);

  await private_space_one.addSharedSpace(shared_space);
  await shared_space.addPrivateSpace(private_space_one);

  await private_space_two.addSharedSpace(shared_space);
  await shared_space.addPrivateSpace(private_space_two);

  await shared_space.addSharedContract(c);
  // await c.setPrivateSpace(space1);
  // await space1.addContract(c);
  //console.log(space2.__proto__);
  await private_space_two.setProperty(property1);
  await private_space_one.setProperty(property1);
  await shared_space.setProperty(property1);

  await c.reload();
  console.log(c.privateSpace);
  await c.privateSpace?.addTemplate(tmp1);
  await c.privateSpace?.addTemplate(tmp2);
  console.log(c);
  const initInputs = contract.initInputs(c, [
    broker_acknowledgment.lines,
    deadline.lines,
    purchase_price.lines,
  ]);
  // console.log(initInputs);
  await c.update({
    inputs: initInputs,
  });

  await c.reload();
  let deal = [0, 1];
  let ins = (() => {
    let i = 0;
    return (key: string, idx: number) => {
      if (key.includes("deadlines_") && i === 0 && i++ === 0) {
        deal = [idx, idx + 1];
      } else if (!key.includes("deadlines_") && i > 0) {
        deal[1] = idx + 1;
      }
      return key.includes("deadlines_");
    };
  })();
  // console.log(initInputs);
  const contract_inputs = Object.entries(initInputs).reduce(
    (obj, [key, val], idx) => {
      if (ins(key, idx)) {
        return { ...obj, [key]: "YOOO" };
      } else {
        return { ...obj, [key]: val };
      }
    },
    {}
  );

  await d.update({
    inputs: Object.entries(contract_inputs)
      .slice(deal[0], deal[1])
      .reduce((obj, [key, val]) => {
        return { ...obj, [key]: val };
      }, {}),
  });

  // for (const lineNumber of Object.keys(default_signatures)) {
  //   const { type, count, fields } = default_signatures[lineNumber];
  //   for (const _ in Array(count).fill("")) {
  //     await Signer.create({ type, contractId: c.id, fields });
  //   }
  // }

  await db.close();
};

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await main();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// // we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = main;
