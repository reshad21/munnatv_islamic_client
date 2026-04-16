import React from "react";
import ServiceHeader from "./_components/ServiceHeader";
import HeroSection from "../_components/HeroSection";
import ServiceSection from "./_components/ServiceSection";
import { TQuery } from "@/types/query.types";
import { getServices } from "@/services/service";
import UiPaginationWrapper from "@/components/shared/UiPaginationWrapper";

const ServicePage = async (props: {
  searchParams: Promise<{ search: string; page: string }>;
}) => {
  const searchParams = await props.searchParams;
  const search = searchParams.search || "";
  const page = parseInt(searchParams.page) || 1;
  const query: TQuery[] = [
    { key: "orderBy", value: JSON.stringify({ createdAt: "desc" }) },
    { key: "searchTerm", value: search },
    { key: "page", value: page.toString() },
    { key: "limit", value: "9" },
  ];
  const servicesData = await getServices(query);

  return (
    <div>
      <HeroSection title="Services" subtitle="Services" />
      <ServiceHeader />
      <ServiceSection servicesData={servicesData?.data?.data} />
      {servicesData?.data?.meta?.totalPages > 1 && (
        <UiPaginationWrapper
          active={page}
          totalPages={servicesData?.data?.meta?.totalPages || 1}
          totalItems={servicesData?.data?.meta?.totalItems || 0}
        />
      )}
    </div>
  );
};

export default ServicePage;
