import { TQuery } from "@/types/query.types";
import { Suspense } from "react";
// import ManagementTable from "./_components/ManagementTable";
import PaginationWrapper from "@/components/shared/PaginationWrapper";
import { getRoles } from "@/services/role";
import { DashboardWrapper } from "../_components/DashboardWrapper";
import RoleHeader from "./_components/RoleHeader";
import RoleTable from "./_components/RoleTable";

const RoleManagement = async (props: {
    searchParams: Promise<{ page: string }>;
}) => {
    const searchParams = await props.searchParams;
    const page = Number(searchParams.page) || 1;
    const query: TQuery[] = [
        {
            key: "page",
            value: page.toString(),
        },
        {
            key: "limit",
            value: "100", // Fetch up to 100 roles per page
        },
    ];
    const roleData = await getRoles(query);
    return (
        <DashboardWrapper>
            <RoleHeader />
            <Suspense fallback={<div>Loading roles...</div>}>
                <RoleTable roles={roleData.data} />
                {roleData?.meta?.totalPages > 1 && (
                    <PaginationWrapper
                        active={page}
                        totalPages={roleData?.meta?.totalPages || 1}
                        totalItems={roleData?.meta?.totalItems || 0}
                    />
                )}
            </Suspense>
        </DashboardWrapper>
    );
};

export default RoleManagement;
