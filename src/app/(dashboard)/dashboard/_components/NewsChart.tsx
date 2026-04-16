// "use client";

// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";
// import { Card, CardContent } from "@/components/ui/card";
// import { useState } from "react";
// import { TChartData } from "@/types/chart.interface";

// const NewsChart = ({
//   yearData = [],
//   monthData = [],
//   weekData = [],
// }: {
//   yearData?: TChartData[];
//   monthData?: TChartData[];
//   weekData?: TChartData[];
// }) => {
//   const [activeTab, setActiveTab] = useState("week");

//   const getActiveData = () => {
//     switch (activeTab) {
//       case "year":
//         return yearData || [];
//       case "month":
//         return monthData || [];
//       case "week":
//         return weekData || [];
//       default:
//         return yearData || [];
//     }
//   };

//   return (
//     <div className="grid gap-4">
//       <Card>
//         <CardContent className="pt-6">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h2 className="text-2xl font-bold tracking-tight">
//                 News Publication Analytics
//               </h2>
//               <p className="text-sm text-muted-foreground">
//                 Track your news publication performance over time
//               </p>
//             </div>
//             <Tabs
//               value={activeTab}
//               onValueChange={setActiveTab}
//               className="w-[400px]"
//             >
//               <TabsList className="grid grid-cols-3">
//                 <TabsTrigger value="year">Year</TabsTrigger>
//                 <TabsTrigger value="month">Month</TabsTrigger>
//                 <TabsTrigger value="week">Week</TabsTrigger>
//               </TabsList>
//             </Tabs>
//           </div>

//           <div className="sm:w-sm md:w-xl lg:w-2xl xl:w-[1000px] 2xl:w-[1440px]">
//             <ChartContainer
//               config={{
//                 news: {
//                   label: "News Articles",
//                   color: "hsl(var(--chart-1))",
//                 },
//               }}
//               className="h-96 w-full"
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart
//                   data={getActiveData()?.map((item) => ({
//                     name: item.name,
//                     news: item.value,
//                   }))}
//                   margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//                 >
//                   <defs>
//                     <linearGradient id="colorNews" x1="0" y1="0" x2="0" y2="1">
//                       <stop
//                         offset="5%"
//                         stopColor="hsl(120, 70%, 40%)"
//                         stopOpacity={0.8}
//                       />
//                       <stop
//                         offset="95%"
//                         stopColor="hsl(120, 70%, 70%)"
//                         stopOpacity={0.1}
//                       />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <ChartTooltip content={<ChartTooltipContent />} />
//                   <Area
//                     type="monotone"
//                     dataKey="news"
//                     stroke="hsl(var(--chart-1))"
//                     fillOpacity={1}
//                     fill="url(#colorNews)"
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </ChartContainer>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default NewsChart;
