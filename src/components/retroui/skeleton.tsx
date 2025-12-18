import { cva, VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

import { cn } from '@/components/ui/utils';

const skeletonVariants = cva('animate-pulse rounded border-2 border-black bg-muted', {
  defaultVariants: {
    variant: 'default',
  },
  variants: {
    variant: {
      circle: 'rounded-full',
      default: '',
      rect: '',
      text: 'h-4',
    },
  },
});

export interface ISkeletonProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {}

/**
 * Skeleton component with retro styling for loading states
 * @param variant - Skeleton variant style
 */
export const Skeleton = ({ className, variant, ...props }: ISkeletonProps) => {
  return <div className={cn(skeletonVariants({ variant }), className)} {...props} />;
};
