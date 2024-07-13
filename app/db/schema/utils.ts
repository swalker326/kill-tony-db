import { text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

// This function is used to generate a unique id for each row in the database.
export const schemaId = () =>
	text("id")
		.$defaultFn(() => nanoid())
		.primaryKey();
