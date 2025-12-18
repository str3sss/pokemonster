import { cva, VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

import { cn } from '@/components/ui/utils';

const separatorVariants = cva('border-black', {
  defaultVariants: {
    orientation: 'horizontal',
  },
  variants: {
    orientation: {
      horizontal: 'h-0 w-full border-t-2',
      vertical: 'h-full w-0 border-l-2',
    },
  },
});

export interface ISeparatorProps
  extends HTMLAttributes<HTMLHRElement>, VariantProps<typeof separatorVariants> {}

/**
 * Separator component with retro styling
 * @param orientation - Separator orientation (horizontal or vertical)
 */
export const Separator = ({ className, orientation, ...props }: ISeparatorProps) => {
  return <hr className={cn(separatorVariants({ orientation }), className)} {...props} />;
};
