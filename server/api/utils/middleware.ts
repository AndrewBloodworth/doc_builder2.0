// import { Response, NextFunction } from "express";

// import db from "../../db";
// import { PackageJSON, RequestRequireToken } from "../../types";
// // const { User } = db.models;

// const pkg: PackageJSON = require("../../../../package.json");

// export const requireToken = async (
//   req: RequestRequireToken,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // req.user = await User.findByToken(req.cookies[`token-${pkg.name}`]);

//     next();
//   } catch (e) {
//     next(e);
//   }
// };

// export const isAdmin = async (
//   req: RequestRequireToken,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // req.user = await User.isAdmin(req.cookies[`token-${pkg.name}`]);

//     next();
//   } catch (e) {
//     next(e);
//   }
// };
