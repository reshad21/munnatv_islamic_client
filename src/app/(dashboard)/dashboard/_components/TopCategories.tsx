// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import { TTopCategories } from "@/types/topCategories.interface";
// import { LineChart } from "lucide-react";
// import React from "react";

// const TopCategories = ({
//   topCategories = [],
// }: {
//   topCategories: TTopCategories[];
// }) => {
  
//   return (
//     <Card>
//       <CardContent className="pt-6">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="font-semibold text-lg">Top Categories</h3>
//           <LineChart className="h-4 w-4 text-muted-foreground" />
//         </div>
//         <div className="space-y-4">
//           {topCategories?.map((category: TTopCategories) => (
//             <div className="flex items-center" key={category.id}>
//               <div className="w-full">
//                 <div className="flex items-center justify-between mb-1">
//                   <span className="text-sm font-medium">{category.title}</span>
//                   <span className="text-sm text-muted-foreground">
//                     {Math.round(Number(category.percentage))}%
//                   </span>
//                 </div>
//                 <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
//                   <div
//                     className="h-full bg-blue-500 rounded-full"
//                     style={{
//                       width: `${Math.round(Number(category.percentage))}%`,
//                     }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default TopCategories;
