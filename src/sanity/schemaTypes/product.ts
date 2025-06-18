export default {
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    { name: 'id', title: 'Product ID', type: 'string' },
    { name: 'name', title: 'Product Name', type: 'string' },
    { name: 'price', title: 'Price (Kina)', type: 'number' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'capacity', title: 'Capacity (L)', type: 'number' },
    { name: 'inStock', title: 'In Stock', type: 'boolean' },
    {
      name: 'image',
      title: 'Main Product Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image' }],
    },
  ]
}
