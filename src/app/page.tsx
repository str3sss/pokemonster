'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

import { Badge } from '@/components/retroui/badge';
import { Button } from '@/components/retroui/button';
import { Card } from '@/components/retroui/card';
import { Loader } from '@/components/retroui/loader';
import { Text } from '@/components/retroui/text';
import { useApiV2PokemonList } from '@/services/generated/pokemon';

/**
 * Main page component
 * Displays hero section, featured Pokemon, and quick links
 */
const Page = () => {
  const { data: pokemonData, isLoading } = useApiV2PokemonList({
    limit: 6,
    offset: 0,
  });

  const featuredPokemon = pokemonData?.data?.results || [];

  /**
   * Extracts Pokemon ID from URL
   */
  const getPokemonId = (url: string): string => {
    const matches = url.match(/\/(\d+)\//);
    return matches ? matches[1] : '';
  };

  /**
   * Gets Pokemon image URL
   */
  const getPokemonImageUrl = (id: string): string => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  };

  /**
   * Gets type color class
   */
  const getTypeColor = (typeName: string): string => {
    const typeColors: Record<string, string> = {
      normal: 'bg-gray-300 text-gray-800',
      fire: 'bg-red-400 text-red-900',
      water: 'bg-blue-400 text-blue-900',
      electric: 'bg-yellow-400 text-yellow-900',
      grass: 'bg-green-400 text-green-900',
      ice: 'bg-cyan-300 text-cyan-900',
      fighting: 'bg-orange-600 text-orange-100',
      poison: 'bg-purple-400 text-purple-900',
      ground: 'bg-amber-600 text-amber-100',
      flying: 'bg-indigo-300 text-indigo-900',
      psychic: 'bg-pink-400 text-pink-900',
      bug: 'bg-lime-400 text-lime-900',
      rock: 'bg-stone-500 text-stone-100',
      ghost: 'bg-violet-500 text-violet-100',
      dragon: 'bg-indigo-600 text-indigo-100',
      dark: 'bg-gray-700 text-gray-100',
      steel: 'bg-slate-400 text-slate-900',
      fairy: 'bg-rose-300 text-rose-900',
    };
    return typeColors[typeName.toLowerCase()] || 'bg-gray-200 text-gray-800';
  };

  const quickLinks = [
    {
      href: '/pokemon',
      title: 'Покемоны',
      description: 'Исследуйте коллекцию из более чем 1000 покемонов',
      icon: '⚡',
    },
    {
      href: '/berries',
      title: 'Ягоды',
      description: 'Откройте для себя различные виды ягод и их свойства',
      icon: '🍓',
    },
    {
      href: '/locations',
      title: 'Локации',
      description: 'Изучите города и регионы мира покемонов',
      icon: '🗺️',
    },
  ];

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='bg-primary border-b-2 border-black'>
        <div className='container mx-auto px-4 py-16 md:py-24'>
          <div className='mx-auto max-w-3xl text-center'>
            <div className='mb-6 flex items-center justify-center gap-2'>
              <Sparkles className='h-8 w-8' />
              <Text as='h1' className='font-head text-4xl font-bold md:text-6xl'>
                Добро пожаловать в Pokemonster
              </Text>
              <Sparkles className='h-8 w-8' />
            </div>
            <Text as='p' className='text-muted-foreground mb-8 text-lg md:text-xl'>
              Ваш путеводитель по миру покемонов. Исследуйте покемонов, ягоды, локации и многое
              другое!
            </Text>
            <div className='flex flex-wrap items-center justify-center gap-4'>
              <Button asChild size='lg'>
                <Link href='/pokemon'>
                  Начать исследование
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Link>
              </Button>
              <Button asChild size='lg' variant='outline'>
                <Link href='/berries'>Узнать больше</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className='bg-background border-b-2 border-black py-12'>
        <div className='container mx-auto px-4'>
          <Text as='h2' className='font-head mb-8 text-center text-3xl font-bold'>
            Быстрый доступ
          </Text>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            {quickLinks.map((link) => (
              <Link href={link.href} key={link.href}>
                <Card className='h-full cursor-pointer transition-all hover:shadow-lg'>
                  <Card.Content className='flex flex-col items-center p-6 text-center'>
                    <Text as='span' className='mb-4 text-5xl'>
                      {link.icon}
                    </Text>
                    <Text as='h3' className='font-head mb-2 text-xl font-bold'>
                      {link.title}
                    </Text>
                    <Text as='p' className='text-muted-foreground text-sm'>
                      {link.description}
                    </Text>
                  </Card.Content>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Pokemon Section */}
      <section className='bg-background border-b-2 border-black py-12'>
        <div className='container mx-auto px-4'>
          <div className='mb-8 flex items-center justify-between'>
            <Text as='h2' className='font-head text-3xl font-bold'>
              Популярные покемоны
            </Text>
            <Button asChild variant='outline'>
              <Link href='/pokemon'>
                Смотреть все
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className='flex items-center justify-center py-12'>
              <Loader size='lg' />
            </div>
          ) : (
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6'>
              {featuredPokemon.map((pokemon) => {
                const pokemonId = getPokemonId(pokemon.url);
                const imageUrl = getPokemonImageUrl(pokemonId);

                return (
                  <Link href={`/pokemon/${pokemonId}`} key={pokemon.name}>
                    <Card className='cursor-pointer transition-all hover:shadow-lg'>
                      <Card.Content className='flex flex-col items-center p-4'>
                        {pokemonId && (
                          <div className='mb-2'>
                            <Image
                              alt={pokemon.name}
                              className='h-auto w-full'
                              height={96}
                              src={imageUrl}
                              width={96}
                            />
                          </div>
                        )}
                        <Text as='h3' className='mb-1 text-center text-sm font-semibold capitalize'>
                          {pokemon.name}
                        </Text>
                        <Badge variant='outline' size='sm'>
                          #{pokemonId.padStart(3, '0')}
                        </Badge>
                      </Card.Content>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className='bg-accent border-b-2 border-black py-12'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
            <div className='text-center'>
              <Text as='p' className='font-head mb-2 text-4xl font-bold'>
                1000+
              </Text>
              <Text as='p' className='text-muted-foreground text-sm'>
                Покемонов
              </Text>
            </div>
            <div className='text-center'>
              <Text as='p' className='font-head mb-2 text-4xl font-bold'>
                64
              </Text>
              <Text as='p' className='text-muted-foreground text-sm'>
                Ягод
              </Text>
            </div>
            <div className='text-center'>
              <Text as='p' className='font-head mb-2 text-4xl font-bold'>
                800+
              </Text>
              <Text as='p' className='text-muted-foreground text-sm'>
                Локаций
              </Text>
            </div>
            <div className='text-center'>
              <Text as='p' className='font-head mb-2 text-4xl font-bold'>
                18
              </Text>
              <Text as='p' className='text-muted-foreground text-sm'>
                Типов
              </Text>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
