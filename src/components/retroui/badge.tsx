import { cva, VariantProps } from 'class-variance-authority';
import React, { HTMLAttributes } from 'react';

import { cn } from '@/components/ui/utils';

const badgeVariants = cva('font-semibold rounded', {
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
  variants: {
    size: {
      lg: 'px-3 py-2 text-base',
      md: 'px-2.5 py-1.5 text-sm',
      sm: 'px-2 py-1 text-xs',
    },
    variant: {
      default: 'bg-muted text-muted-foreground',
      outline: 'outline-2 outline-foreground text-foreground',
      solid: 'bg-foreground text-background',
      surface: 'outline-2 bg-primary text-primary-foreground',
    },
  },
});

interface ButtonProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export const Badge = ({
  children,
  className = '',
  size = 'md',
  variant = 'default',
  ...props
}: ButtonProps) => {
  return (
    <span className={cn(badgeVariants({ size, variant }), className)} {...props}>
      {children}
    </span>
  );
};
