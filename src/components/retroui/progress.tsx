'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

import { cn } from '@/components/ui/utils';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    className={cn('bg-background relative h-4 w-full overflow-hidden border-2', className)}
    ref={ref}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className='bg-primary h-full w-full flex-1 transition-all'
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
