import Sequelize, {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  BelongsToManyAddAssociationMixin,
  HasManyAddAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
} from "sequelize";
import { SpaceType } from "../../types";

import db from "../db";
import { contract } from "./Contract";
import { property } from "./Property";
import { template } from "./Template";
import { user } from "./User";

export class space extends Model<
  InferAttributes<space>,
  InferCreationAttributes<space>
> {
  declare id: CreationOptional<number>;
  declare type: SpaceType;

  /**
   * Associations
   */
  declare addBuyersAgent: BelongsToManyAddAssociationMixin<user, number>;
  declare addBuyer: BelongsToManyAddAssociationMixin<user, number>;
  declare addSellersAgent: BelongsToManyAddAssociationMixin<user, number>;
  declare addSeller: BelongsToManyAddAssociationMixin<user, number>;

  declare addPrivateContract: HasManyAddAssociationMixin<contract, number>;
  declare addSharedContract: BelongsToManyAddAssociationMixin<contract, number>;

  declare addSharedSpace: BelongsToManyAddAssociationMixin<space, number>;
  declare addPrivateSpace: BelongsToManyAddAssociationMixin<space, number>;

  declare setProperty: BelongsToSetAssociationMixin<property, number>;

  declare addTemplate: HasManyAddAssociationMixin<template, number>;

  declare createProperty: BelongsToCreateAssociationMixin<property>;
  declare __proto__?: NonAttribute<any>;
}

export default space.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: Sequelize.ENUM(SpaceType.PRIVATE, SpaceType.SHARED),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "spaces",
  }
);
