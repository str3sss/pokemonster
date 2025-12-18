'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Carousel } from '@/components/retroui';
import { Alert } from '@/components/retroui/alert';
import { Badge } from '@/components/retroui/badge';
import { Button } from '@/components/retroui/button';
import { Card } from '@/components/retroui/card';
import { Loader } from '@/components/retroui/loader';
import { Progress } from '@/components/retroui/progress';
import {
  Tabs,
  TabsContent,
  TabsPanels,
  TabsTrigger,
  TabsTriggerList,
} from '@/components/retroui/tab';
import { Table } from '@/components/retroui/table';
import { Text } from '@/components/retroui/text';
import { usePokemonDetailGraphQL, usePokemonSpeciesGraphQL } from '@/services/graphql/hooks';

/**
 * Pokemon detail page component
 * Displays comprehensive information about a specific Pokemon
 */
const PokemonDetailPage = () => {
  const params = useParams();
  const id = params.id as string;

  // Use GraphQL to fetch Pokemon detail by ID (GraphQL accepts both name and ID as string)
  const { data, isError, isLoading } = usePokemonDetailGraphQL(id);
  const pokemon = data?.pokemon?.[0];

  // Use GraphQL to fetch species information
  const speciesId = pokemon?.pokemonspecy?.id;
  const speciesName = pokemon?.pokemonspecy?.name;
  const { data: speciesData } = usePokemonSpeciesGraphQL(
    speciesId || speciesName || '',
    !!(speciesId || speciesName),
  );

  if (isLoading) {
    return (
      <div className='container mx-auto flex min-h-screen items-center justify-center p-8'>
        <Loader size='lg' />
      </div>
    );
  }

  if (isError || !pokemon) {
    return (
      <div className='container mx-auto p-8'>
        <Alert status='error'>
          <Alert.Title>Ошибка загрузки</Alert.Title>
          <Alert.Description>
            Не удалось загрузить данные о покемоне. Попробуйте обновить страницу.
          </Alert.Description>
        </Alert>
        <div className='mt-4'>
          <Button asChild variant='outline'>
            <Link href='/pokemon'>Вернуться к списку</Link>
          </Button>
        </div>
      </div>
    );
  }

  /**
   * Gets type color class
   */
  const getTypeColor = (typeName: string): string => {
    const typeColors: Record<string, string> = {
      bug: 'bg-lime-400 text-lime-900',
      dark: 'bg-gray-700 text-gray-100',
      dragon: 'bg-indigo-600 text-indigo-100',
      electric: 'bg-yellow-400 text-yellow-900',
      fairy: 'bg-rose-300 text-rose-900',
      fighting: 'bg-orange-600 text-orange-100',
      fire: 'bg-red-400 text-red-900',
      flying: 'bg-indigo-300 text-indigo-900',
      ghost: 'bg-violet-500 text-violet-100',
      grass: 'bg-green-400 text-green-900',
      ground: 'bg-amber-600 text-amber-100',
      ice: 'bg-cyan-300 text-cyan-900',
      normal: 'bg-gray-300 text-gray-800',
      poison: 'bg-purple-400 text-purple-900',
      psychic: 'bg-pink-400 text-pink-900',
      rock: 'bg-stone-500 text-stone-100',
      steel: 'bg-slate-400 text-slate-900',
      water: 'bg-blue-400 text-blue-900',
    };
    return typeColors[typeName.toLowerCase()] || 'bg-gray-200 text-gray-800';
  };

  /**
   * Formats stat name
   */
  const formatStatName = (name: string): string => {
    return name
      .replaceAll('-', ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  /**
   * Calculates stat percentage
   */
  const getStatPercentage = (stat: number): number => {
    return Math.min((stat / 255) * 100, 100);
  };

  /**
   * Gets all available sprites from the sprites object
   */
  const getAllSprites = (): Array<{ key: string; url: string }> => {
    if (!pokemon || !pokemon.pokemonsprites?.[0]) return [];
    const sprites: Array<{ key: string; url: string }> = [];
    const spriteData = pokemon.pokemonsprites[0].sprites;

    if (spriteData.front_default) {
      sprites.push({ key: 'front_default', url: spriteData.front_default });
    }
    if (spriteData.back_default) {
      sprites.push({ key: 'back_default', url: spriteData.back_default });
    }
    if (spriteData.front_shiny) {
      sprites.push({ key: 'front_shiny', url: spriteData.front_shiny });
    }
    if (spriteData.back_shiny) {
      sprites.push({ key: 'back_shiny', url: spriteData.back_shiny });
    }
    if (spriteData.other?.['official-artwork']?.front_default) {
      sprites.push({
        key: 'official_artwork_front',
        url: spriteData.other['official-artwork'].front_default,
      });
    }
    if (spriteData.other?.['official-artwork']?.front_shiny) {
      sprites.push({
        key: 'official_artwork_front_shiny',
        url: spriteData.other['official-artwork'].front_shiny,
      });
    }
    if (spriteData.other?.home?.front_default) {
      sprites.push({
        key: 'home_front',
        url: spriteData.other.home.front_default,
      });
    }
    if (spriteData.other?.showdown?.front_default) {
      sprites.push({
        key: 'showdown_front',
        url: spriteData.other.showdown.front_default,
      });
    }

    return sprites;
  };

  /**
   * Formats sprite key name for display
   */
  const formatSpriteKey = (key: string): string => {
    return key
      .replaceAll('_', ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  /**
   * Formats ability name for display
   */
  const formatAbilityName = (name: string): string => {
    return name.replaceAll('-', ' ');
  };

  /**
   * Gets English flavor text
   */
  const getEnglishFlavorText = (): null | string => {
    if (!speciesData?.pokemonspecies?.[0]?.pokemonspeciesflavortexts?.[0]) return null;
    const flavorText = speciesData.pokemonspecies[0].pokemonspeciesflavortexts[0].flavor_text;
    return flavorText?.replaceAll('\f', ' ') || null;
  };

  /**
   * Gets English genus (not available in GraphQL, using name as fallback)
   */
  const getEnglishGenus = (): null | string => {
    // GraphQL doesn't provide genera, so we'll skip this for now
    return null;
  };

  if (!pokemon) {
    return (
      <div className='container mx-auto p-8'>
        <Alert status='error'>
          <Alert.Title>Ошибка загрузки</Alert.Title>
          <Alert.Description>
            Не удалось загрузить данные о покемоне. Попробуйте обновить страницу.
          </Alert.Description>
        </Alert>
        <div className='mt-4'>
          <Button asChild variant='outline'>
            <Link href='/pokemon'>Вернуться к списку</Link>
          </Button>
        </div>
      </div>
    );
  }

  const allSprites = getAllSprites();
  const flavorText = getEnglishFlavorText();
  const genus = getEnglishGenus();

  return (
    <div className='container mx-auto min-h-screen p-8'>
      <div className='mb-6'>
        <Button asChild variant='outline'>
          <Link href='/pokemon'>← Назад к списку</Link>
        </Button>
      </div>

      <div className='mx-auto max-w-6xl'>
        {/* Header Card */}
        <Card className='mb-6'>
          <Card.Content className='flex flex-col gap-6 md:flex-row'>
            {/* Pokemon Images */}
            <div className='flex shrink-0 flex-col gap-4'>
              {pokemon.pokemonsprites?.[0]?.sprites?.front_default && (
                <div className='rounded border-2 bg-white p-4'>
                  <Image
                    alt={`${pokemon.name} front`}
                    height={200}
                    src={pokemon.pokemonsprites[0].sprites.front_default}
                    width={200}
                  />
                </div>
              )}
              {pokemon.pokemonsprites?.[0]?.sprites?.back_default && (
                <div className='rounded border-2 bg-white p-4'>
                  <Image
                    alt={`${pokemon.name} back`}
                    height={200}
                    src={pokemon.pokemonsprites[0].sprites.back_default}
                    width={200}
                  />
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className='flex-1'>
              <div className='mb-4'>
                <Text as='h1' className='mb-2 text-4xl capitalize'>
                  {pokemon.name}
                </Text>
                <Text as='p' className='text-muted-foreground text-xl'>
                  #{String(pokemon.id).padStart(3, '0')}
                </Text>
              </div>

              {/* Types */}
              <div className='mb-4'>
                <Text as='h3' className='mb-2'>
                  Типы:
                </Text>
                <div className='flex flex-wrap gap-2'>
                  {pokemon.pokemontypes?.map((type, index) => (
                    <Badge
                      className={getTypeColor(type.type.name)}
                      key={`${type.type.name}-${index}`}
                      size='lg'
                    >
                      {type.type.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Basic Stats */}
              <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
                {pokemon.height !== undefined && pokemon.height !== null && (
                  <div>
                    <Text as='p' className='text-muted-foreground text-sm'>
                      Рост
                    </Text>
                    <Text as='p' className='text-lg font-semibold'>
                      {pokemon.height / 10} м
                    </Text>
                  </div>
                )}
                {pokemon.weight !== undefined && pokemon.weight !== null && (
                  <div>
                    <Text as='p' className='text-muted-foreground text-sm'>
                      Вес
                    </Text>
                    <Text as='p' className='text-lg font-semibold'>
                      {pokemon.weight / 10} кг
                    </Text>
                  </div>
                )}
                {pokemon.base_experience !== undefined && (
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

              {/* Species Info */}
              {genus && (
                <div className='mt-4'>
                  <Text as='p' className='text-muted-foreground text-sm'>
                    Категория
                  </Text>
                  <Text as='p' className='text-lg font-semibold'>
                    {genus}
                  </Text>
                </div>
              )}

              {/* Legendary/Mythical/Baby badges */}
              {(speciesData?.pokemonspecies?.[0]?.is_legendary ||
                speciesData?.pokemonspecies?.[0]?.is_mythical ||
                speciesData?.pokemonspecies?.[0]?.is_baby) && (
                <div className='mt-4 flex flex-wrap gap-2'>
                  {speciesData.pokemonspecies[0].is_legendary && (
                    <Badge size='lg' variant='surface'>
                      Легендарный
                    </Badge>
                  )}
                  {speciesData.pokemonspecies[0].is_mythical && (
                    <Badge size='lg' variant='surface'>
                      Мифический
                    </Badge>
                  )}
                  {speciesData.pokemonspecies[0].is_baby && (
                    <Badge size='lg' variant='surface'>
                      Детёныш
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </Card.Content>
        </Card>

        {/* Flavor Text */}
        {flavorText && (
          <Card className='mb-6'>
            <Card.Content className='p-4'>
              <Text as='h3' className='mb-2'>
                Описание
              </Text>
              <Text as='p' className='text-muted-foreground'>
                {flavorText}
              </Text>
            </Card.Content>
          </Card>
        )}

        {/* All Sprites Carousel */}
        {allSprites.length > 0 && (
          <Card className='mb-6'>
            <Card.Content className='p-4'>
              <Text as='h3' className='mb-4'>
                Все изображения ({allSprites.length})
              </Text>
              <Carousel
                className='mx-auto w-full max-w-4xl'
                opts={{
                  align: 'start',
                  loop: true,
                }}
              >
                <Carousel.Content>
                  {allSprites.map((sprite) => (
                    <Carousel.Item
                      className='basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4'
                      key={sprite.key}
                    >
                      <div className='flex flex-col items-center gap-2 p-2'>
                        <div className='rounded border-2 bg-white p-2'>
                          <Image
                            alt={`${pokemon.name} ${sprite.key}`}
                            className='object-contain'
                            height={120}
                            src={sprite.url}
                            width={120}
                          />
                        </div>
                        <Text as='p' className='text-muted-foreground text-center text-xs'>
                          {formatSpriteKey(sprite.key)}
                        </Text>
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel.Content>
                <Carousel.Previous />
                <Carousel.Next />
              </Carousel>
            </Card.Content>
          </Card>
        )}

        {/* Tabs for detailed information */}
        <Tabs>
          <TabsTriggerList>
            <TabsTrigger>Статистика</TabsTrigger>
            <TabsTrigger>Способности</TabsTrigger>
            <TabsTrigger>Движения</TabsTrigger>
            <TabsTrigger>Дополнительно</TabsTrigger>
          </TabsTriggerList>
          <TabsPanels>
            {/* Stats Tab */}
            <TabsContent>
              <div className='space-y-4'>
                {pokemon.pokemonstats?.map((stat) => (
                  <div key={stat.stat.name}>
                    <div className='mb-2 flex justify-between'>
                      <Text as='p' className='font-semibold capitalize'>
                        {formatStatName(stat.stat.name)}
                      </Text>
                      <Text as='p' className='font-semibold'>
                        {stat.base_stat}
                      </Text>
                    </div>
                    <Progress value={getStatPercentage(stat.base_stat)} />
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Abilities Tab */}
            <TabsContent>
              <div className='space-y-2'>
                {pokemon.pokemonabilities
                  ?.filter((ability) => ability.ability && ability.ability.name)
                  .map((ability) => (
                    <Card key={ability.ability.name}>
                      <Card.Content className='p-4'>
                        <div className='flex items-center justify-between'>
                          <Text as='p' className='font-semibold capitalize'>
                            {formatAbilityName(ability.ability.name)}
                          </Text>
                          {ability.is_hidden && (
                            <Badge size='sm' variant='surface'>
                              Скрытая
                            </Badge>
                          )}
                        </div>
                      </Card.Content>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            {/* Moves Tab */}
            <TabsContent>
              <div className='overflow-x-auto'>
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.Head>Название</Table.Head>
                      <Table.Head>Уровень изучения</Table.Head>
                      <Table.Head>Метод</Table.Head>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {pokemon.pokemonmoves?.slice(0, 50).map((move, index) => (
                      <Table.Row key={`${move.move.name}-${index}`}>
                        <Table.Cell className='capitalize'>
                          {move.move.name.replaceAll('-', ' ')}
                        </Table.Cell>
                        <Table.Cell>{move.level ?? '-'}</Table.Cell>
                        <Table.Cell className='capitalize'>
                          {move.movelearnmethod?.name.replaceAll('-', ' ') ?? '-'}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
                {pokemon.pokemonmoves && pokemon.pokemonmoves.length > 50 && (
                  <Text as='p' className='text-muted-foreground mt-2 text-sm'>
                    Показано 50 из {pokemon.pokemonmoves.length} движений
                  </Text>
                )}
              </div>
            </TabsContent>

            {/* Additional Info Tab */}
            <TabsContent>
              <div className='space-y-4'>
                {/* Species Info */}
                {speciesData?.pokemonspecies?.[0] && (
                  <>
                    {speciesData.pokemonspecies[0].capture_rate !== undefined &&
                      speciesData.pokemonspecies[0].capture_rate !== null && (
                        <div>
                          <Text as='p' className='text-muted-foreground text-sm'>
                            Шанс поимки
                          </Text>
                          <Text as='p' className='text-lg font-semibold'>
                            {speciesData.pokemonspecies[0].capture_rate} / 255
                          </Text>
                        </div>
                      )}
                    {speciesData.pokemonspecies[0].base_happiness !== undefined &&
                      speciesData.pokemonspecies[0].base_happiness !== null && (
                        <div>
                          <Text as='p' className='text-muted-foreground text-sm'>
                            Базовая дружелюбность
                          </Text>
                          <Text as='p' className='text-lg font-semibold'>
                            {speciesData.pokemonspecies[0].base_happiness} / 255
                          </Text>
                        </div>
                      )}
                    {speciesData.pokemonspecies[0].growthrate && (
                      <div>
                        <Text as='p' className='text-muted-foreground text-sm'>
                          Скорость роста
                        </Text>
                        <Text as='p' className='text-lg font-semibold capitalize'>
                          {speciesData.pokemonspecies[0].growthrate.name.replaceAll('-', ' ')}
                        </Text>
                      </div>
                    )}
                    {speciesData.pokemonspecies[0].pokemonegggroups &&
                      speciesData.pokemonspecies[0].pokemonegggroups.length > 0 && (
                        <div>
                          <Text as='h3' className='mb-2'>
                            Группы яиц:
                          </Text>
                          <div className='flex flex-wrap gap-2'>
                            {speciesData.pokemonspecies[0].pokemonegggroups.map((group, index) => (
                              <Badge key={group.egggroup.name || index} variant='outline'>
                                {group.egggroup.name.replaceAll('-', ' ')}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    {speciesData.pokemonspecies[0].pokemonhabitat && (
                      <div>
                        <Text as='h3' className='mb-2'>
                          Среда обитания:
                        </Text>
                        <Badge variant='outline'>
                          {speciesData.pokemonspecies[0].pokemonhabitat.name.replaceAll('-', ' ')}
                        </Badge>
                      </div>
                    )}
                    {speciesData.pokemonspecies[0].pokemoncolor && (
                      <div>
                        <Text as='h3' className='mb-2'>
                          Цвет:
                        </Text>
                        <Badge variant='outline'>
                          {speciesData.pokemonspecies[0].pokemoncolor.name.replaceAll('-', ' ')}
                        </Badge>
                      </div>
                    )}
                    {speciesData.pokemonspecies[0].generation && (
                      <div>
                        <Text as='h3' className='mb-2'>
                          Поколение:
                        </Text>
                        <Badge variant='outline'>
                          {speciesData.pokemonspecies[0].generation.name.replaceAll('-', ' ')}
                        </Badge>
                      </div>
                    )}
                  </>
                )}
              </div>
            </TabsContent>
          </TabsPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
