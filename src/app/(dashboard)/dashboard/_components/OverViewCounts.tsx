// import React from "react";
// import { StatsCard } from "./StatusCard";
// import {
//   BarChart,
//   CalendarDays,
//   FileEdit,
//   MessageSquare,
//   PieChart,
//   Users,
// } from "lucide-react";
// import { TOverviewCardData } from "@/types/card.interface";

// const OverViewCounts = ({ cardData }: { cardData: TOverviewCardData }) => {
//   return (
//     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//       <StatsCard
//         title="Today's News"
//         value={cardData?.todayNews.toString()}
//         description="Published today"
//         icon={<CalendarDays className="h-5 w-5 text-white" />}
//         color="from-blue-600 to-blue-400"
//       />
//       <StatsCard
//         title="Draft News"
//         value={cardData?.todayUnpublishedNews.toString()}
//         description="Pending publication"
//         icon={<FileEdit className="h-5 w-5 text-white" />}
//         color="from-amber-600 to-amber-400"
//       />
//       <StatsCard
//         title="Total Reporters"
//         value={cardData?.totalReportersCount.toString()}
//         description="Active contributors"
//         icon={<Users className="h-5 w-5 text-white" />}
//         color="from-green-600 to-green-400"
//       />
//       <StatsCard
//         title="Total Contacts"
//         value={cardData?.totalContactsCount.toString()}
//         description="Press & PR network"
//         icon={<MessageSquare className="h-5 w-5 text-white" />}
//         color="from-purple-600 to-purple-400"
//       />
//       <StatsCard
//         title="Total Ads"
//         value={cardData?.totalAdsCount.toString()}
//         description="Active campaigns"
//         icon={<PieChart className="h-5 w-5 text-white" />}
//         color="from-pink-600 to-pink-400"
//       />
//       <StatsCard
//         title="Total Polls"
//         value={cardData?.totalPollsCount.toString()}
//         description="Ongoing surveys"
//         icon={<BarChart className="h-5 w-5 text-white" />}
//         color="from-indigo-600 to-indigo-400"
//       />
//     </div>
//   );
// };

// export default OverViewCounts;
