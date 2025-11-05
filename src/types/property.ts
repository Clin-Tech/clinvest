export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  bedrooms?: number;
  bathrooms?: number;
  toilets?: number;
  image: string;
  type: "Rent" | "Sale" | "Shortlet" | "Land";
  description?: string;
}
