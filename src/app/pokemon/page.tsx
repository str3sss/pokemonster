'use client';

import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { Alert } from '@/components/retroui/alert';
import { Badge } from '@/components/retroui/badge';
import { Button } from '@/components/retroui/button';
import { Card } from '@/components/retroui/card';
import { Input } from '@/components/retroui/input';
import { Loader } from '@/components/retroui/loader';
import { Text } from '@/components/retroui/text';
import { usePokemonListGraphQL } from '@/services/graphql/hooks';

const POKEMON_PER_PAGE = 24;

/**
 * Pokemon list page component
 * Displays a searchable list of Pokemon with pagination
 */
const PokemonListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [offset, setOffset] = useState(0);

  // Load all pokemon once for client-side search using GraphQL
  const { data: allPokemonData, isError, isLoading } = usePokemonListGraphQL(100_000, 0);

  const allPokemonList = allPokemonData?.pokemon || [];
  const totalCount = allPokemonData?.pokemon_aggregate?.aggregate?.count || 0;

  /**
   * Filters pokemon by search query (client-side lazy search)
   */
  const filteredPokemon = useMemo(() => {
    if (!searchQuery) {
      // When not searching, return paginated results
      return allPokemonList.slice(offset, offset + POKEMON_PER_PAGE);
    }
    // When searching, filter all pokemon and return all matches
    return allPokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [allPokemonList, searchQuery, offset]);

  const totalPages = Math.ceil(totalCount / POKEMON_PER_PAGE);
  const currentPage = Math.floor(offset / POKEMON_PER_PAGE) + 1;
  const hasNext = offset + POKEMON_PER_PAGE < totalCount;
  const hasPrevious = offset > 0;

  /**
   * Gets Pokemon ID (already available in GraphQL response)
   */
  const getPokemonId = (pokemon: { id: number; name: string }): string => {
    return String(pokemon.id);
  };

  /**
   * Gets Pokemon image URL
   */
  const getPokemonImageUrl = (id: string): string => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  };

  /**
   * Handles search input change
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setOffset(0); // Reset to first page on search
  };

  /**
   * Handles pagination
   */
  const handleNextPage = () => {
    if (hasNext) {
      setOffset((prev) => prev + POKEMON_PER_PAGE);
    }
  };

  /**
   * Handles previous page
   */
  const handlePreviousPage = () => {
    if (hasPrevious) {
      setOffset((prev) => Math.max(0, prev - POKEMON_PER_PAGE));
    }
  };

  if (isError) {
    return (
      <div className='container mx-auto p-8'>
        <Alert status='error'>
          <Alert.Title>Ошибка загрузки</Alert.Title>
          <Alert.Description>
            Не удалось загрузить список покемонов. Попробуйте обновить страницу.
          </Alert.Description>
        </Alert>
      </div>
    );
  }

  return (
    <div className='bg-background min-h-screen'>
      {/* Header Section */}
      <section className='bg-primary border-b-2 border-black'>
        <div className='container mx-auto px-4 py-12'>
          <div className='mx-auto max-w-4xl'>
            <Text as='h1' className='font-head mb-4 text-center text-4xl font-bold md:text-5xl'>
              Покемоны
            </Text>
            <Text as='p' className='text-muted-foreground mb-6 text-center'>
              Исследуйте коллекцию из более чем {totalCount || '1000'} покемонов
            </Text>
            <div className='relative mx-auto max-w-2xl'>
              <Search className='text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2' />
              <Input
                className='pr-4 pl-12'
                onChange={handleSearchChange}
                placeholder='Поиск покемонов по имени...'
                type='text'
                value={searchQuery}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className='container mx-auto px-4 py-8'>
        {isLoading ? (
          <div className='flex min-h-[400px] items-center justify-center'>
            <Loader size='lg' />
          </div>
        ) : (
          <>
            {filteredPokemon.length === 0 ? (
              <div className='mx-auto max-w-md'>
                <Alert status='info'>
                  <Alert.Title>Покемоны не найдены</Alert.Title>
                  <Alert.Description>Попробуйте изменить поисковый запрос.</Alert.Description>
                </Alert>
              </div>
            ) : (
              <>
                {/* Results Info */}
                <div className='mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row'>
                  <div>
                    <Text as='p' className='font-head text-lg font-semibold'>
                      Найдено покемонов: {filteredPokemon.length}
                      {searchQuery && ` по запросу "${searchQuery}"`}
                    </Text>
                  </div>
                  {!searchQuery && (
                    <Text as='p' className='text-muted-foreground text-sm'>
                      Страница {currentPage} из {totalPages}
                    </Text>
                  )}
                </div>

                {/* Pokemon Grid */}
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                  {filteredPokemon.map((pokemon) => {
                    const pokemonId = getPokemonId(pokemon);
                    const imageUrl = getPokemonImageUrl(pokemonId);

                    return (
                      <Link href={`/pokemon/${pokemonId}`} key={pokemon.name}>
                        <Card className='group cursor-pointer border-2 transition-all hover:-translate-y-1 hover:shadow-lg'>
                          <Card.Content className='flex flex-col items-center p-4'>
                            <div className='mb-3 flex h-24 w-24 items-center justify-center rounded-full border-2 border-black bg-white transition-transform group-hover:scale-110'>
                              {pokemonId && (
                                <Image
                                  alt={pokemon.name}
                                  className='h-auto w-full object-contain'
                                  height={96}
                                  src={imageUrl}
                                  width={96}
                                />
                              )}
                            </div>
                            <Text
                              as='h3'
                              className='mb-2 text-center text-sm font-semibold capitalize'
                            >
                              {pokemon.name}
                            </Text>
                            <Badge size='sm' variant='outline'>
                              #{pokemonId.padStart(3, '0')}
                            </Badge>
                          </Card.Content>
                        </Card>
                      </Link>
                    );
                  })}
                </div>

                {/* Pagination */}
                {!searchQuery && (hasNext || hasPrevious) && (
                  <div className='mt-12 flex flex-col items-center gap-4'>
                    <div className='flex items-center gap-4'>
                      <Button
                        disabled={!hasPrevious}
                        onClick={handlePreviousPage}
                        variant='outline'
                      >
                        ← Назад
                      </Button>
                      <div className='flex items-center gap-2'>
                        {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 7) {
                            pageNum = i + 1;
                          } else if (currentPage <= 4) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 3) {
                            pageNum = totalPages - 6 + i;
                          } else {
                            pageNum = currentPage - 3 + i;
                          }

                          const isActive = pageNum === currentPage;

                          return (
                            <Button
                              className={isActive ? 'bg-primary-hover' : ''}
                              key={pageNum}
                              onClick={() => setOffset((pageNum - 1) * POKEMON_PER_PAGE)}
                              size='sm'
                              variant={isActive ? 'default' : 'outline'}
                            >
                              {pageNum}
                            </Button>
                          );
                        })}
                      </div>
                      <Button disabled={!hasNext} onClick={handleNextPage} variant='outline'>
                        Вперед →
                      </Button>
                    </div>
                    <Text as='p' className='text-muted-foreground text-sm'>
                      Показано {offset + 1} - {Math.min(offset + POKEMON_PER_PAGE, totalCount)} из{' '}
                      {totalCount}
                    </Text>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default PokemonListPage;
