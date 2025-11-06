import { Suspense } from "react";
import SearchClient from "./SearchClient";

export default function Page() {
  return (
    <Suspense
      fallback={<div className="max-w-7xl mx-auto p-8">Loading search…</div>}
    >
      <SearchClient />
    </Suspense>
  );
}
