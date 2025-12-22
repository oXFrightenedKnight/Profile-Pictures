export interface Product {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  discount: number | null;
  images?: string[];
  newRelease: boolean;
  copies: number | null;
  collectionId: string;
  type: string;
  videoUrl: string | null;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  newArrival: boolean;
}

// Source of truth for all PFP products
export const PRODUCTS: Product[] = [
  {
    id: "Michael Jordan pfp",
    name: "Mikal Jorden",
    description: "This baller is cool ngl",
    priceInCents: 449, // $19.99,
    discount: 0.65,
    images: ["/michael-jordan.jpg"],
    newRelease: false,
    copies: 10,
    collectionId: "basketball",
    type: "photo",
    videoUrl: null,
  },
  {
    id: "Kai Cenat",
    name: "Kai cents",
    description: "Hes bald like all of us are. Premium quality",
    priceInCents: 999, // $14.99
    discount: null,
    images: ["/kai-cenat.jpg"],
    newRelease: false,
    copies: 8,
    collectionId: "basketball",
    type: "photo",
    videoUrl: null,
  },
  {
    id: "my cr deck",
    name: "my-cr-deck",
    description: "Description",
    priceInCents: 2499, // $24.99
    discount: null,
    images: ["/my-cr-deck.jpg"],
    newRelease: false,
    copies: null,
    collectionId: "clashroyale",
    type: "photo",
    videoUrl: null,
  },
  {
    id: "Neymar Jr.",
    name: "Neymar Jrk.",
    description: "High quality pfp for those who like footbole",
    priceInCents: 699, // $24.99
    discount: 0.8,
    images: ["/neymar-jr.jpg"],
    newRelease: false,
    copies: 5,
    collectionId: "basketball",
    type: "photo",
    videoUrl: null,
  },
  {
    id: "Cr",
    name: "Cr Deck 2",
    description: "THiis is the latest clash royale deck pfp you. High quality, premium release.",
    priceInCents: 2999, // $24.99
    discount: null,
    images: ["/cr-deck-2.jpg"],
    newRelease: false,
    copies: null,
    collectionId: "clashroyale",
    type: "photo",
    videoUrl: null,
  },
  {
    id: "KobeBryante",
    name: "Kobie Bruh",
    description: "NEW! Vote for your favourite profile picture. This PFP is an all time classic.",
    priceInCents: 799,
    discount: null,
    images: ["/kobe-bryant.png"],
    newRelease: false,
    copies: null,
    collectionId: "basketball",
    type: "photo",
    videoUrl: null,
  },
  {
    id: "Jiddy edit",
    name: "Happy jidler edit",
    description:
      "This is a pro edit featuring smooth transitions, smooth transitions and smooth transitions",
    priceInCents: 6999,
    discount: null,
    images: ["/jiddy-edit.png"],
    newRelease: false,
    copies: null,
    collectionId: "jynxzi",
    type: "video",
    videoUrl: "/jiddy.mp4",
  },
  {
    id: "Another dancing jiddy",
    name: "Twerking jynxzi",
    description: "Brand new premium edit for jynxzi fans💪. Limited copies!!!",
    priceInCents: 9999,
    discount: null,
    images: ["/twerking-jynxzi.png"],
    newRelease: true,
    copies: 10,
    collectionId: "jynxzi",
    type: "video",
    videoUrl: "/twerking-edit.mp4",
  },
  {
    id: "heymar edit",
    name: "Neymar edit",
    description:
      "EVO CHRISTMAS DISCOUNT!!! This edit was made by me to ensure you get the best quality.",
    priceInCents: 12999,
    discount: 0.25,
    images: ["/neymar-edit.png"],
    newRelease: true,
    copies: 10,
    collectionId: "basketball",
    type: "video",
    videoUrl: "/neymar-edit.mp4",
  },
  {
    id: "clashroyale edit",
    name: "evo baby dragon and my evo log",
    description: "Look at this guy. Hes so cool.",
    priceInCents: 5699,
    discount: null,
    images: ["/baby-dragon.png"],
    newRelease: true,
    copies: 10,
    collectionId: "clashroyale",
    type: "video",
    videoUrl: "/baby-dragon-edit.mp4",
  },
  {
    id: "evo jiddy surprised",
    name: "evo jynxzi got surprised by his dad",
    description:
      "FOR SALE! EVO CHRISTMAS IS HERE!!! This video passionately shows us how a popular Twitch streamer - Jynxzi, decided to not make his first move through the game.",
    priceInCents: 49999,
    discount: 0.85,
    images: ["/jynxzi-dad.png"],
    newRelease: true,
    copies: 10,
    collectionId: "jynxzi",
    type: "video",
    videoUrl: "/jynxzi-dad.mp4",
  },
];

export const COLLECTIONS: Collection[] = [
  {
    id: "basketball",
    name: "The Legends of Sports",
    description: "Supercharged PFP's with all time GOATs.",
    image: "/basketball-collection.webp",
    newArrival: true,
  },
  {
    id: "clashroyale",
    name: "Clash of Royale GOATed profile pictures",
    description: "THATS WHY WE CLAAAASH",
    image: "/clashroyale-collection.jpg",
    newArrival: false,
  },
  {
    id: "jynxzi",
    name: "The Great Jiddlers",
    description: "Unleash full power with Jiddy profile pictures",
    image: "/jynxzi-collection.jpg",
    newArrival: true,
  },
];
