"use client"
import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"



  

import { ViewsAnalyticsChartProps } from "./ViewsAnalyticsChart.types";


export  function ViewsAnalyticsChart(props: ViewsAnalyticsChartProps) {

  const {unique,repeated} = props;

  const totalPassword = unique + repeated;

  const chartData = [
    { browser: "unique", visitors: unique, fill: "var(--color-chrome)" },
    { browser: "repeated", visitors: repeated, fill: "var(--color-safari)" },
   
  ]

  const chartConfig = {
    visitors: {
      label: "Contraseñas totales",
    },
    chrome: {
      label: "Unique password",
      color: "hsl(var(--chart-5))",
    },
    safari: {
      label: "Repeated password",
      color: "hsl(var(--chart-1))",
    },
    
  } satisfies ChartConfig


  return (
    <Card className="flex flex-col">
    <CardHeader className="items-center pb-0">
      <CardTitle>Contraseñas</CardTitle>
      <CardDescription>Repetidas vs Unicas</CardDescription>
    </CardHeader>
    <CardContent className="flex-1 pb-0">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="visitors"
            nameKey="browser"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalPassword.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Creadas
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </CardContent>
    <CardFooter className="flex-col gap-2 text-sm">
      <div className="flex items-center gap-2 font-medium leading-none">
      Intenta no tener la misma contraseña. <TrendingUp className="h-4 w-4" />
      </div>
      <div className="leading-none text-muted-foreground">
      Mostrando total contraseñas creadas
      </div>
    </CardFooter>
  </Card>
  )
}
