import Sequelize, {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  ForeignKey,
  BelongsToSetAssociationMixin,
} from "sequelize";
import { ContractInputs } from "../../../builder/builder_types/types";

import db from "../db";
import { contract } from "./Contract";
import { space } from "./Space";

export class unlocked extends Model<
  InferAttributes<unlocked>,
  InferCreationAttributes<unlocked>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare lines: string;

  declare inputs: ContractInputs;

  /**
   * Associations
   */
  declare contractId: ForeignKey<contract["id"]>;

  declare setSpace: BelongsToSetAssociationMixin<space, number>;

  declare __proto__?: NonAttribute<any>;
}

export default unlocked.init(
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
    lines: {
      type: Sequelize.BLOB,
      allowNull: false,
    },

    inputs: {
      type: Sequelize.JSON,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "unlockeds",
  }
);
