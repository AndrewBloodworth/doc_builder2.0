import { DatabaseConfig } from "../types";

const database: DatabaseConfig = {
  name: String(process.env.DATABASE_NAME),
  username: String(process.env.DATABASE_USER_NAME),
  password: String(process.env.DATABASE_PASSWORD),
  host: String(process.env.DATABASE_HOST),
  port: Number(process.env.DATABASE_PORT),
};

export default { database };
