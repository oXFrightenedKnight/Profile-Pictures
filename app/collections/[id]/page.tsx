"use client";
import { useParams } from "next/navigation";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { ProductCardVideo } from "@/components/video-card";

const ItemsPage = () => {
  const params = useParams();
  const collectionId = params.id;

  const products = PRODUCTS.filter((product) => product.collectionId === collectionId);

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length !== 0
          ? products.map((product) =>
              product.type === "photo" ? (
                <ProductCard key={product.id} product={product} />
              ) : (
                <ProductCardVideo key={product.id} product={product}></ProductCardVideo>
              )
            )
          : null}
      </div>
    </main>
  );
};

export default ItemsPage;
