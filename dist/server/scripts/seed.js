"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const path_1 = __importDefault(require("path"));
const db = db_1.default.db;
const Op = db_1.default.Op;
const { User, Contract, Property, PurchasePrice, Deadline, SignableLink, Signer, Space, Template, Token, Unlocked, BrokerAcknowledgment, } = db_1.default.models;
const contract_1 = __importDefault(require("../../builder/data_fetchers/contract"));
const deadline_1 = __importDefault(require("../../builder/data_fetchers/deadline"));
const purchase_price_and_terms_1 = __importDefault(require("../../builder/data_fetchers/purchase_price_and_terms"));
const brokers_acknowledgments_1 = __importDefault(require("../../builder/data_fetchers/brokers_acknowledgments"));
const inclusions_1 = require("../api/utils/inclusions");
const types_1 = require("../types");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    yield db.sync({ force: true });
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
    const { users_data, spaces_data, property_data, templates_data, } = require("./seed_data");
    const [user1, user2, user3, user4] = yield User.bulkCreate(users_data, {
        returning: true,
    });
    const [private_space_one, private_space_two, shared_space] = yield Space.bulkCreate(spaces_data, {
        returning: true,
    });
    const [property1] = yield Property.bulkCreate(property_data, {
        returning: true,
    });
    const [tmp1, tmp2] = yield Template.bulkCreate(templates_data, {
        returning: true,
    });
    const contract_name = "co_cbs_residential_2022";
    const contract_json = require(path_1.default.join(__dirname, `../../ts/contract_json/${contract_name}.json`));
    const { default_signatures } = require(`../../ts/parse_configs/${contract_name}.js`).settings;
    const contract = new contract_1.default(contract_name);
    contract.getData(contract_json);
    let c = yield Contract.create(Object.assign(Object.assign({ name: contract_name }, Object.assign({}, Contract.pack(contract.lines))), { inputs: {}, sections: contract.sections }), inclusions_1.contract_includer);
    yield Signer.create({
        type: types_1.SpacePropertyType.SELLERS_AGENT_KEY,
        contractId: c.id,
        fields: default_signatures[types_1.SpacePropertyType.SELLERS_AGENT_KEY].fields,
    });
    yield Signer.create({
        type: types_1.SpacePropertyType.BUYER_KEY,
        contractId: c.id,
        buyerId: user4.id,
        fields: Signer.updateFields({
            attribute: "fullName",
            fields: default_signatures[types_1.SpacePropertyType.BUYER_KEY].fields,
            payload: { value: user4.fullName },
        }),
    });
    yield Signer.create({
        type: types_1.SpacePropertyType.SELLER_KEY,
        contractId: c.id,
        sellerId: user3.id,
        fields: Signer.updateFields({
            attribute: "fullName",
            fields: default_signatures[types_1.SpacePropertyType.SELLER_KEY].fields,
            payload: { value: user3.fullName },
        }),
    });
    yield Signer.create({
        type: types_1.SpacePropertyType.BUYERS_AGENT_KEY,
        contractId: c.id,
        fields: default_signatures[types_1.SpacePropertyType.BUYERS_AGENT_KEY].fields,
    });
    const deadline_name = "co_cbs_residential_deadline_2022";
    const deadline_json = require(path_1.default.join(__dirname, `../../ts/contract_json/${deadline_name}.json`));
    const deadline = new deadline_1.default(deadline_name);
    deadline.getData(deadline_json);
    //delete deadline.sections;
    const d = yield Deadline.create({
        name: deadline_name,
        content: deadline,
        inputs: {},
    });
    yield c.setDeadline(d);
    const purchase_price_name = "co_cbs_residential_purchase_price_and_terms_2022";
    const purchase_price_json = require(path_1.default.join(__dirname, `../../ts/contract_json/${purchase_price_name}.json`));
    const purchase_price = new purchase_price_and_terms_1.default(purchase_price_name);
    purchase_price.getData(purchase_price_json);
    //delete purchase_price.sections;
    const p = yield PurchasePrice.create({
        name: purchase_price_name,
        content: purchase_price,
        inputs: {},
    });
    // console.log(c.__proto__);
    yield c.setPurchaseprice(p);
    const broker_acknowledgments_name = "co_cbs_residential_brokers_acknowledgments_2022";
    const broker_acknowledgments_json = require(path_1.default.join(__dirname, `../../ts/contract_json/${broker_acknowledgments_name}.json`));
    const broker_acknowledgment = new brokers_acknowledgments_1.default(broker_acknowledgments_name);
    broker_acknowledgment.getData(broker_acknowledgments_json);
    //delete broker_acknowledgment.sections;
    console.log(broker_acknowledgment.lines);
    const bA = yield BrokerAcknowledgment.create(Object.assign({ name: broker_acknowledgments_name }, Object.assign({}, Contract.pack(broker_acknowledgment.lines))));
    // console.log(c.__proto__);
    yield c.setBrokeracknowledgment(bA);
    yield c.setOwner(user1);
    // await c.addBuyersAgent(user1);
    // await c.addSellersAgent(user2);
    // await c.addSeller(user3);
    //await c.addBuyer(user4);
    yield user1.addPrivateSpace(private_space_one);
    yield private_space_one.addBuyersAgent(user1);
    yield private_space_one.addBuyer(user4);
    yield shared_space.addBuyersAgent(user1);
    yield shared_space.addBuyer(user4);
    // console.log(user2.__proto__);
    yield user2.addPrivateSpace(private_space_two);
    yield private_space_two.addSellersAgent(user2);
    yield private_space_two.addSeller(user3);
    yield shared_space.addSellersAgent(user2);
    yield shared_space.addSeller(user3);
    //await space1.setProperty(property1);
    //await space1.addBuyer(user4);
    yield private_space_one.addPrivateContract(c);
    yield private_space_one.addSharedSpace(shared_space);
    yield shared_space.addPrivateSpace(private_space_one);
    yield private_space_two.addSharedSpace(shared_space);
    yield shared_space.addPrivateSpace(private_space_two);
    yield shared_space.addSharedContract(c);
    // await c.setPrivateSpace(space1);
    // await space1.addContract(c);
    //console.log(space2.__proto__);
    yield private_space_two.setProperty(property1);
    yield private_space_one.setProperty(property1);
    yield shared_space.setProperty(property1);
    yield c.reload();
    console.log(c.privateSpace);
    yield ((_a = c.privateSpace) === null || _a === void 0 ? void 0 : _a.addTemplate(tmp1));
    yield ((_b = c.privateSpace) === null || _b === void 0 ? void 0 : _b.addTemplate(tmp2));
    console.log(c);
    const initInputs = contract.initInputs(c, [
        broker_acknowledgment.lines,
        deadline.lines,
        purchase_price.lines,
    ]);
    // console.log(initInputs);
    yield c.update({
        inputs: initInputs,
    });
    yield c.reload();
    let deal = [0, 1];
    let ins = (() => {
        let i = 0;
        return (key, idx) => {
            if (key.includes("deadlines_") && i === 0 && i++ === 0) {
                deal = [idx, idx + 1];
            }
            else if (!key.includes("deadlines_") && i > 0) {
                deal[1] = idx + 1;
            }
            return key.includes("deadlines_");
        };
    })();
    // console.log(initInputs);
    const contract_inputs = Object.entries(initInputs).reduce((obj, [key, val], idx) => {
        if (ins(key, idx)) {
            return Object.assign(Object.assign({}, obj), { [key]: "YOOO" });
        }
        else {
            return Object.assign(Object.assign({}, obj), { [key]: val });
        }
    }, {});
    yield d.update({
        inputs: Object.entries(contract_inputs)
            .slice(deal[0], deal[1])
            .reduce((obj, [key, val]) => {
            return Object.assign(Object.assign({}, obj), { [key]: val });
        }, {}),
    });
    // for (const lineNumber of Object.keys(default_signatures)) {
    //   const { type, count, fields } = default_signatures[lineNumber];
    //   for (const _ in Array(count).fill("")) {
    //     await Signer.create({ type, contractId: c.id, fields });
    //   }
    // }
    yield db.close();
});
/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
function runSeed() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("seeding...");
        try {
            yield main();
        }
        catch (err) {
            console.error(err);
            process.exitCode = 1;
        }
        finally {
            console.log("closing db connection");
            yield db.close();
            console.log("db connection closed");
        }
    });
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
