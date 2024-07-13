import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { episodes } from "./episode";
import { relations } from "drizzle-orm";
import { comedians } from "./comedian";
import { schemaId } from "./utils";

export const appearances = sqliteTable("appearances", {
	id: schemaId(),
	type: text("type", { enum: ["BUCKET", "GUEST", "SPECIAL_GUEST"] }).notNull(),
	episodeId: text("episodeId").notNull(),
	comedianId: text("comedianId").notNull(),
});

export const appearancesRelations = relations(appearances, ({ one }) => ({
	comedian: one(comedians, {
		relationName: "appearanceComedian",
		fields: [appearances.comedianId],
		references: [comedians.id],
	}),
	episode: one(episodes, {
		relationName: "appearanceEpisode",
		fields: [appearances.episodeId],
		references: [episodes.id],
	}),
}));
