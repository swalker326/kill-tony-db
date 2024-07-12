import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";
import type * as schema from "./schema";

config({ path: ".env" });

// This function is used to generate a unique id for each row in the database.
export const schemaId = () =>
	text("id")
		.$defaultFn(() => nanoid())
		.primaryKey();

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

export const db = drizzle<typeof schema>(client);
