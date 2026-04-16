// import DashboardHeading from "@/components/shared/Dashboard/DashboardHeading";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";

const RoleHeader = async () => {
  return (
    <div className="flex items-center justify-between ">
      <Link href="/dashboard/role/create" className="flex items-center gap-2 bg-[#0f3d3e] text-white px-5 py-2.5 rounded-full hover:bg-[#0a2e2f] transition-colors cursor-pointer">
        <Plus className="w-5 h-5" />
        <span>Create Role</span>
      </Link>
      <Link href="/dashboard/roles_permissions" className="flex items-center gap-2 bg-[#0f3d3e] text-white px-5 py-2.5 rounded-full hover:bg-[#0a2e2f] transition-colors cursor-pointer">
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Roles & Permissions</span>
      </Link>
    </div>
  );
};

export default RoleHeader;
