'use client';

import { usePokemonListParsed } from '@/api/hooks';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';

interface PokemonListProps {
  onPokemonSelect?: (id: number) => void;
}

/**
 * Component for displaying a list of Pokemon
 */
export function PokemonList({ onPokemonSelect }: PokemonListProps) {
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const { data: pokemonData, isLoading, error } = usePokemonListParsed({ limit, offset });

  if (error) {
    const errorMessage = typeof error === 'string' ? error : error?.message || 'Unknown error';
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>
            Failed to load Pokemon: {errorMessage}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }


  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Pokemon List</CardTitle>
          <CardDescription>
            {pokemonData ? `Total: ${pokemonData.count} Pokemon` : 'Loading...'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          ) : pokemonData ? (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {pokemonData.results.map((pokemon) => {
                  // Extract Pokemon ID from URL
                  const id = parseInt(
                    pokemon.url.split('/').filter(Boolean).pop() || '0',
                    10
                  );
                  return (
                    <Card
                      key={pokemon.name}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => onPokemonSelect?.(id)}
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg capitalize">
                          {pokemon.name}
                        </CardTitle>
                        <CardDescription>#{id.toString().padStart(4, '0')}</CardDescription>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  onClick={() => setOffset(Math.max(0, offset - limit))}
                  disabled={!pokemonData.previous || isLoading}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Showing {offset + 1} - {Math.min(offset + limit, pokemonData.count)} of{' '}
                  {pokemonData.count}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setOffset(offset + limit)}
                  disabled={!pokemonData.next || isLoading}
                >
                  Next
                </Button>
              </div>
            </>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}

