import { getRoles } from "@/services/role";
import { TQuery } from '@/types/query.types';
import { DashboardWrapper } from "../../_components/DashboardWrapper";
import AdminUserForm from "./_components/AdminUserForm";

const CreateRolePage = async (props: {
  searchParams: Promise<{ search: string; page: string }>;
}) => {
  const searchParams = await props.searchParams;
  const search = searchParams.search || "";
  const page = parseInt(searchParams.page) || 1;
  const query: TQuery[] = [
    { key: "orderBy", value: JSON.stringify({ createdAt: "desc" }) },
    { key: "searchTerm", value: search },
    { key: "page", value: page.toString() },
    { key: "limit", value: "10" },
  ];
  const rolesData = await getRoles(query);
  return (
    <DashboardWrapper>
      <h1 className="text-2xl font-semibold text-[#0f3d3e] mb-6">Create Admin User</h1>

      <AdminUserForm roleData={rolesData?.data} />
    </DashboardWrapper>
  );
};

export default CreateRolePage;
