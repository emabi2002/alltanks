// schemas/product.ts

export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    { name: "id", title: "ID", type: "string" },
    { name: "name", title: "Name", type: "string" },
    { name: "category", title: "Category", type: "string" },
    { name: "description", title: "Description", type: "text" },
    { name: "shortDescription", title: "Short Description", type: "string" },
    { name: "price", title: "Price", type: "number" },
    { name: "originalPrice", title: "Original Price", type: "number" },
    { name: "capacity", title: "Capacity (L)", type: "number" },
    {
      name: "dimensions",
      title: "Dimensions",
      type: "object",
      fields: [
        { name: "diameter", title: "Diameter (cm)", type: "number" },
        { name: "height", title: "Height (cm)", type: "number" },
      ],
    },
    {
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "specifications",
      title: "Specifications",
      type: "object",
      fields: [
        { name: "material", title: "Material", type: "string" },
        { name: "wallThickness", title: "Wall Thickness", type: "string" },
        { name: "inletSize", title: "Inlet Size", type: "string" },
        { name: "outletSize", title: "Outlet Size", type: "string" },
        { name: "weight", title: "Weight", type: "string" },
        { name: "uvRating", title: "UV Rating", type: "string" },
        { name: "warranty", title: "Warranty", type: "string" },
      ],
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
    },
    {
      name: "colors",
      title: "Available Colors",
      type: "array",
      of: [{ type: "string" }],
    },
    { name: "inStock", title: "In Stock", type: "boolean" },
    { name: "leadTime", title: "Lead Time", type: "string" },
    { name: "isBestSeller", title: "Best Seller", type: "boolean" },
    { name: "isNew", title: "New Product", type: "boolean" },
  ],
};
