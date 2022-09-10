import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
	POSTGRES_HOST,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	POSTGRES_DB,
	POSTGRES_DB_TEST,
	ENV,
} = process.env;

let client;

if (ENV?.trim() === "test") {
	client = new Pool({
		host: POSTGRES_HOST,
		database: POSTGRES_DB_TEST,
		user: POSTGRES_USER,
		password: POSTGRES_PASSWORD,
	});
}

if (ENV?.trim() === "dev") {
	client = new Pool({
		host: POSTGRES_HOST,
		database: POSTGRES_DB,
		user: POSTGRES_USER,
		password: POSTGRES_PASSWORD,
	});
}

export default client;
