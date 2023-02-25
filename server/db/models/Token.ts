import Sequelize, {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  ForeignKey,
} from "sequelize";

import db from "../db";
import crypto from "crypto";
import { user } from "./User";
import hoursToMs from "../../utils/hoursToMs";
import jwt from "jsonwebtoken";
import { JwtCustomPayload, TokenData } from "../../types";

export class token extends Model<
  InferAttributes<token>,
  InferCreationAttributes<token>
> {
  declare id: CreationOptional<number>;
  declare accessToken: CreationOptional<string | null>;
  declare expires: CreationOptional<number>;

  get hasExpired(): NonAttribute<boolean> {
    return Date.now() > this.expires;
  }

  /**
   * Class Methods
   */
  declare static generate: {
    (data: { contractId: number }): string;
  };

  /**
   * Instance Methods
   */
  declare data: { (): { contractId: number } | undefined };

  /**
   * Associations
   */

  declare userId: ForeignKey<user["id"]>;
}
export default token.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    accessToken: {
      type: Sequelize.TEXT,
    },
    expires: {
      type: Sequelize.DATE,
    },
  },
  {
    sequelize: db,
    tableName: "tokens",
  }
);

token.generate = function (data) {
  return jwt.sign({ valid: true, data }, String(process.env.JWT));
};

token.prototype.data = function () {
  const verified: JwtCustomPayload<TokenData> = jwt.verify(
    this.accessToken!,
    String(process.env.JWT)
  );
  if (typeof verified === "object") {
    if (!verified.valid) {
      throw Error("Invalid accessToken");
    } else {
      return verified.data;
    }
  }
};

/**
 * hooks
 */
const hashToken = (token: token) => {
  token.accessToken = crypto.randomBytes(48).toString("hex");

  token.expires = Date.now() + hoursToMs(24);
};

token.beforeCreate(hashToken);
token.beforeBulkCreate((tokens: token[]) => {
  Promise.all(tokens.map(hashToken));
});
