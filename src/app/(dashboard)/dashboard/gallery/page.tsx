
import PaginationWrapper from "@/components/shared/PaginationWrapper";
import { getGallery } from "@/services/gallery";
import { TQuery } from "@/types/query.types";
import { DashboardWrapper } from "../_components/DashboardWrapper";
import Link from "next/link";
import { Plus } from "lucide-react";
import GalleryTable from "./_components/GalleryTable";

const GalleryPage = async (props: { searchParams: Promise<{ search: string; page: string }> }) => {
  const searchParams = await props.searchParams;
  const search = searchParams.search || "";
  const page = parseInt(searchParams.page) || 1;
  const query: TQuery[] = [
    {
      key: "orderBy",
      value: JSON.stringify({ createdAt: "desc" }),
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
      value: "4",
    },
  ];
  const galleryData = await getGallery(query);
  return (
    <DashboardWrapper>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gallery</h2>
        <Link
          href="/dashboard/gallery/create"
          className="flex items-center gap-2 bg-[#0f3d3e] text-white px-5 py-2.5 rounded-full hover:bg-[#0a2e2f] transition-colors cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Create New</span>
        </Link>
      </div>
      <GalleryTable galleryData={galleryData?.data?.data} />
      {galleryData?.data?.meta?.totalPages > 1 && (
        <PaginationWrapper
          active={page}
          totalPages={galleryData?.data?.meta?.totalPages || 1}
          totalItems={galleryData?.data?.meta?.totalItems || 0}
        />
      )}
    </DashboardWrapper>
  );
};

export default GalleryPage;
