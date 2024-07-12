import type { MetaFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Index() {
	return (
		<div className="font-sans p-4">
			<h1 className="text-3xl">Hello</h1>
			<Link to="/episodes">Episode</Link>
		</div>
	);
}
