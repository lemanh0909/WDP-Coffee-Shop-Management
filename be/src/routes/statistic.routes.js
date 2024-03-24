import express from 'express';
import { statisticController } from '../controller/statistic.controller.js';

const statisticRouter = express.Router();

statisticRouter.post('/getSellStatistics', statisticController.getSellStatistics);
statisticRouter.post('/getOrderSummaryByUser', statisticController.getOrderSummaryByUser);
statisticRouter.post('/getCategoryStatistics', statisticController.getCategoryStatistics);

export default statisticRouter;