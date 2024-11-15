"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
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
import Tasks from "@/app/(root)/tasks/[id]/page";

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
      gorevSayisi: allTasks?.filter((a) => a.isActive == true).length,
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
      gorevSayisi:
        allTasks?.filter((a) => a.isActive == true).length -
        allAssignedTasks?.length,
      fill: "hsl(var(--chart-5))",
    },
  ];

  const hesaplama =
    (allAssignedTasks.filter((a) => a.task.isCompleted == true).length * 100) /
    allTasks?.filter((a) => a.isActive == true).length;
  return (
    <div className="flex w-full justify-center">
      <Card className="max-w-xl">
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
              <XAxis
                dataKey="gorevSayisi"
                type="number"
                allowDecimals={false}
                tickCount={allTasks?.length}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="gorevSayisi" layout="vertical" radius={5} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium text-base leading-none items-center justify-center w-full">
            {hesaplama <= 50 && (
              <>
                <p>
                  Sistem şu ana kadar{" "}
                  <span className="font-bold text-red-600">
                    {" "}
                    {`%${hesaplama.toFixed(0)}`}
                  </span>{" "}
                  performansla çalılşmaktadır
                </p>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </>
            )}
            {hesaplama > 50 && (
              <>
                <p>
                  Sistem şu ana kadar{" "}
                  <span className="font-bold text-green-500">
                    {" "}
                    {`%${hesaplama.toFixed(0)}`}
                  </span>
                  performansla çalılşmaktadır
                </p>

                <TrendingUp className="h-4 w-4 text-green-500" />
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
