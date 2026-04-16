import img1 from "../../../../../public/img-1.png";
import img2 from "../../../../../public/img-2.png";
import img3 from "../../../../../public/img-3.png";

import Image from "next/image";

interface StatCard {
  id: number;
  title: string;
  value: number;
  icon: typeof img1;
  alt: string;
}

const DIAGONAL_LINE_STYLES = {
  transform: "translate(-50%, -50%) rotate(30deg)",
  background: "rgba(148, 163, 184, 0.6)",
};

const SHADOW_LINE_STYLES = {
  transform: "translate(calc(-50% - 2px), -50%) rotate(30deg)",
  background: "rgba(100, 116, 139, 0.2)",
  filter: "blur(1px)",
};

export default function DashboardHero({ 
  datapack 
}: { 
  datapack: { 
    totalPackages: number; 
    totalReviews: number; 
    totalServices: number 
  } 
}) {
  const STAT_CARDS: StatCard[] = [
    {
      id: 1,
      title: "Total Package",
      value: datapack.totalPackages,
      icon: img3,
      alt: "Total Package",
    },
    {
      id: 2,
      title: "Total Reviews",
      value: datapack.totalReviews,
      icon: img1,
      alt: "Total Reviews",
    },
    {
      id: 3,
      title: "Total Service",
      value: datapack.totalServices,
      icon: img2,
      alt: "Total Service",
    },
  ];

  return (
    <main>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STAT_CARDS.map((card) => (
            <StatisticsCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </main>
  );
}

function StatisticsCard({ card }: { card: StatCard }) {
  return (
    <div
      className="
        relative 
        bg-white 
        rounded-2xl 
        p-4 
        shadow-lg 
        hover:shadow-md 
        transition-shadow 
        overflow-hidden
      "
    >
      <div
        className="
          absolute 
          inset-0 
          bg-gradient-to-br 
          from-gray-100/50 
          to-transparent 
          rounded-2xl 
          pointer-events-none
        "
      />

      <div className="absolute left-1/2 top-1/2 w-[1px] h-[500%] origin-center" style={SHADOW_LINE_STYLES} />
      <div className="absolute left-1/2 top-1/2 w-[0.5px] h-[500%] origin-center" style={DIAGONAL_LINE_STYLES} />

      <div className="relative flex items-start justify-between">
        {/* Text Content: Title and Value */}
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium mb-2">{card.title}</p>
          <h3 className="text-5xl font-bold text-gray-800">{card.value}</h3>
        </div>

        <div
          className="w-[74px] h-[74px] rounded-lg flex items-center justify-center flex-shrink-0">
          <Image src={card.icon} alt={card.alt} width={74} height={74} unoptimized/>
        </div>
      </div>
    </div>
  );
}