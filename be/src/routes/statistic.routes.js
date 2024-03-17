import express from 'express';
import { statisticController } from '../controller/statistic.controller.js';

const statisticRouter = express.Router();

statisticRouter.post('/getSellStatistics', statisticController.getSellStatistics);


export default statisticRouter;