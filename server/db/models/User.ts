import Sequelize, {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  ForeignKey,
  HasManyGetAssociationsMixin,
  HasOneCreateAssociationMixin,
  HasManyCreateAssociationMixin,
  HasManyAddAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
} from "sequelize";

import db from "../db";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  ErrorStatus,
  AuthDetails,
  Notifications,
  UserStatus,
  UserRole,
  JwtCustomPayload,
  UserTokenId,
} from "../../types";
import capitalize from "../../utils/capitalize";
import { space } from "./Space";

const SALT_ROUNDS = 5;

export class user extends Model<
  InferAttributes<user>,
  InferCreationAttributes<user>
> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string | null;
  declare email: string;
  declare password: CreationOptional<string>;
  declare notifications: CreationOptional<Notifications>;
  declare status: CreationOptional<UserStatus>;
  declare role: CreationOptional<UserRole>;

  get fullName(): NonAttribute<string> {
    if (!this.firstName || !this.lastName) {
      return "No Name";
    }

    return `${capitalize(this.firstName)} ${capitalize(this.lastName)}`;
  }

  /**
   * Class Methods
   */
  static authenticate: { (auth: AuthDetails): Promise<string> };
  static findByToken: { (token: string): Promise<user | undefined> };
  static isAdmin: { (token: string): Promise<user | undefined> };

  /**
   * Instance Methods
   */
  declare correctPassword: { (password: string): Promise<boolean> };
  declare generateToken: { (): string };

  /**
   * Associations
   */

  declare addPrivateSpace: BelongsToManyAddAssociationMixin<space, number>;
  declare __proto__?: NonAttribute<any>;
}

export default user.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    notifications: {
      type: Sequelize.ENUM(Notifications.ON, Notifications.OFF),
      allowNull: false,
      defaultValue: Notifications.ON,
    },
    status: {
      type: Sequelize.ENUM(
        UserStatus.ACTIVE,
        UserStatus.PENDING,
        UserStatus.SUSPENDED
      ),
      allowNull: false,
      defaultValue: UserStatus.ACTIVE,
    },
    role: {
      type: Sequelize.ENUM(UserRole.USER, UserRole.ADMIN),
      allowNull: false,
      defaultValue: UserRole.USER,
    },
  },
  {
    sequelize: db,
    tableName: "users",
  }
);

/**
 * Instance Methods
 */
user.prototype.correctPassword = function (candidatePwd) {
  return bcrypt.compare(candidatePwd, this.password);
};

user.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, String(process.env.JWT));
};

/**
 * Class Methods
 */
user.authenticate = async function ({ email, password }) {
  const user = await this.findOne({ where: { email } });

  if (!user || !(await user.correctPassword(password))) {
    const error: ErrorStatus = Error("Incorrect email/password");
    error.status = 401;
    throw error;
  }
  if (user && user.status === UserStatus.SUSPENDED) {
    const error: ErrorStatus = Error("User has been suspended");
    error.status = 403;
    throw error;
  }
  return user.generateToken();
};

user.findByToken = async function (token) {
  try {
    const payload: JwtCustomPayload<UserTokenId> = jwt.verify(
      token,
      String(process.env.JWT)
    );

    if (typeof payload === "object") {
      const user = await this.findByPk(payload.id);
      if (!user) {
        throw "Invalid User Id";
      }
      return user;
    }
  } catch (err) {
    const error: ErrorStatus = Error(err as string);
    error.status = 401;
    throw error;
  }
};

user.isAdmin = async function (token) {
  try {
    const payload: JwtCustomPayload<UserTokenId> = jwt.verify(
      token,
      String(process.env.JWT)
    );

    if (typeof payload === "object") {
      const user = await this.findByPk(payload.id);
      if (!user) {
        throw "Invalid User Id";
      }
      if (user.role !== UserRole.ADMIN) {
        throw "Unauthorized. User is not an Admin.";
      }
      return user;
    }
  } catch (err) {
    const error: ErrorStatus = Error(err as string);
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user: user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

user.beforeCreate(hashPassword);
user.beforeUpdate(hashPassword);
user.beforeBulkCreate((users: user[]) => {
  Promise.all(users.map(hashPassword));
});
