// src/app/products/page.tsx
import { getAllProducts } from '@/sanity/queries/getProducts'

export default async function ProductsPage() {
  const products = await getAllProducts()

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <div
            key={product._id}
            className="border rounded-xl p-4 shadow-md bg-white"
          >
            {product.image && (
              <img
                src={product.image.asset?.url}
                alt={product.name}
                className="w-full h-40 object-contain mb-3"
              />
            )}
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600 text-sm">{product.category}</p>
            <p className="font-bold mt-2">K{product.price}</p>
            <p className="text-sm mt-1">{product.capacity}L capacity</p>
          </div>
        ))}
      </div>
    </main>
  )
}
