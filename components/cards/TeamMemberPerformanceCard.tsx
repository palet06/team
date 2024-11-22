"use client";

import { Bar, BarChart, LabelList, XAxis } from "recharts";

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
import { allAsigneeType } from "@/app/(root)/page";

type chartDataType =
  | [
      {
        danisman: string;
        atanan: number;
        tamamlanmayan: number;
        tamamlanan: number;
      }
    ]
  | null
  | any
  | undefined;

export function TeamMemberPerformanceCard({
  allAssignee,
}: {
  allAssignee: allAsigneeType;
}) {
  const chartConfig = {
    atanan: {
      label: "Atanan",
      color: "hsl(var(--chart-4))",
    },
    tamamlanmayan: {
      label: "Tamamlanmayan",
      color: "hsl(var(--chart-2))",
    },
    tamamlanan: {
      label: "Tamamlanan",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;
  const chartData: chartDataType[] = [];
  allAssignee.map((a) => {
    chartData.push({
      danisman: a.name,

      atanan: a.assignedTasks.length,

      tamamlanmayan: a.assignedTasks.filter((f) => f.task.isCompleted == false)
        .length,
      tamamlanan: a.assignedTasks.filter((f) => f.task.isCompleted == true)
        .length,
    });
  });

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Yazılım Danışmanları</CardTitle>
        <CardDescription>14.11.2024 tarihi itibariyle</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
            <XAxis
              dataKey="danisman"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.split(" ")[0].toUpperCase()}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />

            <Bar dataKey="atanan" fill="var(--color-atanan)" radius={4}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar dataKey="tamamlanan" fill="var(--color-tamamlanan)" radius={4}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar
              dataKey="tamamlanmayan"
              fill="var(--color-tamamlanmayan)"
              radius={4}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
