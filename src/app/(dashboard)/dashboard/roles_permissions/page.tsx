/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { DashboardWrapper } from "../_components/DashboardWrapper";
import { Plus } from "lucide-react";
import Link from "next/link";
import RolesTable from "./_components/RolesTable";
import { getRoles } from "@/services/role";
import { TQuery } from "@/types/query.types";

const RolesandPermissionPage = async (props: {
  searchParams: Promise<{ search: string; page: string }>;
}) => {
  const searchParams = await props.searchParams;
  const search = searchParams.search || "";
  const page = parseInt(searchParams.page) || 1;
  const query: TQuery[] = [
    { key: "orderBy", value: JSON.stringify({ createdAt: "desc" }) },
    { key: "searchTerm", value: search },
    { key: "page", value: page.toString() },
    { key: "limit", value: "100" },
  ];
  
  // Fetch roles with their admin users
  const rolesData = await getRoles(query);
  
  // Flatten admin users from all roles
  const allAdminUsers = rolesData.data?.flatMap((role: any) => 
    (role.adminUser || []).map((user: any) => ({
      ...user,
      role: { id: role.id, name: role.name, status: role.status }
    }))
  ) || [];
  
  console.log("see all admin users==>", allAdminUsers);
  return (
    <DashboardWrapper>
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/dashboard/role"
          className="flex items-center gap-2 bg-[#0f3d3e] text-white px-5 py-2.5 rounded-full hover:bg-[#0a2e2f] transition-colors cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Create Role</span>
        </Link>
        <Link
          href="/dashboard/roles_permissions/create"
          className="flex items-center gap-2 bg-[#0f3d3e] text-white px-5 py-2.5 rounded-full hover:bg-[#0a2e2f] transition-colors cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Create Admin User</span>
        </Link>
      </div>
      <RolesTable rolesData={allAdminUsers} />
    </DashboardWrapper>
  );
};

export default RolesandPermissionPage;
