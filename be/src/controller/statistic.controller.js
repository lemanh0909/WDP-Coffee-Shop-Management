import { statisticService } from "../services/statistic.service.js";

export const statisticController = {
    getSellStatistics: async (req, res) => {
        const data = req.body;
        try {
            const statistic = await statisticService.getSellStatistics(data);
      
            res.status(200).json({
              message: 'Success',
              data: statistic,
          });
          } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({
                error: error.message,
            });
          }
    },
    getOrderSummaryByUser: async (req, res) => {
        const data = req.body;
        try {
            const orderSummary = await statisticService.getOrderSummaryByUser(data);
      
            res.status(200).json({
              message: 'Success',
              data: orderSummary,
          });
          } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({
                error: error.message,
            });
          }
    },
    getCategoryStatistics: async (req, res) => {
        const data = req.body;
        try {
            const orderSummary = await statisticService.getCategoryStatistics(data);
      
            res.status(200).json({
              message: 'Success',
              data: orderSummary,
          });
          } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({
                error: error.message,
            });
          }
    }
}