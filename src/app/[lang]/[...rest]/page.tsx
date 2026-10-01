import { notFound } from "next/navigation";

// Any unmatched URL (the proxy rewrites it to /en/... or it arrives as /ne/...) renders
// [lang]/not-found.tsx inside the site layout instead of a bare default 404.
export default function CatchAll() {
  notFound();
}
