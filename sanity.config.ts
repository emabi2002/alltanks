'use client';

import { defineConfig } from 'sanity';
import { visionTool } from '@sanity/vision';
import { apiVersion, dataset, projectId } from './src/sanity/env';

// ✅ Only import your schema
import product from './src/sanity/schemaTypes/product';

const schema = {
  types: [product],
};

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
