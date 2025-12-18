'use client';

import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/components/ui/utils';

const toggleVariants = cva(
  'inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'h-10 px-3 min-w-10',
        lg: 'h-11 px-5 min-w-11',
        sm: 'h-9 px-2.5 min-w-9',
      },
      variant: {
        default:
          'bg-transparent hover:bg-muted/70 hover:text-muted-foreground data-[state=on]:bg-muted',
        'outline-muted':
          'border-2 border-input bg-transparent hover:hover:bg-muted/70 hover:hover:text-muted-foreground data-[state=on]:bg-muted',
        outlined:
          'border-2 border-input bg-transparent hover:bg-accent hover:text-accent-foreground/80 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
        solid:
          'border-2 border-input bg-transparent hover:bg-secondary hover:text-secondary-foreground hover:border-secondary data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground data-[state=on]:border-secondary',
      },
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, size, variant, ...props }, ref) => (
  <TogglePrimitive.Root
    className={cn(toggleVariants({ className, size, variant }))}
    ref={ref}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
