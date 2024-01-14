// ** Express
import express from "express";

import authRouter from "./Auth.routes";
import userRouter from "./User.routes";


export const mainRouter = (app) => {
    const v1Router = express.Router();
  
    v1Router.use("/auth", authRouter);
    v1Router.use("/user", userRouter);

  
    app.use("/api/v1", v1Router);
  };

