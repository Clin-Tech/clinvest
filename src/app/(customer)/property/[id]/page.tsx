import type { Metadata } from "next";
import { allProperties } from "@/customer/utils/data";
import type { Property } from "@/types/property";
import ClientPage from "./ClientPage";
import { notFound } from "next/navigation";

type Params = { id: string };

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const prop: Property | undefined = allProperties.find(
    (p) => p.id === params.id
  );

  if (!prop) {
    return { title: "Property not found – ClinTech Estate" };
  }

  const title = `${prop.title} | ${prop.location} – ${prop.price}`;
  const description =
    prop.description ?? `View ${prop.title} in ${prop.location}.`;
  const url = `/product/${prop.id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "ClinTech-Estate",
      type: "article",
      images: [{ url: prop.image, alt: prop.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [prop.image],
    },
  };
}

export default function Page({ params }: { params: Params }) {
  const prop: Property | undefined = allProperties.find(
    (p) => p.id === params.id
  );
  if (!prop) notFound();
  return <ClientPage property={prop} />;
}
