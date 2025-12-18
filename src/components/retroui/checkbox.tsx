import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cva, VariantProps } from 'class-variance-authority';
import { Check } from 'lucide-react';

import { cn } from '@/components/ui/utils';

const checkboxVariants = cva('border-2 rounded', {
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
  variants: {
    size: {
      lg: 'h-6 w-6',
      md: 'h-5 w-5',
      sm: 'h-4 w-4',
    },
    variant: {
      default: 'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground ',
      outline: '',
      solid: 'data-[state=checked]:bg-foreground data-[state=checked]:text-background',
    },
  },
});

interface CheckboxProps
  extends
    React.ComponentProps<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

export const Checkbox = ({ className, size, variant, ...props }: CheckboxProps) => (
  <CheckboxPrimitive.Root
    className={cn(
      checkboxVariants({
        size,
        variant,
      }),
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className='h-full w-full'>
      <Check className='h-full w-full' />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);
