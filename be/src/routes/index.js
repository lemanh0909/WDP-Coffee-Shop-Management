// ** Express
import express from "express";
import { Router } from 'express';


import authRouter from "./Auth.routes.js";
import managerRouter from "./manager.routes.js";

// import userRouter from "./User.routes";


export const mainRouter = (app) => {
    // const v1Router = express.Router();
    const v1Router = new Router();
  
    v1Router.use("/auth", authRouter);
    // v1Router.use("/user", userRouter);
    v1Router.use("/manager", managerRouter);
  
    app.use("/api/v1", v1Router);
  };

