import pg from "pg";
import dotenv from "dotenv";

const { Pool } = pg;

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    port: process.env.PORT,
});


export default pool;