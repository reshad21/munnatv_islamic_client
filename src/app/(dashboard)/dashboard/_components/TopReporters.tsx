// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { TTopReporters } from "@/types/topReporters.interface";
// import { AvatarImage } from "@radix-ui/react-avatar";
// import Link from "next/link";
// import React from "react";

// const TopReporters = ({ reporters = [] }: { reporters?: TTopReporters[] }) => {
//   return (
//     <Card>
//       <CardContent className="pt-6">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="font-semibold text-lg">Top Reporters</h3>
//           <Link href={"/dashboard/reporter"}>
//             <Button variant="ghost" size="sm">
//               View all
//             </Button>
//           </Link>
//         </div>
//         <div className="space-y-4">
//           {reporters?.map((reporter, index) => (
//             <div key={index} className="flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <Avatar>
//                   <AvatarImage src={reporter.profilePhoto} />
//                   <AvatarFallback>
//                     {reporter?.fullName?.split(" ")[0]?.[0]}
//                     {reporter?.fullName?.split(" ")[1]?.[0]}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="font-medium text-sm">{reporter.fullName}</p>
//                   <p className="text-xs text-muted-foreground">
//                     {(reporter._count?.generalNews || 0) +
//                       (reporter._count?.galleryNews || 0) +
//                       (reporter._count?.videoNews || 0)}{" "}
//                     articles
//                   </p>
//                 </div>
//               </div>
//               <span
//                 className={`text-xs px-2 py-1 rounded-full ${
//                   (reporter._count?.generalNews || 0) +
//                     (reporter._count?.galleryNews || 0) +
//                     (reporter._count?.videoNews || 0) >
//                   50
//                     ? "bg-green-100 text-green-800"
//                     : (reporter._count?.generalNews || 0) +
//                         (reporter._count?.galleryNews || 0) +
//                         (reporter._count?.videoNews || 0) >
//                       20
//                     ? "bg-blue-100 text-blue-800"
//                     : "bg-amber-100 text-amber-800"
//                 }`}
//               >
//                 {(reporter._count?.generalNews || 0) +
//                   (reporter._count?.galleryNews || 0) +
//                   (reporter._count?.videoNews || 0) >
//                 50
//                   ? "Top Reporter"
//                   : (reporter._count?.generalNews || 0) +
//                       (reporter._count?.galleryNews || 0) +
//                       (reporter._count?.videoNews || 0) >
//                     20
//                   ? "Top Contributor"
//                   : "New Reporter"}
//               </span>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default TopReporters;
