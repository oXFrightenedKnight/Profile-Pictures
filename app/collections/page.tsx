"use client";
import { COLLECTIONS } from "@/lib/products";
import { CollectionCard } from "@/components/collection-card";

const ItemsPage = () => {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
