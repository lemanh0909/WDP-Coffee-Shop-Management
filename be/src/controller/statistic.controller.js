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
    }
}