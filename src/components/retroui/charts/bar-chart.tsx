'use client';

import React from 'react';
import {
  Bar,
  CartesianGrid,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { cn } from '@/components/ui/utils';

interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  alignment?: 'horizontal' | 'vertical';
  categories: string[];
  className?: string;
  data: Record<string, any>[];
  fillColors?: string[];
  gridColor?: string;
  index: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  strokeColors?: string[];
  tooltipBgColor?: string;
  tooltipBorderColor?: string;
  valueFormatter?: (value: number) => string;
}

const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
  (
    {
      alignment = 'vertical',
      categories = [],
      className,
      data = [],
      fillColors = ['var(--primary)'],
      gridColor = 'var(--muted)',
      index,
      showGrid = true,
      showTooltip = true,
      strokeColors = ['var(--foreground)'],
      tooltipBgColor = 'var(--background)',
      tooltipBorderColor = 'var(--border)',
      valueFormatter = (value: number) => value.toString(),
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn('h-80 w-full', className)} ref={ref} {...props}>
        <ResponsiveContainer height='100%' width='100%'>
          <RechartsBarChart
            data={data}
            layout={alignment === 'horizontal' ? 'vertical' : undefined}
            margin={{ bottom: 0, left: 0, right: 30, top: 10 }}
          >
            {showGrid && <CartesianGrid stroke={gridColor} strokeDasharray='3 3' />}

            {alignment === 'horizontal' ? (
              <>
                <XAxis
                  axisLine={false}
                  className='fill-muted-foreground text-xs'
                  tickFormatter={valueFormatter}
                  tickLine={false}
                  type='number'
                />

                <YAxis
                  axisLine={false}
                  className='fill-muted-foreground text-xs'
                  dataKey={index}
                  tickLine={false}
                  type='category'
                  width={80}
                />
              </>
            ) : (
              <>
                <XAxis
                  axisLine={false}
                  className='fill-muted-foreground text-xs'
                  dataKey={index}
                  tickLine={false}
                />

                <YAxis
                  axisLine={false}
                  className='fill-muted-foreground text-xs'
                  tickFormatter={valueFormatter}
                  tickLine={false}
                />
              </>
            )}

            {showTooltip && (
              <Tooltip
                content={({ active, label, payload }) => {
                  if (!active || !payload?.length) return null;

                  return (
                    <div
                      className='border p-2 shadow'
                      style={{
                        backgroundColor: tooltipBgColor,
                        borderColor: tooltipBorderColor,
                      }}
                    >
                      <div className='grid grid-cols-2 gap-2'>
                        <div className='flex flex-col'>
                          <span className='text-muted-foreground text-[0.70rem] uppercase'>
                            {index}
                          </span>
                          <span className='text-muted-foreground font-bold'>{label}</span>
                        </div>
                        {payload.map((entry, index) => (
                          <div className='flex flex-col' key={index}>
                            <span className='text-muted-foreground text-[0.70rem] uppercase'>
                              {entry.dataKey}
                            </span>
                            <span className='font-bold' style={{ color: strokeColors[0] }}>
                              {valueFormatter(entry.value as number)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }}
              />
            )}

            {categories.map((category, index) => {
              const fillColor = fillColors[index] || fillColors[0];
              const strokeColor = strokeColors[index] || strokeColors[0];

              return (
                <Bar
                  dataKey={category}
                  fill={fillColor}
                  key={category}
                  stroke={strokeColor}
                  strokeWidth={1}
                />
              );
            })}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    );
  },
);

BarChart.displayName = 'BarChart';

export { BarChart, type BarChartProps };
