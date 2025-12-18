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
import {
  useApiV2PokemonRetrieve,
  useApiV2PokemonSpeciesRetrieve,
} from '@/services/generated/pokemon';

/**
 * Pokemon detail page component
 * Displays comprehensive information about a specific Pokemon
 */
const PokemonDetailPage = () => {
  const params = useParams();
  const id = params.id as string;

  const { data, isError, isLoading } = useApiV2PokemonRetrieve(id);
  const pokemon = data?.data;

  /**
   * Extracts species ID from URL
   */
  const getSpeciesId = (url: string): string => {
    const matches = url.match(/\/(\d+)\//);
    return matches ? matches[1] : '';
  };

  const speciesId = pokemon?.species.url ? getSpeciesId(pokemon.species.url) : null;
  const { data: speciesData } = useApiV2PokemonSpeciesRetrieve(speciesId || '', {
    query: { enabled: !!speciesId },
  });

  if (isLoading) {
    return (
      <div className='container mx-auto flex min-h-screen items-center justify-center p-8'>
        <Loader size='lg' />
      </div>
    );
  }

  if (isError || !data?.data) {
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
    if (!pokemon) return [];
    const sprites: Array<{ key: string; url: string }> = [];
    const spriteKeys = [
      'front_default',
      'back_default',
      'front_shiny',
      'back_shiny',
      'front_female',
      'back_female',
      'front_shiny_female',
      'back_shiny_female',
    ];

    for (const key of spriteKeys) {
      if (
        key in pokemon.sprites &&
        pokemon.sprites[key] &&
        typeof pokemon.sprites[key] === 'string'
      ) {
        sprites.push({ key, url: pokemon.sprites[key] as string });
      }
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
    if (!speciesData?.data?.flavor_text_entries) return null;
    const englishEntry = speciesData.data.flavor_text_entries.find(
      (entry) => entry.language.name === 'en',
    );
    return englishEntry?.flavor_text.replaceAll('\f', ' ') || null;
  };

  /**
   * Gets English genus
   */
  const getEnglishGenus = (): null | string => {
    if (!speciesData?.data?.genera) return null;
    const englishGenus = speciesData.data.genera.find((genus) => genus.language.name === 'en');
    return englishGenus?.genus || null;
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
              {pokemon.sprites.front_default && (
                <div className='rounded border-2 bg-white p-4'>
                  <Image
                    alt={`${pokemon.name} front`}
                    height={200}
                    src={pokemon.sprites.front_default}
                    width={200}
                  />
                </div>
              )}
              {'back_default' in pokemon.sprites && pokemon.sprites.back_default && (
                <div className='rounded border-2 bg-white p-4'>
                  <Image
                    alt={`${pokemon.name} back`}
                    height={200}
                    src={pokemon.sprites.back_default}
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
                  {pokemon.types.map((type) => (
                    <Badge className={getTypeColor(type.type.name)} key={type.slot} size='lg'>
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
              {(speciesData?.data?.is_legendary ||
                speciesData?.data?.is_mythical ||
                speciesData?.data?.is_baby) && (
                <div className='mt-4 flex flex-wrap gap-2'>
                  {speciesData.data.is_legendary && (
                    <Badge size='lg' variant='surface'>
                      Легендарный
                    </Badge>
                  )}
                  {speciesData.data.is_mythical && (
                    <Badge size='lg' variant='surface'>
                      Мифический
                    </Badge>
                  )}
                  {speciesData.data.is_baby && (
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
            {pokemon.past_types.length > 0 && <TabsTrigger>История типов</TabsTrigger>}
            {pokemon.past_abilities.length > 0 && <TabsTrigger>История способностей</TabsTrigger>}
          </TabsTriggerList>
          <TabsPanels>
            {/* Stats Tab */}
            <TabsContent>
              <div className='space-y-4'>
                {pokemon.stats.map((stat) => (
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
                {pokemon.abilities
                  .filter((ability) => ability.ability && ability.ability.name)
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
                    {pokemon.moves.slice(0, 50).map((move) => {
                      const versionDetail = move.version_group_details?.[0];
                      return (
                        <Table.Row key={move.move.name}>
                          <Table.Cell className='capitalize'>
                            {move.move.name.replaceAll('-', ' ')}
                          </Table.Cell>
                          <Table.Cell>{versionDetail?.level_learned_at ?? '-'}</Table.Cell>
                          <Table.Cell className='capitalize'>
                            {versionDetail?.move_learn_method?.name.replaceAll('-', ' ') ?? '-'}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
                {pokemon.moves.length > 50 && (
                  <Text as='p' className='text-muted-foreground mt-2 text-sm'>
                    Показано 50 из {pokemon.moves.length} движений
                  </Text>
                )}
              </div>
            </TabsContent>

            {/* Additional Info Tab */}
            <TabsContent>
              <div className='space-y-4'>
                {/* Forms */}
                {pokemon.forms.length > 0 && (
                  <div>
                    <Text as='h3' className='mb-2'>
                      Формы:
                    </Text>
                    <div className='flex flex-wrap gap-2'>
                      {pokemon.forms.map((form) => (
                        <Badge key={form.name} variant='outline'>
                          {form.name.replaceAll('-', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Held Items */}
                {pokemon.held_items.length > 0 && (
                  <div>
                    <Text as='h3' className='mb-2'>
                      Предметы:
                    </Text>
                    <div className='space-y-2'>
                      {pokemon.held_items.map((item, index) => (
                        <Card key={index}>
                          <Card.Content className='p-4'>
                            <Text as='p' className='capitalize'>
                              {item.item.name.replaceAll('-', ' ')}
                            </Text>
                          </Card.Content>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Game Indices */}
                {pokemon.game_indices.length > 0 && (
                  <div>
                    <Text as='h3' className='mb-2'>
                      Игры:
                    </Text>
                    <div className='flex flex-wrap gap-2'>
                      {pokemon.game_indices.map((game) => (
                        <Badge key={game.game_index} variant='outline'>
                          {game.version.name.replaceAll('-', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cries */}
                {pokemon.cries.latest && (
                  <div>
                    <Text as='h3' className='mb-2'>
                      Крики покемона:
                    </Text>
                    <div className='space-y-2'>
                      {pokemon.cries.latest && (
                        <div>
                          <Text as='p' className='text-muted-foreground text-sm'>
                            Последний:
                          </Text>
                          <audio className='w-full max-w-md' controls>
                            <source src={pokemon.cries.latest} type='audio/ogg' />
                            Ваш браузер не поддерживает аудио элемент.
                          </audio>
                        </div>
                      )}
                      {pokemon.cries.legacy && (
                        <div>
                          <Text as='p' className='text-muted-foreground text-sm'>
                            Устаревший:
                          </Text>
                          <audio className='w-full max-w-md' controls>
                            <source src={pokemon.cries.legacy} type='audio/ogg' />
                            Ваш браузер не поддерживает аудио элемент.
                          </audio>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Species Info */}
                {speciesData?.data && (
                  <>
                    {speciesData.data.capture_rate !== undefined && (
                      <div>
                        <Text as='p' className='text-muted-foreground text-sm'>
                          Шанс поимки
                        </Text>
                        <Text as='p' className='text-lg font-semibold'>
                          {speciesData.data.capture_rate} / 255
                        </Text>
                      </div>
                    )}
                    {speciesData.data.base_happiness !== undefined && (
                      <div>
                        <Text as='p' className='text-muted-foreground text-sm'>
                          Базовая дружелюбность
                        </Text>
                        <Text as='p' className='text-lg font-semibold'>
                          {speciesData.data.base_happiness} / 255
                        </Text>
                      </div>
                    )}
                    {speciesData.data.hatch_counter !== undefined &&
                      speciesData.data.hatch_counter !== null && (
                        <div>
                          <Text as='p' className='text-muted-foreground text-sm'>
                            Шаги до вылупления
                          </Text>
                          <Text as='p' className='text-lg font-semibold'>
                            {speciesData.data.hatch_counter * 255} шагов
                          </Text>
                        </div>
                      )}
                    {speciesData.data.growth_rate && (
                      <div>
                        <Text as='p' className='text-muted-foreground text-sm'>
                          Скорость роста
                        </Text>
                        <Text as='p' className='text-lg font-semibold capitalize'>
                          {speciesData.data.growth_rate.name.replaceAll('-', ' ')}
                        </Text>
                      </div>
                    )}
                    {speciesData.data.egg_groups.length > 0 && (
                      <div>
                        <Text as='h3' className='mb-2'>
                          Группы яиц:
                        </Text>
                        <div className='flex flex-wrap gap-2'>
                          {speciesData.data.egg_groups.map((group) => (
                            <Badge key={group.name} variant='outline'>
                              {group.name.replaceAll('-', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {speciesData.data.habitat && (
                      <div>
                        <Text as='h3' className='mb-2'>
                          Среда обитания:
                        </Text>
                        <Badge variant='outline'>
                          {speciesData.data.habitat.name.replaceAll('-', ' ')}
                        </Badge>
                      </div>
                    )}
                    {speciesData.data.color && (
                      <div>
                        <Text as='h3' className='mb-2'>
                          Цвет:
                        </Text>
                        <Badge variant='outline'>
                          {speciesData.data.color.name.replaceAll('-', ' ')}
                        </Badge>
                      </div>
                    )}
                    {speciesData.data.shape && (
                      <div>
                        <Text as='h3' className='mb-2'>
                          Форма:
                        </Text>
                        <Badge variant='outline'>
                          {speciesData.data.shape.name.replaceAll('-', ' ')}
                        </Badge>
                      </div>
                    )}
                  </>
                )}
              </div>
            </TabsContent>

            {/* Past Types Tab */}
            {pokemon.past_types.length > 0 && (
              <TabsContent>
                <div className='space-y-4'>
                  {pokemon.past_types
                    .filter((pastType) => pastType.generation && pastType.generation.name)
                    .map((pastType, index) => (
                      <Card key={index}>
                        <Card.Content className='p-4'>
                          <Text as='h4' className='mb-2'>
                            Поколение:{' '}
                            {pastType.generation?.name.replaceAll('-', ' ').toUpperCase()}
                          </Text>
                          <div className='flex flex-wrap gap-2'>
                            {pastType.types
                              .filter((type) => type?.type && type.type.name)
                              .map((type) => (
                                <Badge
                                  className={getTypeColor(type.type.name)}
                                  key={type.slot}
                                  size='lg'
                                >
                                  {type.type.name}
                                </Badge>
                              ))}
                          </div>
                        </Card.Content>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            )}

            {/* Past Abilities Tab */}
            {pokemon.past_abilities.length > 0 && (
              <TabsContent>
                <div className='space-y-4'>
                  {pokemon.past_abilities
                    .filter((pastAbility) => pastAbility.generation && pastAbility.generation.name)
                    .map((pastAbility, index) => (
                      <Card key={index}>
                        <Card.Content className='p-4'>
                          <Text as='h4' className='mb-2'>
                            Поколение:{' '}
                            {pastAbility.generation?.name.replaceAll('-', ' ').toUpperCase()}
                          </Text>
                          <div className='space-y-2'>
                            {pastAbility.abilities
                              .filter((ability) => ability?.ability && ability.ability.name)
                              .map((ability, abilityIndex) => (
                                <div
                                  className='flex items-center justify-between'
                                  key={ability.ability.name || `ability-${abilityIndex}`}
                                >
                                  <Text as='p' className='font-semibold capitalize'>
                                    {formatAbilityName(ability.ability.name)}
                                  </Text>
                                  {ability.is_hidden && (
                                    <Badge size='sm' variant='surface'>
                                      Скрытая
                                    </Badge>
                                  )}
                                </div>
                              ))}
                          </div>
                        </Card.Content>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            )}
          </TabsPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
