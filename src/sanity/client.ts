import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'n77ekxmv', // ✅ Replace with your actual project ID
  dataset: 'production',
  apiVersion: '2025-06-18',
  useCdn: true,
})
