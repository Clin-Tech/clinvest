import { z } from "zod";
import { allProperties } from "@/customer/utils/data";
import type { Property } from "@/types/property";
import SearchClient from "./SearchClient";

type SP = Record<string, string | string[] | undefined>;

const schema = z.object({
  type: z.enum(["Rent", "Sale", "Shortlet", "Land"]).optional(),
  location: z.string().optional(),
  bedroom: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
});

const toNaira = (s?: string) =>
  s ? parseInt(s.replace(/[^\d]/g, ""), 10) || 0 : undefined;

const normalizeBedroom = (s?: string) => {
  if (!s) return undefined;
  const n = parseInt(s, 10);
  return Number.isNaN(n) ? undefined : n;
};

function matches(p: Property, q: z.infer<typeof schema>) {
  const priceN = toNaira(p.price) ?? 0;

  if (q.type && p.type !== q.type) return false;

  if (
    q.location &&
    !p.location.toLowerCase().includes(q.location.toLowerCase())
  )
    return false;

  if (q.bedroom) {
    const want = normalizeBedroom(q.bedroom);
    if (typeof want === "number") {
      if (p.bedrooms === undefined || p.bedrooms !== want) return false;
    }
  }

  const min = toNaira(q.minPrice) ?? 0;
  const max = toNaira(q.maxPrice) ?? Number.MAX_SAFE_INTEGER;
  if (priceN < min) return false;
  if (priceN > max) return false;

  return true;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;

  const flat = Object.fromEntries(
    Object.entries(sp).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
  );

  const parsed = schema.safeParse(flat);
  const q = parsed.success ? parsed.data : {};

  const items = (allProperties as readonly Property[]).filter((p) =>
    matches(p, q)
  );

  return <SearchClient items={items} />;
}
