"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { allAssignedTasksType, allTasksType } from "@/app/(root)/page";

type chartDataType =
  | [
      {
        kategori: string;
        gorevSayisi: number;
        fill: string;
      }
    ]
  | null
  | any
  | undefined;

// const chartData: charDataType = [

//   { kategori: "toplamGorev", gorevSayisi: 275, fill: "hsl(var(--chart-4))" },
//   { kategori: "atananGorev", gorevSayisi: 200, fill: "hsl(var(--chart-2))" },
//   {
//     kategori: "tamamlananGorev",
//     gorevSayisi: 187,
//     fill: "hsl(var(--chart-1))",
//   },
//   {
//     kategori: "tamamlanmayanGorev",
//     gorevSayisi: 173,
//     fill: "hsl(var(--chart-3))",
//   },
//   { kategori: "atanmamisGorev", gorevSayisi: 90, fill: "hsl(var(--chart-5))" },
// ];

const chartConfig = {
  gorevSayisi: {
    label: "Görev sayısı",
  },
  toplamGorev: {
    label: "Toplam",
  },
  atananGorev: {
    label: "Atanan",
  },
  tamamlananGorev: {
    label: "Tamamlanan",
  },
  tamamlanmayanGorev: {
    label: "Tamamlanmayan",
  },
  atanmamisGorev: {
    label: "Atanmamış",
  },
} satisfies ChartConfig;

export function Chart({
  allTasks,
  allAssignedTasks,
}: {
  allTasks: allTasksType;
  allAssignedTasks: allAssignedTasksType;
}) {
  const chartData: chartDataType = [
    {
      kategori: "toplamGorev",
      gorevSayisi: allTasks?.length,
      fill: "hsl(var(--chart-4))",
    },
    {
      kategori: "atananGorev",
      gorevSayisi: allAssignedTasks?.length,
      fill: "hsl(var(--chart-2))",
    },
    {
      kategori: "tamamlananGorev",
      gorevSayisi: allAssignedTasks.filter((a) => a.task.isCompleted == true)
        .length,
      fill: "hsl(var(--chart-1))",
    },
    {
      kategori: "tamamlanmayanGorev",
      gorevSayisi: allAssignedTasks.filter((a) => a.task.isCompleted == false)
        .length,
      fill: "hsl(var(--chart-3))",
    },
    {
      kategori: "atanmamisGorev",
      gorevSayisi: allTasks?.length - allAssignedTasks?.length,
      fill: "hsl(var(--chart-5))",
    },
  ];
  return (
    <div className="flex w-full justify-center">
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Sistemdeki Görevler</CardTitle>
          <CardDescription>14.11.2024 tarihi itibariyle</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                left: 50,
              }}
            >
              <YAxis
                dataKey="kategori"
                type="category"
                tickLine={true}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) =>
                  chartConfig[value as keyof typeof chartConfig]?.label
                }
              />
              <XAxis dataKey="gorevSayisi" type="number" />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="gorevSayisi" layout="vertical" radius={5} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
