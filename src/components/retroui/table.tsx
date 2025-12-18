/* eslint-disable sonarjs/table-header */
import * as React from 'react';

import { cn } from '@/components/ui/utils';

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className='relative h-full w-full overflow-auto'>
      <table
        className={cn('w-full caption-bottom border-2 text-sm shadow-lg', className)}
        ref={ref}
        {...props}
      />
    </div>
  ),
);
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    className={cn('bg-primary text-primary-foreground font-head [&_tr]:border-b', className)}
    ref={ref}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody className={cn('[&_tr:last-child]:border-0', className)} ref={ref} {...props} />
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    className={cn('bg-accent border-t font-medium [&>tr]:last:border-b-0', className)}
    ref={ref}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      className={cn(
        'hover:bg-primary/50 hover:text-primary-foreground data-[state=selected]:bg-muted border-b transition-colors',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    className={cn(
      'text-primary-foreground h-10 px-4 text-left align-middle font-medium md:h-12 [&:has([role=checkbox])]:pr-0',
      className,
    )}
    ref={ref}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    className={cn('p-2 align-middle md:p-3 [&:has([role=checkbox])]:pr-0', className)}
    ref={ref}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption className={cn('text-muted-foreground my-2 text-sm', className)} ref={ref} {...props} />
));
TableCaption.displayName = 'TableCaption';

const TableObj = Object.assign(Table, {
  Body: TableBody,
  Caption: TableCaption,
  Cell: TableCell,
  Footer: TableFooter,
  Head: TableHead,
  Header: TableHeader,
  Row: TableRow,
});

export { TableObj as Table };
