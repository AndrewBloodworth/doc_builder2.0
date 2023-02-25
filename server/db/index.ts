//this is the access point for all things database related!

import { Op } from "sequelize";
import db from "./db";

import models from "./models";

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
} = models;

Contract.hasMany(Template);
Template.belongsTo(Contract);
// Contract.belongsToMany(User, {
//   through: "owner-contracts",
//   as: "owners",
//   foreignKey: "contractId",
// });
Contract.belongsTo(User, {
  as: "owner",
  foreignKey: "ownerId",
});
Contract.belongsToMany(User, {
  through: "buyer-contracts",
  as: "buyers",
  foreignKey: "contractId",
});
Contract.belongsToMany(User, {
  through: "seller-contracts",
  as: "sellers",
  foreignKey: "contractId",
});

Contract.belongsToMany(User, {
  through: "buyers-agent-contracts",
  as: "buyersAgents",
  foreignKey: "contractId",
});

Contract.belongsToMany(User, {
  through: "sellers-agent-contracts",
  as: "sellersAgents",
  foreignKey: "contractId",
});

// User.belongsToMany(Contract, {
//   through: "user-contracts",
//   as: "contracts",
//   foreignKey: "userId",
// });

Contract.hasMany(Signer);
Signer.belongsTo(Contract);

Unlocked.hasMany(Signer);
Signer.belongsTo(Unlocked);

Signer.belongsTo(User, {
  as: "buyer",
  foreignKey: "buyerId",
});

Signer.belongsTo(User, {
  as: "seller",
  foreignKey: "sellerId",
});

Signer.belongsTo(User, {
  as: "selleragent",
  foreignKey: "selleragentId",
});

Signer.belongsTo(User, {
  as: "buyeragent",
  foreignKey: "buyeragentId",
});

Contract.hasOne(Deadline);
Deadline.belongsTo(Contract);

Contract.hasOne(PurchasePrice);
PurchasePrice.belongsTo(Contract);
Contract.hasOne(BrokerAcknowledgment);
BrokerAcknowledgment.belongsTo(Contract);

Contract.hasMany(Unlocked);
Unlocked.belongsTo(Contract);

User.hasMany(Space, { as: "privateSpaces", foreignKey: "ownerId" });
Space.belongsTo(User, {
  as: "owner",
  foreignKey: "ownerId",
});

Space.belongsTo(Property);

Space.hasMany(SignableLink);
SignableLink.hasMany(Token);

Space.hasMany(Contract, {
  as: "privateContracts",
  foreignKey: "privateSpaceId",
});

Contract.belongsTo(Space, {
  as: "privateSpace",
  foreignKey: "privateSpaceId",
});
Space.belongsToMany(Contract, {
  through: "shared-contracts",
  as: "sharedContracts",
  foreignKey: "sharedSpaceId",
});
Contract.belongsToMany(Space, {
  through: "shared-contracts",
  as: "sharedSpaces",
  foreignKey: "sharedContractId",
});

Space.hasMany(Template);

Space.hasMany(Unlocked);
Unlocked.belongsTo(Space);

Space.belongsToMany(User, {
  through: "buyersagent-spaces",
  as: "buyersAgents",
  foreignKey: "spaceId",
});
Space.belongsToMany(User, {
  through: "sellersagent-spaces",
  as: "sellersAgents",
  foreignKey: "spaceId",
});
Space.belongsToMany(User, {
  through: "buyer-spaces",
  as: "buyers",
  foreignKey: "spaceId",
});

Space.belongsToMany(User, {
  through: "seller-spaces",
  as: "sellers",
  foreignKey: "spaceId",
});

Space.belongsToMany(Space, {
  through: "shared-spaces",
  as: "sharedSpaces",
  foreignKey: "privateSpaceId",
});

Space.belongsToMany(Space, {
  through: "private-spaces",
  as: "privateSpaces",
  foreignKey: "sharedSpaceId",
});

export default {
  db,
  Op,
  models: {
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
  },
};
