import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  useLoaderData
} from "@remix-run/react";
import picoCss from './lib/pico.min.css'
import { Link } from "react-router-dom";

export function links() {
  return [
    { rel: "stylesheet", href: picoCss }
  ]
}
  
export default function App() {
  return (
    <html>
      <head>
        <link
          rel="icon"
          href="data:image/x-icon;base64,AA"
        />
        <title>Scripture App</title>
        <Meta />
        <Links />
      </head>
      <body>
        <main className="container">
          <Outlet />
          <Scripts />
          {/* <LiveReload /> */}
        </main>
      </body>
    </html>
  );
}
