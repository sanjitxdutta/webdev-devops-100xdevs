//@ts-ignore
import { Client } from "pg";

const pgClient = new Client({
    connectionString: "postgresql://neondb_owner:npg_n92lYWGczhNt@ep-blue-unit-a1ihcqzm-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
});

async function main() {
    await pgClient.connect();

    const response = await pgClient.query(`
            CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
        `)

    console.log(response);
}

main();