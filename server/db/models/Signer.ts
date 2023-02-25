import Sequelize, {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  ForeignKey,
  BelongsToCreateAssociationMixin,
} from "sequelize";

import db from "../db";
import jwt from "jsonwebtoken";
import { JwtCustomPayload, SignerHash, SpacePropertyType } from "../../types";
import { SignatureFields } from "../../../builder/builder_types/types";
import { contract } from "./Contract";
import { user } from "./User";
import { unlocked } from "./Unlocked";

export class signer extends Model<
  InferAttributes<signer>,
  InferCreationAttributes<signer>
> {
  declare id: CreationOptional<number>;
  declare type:
    | SpacePropertyType.SELLER_KEY
    | SpacePropertyType.BUYER_KEY
    | SpacePropertyType.SELLERS_AGENT_KEY
    | SpacePropertyType.BUYERS_AGENT_KEY;
  declare fields: SignatureFields;
  declare ipAddress: CreationOptional<string | null>;
  declare timestamp: CreationOptional<string | null>;
  declare signed: CreationOptional<boolean>;
  declare publicKey: CreationOptional<string | null>;

  /**
   * Class Methods
   */
  declare static updateFields: {
    (data: {
      attribute: string;
      fields: SignatureFields;
      payload: { value: string };
    }): SignatureFields;
  };

  /**
   * Instance Methods
   */
  declare createPublicKey: { (hash: string): string };
  declare verifyHash: { (verify_hash: string): boolean };
  declare updateSigner: {
    (
      key: SpacePropertyType,
      payload: {
        [index: string]: string;
      }
    ): Promise<void>;
  };

  /**
   * Associations
   */

  declare contractId: ForeignKey<contract["id"]>;

  declare buyerId: ForeignKey<user["id"]>;
  declare buyer?: NonAttribute<user>;
  declare createBuyer: BelongsToCreateAssociationMixin<user>;

  declare sellerId: ForeignKey<user["id"]>;
  declare seller?: NonAttribute<user>;
  declare createSeller: BelongsToCreateAssociationMixin<user>;

  declare sellersAgent?: NonAttribute<user>;

  declare buyersAgent?: NonAttribute<user>;

  declare unlockedId: ForeignKey<unlocked["id"]>;

  declare __proto__?: NonAttribute<any>;
}

export default signer.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fields: {
      type: Sequelize.JSON,
      defaultValue: {},
      allowNull: false,
    },
    ipAddress: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    timestamp: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    signed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    publicKey: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: "signers",
  }
);

signer.prototype.createPublicKey = function (hash) {
  return jwt.sign({ hash }, String(process.env.PRIVATE_KEY));
};

signer.prototype.verifyHash = function (verify_hash) {
  const payload: JwtCustomPayload<SignerHash> = jwt.verify(
    this.publicKey!,
    String(process.env.PRIVATE_KEY)
  );
  return typeof payload === "object" && payload.hash === verify_hash;
};

signer.prototype.updateSigner = async function (key, payload) {
  switch (key) {
    case SpacePropertyType.BUYER_KEY: {
      await this.buyer?.update(payload as unknown as user);
      break;
    }
    case SpacePropertyType.SELLER_KEY: {
      await this.seller?.update(payload as unknown as user);
      break;
    }
  }
};

signer.updateFields = function (data) {
  const { attribute, fields, payload } = data;
  return Object.entries(fields).reduce((obj, [key, val]) => {
    if (val.attribute === attribute) {
      obj[key] = { ...val, ...payload };
    } else {
      obj[key] = { ...val };
    }
    return obj;
  }, {} as SignatureFields);
};
