import Sequelize, {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from "sequelize";

import db from "../db";
import purchasePriceClass from "../../../builder/data_fetchers/purchase_price_and_terms";
import { ContractInputs } from "../../../builder/builder_types/types";

export class purchaseprice extends Model<
  InferAttributes<purchaseprice>,
  InferCreationAttributes<purchaseprice>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare content: purchasePriceClass;
  declare inputs: ContractInputs;

  /**
   * Associations
   */

  declare __proto__?: NonAttribute<any>;
}

export default purchaseprice.init(
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
    tableName: "purchaseprices",
  }
);
