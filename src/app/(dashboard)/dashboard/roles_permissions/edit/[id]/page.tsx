import React from "react";
import EditRoleForm from "./_components/EditRoleForm";

interface EditRolePageProps {
  params: Promise<{ id: string }>;
}

const EditRolePage = async ({ params }: EditRolePageProps) => {
  const { id } = await params;

  // Mock data - replace with actual API call
  const roleData = {
    id: parseInt(id),
    name: "Asif Khan",
    description: "Admin Role",
    email: "asif@example.com",
    image: null as string | null,
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-[#0f3d3e] mb-6">Edit Role</h1>
      <EditRoleForm initialData={roleData} />
    </div>
  );
};

export default EditRolePage;
