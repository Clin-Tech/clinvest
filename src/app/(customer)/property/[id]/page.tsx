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

  // allProperties MUST be typed: `as const satisfies ReadonlyArray<Property>`
  const prop = allProperties.find((p) => String(p.id) === String(id)) as
    | Property
    | undefined;

  if (!prop) return { title: "Property not found – ClinTech Estate" };

  const title = `${prop.title} – ClinTech Estate`;
  const description =
    prop.description ?? `View ${prop.title} in ${prop.location}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/property/${prop.id}`,
      siteName: "ClinTech-Estate",
      type: "article",
      images: [{ url: prop.image }],
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const prop = allProperties.find((p) => String(p.id) === String(id)) as
    | Property
    | undefined;

  if (!prop) notFound();

  return <ClientPage property={prop} />;
}
