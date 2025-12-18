import { useQuery } from '@tanstack/react-query';

import { graphqlClient } from './client';
import { GET_POKEMON_DETAIL, GET_POKEMON_LIST, GET_POKEMON_SPECIES } from './queries';
import type {
  PokemonDetailResponse,
  PokemonListResponse,
  PokemonSpeciesDetailResponse,
} from './types';

/**
 * React Query hook to fetch Pokemon list using GraphQL
 * @param limit - Maximum number of Pokemon to fetch
 * @param offset - Number of Pokemon to skip
 * @returns React Query result with Pokemon list data
 */
export const usePokemonListGraphQL = (limit?: number, offset?: number) => {
  return useQuery<PokemonListResponse>({
    queryKey: ['pokemon-list-graphql', limit, offset],
    queryFn: async () => {
      return graphqlClient.request<PokemonListResponse>(GET_POKEMON_LIST, {
        limit,
        offset,
      });
    },
  });
};

/**
 * React Query hook to fetch Pokemon detail using GraphQL
 * @param id - Pokemon ID (number)
 * @param name - Pokemon name (string)
 * @param enabled - Whether the query should be enabled
 * @returns React Query result with Pokemon detail data
 */
export const usePokemonDetailGraphQL = (idOrName: string | number, enabled = true) => {
  const isNumeric = typeof idOrName === 'number' || !isNaN(Number(idOrName));
  const id = isNumeric ? Number(idOrName) : undefined;
  const name = isNumeric ? undefined : String(idOrName);

  return useQuery<PokemonDetailResponse>({
    queryKey: ['pokemon-detail-graphql', id, name],
    queryFn: async () => {
      return graphqlClient.request<PokemonDetailResponse>(GET_POKEMON_DETAIL, {
        id,
        name,
      });
    },
    enabled: enabled && (!!id || !!name),
  });
};

/**
 * React Query hook to fetch Pokemon species information using GraphQL
 * @param id - Pokemon species ID (number)
 * @param name - Pokemon species name (string)
 * @param enabled - Whether the query should be enabled
 * @returns React Query result with Pokemon species data
 */
export const usePokemonSpeciesGraphQL = (idOrName: string | number, enabled = true) => {
  const isNumeric = typeof idOrName === 'number' || !isNaN(Number(idOrName));
  const id = isNumeric ? Number(idOrName) : undefined;
  const name = isNumeric ? undefined : String(idOrName);

  return useQuery<PokemonSpeciesDetailResponse>({
    queryKey: ['pokemon-species-graphql', id, name],
    queryFn: async () => {
      return graphqlClient.request<PokemonSpeciesDetailResponse>(GET_POKEMON_SPECIES, {
        id,
        name,
      });
    },
    enabled: enabled && (!!id || !!name),
  });
};
