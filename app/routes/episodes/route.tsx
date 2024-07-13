import { Form, useLoaderData } from "@remix-run/react";
import { db } from "~/db";
import { episodes as episodesTable } from "~/db/schema";

export async function loader() {
	const episodes = await db.query.episodes.findMany({ limit: 10 });
	return episodes;
}

export function action() {
	return db
		.insert(episodesTable)
		.values({
			episodeNumber: 123,
			recordedDate: new Date(),
			link: "https://example.com",
			notes: "This is a test",
		})
		.returning();
}

export default function EpisodeRoute() {
	const loaderResponse = useLoaderData<typeof loader>();
	return (
		<div className="font-sans p-4">
			<Form method="POST">
				<button
					className="bg-gray-800 text-red-400 rounded-md px-3 py-2"
					type="submit"
				>
					Add Test Episode
				</button>
			</Form>
			{loaderResponse.map((episode) => (
				<div key={episode.id}>
					<h2>Episode {episode.episodeNumber}</h2>
					<p>Recorded on {episode.recordedDate}</p>
					<p>Link: {episode.link}</p>
					<p>Notes: {episode.notes}</p>
				</div>
			))}
		</div>
	);
}
