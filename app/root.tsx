import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Toaster } from "~/components/ui/sonner"

import type { LinksFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

import "./tailwind.css";
import { getUser } from "./session.server";


export const meta: MetaFunction = () => {
  return [
    { title: "Famun 2025" },
    { name: "description", content: "Welcome to Famun" },
  ];
}


export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;700&display=swap",
  },
];


export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ user: await getUser(request) });
};


export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}


export default function App() {
  return <Outlet />;
}
