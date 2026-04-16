"use client";
import { useRouter, useSearchParams } from "next/navigation";
import UiPagination from "./UiPagination";

export default function UiPaginationWrapper({
  active,
  totalPages,
  totalItems,
}: {
  active: number;
  totalPages: number;
  totalItems: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  return (
    <UiPagination
      active={active}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      totalItems={totalItems}
    />
  );
}
