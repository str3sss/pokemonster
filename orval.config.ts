export default {
  pokemon: {
    input: './api/poke.yml',
    output: {
      mode: 'tags-split',
      target: 'src/api/generated',
      schemas: 'api/generated',
      client: 'react-query',
      mock: false,
      override: {
        mutator: {
          path: './src/api/mutator.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useInfinite: false,
          useInfiniteQueryParam: 'offset',
        },
      },
    },
  },
};
