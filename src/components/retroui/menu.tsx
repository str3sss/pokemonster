'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import React, { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/components/ui/utils';

const Menu = DropdownMenu.Root;
const Trigger = DropdownMenu.Trigger;

type IMenuContent = ComponentPropsWithoutRef<typeof DropdownMenu.Content>;

const Content = ({ className, ...props }: IMenuContent) => (
  <DropdownMenu.Portal>
    <DropdownMenu.Content
      align='start'
      className={cn('absolute top-2 min-w-20 border-2 bg-white shadow-md', className)}
      side='bottom'
      {...props}
    />
  </DropdownMenu.Portal>
);

const MenuItem = React.forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof DropdownMenu.Item>
>(({ className, ...props }, ref) => (
  <DropdownMenu.Item
    className={cn(
      'hover:bg-primary focus:bg-primary relative flex cursor-default items-center rounded-xs px-2 py-1.5 text-sm text-black outline-hidden transition-colors select-none data-disabled:pointer-events-none data-disabled:opacity-50',
      className,
    )}
    ref={ref}
    {...props}
  />
));
MenuItem.displayName = 'MenuItem';

const MenuComponent = Object.assign(Menu, {
  Content,
  Item: MenuItem,
  Trigger,
});

export { MenuComponent as Menu };
