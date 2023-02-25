import Sequelize, {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from "sequelize";

import db from "../db";

export class property extends Model<
  InferAttributes<property>,
  InferCreationAttributes<property>
> {
  declare id: CreationOptional<number>;
  declare streetNumber: string;
  declare streetName: string;
  declare city: string;
  declare state: string;
  declare zip: string;
  declare county: string;
  declare legalDescription: string;

  get address(): NonAttribute<string> {
    return `${this.streetNumber} ${this.streetName} ${this.city}`;
  }

  /**
   * Associations
   */

  declare __proto__?: NonAttribute<any>;
}

export default property.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    streetNumber: {
      type: Sequelize.STRING,
    },
    streetName: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    zip: {
      type: Sequelize.STRING,
    },
    county: {
      type: Sequelize.STRING,
    },
    legalDescription: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "properties",
  }
);
