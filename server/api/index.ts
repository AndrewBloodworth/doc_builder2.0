import express from "express";
import { API_ROUTE, ErrorStatus } from "../types";

const router = express.Router();

// router.use("/questions", require("./questions"));
// router.use("/companies", require("./companies"));
// router.use("/users", require("./users"));
// router.use("/admin", require("./admin"));
// router.use("/categories", require("./categories"));
// router.use("/downloads", require("./downloads"));
// router.use("/userdownloads", require("./userdownloads"));
// router.use("/scraper", require("./scraper"));
// router.use("/stripe", require("./stripe"));
// router.use("/invitations", require("./invitations"));
// router.use("/interests", require("./interests"));
// import agencies from "./agencies";
// import companies from "./companies";
// import categories from "./categories";
// import interests from "./interests";
// import invitations from "./invitations";
// import questions from "./questions";
// import users from "./users";

// router.use(API_ROUTE.AGENCY, agencies);
// router.use(API_ROUTE.COMPANY, companies);
// router.use(API_ROUTE.CATEGORY, categories);
// router.use(API_ROUTE.INTEREST, interests);
// router.use(API_ROUTE.INVITATION, invitations);
// router.use(API_ROUTE.QUESTION, questions);
// router.use(API_ROUTE.USER, users);

router.use((req, res, next) => {
  const err: ErrorStatus = new Error("API route not found!");

  err.status = 404;
  next(err);
});

export default router;
