// ** Express
import express from "express";

<<<<<<< Updated upstream
import authRouter from "./Auth.routes";
=======
import authRouter from "./Auth.routes.js";
import managerRouter from "./manager.routes.js";
>>>>>>> Stashed changes
// import userRouter from "./User.routes";


export const mainRouter = (app) => {
    const v1Router = express.Router();
  
    v1Router.use("/auth", authRouter);
    // v1Router.use("/user", userRouter);

  
    app.use("/api/v1", v1Router);
  };

