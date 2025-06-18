// src/app/products/[id]/page.tsx

import { Metadata } from "next";
import { generateProductSEO } from "@/lib/seo";
import { getProductById, getAllProducts } from "@/lib/products";
import ProductDetailComponent from "./ProductDetailComponent";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await getProductById(params.id);

  if (!product) {
    return {
      title: "Product Not Found | All Tanks Limited",
      description: "The requested product could not be found.",
    };
  }

  const productType =
    product.category === "water-tanks"
      ? "Water Tank"
      : product.category === "septic-tanks"
      ? "Septic Tank"
      : product.category === "chemical-tanks"
      ? "Chemical Tank"
      : product.category === "feed-troughs"
      ? "Feed Trough"
      : "Tank";

  return generateProductSEO(product.name, productType, product.capacity);
}

export default function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  return <ProductDetailComponent id={params.id} />;
}

// ✅ Static export support
export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}
