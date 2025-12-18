'use client';

import { ChevronDown, Coffee, Heart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/retroui/button';
import { Text } from '@/components/retroui/text';
import { cn } from '@/components/ui/utils';

/**
 * Navigation component for the Pokemon app
 * Two-tiered navigation with announcement bar and main navigation
 */
const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/pokemon', label: 'Покемоны' },
    { href: '/berries', label: 'Ягоды' },
    { href: '/locations', label: 'Локации' },
  ];

  return (
    <header className='border-b-2 border-black'>
      {/* Announcement Bar */}
      <div className='overflow-hidden border-b-2 border-black bg-purple-200'>
        <div className='container mx-auto flex items-center justify-between px-4 py-2'>
          <div className='flex-1 overflow-hidden'>
            <div className='animate-marquee flex items-center gap-8 whitespace-nowrap'>
              {Array.from({ length: 8 }).map((_, i) => (
                <div className='flex items-center gap-1' key={i}>
                  <Heart className='h-3 w-3 shrink-0 fill-pink-500 text-pink-500' />
                  <Text as='span' className='text-xs font-medium text-white'>
                    Подпишитесь на рассылку
                  </Text>
                </div>
              ))}
            </div>
          </div>
          <button
            className='ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-black bg-pink-200 transition-colors hover:bg-pink-300'
            type='button'
          >
            <ChevronDown className='h-3 w-3' />
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className='border-b-2 border-black bg-[#F5F0E6]'>
        <div className='container mx-auto flex items-center'>
          {/* Left Section - Brand */}
          <div className='border-r-2 border-black px-6 py-4'>
            <Link href='/'>
              <Text as='h1' className='font-head text-xl font-bold'>
                Pokemonster
              </Text>
            </Link>
          </div>

          {/* Middle Section - Navigation Links */}
          <div className='flex flex-1 items-center justify-center border-r-2 border-black px-6 py-4'>
            <div className='flex gap-8'>
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    className={cn(
                      'text-sm font-medium transition-colors',
                      isActive
                        ? 'text-foreground font-semibold'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                    href={item.href}
                    key={item.href}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Section - Action Buttons */}
          <div className='flex items-center gap-0'>
            <div className='border-r-2 border-black px-6 py-4'>
              <Button asChild size='sm' variant='outline'>
                <Link href='/contact'>Связаться</Link>
              </Button>
            </div>
            <div className='px-4 py-4'>
              <button
                className='flex h-10 w-10 items-center justify-center border-2 border-black bg-green-200 transition-colors hover:bg-green-300'
                type='button'
              >
                <Coffee className='h-5 w-5' />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export { Navigation };
