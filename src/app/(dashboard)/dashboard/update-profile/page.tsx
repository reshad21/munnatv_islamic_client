import { loggedUser } from "@/services/auth";
import { DashboardWrapper } from "../_components/DashboardWrapper";
import UpdateProfileCRUD, { UpdateProfileFormData } from "./_components/UpdateProfileCRUD";

const UpdateProfilePage = async () => {
  const updateProfileRes = await loggedUser();

  // Provide a fallback/default value if updateProfileRes is null
  const defaultProfileData: UpdateProfileFormData = {
    id: "",
    email: "",
    fullName: "",
    role: "",
    status: "",
    profilePhoto: null,
    phoneNumber: "",
    image: null,
    password: "",
    newPassword: "",
    retypePassword: "",
  };

  return (
    <DashboardWrapper>
      <h1 className="text-2xl font-semibold text-[#0f3d3e] mb-6">Update Profile</h1>
      <UpdateProfileCRUD profileData={updateProfileRes ?? defaultProfileData} />
    </DashboardWrapper>
  );
};

export default UpdateProfilePage;
