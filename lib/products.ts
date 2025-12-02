export interface Product {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  images?: string[];
}

// Source of truth for all PFP products
export const PRODUCTS: Product[] = [
  {
    id: "Michael Jordan pfp",
    name: "Michael Jordan",
    description: "This baller is cool ngl",
    priceInCents: 449, // $19.99
    images: ["/michael-jordan.jpg"],
  },
  {
    id: "Kai Cenat",
    name: "Kai cents",
    description: "Hes bald like all of us are. Premium quality",
    priceInCents: 1499, // $14.99
    images: ["/kai-cenat.jpg"],
  },
  {
    id: "my cr deck",
    name: "my-cr-deck",
    description: "Description",
    priceInCents: 2499, // $24.99
    images: ["/my-cr-deck.jpg"],
  },
];
