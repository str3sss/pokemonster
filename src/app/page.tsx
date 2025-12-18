'use client';

import Image from 'next/image';

import { Card } from '@/components/retroui/card';
import { Text } from '@/components/retroui/text';
import { useApiV2PokemonRetrieve } from '@/services/generated/pokemon';

/**
 * Main page component displaying Pokemon information
 * Fetches and displays data for Pokemon with ID 25 (Pikachu)
 */
const Page = () => {
  const { data, isError, isLoading } = useApiV2PokemonRetrieve('25');

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Text as='p' className='text-xl'>
          Загрузка...
        </Text>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Text as='p' className='text-xl text-red-500'>
          Ошибка загрузки данных о покемоне
        </Text>
      </div>
    );
  }

  const pokemon = data.data;

  return (
    <div className='container mx-auto min-h-screen p-8'>
      <div className='mx-auto max-w-4xl'>
        <Card className='shadow-lg'>
          <Card.Content className='flex flex-col gap-6 md:flex-row'>
            {/* Pokemon Image */}
            <div className='shrink-0'>
              {pokemon.sprites.front_default ? (
                <Image
                  alt={pokemon.name}
                  className='h-auto w-full max-w-[300px]'
                  height={300}
                  src={pokemon.sprites.front_default}
                  width={300}
                />
              ) : (
                <div className='flex h-[300px] w-[300px] items-center justify-center bg-gray-200'>
                  <Text as='p'>Нет изображения</Text>
                </div>
              )}
            </div>

            {/* Pokemon Info */}
            <div className='flex-1 space-y-4'>
              <div>
                <Text as='h1' className='mb-2 capitalize'>
                  {pokemon.name}
                </Text>
                <Text as='p' className='text-muted-foreground'>
                  #{String(pokemon.id).padStart(3, '0')}
                </Text>
              </div>

              {/* Types */}
              <div>
                <Text as='h3' className='mb-2'>
                  Типы:
                </Text>
                <div className='flex flex-wrap gap-2'>
                  {pokemon.types.map((type) => (
                    <span
                      className='rounded bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 capitalize'
                      key={type.type.name}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div>
                <Text as='h3' className='mb-2'>
                  Характеристики:
                </Text>
                <div className='space-y-2'>
                  {pokemon.stats.map((stat) => (
                    <div className='flex items-center gap-2' key={stat.stat.name}>
                      <Text as='p' className='w-32 capitalize'>
                        {stat.stat.name.replace('-', ' ')}:
                      </Text>
                      <div className='flex-1'>
                        <div className='h-4 w-full overflow-hidden rounded-full bg-gray-200'>
                          <div
                            className='h-full bg-green-500 transition-all'
                            style={{ width: `${Math.min((stat.base_stat / 150) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                      <Text as='p' className='w-12 text-right font-semibold'>
                        {stat.base_stat}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>

              {/* Abilities */}
              <div>
                <Text as='h3' className='mb-2'>
                  Способности:
                </Text>
                <div className='flex flex-wrap gap-2'>
                  {pokemon.abilities.map((ability) => (
                    <span
                      className='rounded bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 capitalize'
                      key={ability.ability.name}
                    >
                      {ability.ability.name.replace('-', ' ')}
                      {ability.is_hidden && ' (скрытая)'}
                    </span>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
                {pokemon.height && (
                  <div>
                    <Text as='p' className='text-muted-foreground text-sm'>
                      Рост
                    </Text>
                    <Text as='p' className='text-lg font-semibold'>
                      {pokemon.height / 10} м
                    </Text>
                  </div>
                )}
                {pokemon.weight && (
                  <div>
                    <Text as='p' className='text-muted-foreground text-sm'>
                      Вес
                    </Text>
                    <Text as='p' className='text-lg font-semibold'>
                      {pokemon.weight / 10} кг
                    </Text>
                  </div>
                )}
                {pokemon.base_experience && (
                  <div>
                    <Text as='p' className='text-muted-foreground text-sm'>
                      Базовый опыт
                    </Text>
                    <Text as='p' className='text-lg font-semibold'>
                      {pokemon.base_experience}
                    </Text>
                  </div>
                )}
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default Page;
