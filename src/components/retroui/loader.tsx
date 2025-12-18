import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/components/ui/utils';

const loaderVariants = cva('flex gap-1', {
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
  variants: {
    size: {
      lg: '[&>div]:w-4 [&>div]:h-4',
      md: '[&>div]:w-3 [&>div]:h-3',
      sm: '[&>div]:w-2 [&>div]:h-2',
    },
    variant: {
      default: '[&>div]:bg-primary [&>div]:border-black',
      outline: '[&>div]:bg-transparent [&>div]:border-black',
      secondary: '[&>div]:bg-secondary [&>div]:border-black',
    },
  },
});

interface LoaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>, VariantProps<typeof loaderVariants> {
  asChild?: boolean;
  count?: number; // number of bouncing dots
  delayStep?: number; // delay in ms
  duration?: number; // animation duration in seconds
}

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ className, count = 3, delayStep = 100, duration = 0.5, size, variant, ...props }, ref) => {
    return (
      <div
        aria-label='Loading...'
        className={cn(loaderVariants({ size, variant }), className)}
        ref={ref}
        role='status'
        {...props}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div
            className='animate-bounce border-2'
            key={i}
            style={{
              animationDelay: `${i * delayStep}ms`,
              animationDuration: `${duration}s`,
              animationIterationCount: 'infinite',
            }}
          />
        ))}
      </div>
    );
  },
);

Loader.displayName = 'Loader';
export { Loader };
