"use strict";
// import express from "express";
// import {
//   Environment,
//   ErrorStatus,
//   PackageJSON,
//   UserRole,
//   UserStatus,
// } from "../types";
// import mailer from "../mailer";
// import domain from "../utils/domain";
// import db from "../db";
// import { RegisterInvitationPayload } from "../../client/types";
// const { User, Token } = db.models;
// const pkg: PackageJSON = require("../../../package.json");
// const router = express.Router();
// router.post("/login", async (req, res, next) => {
//   try {
//     const token = await User.authenticate(req.body);
//     res.cookie(`token-${pkg.name}`, token, { maxAge: 432000000 });
//     res.sendStatus(201);
//   } catch (err) {
//     next(err);
//   }
// });
// router.post("/signup", async (req, res, next) => {
//   try {
//     await User.create(req.body);
//     const token = await User.authenticate(req.body);
//     res.cookie(`token-${pkg.name}`, token, { maxAge: 432000000 });
//     res.sendStatus(201);
//   } catch (err: any) {
//     if (err.name === "SequelizeUniqueConstraintError") {
//       res.sendStatus(401).send("User already exists");
//     } else {
//       next(err);
//     }
//   }
// });
// router.put("/register", async (req, res, next) => {
//   try {
//     const { userId, data } = req.body as RegisterInvitationPayload;
//     const user = await User.findByPk(userId, { include: [Token] });
//     if (!user) {
//       const error: ErrorStatus = Error("User does not exist");
//       error.status = 401;
//       throw error;
//     }
//     await user.update({
//       ...data,
//       status: UserStatus.ACTIVE,
//     });
//     if (user.token) {
//       user.token.destroy();
//     }
//     const token = user.generateToken();
//     res.cookie(`token-${pkg.name}`, token, { maxAge: 432000000 });
//     res.sendStatus(201);
//   } catch (err) {
//     next(err);
//   }
// });
// router.get("/me", async (req, res, next) => {
//   try {
//     res.json(await User.findByToken(req.cookies[`token-${pkg.name}`]));
//   } catch (ex) {
//     next(ex);
//   }
// });
// router.post("/request-reset", async (req, res, next) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ where: { email }, include: [Token] });
//     if (!user) {
//       const error: ErrorStatus = Error("User Does not exist");
//       error.status = 404;
//       throw error;
//     }
//     if (user.token) {
//       await user.token.destroy();
//     }
//     const token = await user.createToken();
//     mailer({
//       to: email,
//       subject: "Reset Password",
//       text: `Click on link to reset password: ${
//         domain(`/authenticate/forgot-password/${token.accessToken}`).href
//       }`,
//     });
//     res.json(200);
//   } catch (err) {
//     next(err);
//   }
// });
// router.get("/tokens", async (req, res, next) => {
//   try {
//     const accessToken = req.query.accessToken as string;
//     const token = await Token.findOne({ where: { accessToken } });
//     if (!token || token.hasExpired) {
//       if (token && token.hasExpired) {
//         await token.destroy();
//       }
//       const error: ErrorStatus = Error("Invalid token");
//       error.status = 401;
//       throw error;
//     }
//     res.json(token.userId);
//   } catch (err) {
//     next(err);
//   }
// });
// router.put("/password-reset/:userId", async (req, res, next) => {
//   try {
//     const { userId } = req.params;
//     const { password } = req.body;
//     const user = await User.findByPk(userId, { include: [Token] });
//     if (!user) {
//       const error: ErrorStatus = Error("User Does not exist");
//       error.status = 404;
//       throw error;
//     }
//     if (user.token) {
//       await user.token.destroy();
//     }
//     await user.update({ password });
//     res.sendStatus(204);
//   } catch (err) {
//     next(err);
//   }
// });
// router.delete("/logout", async (req, res, next) => {
//   try {
//     let cookie = req.cookies[`token-${pkg.name}`];
//     if (cookie === undefined) {
//       console.log("No Cookie Destroyed");
//     } else {
//       res.cookie(`token-${pkg.name}`, "", { maxAge: 0 });
//       console.log("Cookie Destroyed");
//     }
//     res.sendStatus(204);
//   } catch (ex) {
//     next(ex);
//   }
// });
// export default router;
