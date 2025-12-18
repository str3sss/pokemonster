import { defineConfig } from 'orval';

export default defineConfig({
  pokemon: {
    input: {
      target: './services/openapi.yml',
      filters: {
        mode: 'exclude',
        tags: ['evolution', 'berries', 'items', 'machines', 'location', 'contest', 'moves', 'encounters', 'games'],
      },
    },
    output: {
      httpClient: 'fetch',
      mode: 'tags-split',
      // mock: true,
      target: 'src/services/generated/target',
      schemas: 'src/shared/generated/schemas',
      client: 'react-query',
    },
  },
});
