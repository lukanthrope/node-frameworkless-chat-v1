import { createRequire } from 'node:module';
import { config } from 'dotenv';
config();

global.require = createRequire(import.meta.url);

export default {
  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  staticServerPort: 8000,
  transport: {
    http: 8001,
    ws: 8002,
  },
};
