// ** Express
import express from "express";

// ** Config
import { config } from "./config/config.js";
import { connection } from "./config/database.js";

// ** Router'
import {mainRouter} from "./routes/index.js"

// ** Paths
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

global.__root = __dirname;

const app = express();

config(app);
mainRouter(app);


const HOST = process.env.SERVER_HOST;
const PORT = process.env.SERVER_PORT;

(async () => {
  try {
    await connection();

    app.listen(PORT, HOST, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err.message);
  }
})();
