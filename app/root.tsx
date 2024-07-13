import {
	NavLink,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	Link,
} from "@remix-run/react";
import "./tailwind.css";
import { Logo } from "./components/logo";

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="h-full">
				<div className="h-full flex flex-col gap-2">
					<header className="flex gap-2 min-h-20 items-center justify-between bg-kt-red px-4">
						<Link to="/">
							<Logo />
						</Link>
						<div className="flex gap-2">
							<NavLink
								className={({ isActive }) =>
									`${isActive ? "text-kt-taupe" : "text-gray-50"} text-xl`
								}
								to="/episodes"
							>
								Episodes
							</NavLink>
							<NavLink
								className={({ isActive }) =>
									`${isActive ? "text-kt-taupe" : "text-gray-50"} text-xl`
								}
								to="/comedians"
							>
								Comedians
							</NavLink>
							<NavLink
								className={({ isActive }) =>
									`${isActive ? "text-kt-taupe" : "text-gray-50"} text-xl`
								}
								to="/merch"
							>
								Merch
							</NavLink>
						</div>
					</header>
					<div className="flex-1">{children}</div>
					<footer>
						<p>© 2021</p>
					</footer>
				</div>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
