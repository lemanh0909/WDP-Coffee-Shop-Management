// ** Express
import express from "express";

// ** Controllers
import { managerController } from "../controller/manager.controller.js";


const managerRouter = express.Router();

managerRouter.get(
  "/:id/list_staff",
  managerController.getAllStaff
);

managerRouter.put(
  "/:id/list_staff",
  managerController.staffAuthorization
);

export default managerRouter