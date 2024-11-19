"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

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
const chartData = [
  { month: "January", client: 186 },
  { month: "February", client: 305 },
  { month: "March", client: 237 },
  { month: "April", client: 73 },
  { month: "May", client: 209 },
  { month: "June", client: 214 },
]

const chartConfig = {
  client: {
    label: "Client",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function TotalClientChart() {
  return (
    <Card  className="xl:col-span-2" x-chunk="dashboard-01-chunk-4" >
      <CardHeader className="flex flex-row items-center" >
      <div className="grid gap-2">
                <CardTitle>Total Leads Cover</CardTitle>
                <CardDescription>
                  Recent Leads.
                </CardDescription>
              </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="client" fill="var(--color-client)" radius={8}>
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
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        {/* <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div> */}
      </CardFooter>
    </Card>
  )
}
