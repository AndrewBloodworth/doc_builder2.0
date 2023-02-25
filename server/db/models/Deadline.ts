import Sequelize, {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from "sequelize";
import { ContractInputs } from "../../../builder/builder_types/types";

import db from "../db";
import deadlineClass from "../../../builder/data_fetchers/deadline";

export class deadline extends Model<
  InferAttributes<deadline>,
  InferCreationAttributes<deadline>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare content: deadlineClass;
  declare inputs: ContractInputs;

  /**
   * Associations
   */

  declare __proto__?: NonAttribute<any>;
}

export default deadline.init(
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
    content: {
      type: Sequelize.JSON,
      allowNull: false,
    },
    inputs: {
      type: Sequelize.JSON,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "deadlines",
  }
);
