'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

export const description = 'An interactive bar chart';

const chartData = [
  { date: '2024-04-01', disconnection: 222, reconnection: 150 },
  { date: '2024-04-02', disconnection: 97, reconnection: 180 },
  { date: '2024-04-03', disconnection: 167, reconnection: 120 },
  { date: '2024-04-04', disconnection: 242, reconnection: 260 },
  { date: '2024-04-05', disconnection: 373, reconnection: 290 },
  { date: '2024-04-06', disconnection: 301, reconnection: 340 },
  { date: '2024-04-07', disconnection: 245, reconnection: 180 },
  { date: '2024-04-08', disconnection: 409, reconnection: 320 },
  { date: '2024-04-09', disconnection: 59, reconnection: 110 },
  { date: '2024-04-10', disconnection: 261, reconnection: 190 },
  { date: '2024-04-11', disconnection: 327, reconnection: 350 },
  { date: '2024-04-12', disconnection: 292, reconnection: 210 },
  { date: '2024-04-13', disconnection: 342, reconnection: 380 },
  { date: '2024-04-14', disconnection: 137, reconnection: 220 },
  { date: '2024-04-15', disconnection: 120, reconnection: 170 },
  { date: '2024-04-16', disconnection: 138, reconnection: 190 },
  { date: '2024-04-17', disconnection: 446, reconnection: 360 },
  { date: '2024-04-18', disconnection: 364, reconnection: 410 },
  { date: '2024-04-19', disconnection: 243, reconnection: 180 },
  { date: '2024-04-20', disconnection: 89, reconnection: 150 },
  { date: '2024-04-21', disconnection: 137, reconnection: 200 },
  { date: '2024-04-22', disconnection: 224, reconnection: 170 },
  { date: '2024-04-23', disconnection: 138, reconnection: 230 },
  { date: '2024-04-24', disconnection: 387, reconnection: 290 },
  { date: '2024-04-25', disconnection: 215, reconnection: 250 },
  { date: '2024-04-26', disconnection: 75, reconnection: 130 },
  { date: '2024-04-27', disconnection: 383, reconnection: 420 },
  { date: '2024-04-28', disconnection: 122, reconnection: 180 },
  { date: '2024-04-29', disconnection: 315, reconnection: 240 },
  { date: '2024-04-30', disconnection: 454, reconnection: 380 },
  { date: '2024-05-01', disconnection: 165, reconnection: 220 },
  { date: '2024-05-02', disconnection: 293, reconnection: 310 },
  { date: '2024-05-03', disconnection: 247, reconnection: 190 },
  { date: '2024-05-04', disconnection: 385, reconnection: 420 },
  { date: '2024-05-05', disconnection: 481, reconnection: 390 },
  { date: '2024-05-06', disconnection: 498, reconnection: 520 },
  { date: '2024-05-07', disconnection: 388, reconnection: 300 },
  { date: '2024-05-08', disconnection: 149, reconnection: 210 },
  { date: '2024-05-09', disconnection: 227, reconnection: 180 },
  { date: '2024-05-10', disconnection: 293, reconnection: 330 },
  { date: '2024-05-11', disconnection: 335, reconnection: 270 },
  { date: '2024-05-12', disconnection: 197, reconnection: 240 },
  { date: '2024-05-13', disconnection: 197, reconnection: 160 },
  { date: '2024-05-14', disconnection: 448, reconnection: 490 },
  { date: '2024-05-15', disconnection: 473, reconnection: 380 },
  { date: '2024-05-16', disconnection: 338, reconnection: 400 },
  { date: '2024-05-17', disconnection: 499, reconnection: 420 },
  { date: '2024-05-18', disconnection: 315, reconnection: 350 },
  { date: '2024-05-19', disconnection: 235, reconnection: 180 },
  { date: '2024-05-20', disconnection: 177, reconnection: 230 },
  { date: '2024-05-21', disconnection: 82, reconnection: 140 },
  { date: '2024-05-22', disconnection: 81, reconnection: 120 },
  { date: '2024-05-23', disconnection: 252, reconnection: 290 },
  { date: '2024-05-24', disconnection: 294, reconnection: 220 },
  { date: '2024-05-25', disconnection: 201, reconnection: 250 },
  { date: '2024-05-26', disconnection: 213, reconnection: 170 },
  { date: '2024-05-27', disconnection: 420, reconnection: 460 },
  { date: '2024-05-28', disconnection: 233, reconnection: 190 },
  { date: '2024-05-29', disconnection: 78, reconnection: 130 },
  { date: '2024-05-30', disconnection: 340, reconnection: 280 },
  { date: '2024-05-31', disconnection: 178, reconnection: 230 },
  { date: '2024-06-01', disconnection: 178, reconnection: 200 },
  { date: '2024-06-02', disconnection: 470, reconnection: 410 },
  { date: '2024-06-03', disconnection: 103, reconnection: 160 },
  { date: '2024-06-04', disconnection: 439, reconnection: 380 },
  { date: '2024-06-05', disconnection: 88, reconnection: 140 },
  { date: '2024-06-06', disconnection: 294, reconnection: 250 },
  { date: '2024-06-07', disconnection: 323, reconnection: 370 },
  { date: '2024-06-08', disconnection: 385, reconnection: 320 },
  { date: '2024-06-09', disconnection: 438, reconnection: 480 },
  { date: '2024-06-10', disconnection: 155, reconnection: 200 },
  { date: '2024-06-11', disconnection: 92, reconnection: 150 },
  { date: '2024-06-12', disconnection: 492, reconnection: 420 },
  { date: '2024-06-13', disconnection: 81, reconnection: 130 },
  { date: '2024-06-14', disconnection: 426, reconnection: 380 },
  { date: '2024-06-15', disconnection: 307, reconnection: 350 },
  { date: '2024-06-16', disconnection: 371, reconnection: 310 },
  { date: '2024-06-17', disconnection: 475, reconnection: 520 },
  { date: '2024-06-18', disconnection: 107, reconnection: 170 },
  { date: '2024-06-19', disconnection: 341, reconnection: 290 },
  { date: '2024-06-20', disconnection: 408, reconnection: 450 },
  { date: '2024-06-21', disconnection: 169, reconnection: 210 },
  { date: '2024-06-22', disconnection: 317, reconnection: 270 },
  { date: '2024-06-23', disconnection: 480, reconnection: 530 },
  { date: '2024-06-24', disconnection: 132, reconnection: 180 },
  { date: '2024-06-25', disconnection: 141, reconnection: 190 },
  { date: '2024-06-26', disconnection: 434, reconnection: 380 },
  { date: '2024-06-27', disconnection: 448, reconnection: 490 },
  { date: '2024-06-28', disconnection: 149, reconnection: 200 },
  { date: '2024-06-29', disconnection: 103, reconnection: 160 },
  { date: '2024-06-30', disconnection: 446, reconnection: 400 }
];

const chartConfig = {
  views: {
    label: 'Page Views'
  },
  disconnection: {
    label: 'Disconnection',
    color: 'hsl(var(--chart-1))'
  },
  reconnection: {
    label: 'Reconnection',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig;

export function BarGraph() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('disconnection');

  const total = React.useMemo(
    () => ({
      disconnection: chartData.reduce((acc, curr) => acc + curr.disconnection, 0),
      reconnection: chartData.reduce((acc, curr) => acc + curr.reconnection, 0)
    }),
    []
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Disconnection / Reconnection operation</CardTitle>
          <CardDescription>
            for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {['disconnection', 'reconnection'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[280px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
