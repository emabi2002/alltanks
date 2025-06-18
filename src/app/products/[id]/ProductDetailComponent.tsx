// src/app/products/[id]/ProductDetailComponent.tsx

"use client";

import { useEffect, useState } from "react";
import { getProductById } from "@/lib/products";
import type { Product } from "@/lib/products";

interface ProductDetailProps {
  id: string;
}

export default function ProductDetailComponent({ id }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id);
      if (data) {
        setProduct(data);
        if (!selectedColor && data.colors?.length > 0) {
          setSelectedColor(data.colors[0]);
        }
      }
    };

    fetchProduct();
  }, [id, selectedColor]);

  if (!product) {
    return <div className="p-8 text-center">Loading product details...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.shortDescription}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-auto rounded shadow"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="mb-4 text-gray-700">{product.description}</p>

          <h3 className="text-lg font-semibold mb-1">Specifications:</h3>
          <ul className="list-disc pl-5 mb-4 text-sm text-gray-700">
            {Object.entries(product.specifications).map(([key, value]) => (
              <li key={key}><strong>{key}:</strong> {value}</li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold mb-1">Features:</h3>
          <ul className="list-disc pl-5 mb-4 text-sm text-gray-700">
            {product.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>

          {product.colors.length > 0 && (
            <div className="mb-4">
              <label className="font-semibold mr-2">Color:</label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1"
              >
                {product.colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
          )}

          <p className="text-xl font-bold text-blue-700 mb-2">
            Price: K{product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">Lead Time: {product.leadTime}</p>
        </div>
      </div>
    </div>
  );
}
