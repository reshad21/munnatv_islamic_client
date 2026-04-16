import React from "react";
import { DashboardWrapper } from "../../_components/DashboardWrapper";
import ContactUsCRUD from "./_components/ContactUsCRUD";
import { getContactUs } from "@/services/contactus";

const ContactUsPage = async() => {
  const contactUsData = await getContactUs([]);
  
  const topberList = contactUsData?.data?.data || contactUsData?.data || [];
  const firstContactUs = Array.isArray(topberList) ? topberList[0] : topberList;

  return (
    <DashboardWrapper>
      <h1 className="text-2xl font-semibold text-[#0f3d3e] mb-6">Contact Us</h1>
      <ContactUsCRUD contactUsData={firstContactUs} />
    </DashboardWrapper>
  );
};

export default ContactUsPage;
