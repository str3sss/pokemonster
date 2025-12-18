'use client';

import React from 'react';
import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { cn } from '@/components/ui/utils';

interface PieChartProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  colors?: string[];
  data: Record<string, any>[];
  dataKey: string;
  innerRadius?: number;
  nameKey: string;
  outerRadius?: number;
  showTooltip?: boolean;
  tooltipBgColor?: string;
  tooltipBorderColor?: string;
  valueFormatter?: (value: number) => string;
}

const PieChart = React.forwardRef<HTMLDivElement, PieChartProps>(
  (
    {
      className,
      colors = [
        'var(--chart-1)',
        'var(--chart-2)',
        'var(--chart-3)',
        'var(--chart-4)',
        'var(--chart-5)',
      ],
      data = [],
      dataKey,
      innerRadius = 0,
      nameKey,
      outerRadius = 100,
      showTooltip = true,
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
          <RechartsPieChart>
            <Pie
              className='h-full w-full'
              cx='50%'
              cy='50%'
              data={data}
              dataKey={dataKey}
              innerRadius={innerRadius}
              isAnimationActive={false}
              nameKey={nameKey}
              outerRadius={outerRadius}
            >
              {data.map((entry, index) => (
                <Cell fill={colors[index % colors.length]} key={`cell-${index}`} />
              ))}
            </Pie>

            {showTooltip && (
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;

                  const data = payload[0];

                  return (
                    <div
                      className='border p-2 shadow'
                      style={{
                        backgroundColor: tooltipBgColor,
                        borderColor: tooltipBorderColor,
                      }}
                    >
                      <div className='flex flex-col gap-1'>
                        <span className='text-muted-foreground text-[0.70rem] uppercase'>
                          {data.name}
                        </span>
                        <span className='text-foreground font-bold'>
                          {valueFormatter(data.value as number)}
                        </span>
                      </div>
                    </div>
                  );
                }}
              />
            )}
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    );
  },
);

PieChart.displayName = 'PieChart';

export { PieChart, type PieChartProps };
