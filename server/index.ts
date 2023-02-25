/* eslint-disable no-unused-vars */

import express, { Request, Response, NextFunction } from "express";
import { API_ROUTE, Environment, ErrorStatus } from "./types";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
// import auth from "./auth";
// import api from "./api";

const app = express();

app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../public")));

// app.use(API_ROUTE.AUTH, auth);
// app.use(API_ROUTE.API, api);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

app.use((err: ErrorStatus, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== Environment.TEST) console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error");
});

module.exports = app;
