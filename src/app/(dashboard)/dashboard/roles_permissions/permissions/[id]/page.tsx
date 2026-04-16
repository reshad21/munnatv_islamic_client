import React from "react";
import RolePermissions from "./_components/RolePermissions";

interface PermissionsPageProps {
  params: Promise<{ id: string }>;
}

const PermissionsPage = async ({ params }: PermissionsPageProps) => {
  const { id } = await params;

  // Mock data - replace with actual API call
  const roleData = {
    id: parseInt(id),
    name: "Admin Role",
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-[#0f3d3e] mb-6">
        Permissions - {roleData.name}
      </h1>
      <RolePermissions roleId={roleData.id} />
    </div>
  );
};

export default PermissionsPage;
