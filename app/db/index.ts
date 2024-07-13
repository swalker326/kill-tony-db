import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { schema } from "./schema";

config({ path: ".env" });

if (!process.env.TURSO_CONNECTION_URL) {
	throw new Error("TURSO_CONNECTION_URL is not set");
}
if (!process.env.TURSO_AUTH_TOKEN) {
	throw new Error("TURSO_AUTH_TOKEN is not set");
}

const client = createClient({
	url: process.env.TURSO_CONNECTION_URL,
	authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle<typeof schema>(client, { schema });
