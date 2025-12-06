'use client';

import { PokemonList } from '@/components/pokemon/pokemon-list';
import { PokemonDetail } from '@/components/pokemon/pokemon-detail';
import { useState } from 'react';

export default function Home() {
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(null);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Pokemon API</h1>
        <p className="text-muted-foreground">
          Explore the world of Pokemon using the PokeAPI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <PokemonList onPokemonSelect={setSelectedPokemonId} />
        </div>
        <div>
          {selectedPokemonId ? (
            <PokemonDetail pokemonId={selectedPokemonId} />
          ) : (
            <div className="text-center text-muted-foreground py-12 border rounded-lg">
              <p className="text-lg">Select a Pokemon from the list to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
