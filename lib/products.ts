export interface Product {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  discount: number | null;
  images?: string[];
  newRelease: boolean;
  copies: number | null;
}

// Source of truth for all PFP products
export const PRODUCTS: Product[] = [
  {
    id: "Michael Jordan pfp",
    name: "Michael Jordan",
    description: "This baller is cool ngl",
    priceInCents: 449, // $19.99,
    discount: null,
    images: ["/michael-jordan.jpg"],
    newRelease: false,
    copies: null,
  },
  {
    id: "Kai Cenat",
    name: "Kai cents",
    description: "Hes bald like all of us are. Premium quality",
    priceInCents: 1499, // $14.99
    discount: 0.067,
    images: ["/kai-cenat.jpg"],
    newRelease: false,
    copies: 8,
  },
  {
    id: "my cr deck",
    name: "my-cr-deck",
    description: "Description",
    priceInCents: 2499, // $24.99
    discount: 0.4,
    images: ["/my-cr-deck.jpg"],
    newRelease: false,
    copies: null,
  },
  {
    id: "Neymar Jr.",
    name: "Neymar Jr.",
    description: "High quality pfp for those who like footbole",
    priceInCents: 699, // $24.99
    discount: null,
    images: ["/neymar-jr.jpg"],
    newRelease: true,
    copies: 5,
  },
  {
    id: "Cr",
    name: "[New] Cr Deck",
    description: "THiis is the latest clash royale deck pfp you. High quality, premium release.",
    priceInCents: 2999, // $24.99
    discount: null,
    images: ["/cr-deck-2.jpg"],
    newRelease: true,
    copies: 1,
  },
];
