import { sqliteTable, text } from "drizzle-orm/sqlite-core";

import { appearances } from "./appearance";
import { relations } from "drizzle-orm/relations";
import { schemaId } from "./utils";

export const comedians = sqliteTable("comedians", {
	id: schemaId(),
	name: text("name").notNull(),
});

export const comedianRelations = relations(comedians, ({ many }) => ({
	appearances: many(appearances),
}));
