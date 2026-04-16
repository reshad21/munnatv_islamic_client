// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { TGeneralNews } from "@/types/general-news.interface";
// import { formatDateToAgo } from "@/utils/formatDate";
// import Link from "next/link";
// import React from "react";

// const RecentNews = ({ recentNews= [] }: { recentNews: TGeneralNews[] }) => {
//   return (
//     <Card>
//       <CardContent className="pt-6">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="font-semibold text-lg">Recent News</h3>
//           <Link href={"/dashboard/general-news"}>
//             <Button variant="ghost" size="sm">
//               View all
//             </Button>
//           </Link>
//         </div>
//         <div className="space-y-4">
//           {recentNews?.map((article, index) => (
//             <div key={index} className="flex flex-col space-y-1">
//               <span className="font-medium">{article.title}</span>
//               <div className="flex items-center text-xs text-muted-foreground">
//                 <span>{formatDateToAgo(new Date(article.createdAt))}</span>
//                 <span className="mx-2">•</span>
//                 <span className="font-medium">
//                   {article.newsCategory?.title}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default RecentNews;
