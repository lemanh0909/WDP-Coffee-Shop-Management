// ** Express
import express from "express";
import { Router } from 'express';


import authRouter from "./Auth.routes.js";
import managerRouter from "./manager.routes.js";
import userRouter from "./User.routers.js";
import warehouseRouter from "./warehouse.routes.js";
import productRouter from "./product.routes.js";
import orderRouter from "./order.routes.js";
import discountRouter from "./discount.routes.js";
import categoryRouter from "./category.routes.js";
import receiptRouter from "./receipt.routes.js";
import financeRouter from "./finance.routes.js";
import staffNoteRouter from "./staffNote.routes.js";
import statisticRouter from "./statistic.routes.js";
import exportImportNoteRouter from "./exportImportNote.routes.js";
// import userRouter from "./User.routes";


export const mainRouter = (app) => {
  // const v1Router = express.Router();
  const v1Router = new Router();

  v1Router.use("/auth", authRouter);
  // v1Router.use("/user", userRouter);
  v1Router.use("/manager", managerRouter);
  v1Router.use("/user", userRouter);
  v1Router.use("/warehouse", warehouseRouter);
  v1Router.use("/product", productRouter);
  v1Router.use("/order", orderRouter);
  v1Router.use("/discount", discountRouter);
  v1Router.use("/category", categoryRouter);
  v1Router.use("/receipt", receiptRouter);
  v1Router.use("/finance", financeRouter);
  v1Router.use("/staffNote", staffNoteRouter);
  v1Router.use("/statistic", statisticRouter);
  v1Router.use("/note", exportImportNoteRouter);
  app.use("/api/v1", v1Router);
};

