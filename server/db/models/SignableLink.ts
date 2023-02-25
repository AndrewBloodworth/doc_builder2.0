import Sequelize, {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from "sequelize";

import db from "../db";

export class signablelink extends Model<
  InferAttributes<signablelink>,
  InferCreationAttributes<signablelink>
> {
  declare id: CreationOptional<number>;
  declare emails: Array<string>;
  /**
   * Associations
   */

  declare __proto__?: NonAttribute<any>;
}

export default signablelink.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    emails: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
  },
  {
    sequelize: db,
    tableName: "signablelinks",
  }
);
