'use client';

import React from 'react';
import {
  Area,
  CartesianGrid,
  AreaChart as RechartsAreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { cn } from '@/components/ui/utils';

interface AreaChartProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: string[];
  className?: string;
  data: Record<string, any>[];
  fill?: 'gradient' | 'solid';
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

const AreaChart = React.forwardRef<HTMLDivElement, AreaChartProps>(
  (
    {
      categories = [],
      className,
      data = [],
      fill = 'gradient',
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
    const chartId = React.useId();

    return (
      <div className={cn('h-80 w-full', className)} ref={ref} {...props}>
        <ResponsiveContainer height='100%' width='100%'>
          <RechartsAreaChart data={data} margin={{ bottom: 0, left: 0, right: 30, top: 10 }}>
            <defs>
              {categories.map((category, index) => {
                const fillColor = fillColors[index] || fillColors[0];
                const gradientId = `gradient-${chartId}-${category}`;
                return (
                  <linearGradient id={gradientId} key={category} x1='0' x2='0' y1='0' y2='1'>
                    {fill === 'gradient' ? (
                      <>
                        <stop offset='5%' stopColor={fillColor} stopOpacity={0.8} />
                        <stop offset='95%' stopColor={fillColor} stopOpacity={0} />
                      </>
                    ) : (
                      <stop stopColor={fillColor} stopOpacity={0.6} />
                    )}
                  </linearGradient>
                );
              })}
            </defs>

            {showGrid && <CartesianGrid stroke={gridColor} strokeDasharray='3 3' />}

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
              const strokeColor = strokeColors[index] || strokeColors[0];
              const gradientId = `gradient-${chartId}-${category}`;

              return (
                <Area
                  dataKey={category}
                  fill={`url(#${gradientId})`}
                  key={category}
                  stroke={strokeColor}
                  strokeWidth={2}
                />
              );
            })}
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    );
  },
);

AreaChart.displayName = 'AreaChart';

export { AreaChart, type AreaChartProps };
