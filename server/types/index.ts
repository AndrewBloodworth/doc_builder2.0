import { JwtPayload } from "jsonwebtoken";

import { Request } from "express";
import { user } from "../db/models/User";
// import { interest } from "../db/models/Interest";
import QueryString from "qs";
// import { interestlist } from "../db/models/InterestList";

export interface ErrorStatus extends Error {
  status?: number;
}

export interface DatabaseConfig {
  name: string;
  username: string;
  password: string;
  host: string;
  port: number;
}

export interface TokenData extends JwtPayload {
  valid?: string;
  data?: { contractId: number };
}
export interface SignerHash extends JwtPayload {
  hash?: string;
}
export interface UserTokenId extends JwtPayload {
  id?: number;
}
export type JwtCustomPayload<T> = string | T;

export interface AuthDetails {
  email: string;
  password: string;
}

export interface Mailer {
  to: string;
  subject: string;
  text: string;
}

export interface RequestRequireToken extends Request {
  user?: user;
}

export interface InterestCreationObject {
  name: string;
  audience?: number | null;
}

export interface PackageJSON {
  name: string;
}

export interface PackageJSON {
  name: string;
}

export interface MemberPermissions {
  [index: number]: string[];
}

export interface SignerFieldData {
  attribute: string;
  fields: object;
}
// export interface InterestMap {
//   [index: number]: interest;
// }
// export interface InterestListMap {
//   [index: number]: interestlist;
// }

export interface CompanyInterestQueryParams extends QueryString.ParsedQs {
  dateRange: string | undefined;
  searchInterest: string | undefined;
  searchCategory: string | undefined;
  searchTag: string | undefined;
  offset: string | undefined;
  limit: string | undefined;
}

export interface CompanyInterestListsQueryParams extends QueryString.ParsedQs {
  offset: string | undefined;
  limit: string | undefined;
}

export interface WhereData {
  term?: string;
  dateRange?: [string, string | undefined];
}

export interface WhereObj {
  where?: {
    [index: string]: any;
  };
}

/**
 * ENUMS
 */

export enum Environment {
  PRODUCTION = "production",
  DEVELOPMENT = "development",
  TEST = "test",
}

export enum Notifications {
  ON = "On",
  OFF = "Off",
}

export enum UserStatus {
  ACTIVE = "Active",
  PENDING = "Pending",
  SUSPENDED = "Suspended",
}

export enum UserRole {
  USER = "User",
  ADMIN = "Admin",
}
export enum SpaceType {
  SHARED = "Shared",
  PRIVATE = "Private",
}

export enum API_ROUTE {
  COMPANY = "/companies",
  AGENCY = "/agencies",
  CATEGORY = "/categories",
  INTEREST = "/interests",
  INVITATION = "/invitations",
  QUESTION = "/questions",
  USER = "/users",
  AUTH = "/auth",
  API = "/api",
}

export enum WhereType {
  REGEXP_SEARCH = "REGEXP_SEARCH",
  CREATED_DATE_RANGE = "CREATED_DATE_RANGE",
}

export enum SpacePropertyType {
  BUYER_KEY = "Buyer",
  SELLER_KEY = "Seller",
  BUYERS_AGENT_KEY = "BUYERS_AGENT_KEY",
  SELLERS_AGENT_KEY = "SELLERS_AGENT_KEY",
  PROPERTY_KEY = "Property",
}
