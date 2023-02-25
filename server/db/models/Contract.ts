import Sequelize, {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  HasOneSetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToManyRemoveAssociationMixin,
} from "sequelize";
import {
  ContractInputs,
  ParsableLine,
} from "../../../builder/builder_types/types";

import db from "../db";
import crypto from "crypto";
import { deadline } from "./Deadline";
import { purchaseprice } from "./PurchasePrice";
import { brokeracknowledgment } from "./BrokerAcknowledgment";
import { user } from "./User";
import { space } from "./Space";
import { signer } from "./Signer";
import { SectionClass } from "../../../builder/Section";

export class contract extends Model<
  InferAttributes<contract>,
  InferCreationAttributes<contract>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare lines: string;
  declare sections: SectionClass[];
  declare groupLength: number;
  declare inputs: ContractInputs;
  declare mapper: { [index: string]: string };

  get disabled(): NonAttribute<boolean> {
    return !!(this.signers && this.signers.some(({ signed }) => signed));
  }
  get fullySigned(): NonAttribute<boolean> {
    return !!(
      this.signers &&
      this.signers.length > 0 &&
      this.signers.every(({ signed }) => signed)
    );
  }

  /**
   * Class Methods
   */
  static createInputsHash: { (inputs: ContractInputs): string };
  static updateInputs: {
    (data: {
      tag: string;
      inputs: ContractInputs;
      inner: boolean;
      payload: { id?: string; key?: string; value?: string };
      i: number;
    }): ContractInputs;
  };
  static pack: {
    (lines: ParsableLine[]): {
      lines: string;
      groupLength: number;
      mapper: {
        [index: string]: string;
      };
    };
  };

  /**
   * Instance Methods
   */
  declare createHash: {
    (): string;
  };

  declare validateSigners: {
    (hash: string): boolean;
  };

  /**
   * Associations
   */
  declare deadline?: NonAttribute<deadline>;
  declare setDeadline: HasOneSetAssociationMixin<deadline, number>;

  declare setPurchaseprice: HasOneSetAssociationMixin<purchaseprice, number>;

  declare setBrokeracknowledgment: HasOneSetAssociationMixin<
    brokeracknowledgment,
    number
  >;

  declare setOwner: BelongsToSetAssociationMixin<user, number>;

  declare privateSpace?: NonAttribute<space>;
  declare sharedSpace?: NonAttribute<space>;

  declare signers?: NonAttribute<signer[]>;

  declare removeSharedSpace: BelongsToManyRemoveAssociationMixin<space, number>;

  declare __proto__?: NonAttribute<any>;
}

export default contract.init(
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
    sections: {
      type: Sequelize.JSON,
      allowNull: false,
    },
    groupLength: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    inputs: {
      type: Sequelize.JSON,
      allowNull: false,
    },
    mapper: {
      type: Sequelize.JSON,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "contracts",
  }
);

contract.prototype.createHash = function () {
  const key = `${this.lines.toString()}${JSON.stringify(this.inputs)}`;
  return crypto.createHash("sha256").update(key, "binary").digest("base64");
};

contract.prototype.validateSigners = function (hash) {
  return true;
  // return this.signers.every((signer: any) =>
  //   !signer.signed ? true : signer.verifyHash(hash)
  // );
};

contract.createInputsHash = function (inputs) {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(inputs), "binary")
    .digest("base64");
};

contract.updateInputs = function (data) {
  const { tag, inputs, inner, payload, i } = data;
  return Object.entries(inputs).reduce((obj, [key, input]) => {
    if (Array.isArray(input)) {
      const idx = input.length === i && input.length > 0 ? input.length - 1 : i;
      if (input[idx] && input[idx].tag === tag) {
        obj[key] = [...input];
        obj[key][i] = inner ? { ...input[i], ...payload } : { ...payload };
      } else {
        obj[key] = [...input];
      }
    } else {
      if (typeof input === "object" && input.tag === tag) {
        obj[key] = inner ? { ...input, ...payload } : { ...payload };
      } else if (
        typeof input === "object" &&
        input.key === payload.key &&
        payload.id
      ) {
        obj[key] = { ...input, id: payload.id };
      } else {
        obj[key] = input;
      }
    }
    return obj;
  }, {} as any);
};

contract.pack = function (lines) {
  const map: { [index: string]: boolean } = {
    "<span>": true,
    "</span>": true,
    "<strong>": true,
    "</strong>": true,
  };

  const unpacked_str = JSON.stringify(
    lines
      .filter(({ lineText }) => lineText !== "SKIP__ROW")
      .map((line) => {
        const n = {
          ...line,
        };
        delete n.lineText;
        delete n.segmentStyles;
        return n;
      })
  );

  unpacked_str
    ?.match(/((p|strong)( class=\\"[\w|-]*\\" | )style=\\"[\w| |=|:|;|-]*\\")/g)
    ?.filter((t: string) => !(t === "p" || t === "strong"))
    .map((repeated_str) => {
      map[repeated_str] = true;
    });

  const alpha = "abcdefghijklmnopqrstuvwxyz";
  const reversed_map = Object.keys(map).reduce(
    (reverse_map, repeated_string, i) => {
      reverse_map[`_${alpha[i]}_`] = repeated_string;
      return reverse_map;
    },
    {} as { [index: string]: string }
  );

  return {
    lines: Object.entries(reversed_map).reduce(
      (unpacked, [alpha_key, to_pack]) => {
        const regexp = new RegExp(to_pack.replace(/"/g, '\\"'), "g");
        return unpacked.replace(regexp, alpha_key);
      },
      unpacked_str
    ),
    mapper: JSON.parse(JSON.stringify(reversed_map).replace(/\\\\\\/g, "\\")),
    groupLength: Math.ceil(
      lines.filter(({ lineText }) => lineText !== "SKIP__ROW").length / 100
    ),
  };
};
