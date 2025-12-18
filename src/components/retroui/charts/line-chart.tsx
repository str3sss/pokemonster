'use client';

import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { cn } from '@/components/ui/utils';

interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: string[];
  className?: string;
  data: Record<string, any>[];
  dotSize?: number;
  gridColor?: string;
  index: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  strokeColors?: string[];
  strokeWidth?: number;
  tooltipBgColor?: string;
  tooltipBorderColor?: string;
  valueFormatter?: (value: number) => string;
}

const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
  (
    {
      categories = [],
      className,
      data = [],
      dotSize = 4,
      gridColor = 'var(--muted)',
      index,
      showGrid = true,
      showTooltip = true,
      strokeColors = ['var(--foreground)'],
      strokeWidth = 2,
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
          <RechartsLineChart data={data} margin={{ bottom: 0, left: 0, right: 30, top: 0 }}>
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
                            <span className='font-bold' style={{ color: entry.color }}>
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

              return (
                <Line
                  activeDot={{ fill: strokeColor, r: dotSize + 2 }}
                  dataKey={category}
                  dot={{ fill: strokeColor, r: dotSize }}
                  key={category}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                />
              );
            })}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    );
  },
);

LineChart.displayName = 'LineChart';

export { LineChart, type LineChartProps };
