/**
 * Type definitions for PokeAPI GraphQL responses
 */

export interface PokemonListItem {
  id: number;
  name: string;
}

export interface PokemonListResponse {
  pokemon: PokemonListItem[];
  pokemon_aggregate: {
    aggregate: {
      count: number;
    };
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
  };
}

export interface PokemonAbility {
  is_hidden: boolean;
  ability: {
    name: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonMove {
  level: number;
  move: {
    name: string;
  };
  movelearnmethod: {
    name: string;
  };
}

export interface PokemonSprites {
  front_default?: string | null;
  front_shiny?: string | null;
  back_default?: string | null;
  back_shiny?: string | null;
  other?: {
    'official-artwork'?: {
      front_default?: string | null;
      front_shiny?: string | null;
    };
    home?: {
      front_default?: string | null;
      front_shiny?: string | null;
    };
    showdown?: {
      front_default?: string | null;
      front_shiny?: string | null;
      back_default?: string | null;
      back_shiny?: string | null;
    };
    dream_world?: {
      front_default?: string | null;
    };
  };
}

export interface PokemonSpeciesReference {
  id: number;
  name: string;
}

export interface PokemonDetailResponse {
  pokemon: Array<{
    id: number;
    name: string;
    base_experience: number | null;
    height: number;
    weight: number;
    pokemonsprites: Array<{
      sprites: PokemonSprites;
    }>;
    pokemontypes: PokemonType[];
    pokemonabilities: PokemonAbility[];
    pokemonstats: PokemonStat[];
    pokemonmoves: PokemonMove[];
    pokemonspecy: PokemonSpeciesReference;
  }>;
}

export interface PokemonSpeciesColor {
  name: string;
}

export interface PokemonSpeciesEggGroup {
  egggroup: {
    name: string;
  };
}

export interface PokemonSpeciesFlavorText {
  flavor_text: string;
  language: {
    name: string;
  };
  version: {
    name: string;
  };
}

export interface PokemonSpeciesGeneration {
  name: string;
}

export interface PokemonSpeciesGrowthRate {
  name: string;
}

export interface PokemonSpeciesHabitat {
  name: string;
}

export interface PokemonSpeciesName {
  name: string;
  language: {
    name: string;
  };
}

export interface PokemonSpeciesDetailResponse {
  pokemonspecies: Array<{
    id: number;
    name: string;
    base_happiness: number | null;
    capture_rate: number | null;
    pokemoncolor: PokemonSpeciesColor | null;
    pokemonegggroups: PokemonSpeciesEggGroup[];
    pokemonevolutions: Array<{
      evolution_chain_id: number;
    }>;
    pokemonspecies: Array<{
      name: string;
    }>;
    pokemonspeciesflavortexts: PokemonSpeciesFlavorText[];
    generation: PokemonSpeciesGeneration | null;
    growthrate: PokemonSpeciesGrowthRate | null;
    pokemonhabitat: PokemonSpeciesHabitat | null;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    pokemonspeciesnames: PokemonSpeciesName[];
  }>;
}
