'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/components/ui/utils';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    className={cn(
      'bg-background text-foreground overflow-hidden rounded border-2 shadow-md transition-all hover:shadow-sm data-[state=open]:shadow-sm',
      className,
    )}
    ref={ref}
    {...props}
  />
));
AccordionItem.displayName = AccordionPrimitive.Item.displayName;

const AccordionHeader = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ children, className, ...props }, ref) => (
  <AccordionPrimitive.Header className='flex'>
    <AccordionPrimitive.Trigger
      className={cn(
        'font-head flex flex-1 cursor-pointer items-start justify-between px-4 py-2 focus:outline-hidden [&[data-state=open]>svg]:rotate-180',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
      <ChevronDown className='h-4 w-4 shrink-0 transition-transform duration-200' />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionHeader.displayName = AccordionPrimitive.Header.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, className, ...props }, ref) => (
  <AccordionPrimitive.Content
    className='font-body data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden bg-white text-gray-700'
    ref={ref}
    {...props}
  >
    <div className={cn('px-4 pt-2 pb-4', className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

const AccordionComponent = Object.assign(Accordion, {
  Content: AccordionContent,
  Header: AccordionHeader,
  Item: AccordionItem,
});

export { AccordionComponent as Accordion };
