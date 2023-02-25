import Sequelize, {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  ForeignKey,
} from "sequelize";
import { ContractInputs } from "../../../builder/builder_types/types";

import db from "../db";
import { contract } from "./Contract";

export class template extends Model<
  InferAttributes<template>,
  InferCreationAttributes<template>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare inputs: ContractInputs;

  /**
   * Associations
   */

  declare contractId: ForeignKey<contract["id"]>;

  declare __proto__?: NonAttribute<any>;
}

export default template.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    inputs: {
      type: Sequelize.JSON,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "templates",
  }
);
