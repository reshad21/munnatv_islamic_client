// import { Button } from "@/components/ui/button";
// import NewsChart from "./NewsChart";
// import { TOverviewCardData } from "@/types/card.interface";
// import OverViewCounts from "./OverViewCounts";
// import TopCategories from "./TopCategories";
// import { TTopCategories } from "@/types/topCategories.interface";
// import { TTopReporters } from "@/types/topReporters.interface";
// import TopReporters from "./TopReporters";
// import RecentNews from "./RecentNews";
// import { TGeneralNews } from "@/types/general-news.interface";
// import Link from "next/link";

// export default function DashboardOverView({
//   cardsData,
//   yearData,
//   monthData,
//   weekData,
//   topCategories,
//   topReporters,
//   recentNews,
// }: {
//   cardsData: TOverviewCardData;
//   yearData: TChartData[];
//   monthData: TChartData[];
//   weekData: TChartData[];
//   topCategories: TTopCategories[];
//   topReporters: TTopReporters[];
//   recentNews: TGeneralNews[];
// }) {
//   return (
//     <div className="flex min-h-screen w-full flex-col bg-muted/40">
//       <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
//         <h1 className="text-xl font-semibold">News Portal Dashboard</h1>
//         <Link href={"/dashboard/general-news/create-general-news"} className="ml-auto flex items-center gap-2 cursor-pointer">
//           <Button size="sm" className=" bg-brand hover:bg-brand/90 cursor-pointer">
//             New Article
//           </Button>
//         </Link>
//       </header>
//       <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
//         <OverViewCounts cardData={cardsData} />
//         <div>
//         <NewsChart
//           yearData={yearData}
//           monthData={monthData}
//           weekData={weekData}
//         />
//         </div>
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//           <TopCategories topCategories={topCategories} />
//           <RecentNews recentNews={recentNews} />
//           <TopReporters reporters={topReporters} />
//         </div>
//       </main>
//     </div>
//   );
// }
