import { cva, type VariantProps } from 'class-variance-authority';
import { HtmlHTMLAttributes } from 'react';

import { Text } from '@/components/retroui/text';
import { cn } from '@/components/ui/utils';

const alertVariants = cva('relative w-full rounded border-2 p-4', {
  defaultVariants: {
    variant: 'default',
  },
  variants: {
    status: {
      error: 'bg-red-300 text-red-800 border-red-800',
      info: 'bg-blue-300 text-blue-800 border-blue-800',
      success: 'bg-green-300 text-green-800 border-green-800',
      warning: 'bg-yellow-300 text-yellow-800 border-yellow-800',
    },
    variant: {
      default: 'bg-background text-foreground [&_svg]:shrink-0',
      solid: 'bg-black text-white',
    },
  },
});

interface IAlertProps
  extends HtmlHTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {}

const Alert = ({ className, status, variant, ...props }: IAlertProps) => (
  <div className={cn(alertVariants({ status, variant }), className)} role='alert' {...props} />
);
Alert.displayName = 'Alert';

type IAlertTitleProps = HtmlHTMLAttributes<HTMLHeadingElement>;
const AlertTitle = ({ className, ...props }: IAlertTitleProps) => (
  <Text as='h5' className={cn(className)} {...props} />
);
AlertTitle.displayName = 'AlertTitle';

type IAlertDescriptionProps = HtmlHTMLAttributes<HTMLParagraphElement>;
const AlertDescription = ({ className, ...props }: IAlertDescriptionProps) => (
  <div className={cn('text-muted-foreground', className)} {...props} />
);

AlertDescription.displayName = 'AlertDescription';

const AlertComponent = Object.assign(Alert, {
  Description: AlertDescription,
  Title: AlertTitle,
});

export { AlertComponent as Alert };
