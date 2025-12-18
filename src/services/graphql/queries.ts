import { gql } from 'graphql-request';

/**
 * GraphQL query to fetch a list of Pokemon
 */
export const GET_POKEMON_LIST = gql`
  query GetPokemonList($limit: Int, $offset: Int) {
    pokemon(limit: $limit, offset: $offset) {
      id
      name
    }
    pokemon_aggregate {
      aggregate {
        count
      }
    }
  }
`;

/**
 * GraphQL query to fetch detailed Pokemon information
 */
export const GET_POKEMON_DETAIL = gql`
  query GetPokemonDetail($id: Int, $name: String) {
    pokemon(where: { _or: [{ id: { _eq: $id } }, { name: { _eq: $name } }] }, limit: 1) {
      id
      name
      base_experience
      height
      weight
      pokemonsprites {
        sprites
      }
      pokemontypes {
        slot
        type {
          name
        }
      }
      pokemonabilities {
        is_hidden
        ability {
          name
        }
      }
      pokemonstats {
        base_stat
        stat {
          name
        }
      }
      pokemonmoves {
        level
        move {
          name
        }
        movelearnmethod {
          name
        }
      }
      pokemonspecy {
        id
        name
      }
    }
  }
`;

/**
 * GraphQL query to fetch Pokemon species information
 */
export const GET_POKEMON_SPECIES = gql`
  query GetPokemonSpecies($id: Int, $name: String) {
    pokemonspecies(where: { _or: [{ id: { _eq: $id } }, { name: { _eq: $name } }] }, limit: 1) {
      id
      name
      base_happiness
      capture_rate
      pokemoncolor {
        name
      }
      pokemonegggroups {
        egggroup {
          name
        }
      }
      pokemonspeciesflavortexts(where: { language_id: { _eq: 9 } }, limit: 1) {
        flavor_text
        language {
          name
        }
        version {
          name
        }
      }
      generation {
        name
      }
      growthrate {
        name
      }
      pokemonhabitat {
        name
      }
      is_baby
      is_legendary
      is_mythical
      pokemonspeciesnames(where: { language_id: { _eq: 9 } }) {
        name
        language {
          name
        }
      }
    }
  }
`;
