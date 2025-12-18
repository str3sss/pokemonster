'use client';

import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/components/ui/utils';

const ContextMenu = ({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Root>) => {
  return <ContextMenuPrimitive.Root data-slot='context-menu' {...props} />;
};

const ContextMenuTrigger = ({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) => {
  return <ContextMenuPrimitive.Trigger data-slot='context-menu-trigger' {...props} />;
};

const ContextMenuGroup = ({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Group>) => {
  return <ContextMenuPrimitive.Group data-slot='context-menu-group' {...props} />;
};

const ContextMenuPortal = ({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) => {
  return <ContextMenuPrimitive.Portal data-slot='context-menu-portal' {...props} />;
};

const ContextMenuSub = ({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) => {
  return <ContextMenuPrimitive.Sub data-slot='context-menu-sub' {...props} />;
};

const ContextMenuRadioGroup = ({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) => {
  return <ContextMenuPrimitive.RadioGroup data-slot='context-menu-radio-group' {...props} />;
};

const ContextMenuSubTrigger = ({
  children,
  className,
  inset,
  ...props
}: {
  inset?: boolean;
} & React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger>) => {
  return (
    <ContextMenuPrimitive.SubTrigger
      className={cn(
        "focus:bg-primary focus:text-primary-foreground data-[state=open]:bg-primary data-[state=open]:text-primary-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      data-inset={inset}
      data-slot='context-menu-sub-trigger'
      {...props}
    >
      {children}
      <ChevronRightIcon className='ml-auto' />
    </ContextMenuPrimitive.SubTrigger>
  );
};

const ContextMenuSubContent = ({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) => {
  return (
    <ContextMenuPrimitive.SubContent
      className={cn(
        'bg-background text-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-[--radix-context-menu-content-transform-origin] overflow-hidden rounded-sm border-2 p-1 shadow-md',
        className,
      )}
      data-slot='context-menu-sub-content'
      {...props}
    />
  );
};

const ContextMenuContent = ({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content>) => {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        className={cn(
          'bg-background text-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-[var(--radix-context-menu-content-available-height)] min-w-[8rem] origin-[--radix-context-menu-content-transform-origin] overflow-x-hidden overflow-y-auto rounded-sm border-2 p-1 shadow-md',
          className,
        )}
        data-slot='context-menu-content'
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
};

const ContextMenuItem = ({
  className,
  inset,
  variant = 'default',
  ...props
}: {
  inset?: boolean;
  variant?: 'default' | 'destructive';
} & React.ComponentProps<typeof ContextMenuPrimitive.Item>) => {
  return (
    <ContextMenuPrimitive.Item
      className={cn(
        "focus:bg-primary focus:text-primary-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      data-inset={inset}
      data-slot='context-menu-item'
      data-variant={variant}
      {...props}
    />
  );
};

const ContextMenuCheckboxItem = ({
  checked,
  children,
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) => {
  return (
    <ContextMenuPrimitive.CheckboxItem
      checked={checked}
      className={cn(
        "focus:bg-primary focus:text-primary-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden transition-colors select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      data-slot='context-menu-checkbox-item'
      {...props}
    >
      <span className='pointer-events-none absolute left-2 flex size-3.5 items-center justify-center'>
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon className='size-4' />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
};

const ContextMenuRadioItem = ({
  children,
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) => {
  return (
    <ContextMenuPrimitive.RadioItem
      className={cn(
        "focus:bg-primary focus:text-primary-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden transition-colors select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      data-slot='context-menu-radio-item'
      {...props}
    >
      <span className='pointer-events-none absolute left-2 flex size-3.5 items-center justify-center'>
        <ContextMenuPrimitive.ItemIndicator>
          <CircleIcon className='size-2 fill-current' />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
};

const ContextMenuLabel = ({
  className,
  inset,
  ...props
}: {
  inset?: boolean;
} & React.ComponentProps<typeof ContextMenuPrimitive.Label>) => {
  return (
    <ContextMenuPrimitive.Label
      className={cn('text-foreground px-2 py-1.5 text-sm font-medium data-[inset]:pl-8', className)}
      data-inset={inset}
      data-slot='context-menu-label'
      {...props}
    />
  );
};

const ContextMenuSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) => {
  return (
    <ContextMenuPrimitive.Separator
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      data-slot='context-menu-separator'
      {...props}
    />
  );
};

const ContextMenuShortcut = ({ className, ...props }: React.ComponentProps<'span'>) => {
  return (
    <span
      className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
      data-slot='context-menu-shortcut'
      {...props}
    />
  );
};

const ContextMenuComponent = Object.assign(ContextMenu, {
  CheckboxItem: ContextMenuCheckboxItem,
  Content: ContextMenuContent,
  Group: ContextMenuGroup,
  Item: ContextMenuItem,
  Label: ContextMenuLabel,
  Portal: ContextMenuPortal,
  RadioGroup: ContextMenuRadioGroup,
  RadioItem: ContextMenuRadioItem,
  Separator: ContextMenuSeparator,
  Shortcut: ContextMenuShortcut,
  Sub: ContextMenuSub,
  SubContent: ContextMenuSubContent,
  SubTrigger: ContextMenuSubTrigger,
  Trigger: ContextMenuTrigger,
});

export { ContextMenuComponent as ContextMenu };
