"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutePath = void 0;
var RoutePath;
(function (RoutePath) {
    RoutePath["UNAUTHORIZED_WILDCARD"] = "*";
    RoutePath["HOME"] = "/";
    RoutePath["ACCOUNT"] = "/account";
    RoutePath["AUTH_WILDCARD"] = "/authenticate/*";
    RoutePath["AUTH_LOGIN"] = "/authenticate/login";
    RoutePath["INVITE_WILDCARD"] = "/invite/*";
    RoutePath["INVITE_REGISTER"] = "/invite/:accessToken";
    RoutePath["DASH_ADMIN"] = "/admin/dashboard";
    RoutePath["DASH_MAIN"] = "/dashboard";
    RoutePath["DASH_COMPANY"] = "/dashboard/company/:companyId";
    RoutePath["DASH_MEMBERS"] = "/dashboard/members";
})(RoutePath = exports.RoutePath || (exports.RoutePath = {}));
/**
 * Use State
 */
