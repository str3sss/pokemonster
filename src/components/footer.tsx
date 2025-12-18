'use client';

import Link from 'next/link';
import { Globe, Instagram, Linkedin, MessageCircle, Twitter } from 'lucide-react';

import { Text } from '@/components/retroui/text';

/**
 * Footer component for the Pokemon app
 * Displays brand information, navigation links, and legal information
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { href: '/pokemon', label: 'Покемоны' },
    { href: '/berries', label: 'Ягоды' },
    { href: '/locations', label: 'Локации' },
  ];

  const companyLinks = [
    { href: '/about', label: 'О нас' },
    { href: '/careers', label: 'Карьера' },
    { href: '/press', label: 'Пресса' },
    { href: '/partners', label: 'Партнеры' },
  ];

  const supportLinks = [
    { href: '/help', label: 'Помощь' },
    { href: '/docs', label: 'Документация' },
    { href: '/community', label: 'Сообщество' },
    { href: '/contact', label: 'Контакты' },
  ];

  const socialLinks = [
    { icon: MessageCircle, href: '#', label: 'Message' },
    { icon: Globe, href: '#', label: 'Website' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className='bg-background border-t-2'>
      {/* Main Footer Section */}
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5'>
          {/* Brand Column */}
          <div className='lg:col-span-2'>
            <Link href='/'>
              <div className='mb-4 flex items-center gap-2'>
                <div className='bg-primary flex h-10 w-10 items-center justify-center rounded-full border-2 border-black'>
                  <Text as='span' className='font-head text-xl font-bold'>
                    P
                  </Text>
                </div>
                <Text as='h2' className='font-head text-2xl font-bold uppercase'>
                  Pokemonster
                </Text>
              </div>
            </Link>
            <Text as='p' className='text-muted-foreground mb-4 text-sm'>
              Создаем будущее цифровых впечатлений с дерзким дизайном и передовыми технологиями.
            </Text>
            <div className='flex gap-4'>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    aria-label={social.label}
                    className='hover:text-primary transition-colors'
                    href={social.href}
                  >
                    <Icon className='h-5 w-5' />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product Column */}
          <div>
            <Text as='h3' className='font-head mb-4 text-sm font-bold uppercase'>
              Продукт
            </Text>
            <ul className='space-y-2'>
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className='text-muted-foreground hover:text-foreground text-sm transition-colors'
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <Text as='h3' className='font-head mb-4 text-sm font-bold uppercase'>
              Компания
            </Text>
            <ul className='space-y-2'>
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className='text-muted-foreground hover:text-foreground text-sm transition-colors'
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <Text as='h3' className='font-head mb-4 text-sm font-bold uppercase'>
              Поддержка
            </Text>
            <ul className='space-y-2'>
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className='text-muted-foreground hover:text-foreground text-sm transition-colors'
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className='bg-primary border-t-2 border-black'>
        <div className='container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-4 sm:flex-row'>
          <Text as='p' className='text-sm'>
            © {currentYear} Pokemonster. Все права защищены.
          </Text>
          <div className='flex gap-6'>
            <Link className='text-sm hover:underline' href='/privacy'>
              Политика конфиденциальности
            </Link>
            <Link className='text-sm hover:underline' href='/terms'>
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
