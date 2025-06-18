import { client } from "@/sanity/client";

export async function getProducts() {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    price,
    description,
    category,
    capacity,
    inStock,
    "image": image.asset->url,
    "images": images[].asset->url
  }`;

  const data = await client.fetch(query);
  return data;
}
