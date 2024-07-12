import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { z } from "zod";
import { db } from "~/db";
import { appearances, comedians } from "~/db/schema";

const ComedianSchema = z.object({
	name: z.string(),
	appearances: z.string(),
});

export async function loader() {
	const comedians = await db.query.comedians.findMany({
		with: { appearances: true },
	});
	return comedians;
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const payload = await ComedianSchema.parseAsync(Object.fromEntries(formData));
	const newComedian = await db
		.insert(comedians)
		.values({ name: payload.name })
		.returning();
	if (!newComedian) {
		throw new Error("Failed to create	comedian");
	}
	const appearance = await db
		.insert(appearances)
		.values({
			type: "BUCKET",
			episodeId: payload.appearances,
			comedianId: newComedian[0].id,
		})
		.returning({ id: appearances.id });
	return newComedian;
}

export default function ComedianRoute() {
	const loaderResponse = useLoaderData<typeof loader>();
	return (
		<div className="font-sans p-4">
			<h1 className="text-3xl">Comedians</h1>
			<Form method="post">
				<input type="text" name="name" placeholder="Name" />
				<input type="text" name="appearances" placeholder="Episode ID" />
				<button type="submit">Add Comedian</button>
			</Form>
			{loaderResponse.map((comedian) => (
				<div key={comedian.id}>
					<h2>{comedian.name}</h2>
					<div>
						Appearances:
						{comedian.appearances.map((appearance) => (
							<div key={appearance.id}>{appearance.episodeId}</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
