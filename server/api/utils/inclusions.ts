import db from "../../db";

const Op = db.Op;
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
} = db.models;

export const limited_contract_attributes = {
  attributes: ["id", "name", "inputs", "disabled", "fullySigned"],
};
export const signer_includer = {
  include: [
    { model: User, as: "buyer" },
    { model: User, as: "seller" },
    { model: User, as: "selleragent" },
    { model: User, as: "buyeragent" },
  ],
};
export const contract_includer = {
  include: [
    Deadline,
    PurchasePrice,
    BrokerAcknowledgment,
    { model: Signer, ...signer_includer },
    {
      model: Space,
      as: "privateSpace",
      include: [
        Property,
        Template,
        { model: User, as: "buyers" },
        { model: User, as: "sellers" },
      ],
    },
    { model: Space, as: "sharedSpaces" },
    { model: User, as: "owner" },
    { model: User, as: "buyersAgents" },
    { model: User, as: "sellersAgents" },
    { model: User, as: "buyers" },
    { model: User, as: "sellers" },
  ],
};
export const unlocked_includer = {
  include: [Signer],
};
export const private_space_includer = {
  order: [[SignableLink, "createdAt", "DESC"]],
  include: [
    { model: User, as: "owner" },
    { model: User, as: "buyersAgents" },
    { model: User, as: "sellersAgents" },
    { model: User, as: "buyers" },
    { model: User, as: "sellers" },
    {
      model: Space,
      as: "sharedSpaces",

      include: [
        { model: User, as: "buyersAgents" },
        { model: User, as: "sellersAgents" },
        Property,

        {
          model: Space,
          as: "privateSpaces",
          include: [
            { model: User, as: "owner" },
            { model: User, as: "buyers" },
            { model: User, as: "sellers" },
          ],
        },
      ],
    },
    Property,
    Template,
    { model: SignableLink, include: [Token] },
    {
      model: Contract,
      as: "privateContracts",
      ...limited_contract_attributes,
      include: [
        { model: User, as: "owner" },
        { model: Signer, ...signer_includer },
      ],
    },
    { model: Unlocked, ...unlocked_includer, attributes: ["id", "name"] },
  ],
};
export const shared_space_includer = {
  include: [
    {
      model: Space,
      as: "privateSpaces",
    },
    Property,
    Template,
    { model: User, as: "buyersAgents" },
    { model: User, as: "sellersAgents" },
    { model: User, as: "buyers" },
    { model: User, as: "sellers" },
    {
      model: Contract,
      as: "sharedContracts",
      ...limited_contract_attributes,
      include: [
        { model: User, as: "owner" },
        { model: Signer, ...signer_includer },
      ],
    },
    { model: Unlocked, ...unlocked_includer, attributes: ["id", "name"] },
  ],
};
export const userIncluder = {
  include: [
    {
      model: Space,
      as: "privateSpaces",
      include: [
        Property,
        {
          model: Contract,
          as: "privateContracts",
          attributes: ["id", "name"],
        },
      ],
    },
  ],
};
