import Sequelize, {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from "sequelize";

import db from "../db";

export class brokeracknowledgment extends Model<
  InferAttributes<brokeracknowledgment>,
  InferCreationAttributes<brokeracknowledgment>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare lines: string;
  declare groupLength: number;
  declare mapper: { [index: string]: string };

  /**
   * Associations
   */
  // declare agency?: NonAttribute<agency>;
  // declare agencyId: ForeignKey<agency["id"]>;
  // declare getAgency: BelongsToGetAssociationMixin<agency>;

  // declare companycategory?: NonAttribute<companycategory>;
  // declare companycategoryId: ForeignKey<companycategory["id"]>;
  // declare getCompanycategory: BelongsToGetAssociationMixin<companycategory>;
  // declare setCompanycategory: BelongsToSetAssociationMixin<
  //   companycategory,
  //   number
  // >;

  // declare membercompany?: NonAttribute<membercompany>;

  // declare questions?: NonAttribute<question[]>;
  // declare getQuestions: BelongsToGetAssociationMixin<question[]>;

  // declare interestlists?: NonAttribute<interestlist[]>;
  // declare getInterestlists: HasManyGetAssociationsMixin<interestlist[]>;
  // declare createInterestlist: HasManyCreateAssociationMixin<interestlist>;

  declare __proto__?: NonAttribute<any>;
}

export default brokeracknowledgment.init(
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
      get() {
        return JSON.parse(this.lines.toString());
      },
    },

    groupLength: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

    mapper: {
      type: Sequelize.JSON,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "brokeracknowledgments",
  }
);
