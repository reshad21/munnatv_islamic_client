import React from "react";
import { DashboardWrapper } from "../../_components/DashboardWrapper";
import MainAboutUsForm from "./_components/MainAboutUsForm";
import OthersAboutUsForm from "./_components/OthersAboutUsForm";
import { getAboutus } from "@/services/About-us";
import { getOtherAboutus } from "@/services/OtherAboutUs";

const AboutUsPage = async() => {
  const aboutUsMainFormData = await getAboutus([]);
  const othersAboutUsData = await getOtherAboutus([]);
  return (
    <DashboardWrapper>
      <h1 className="text-2xl font-semibold text-[#0f3d3e] mb-6">About Us</h1>
      <MainAboutUsForm aboutusData={aboutUsMainFormData?.data}/>
      <OthersAboutUsForm othersData={othersAboutUsData?.data}/>
    </DashboardWrapper>
  );
};

export default AboutUsPage;
