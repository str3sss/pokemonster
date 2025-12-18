import React from 'react';

import { cn } from '@/components/ui/utils';

export const Textarea = ({
  className = '',
  placeholder = 'Enter text...',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type = 'text',
  ...props
}) => {
  return (
    <textarea
      className={cn(
        'border-border placeholder:text-muted-foreground w-full rounded border-2 px-4 py-2 shadow-md transition focus:shadow-xs focus:outline-hidden',
        className,
      )}
      placeholder={placeholder}
      rows={4}
      {...props}
    />
  );
};
