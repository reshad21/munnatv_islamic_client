import React from "react";
import EditRoleForm from "./_components/EditRoleForm";
import { getRoleDetails } from "@/services/role";

const EditRole = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const id = params.id;
  const roleData = await getRoleDetails(id);
  return <EditRoleForm roleData={roleData.data} id={id} />;
};

export default EditRole;
