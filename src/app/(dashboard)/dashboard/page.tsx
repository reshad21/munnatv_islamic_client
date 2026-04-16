import { getPackages } from "@/services/package";
import DashboardHero from "./_components/DashboardHero";
import DashboardPackage from "./_components/DashboardPackage";
import { DashboardWrapper } from "./_components/DashboardWrapper";
import { getReviews } from "@/services/review";
import { getServices } from "@/services/service";

const Dashboard = async () => {
  const packageRes = await getPackages([]);
  const packagesData = packageRes?.data?.data;
  const reviewRes = await getReviews([]);
  const reviewsData = reviewRes?.data?.data;
  const servicesRes = await getServices([]);
  const servicesData = servicesRes?.data?.data;
  const datapack={
    totalPackages: packagesData.length,
    totalReviews: reviewsData.length,
    totalServices: servicesData.length,
  };
  return (
    <DashboardWrapper>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
      <DashboardHero datapack={datapack} />
      <DashboardPackage packagesData={packagesData} />
    </DashboardWrapper>
  );
};

export default Dashboard;
