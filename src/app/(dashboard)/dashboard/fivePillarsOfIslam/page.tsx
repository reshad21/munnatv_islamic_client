import React from "react";
import { DashboardWrapper } from "../_components/DashboardWrapper";
import { Plus } from "lucide-react";
import Link from "next/link";
import FivePillarsTable from "./_components/FivePillarsTable";
import { getFivePillars } from "@/services/fivePillar";
import { TQuery } from "@/types/query.types";
import PaginationWrapper from "@/components/shared/PaginationWrapper";

const FivePillarsOfIslamPage = async (props: {
  searchParams: Promise<{ search: string; page: string }>;
}) => {
  const searchParams = await props.searchParams;
  const search = searchParams.search || "";
  const page = parseInt(searchParams.page) || 1;
  const query: TQuery[] = [
    {
      key: "orderBy",
      value: JSON.stringify({
        createdAt: "desc",
      }),
    },
    {
      key: "searchTerm",
      value: search,
    },
    {
      key: "page",
      value: page.toString(),
    },
    {
      key: "limit",
      value: "10",
    },
  ];
  const fivePillarsData = await getFivePillars(query);
  return (
    <DashboardWrapper>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Five Pillars of Islam
        </h2>
        <Link
          href="/dashboard/fivePillarsOfIslam/create"
          className="flex items-center gap-2 bg-[#0f3d3e] text-white px-5 py-2.5 rounded-full hover:bg-[#0a2e2f] transition-colors cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Create New</span>
        </Link>
      </div>
      <FivePillarsTable fivePillarsData={fivePillarsData?.data?.data} />
      {fivePillarsData?.meta?.totalPages > 1 && (
        <PaginationWrapper
          active={page}
          totalPages={fivePillarsData?.meta?.totalPages || 1}
          totalItems={fivePillarsData?.meta?.totalItems || 0}
        />
      )}
    </DashboardWrapper>
  );
};

export default FivePillarsOfIslamPage;
