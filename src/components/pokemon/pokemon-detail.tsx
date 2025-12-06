'use client';

import { usePokemonRead } from '@/api/generated';
import type { Pokemon, PokemonType, PokemonAbility, PokemonStat } from '../../../api/models/Pokemon';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

interface PokemonDetailProps {
  pokemonId: number;
}

/**
 * Component for displaying detailed Pokemon information
 */
export function PokemonDetail({ pokemonId }: PokemonDetailProps) {
  const { data, isLoading, error } = usePokemonRead(pokemonId, {
    query: {
      select: (data) => {
        // Parse JSON string if needed
        if (typeof data === 'string') {
          return JSON.parse(data) as Pokemon;
        }
        return data as Pokemon;
      },
    },
  });

  if (error) {
    const errorMessage = typeof error === 'string' ? error : (error as Error)?.message || 'Unknown error';
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>Failed to load Pokemon: {errorMessage}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const pokemon = data as Pokemon | undefined;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!pokemon) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pokemon not found</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const imageUrl = pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-3xl capitalize">{pokemon.name}</CardTitle>
            <CardDescription>#{pokemon.id.toString().padStart(4, '0')}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {imageUrl && (
          <div className="flex justify-center">
            <Image src={imageUrl} alt={pokemon.name} width={256} height={256} className="h-64 w-64 object-contain" />
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold mb-2">Types</h3>
          <div className="flex gap-2 flex-wrap">
            {pokemon.types.map((type: PokemonType) => (
              <Badge key={type.slot} variant="secondary" className="capitalize">
                {type.type.name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Height</h3>
            <p className="text-2xl font-bold">{(pokemon.height / 10).toFixed(1)} m</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Weight</h3>
            <p className="text-2xl font-bold">{(pokemon.weight / 10).toFixed(1)} kg</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Base Experience</h3>
            <p className="text-2xl font-bold">{pokemon.base_experience}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Abilities</h3>
          <div className="flex gap-2 flex-wrap">
            {pokemon.abilities.map((ability: PokemonAbility) => (
              <Badge key={ability.ability.name} variant={ability.is_hidden ? 'default' : 'outline'} className="capitalize">
                {ability.ability.name}
                {ability.is_hidden && ' (Hidden)'}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Base Stats</h3>
          <div className="space-y-2">
            {pokemon.stats.map((stat: PokemonStat) => (
              <div key={stat.stat.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize">{stat.stat.name.replace('-', ' ')}</span>
                  <span className="font-medium">{stat.base_stat}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
