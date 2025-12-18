// eslint-disable-next-line import/no-anonymous-default-export
export default {
  pokemon: {
    input: './api/openapi.yml',

    output: {
      mode: 'tags-split',
      target: 'src/api/generated',
      schemas: 'src/api/models',
      client: 'react-query',
      mock: false,
      // override: {
      //   mutator: {
      //     path: './src/api/mutator.ts',
      //     name: 'customInstance',
      //   },
      //   query: {
      //     useQuery: true,
      //     useInfinite: false,
      //     useInfiniteQueryParam: 'offset',
      //   },
      // },
    },
  },
};
