"use client";
import { COLLECTIONS } from "@/lib/products";
import { CollectionCard } from "@/components/collection-card";
import { trpc } from "../_trpc/client";
import { UpgCollectionCard } from "@/components/UpgCollectionCard";

const ItemsPage = () => {
  const collections = trpc.getCollections.useQuery();
  return (
    <main className="container mx-auto px-4 py-12 mt-[9vh]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.data?.length !== 0 &&
          collections.data?.map((collection) => (
            <UpgCollectionCard key={collection.id} collection={collection}></UpgCollectionCard>
          ))}
        {COLLECTIONS.length !== 0
          ? COLLECTIONS.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))
          : null}
      </div>
    </main>
  );
};

export default ItemsPage;
