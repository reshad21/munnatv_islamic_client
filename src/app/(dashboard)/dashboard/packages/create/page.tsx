
"use client";
import { ArrowLeft } from "lucide-react";
import React from "react";

import { useRouter } from "next/navigation";
import CreatePackageForm from "./_components/CreatePackageForm";
import { DashboardWrapper } from "../../_components/DashboardWrapper";

const CreatePackagePage = () => {
    
      const router = useRouter();
  return (
    <DashboardWrapper>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Package Create</h2>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 bg-[#0f3d3e] text-white px-5 py-2.5 rounded-full hover:bg-[#0a2e2f] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>
      </div>

      <CreatePackageForm />
    </DashboardWrapper>
  );
};

export default CreatePackagePage;
