import { GraphQLClient } from 'graphql-request';

/**
 * GraphQL client for PokeAPI
 * Endpoint: https://graphql.pokeapi.co/v1beta2
 * Rate limit: 200 calls per hour
 */
export const graphqlClient = new GraphQLClient('https://graphql.pokeapi.co/v1beta2', {
  headers: {
    'Content-Type': 'application/json',
  },
});
