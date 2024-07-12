import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { schemaId } from "..";

export const episodes = sqliteTable("episodes", {
	id: schemaId(),
	episodeNumber: integer("episodeNumber").notNull(),
	recordedDate: integer("recordedDate", { mode: "timestamp" }).notNull(),
	link: text("link").notNull(),
	notes: text("notes"),
});

export type InsertEpisode = typeof episodes.$inferInsert;
export type SelectEpisode = typeof episodes.$inferSelect;
