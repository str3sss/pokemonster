import * as RadioPrimitive from '@radix-ui/react-radio-group';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/components/ui/utils';

const radioVariants = cva('border-border border-2', {
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
      default: '',
      outline: '',
      solid: '',
    },
  },
});

const radioIndicatorVariants = cva('flex ', {
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
  variants: {
    size: {
      lg: 'h-3.5 w-3.5',
      md: 'h-2.5 w-2.5',
      sm: 'h-2 w-2',
    },
    variant: {
      default: 'bg-primary border-2 border-border',
      outline: 'border-2 border-border',
      solid: 'bg-border',
    },
  },
});

type RadioGroupProps = React.ComponentProps<typeof RadioPrimitive.Root>;

export const RadioGroupRoot = ({ className, ...props }: RadioGroupProps) => (
  <RadioPrimitive.Root className={cn('grid gap-2', className)} {...props} />
);

interface RadioProps
  extends React.ComponentProps<typeof RadioPrimitive.Item>, VariantProps<typeof radioVariants> {}

export const RadioItem = ({ children, className, size, variant, ...props }: RadioProps) => (
  <RadioPrimitive.Item
    {...props}
    className={cn(
      radioVariants({
        size,
        variant,
      }),
      className,
    )}
  >
    <RadioPrimitive.Indicator className='flex items-center justify-center'>
      <span className={radioIndicatorVariants({ size, variant })}></span>
    </RadioPrimitive.Indicator>
    {children}
  </RadioPrimitive.Item>
);

const RadioComponent = Object.assign(RadioGroupRoot, {
  Item: RadioItem,
});

export { RadioComponent as RadioGroup };
