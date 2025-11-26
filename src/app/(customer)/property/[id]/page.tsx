import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allProperties } from "@/customer/utils/data";
import type { Property } from "@/types/property";
import ClientPage from "./ClientPage";

type Params = { id: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const p = allProperties.find((x) => x.id === id) as Property | undefined;
  if (!p) return { title: "Property not found – ClinVest" };

  return {
    title: `${p.title} – ClinVest`,
    description: p.description ?? `View ${p.title} in ${p.location}.`,
    openGraph: { images: [{ url: p.image }] },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const p = allProperties.find((x) => x.id === id) as Property | undefined;
  if (!p) notFound();

  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.title,
    image: [p.image],
    description: p.description,
    brand: { "@type": "Brand", name: "ClinVest" },
    offers: {
      "@type": "Offer",
      priceCurrency: "NGN",
      price: p.price.match(/\d+/g)?.join("") ?? "0",
      availability: "https://schema.org/InStock",
      url: `https://clinvest.vercel.app/property/${p.id}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <ClientPage property={p} />
    </>
  );
}
