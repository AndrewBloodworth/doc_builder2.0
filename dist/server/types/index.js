"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpacePropertyType = exports.WhereType = exports.API_ROUTE = exports.SpaceType = exports.UserRole = exports.UserStatus = exports.Notifications = exports.Environment = void 0;
/**
 * ENUMS
 */
var Environment;
(function (Environment) {
    Environment["PRODUCTION"] = "production";
    Environment["DEVELOPMENT"] = "development";
    Environment["TEST"] = "test";
})(Environment = exports.Environment || (exports.Environment = {}));
var Notifications;
(function (Notifications) {
    Notifications["ON"] = "On";
    Notifications["OFF"] = "Off";
})(Notifications = exports.Notifications || (exports.Notifications = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "Active";
    UserStatus["PENDING"] = "Pending";
    UserStatus["SUSPENDED"] = "Suspended";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "User";
    UserRole["ADMIN"] = "Admin";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var SpaceType;
(function (SpaceType) {
    SpaceType["SHARED"] = "Shared";
    SpaceType["PRIVATE"] = "Private";
})(SpaceType = exports.SpaceType || (exports.SpaceType = {}));
var API_ROUTE;
(function (API_ROUTE) {
    API_ROUTE["COMPANY"] = "/companies";
    API_ROUTE["AGENCY"] = "/agencies";
    API_ROUTE["CATEGORY"] = "/categories";
    API_ROUTE["INTEREST"] = "/interests";
    API_ROUTE["INVITATION"] = "/invitations";
    API_ROUTE["QUESTION"] = "/questions";
    API_ROUTE["USER"] = "/users";
    API_ROUTE["AUTH"] = "/auth";
    API_ROUTE["API"] = "/api";
})(API_ROUTE = exports.API_ROUTE || (exports.API_ROUTE = {}));
var WhereType;
(function (WhereType) {
    WhereType["REGEXP_SEARCH"] = "REGEXP_SEARCH";
    WhereType["CREATED_DATE_RANGE"] = "CREATED_DATE_RANGE";
})(WhereType = exports.WhereType || (exports.WhereType = {}));
var SpacePropertyType;
(function (SpacePropertyType) {
    SpacePropertyType["BUYER_KEY"] = "Buyer";
    SpacePropertyType["SELLER_KEY"] = "Seller";
    SpacePropertyType["BUYERS_AGENT_KEY"] = "BUYERS_AGENT_KEY";
    SpacePropertyType["SELLERS_AGENT_KEY"] = "SELLERS_AGENT_KEY";
    SpacePropertyType["PROPERTY_KEY"] = "Property";
})(SpacePropertyType = exports.SpacePropertyType || (exports.SpacePropertyType = {}));
