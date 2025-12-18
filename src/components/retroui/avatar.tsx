import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';

import { cn } from '@/components/ui/utils';

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    className={cn('relative flex h-14 w-14 overflow-hidden rounded-full border-2', className)}
    ref={ref}
    {...props}
  />
));
Avatar.displayName = 'Avatar';

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    className={cn('aspect-square h-full w-full', className)}
    ref={ref}
    {...props}
  />
));
AvatarImage.displayName = 'Avatar.Image';

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    className={cn(
      'bg-muted bg-primary flex h-full w-full items-center justify-center rounded-full',
      className,
    )}
    ref={ref}
    {...props}
  />
));
AvatarFallback.displayName = 'Avatar.Fallback';

const AvatarComponent = Object.assign(Avatar, {
  Fallback: AvatarFallback,
  Image: AvatarImage,
});

export { AvatarComponent as Avatar };
