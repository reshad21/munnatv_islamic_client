import { ArrowLeft } from "lucide-react";
import React from "react";
import EditPackageForm from "./_components/EditPackageForm";
import { DashboardWrapper } from "../../../_components/DashboardWrapper";
import Link from "next/link";

interface EditPackagePageProps {
  params: Promise<{ id: string }>;
}

const EditPackagePage = async ({ params }: EditPackagePageProps) => {
  const { id } = await params;

  return (
    <DashboardWrapper>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Edit Package</h2>
        <Link
          href="/dashboard/packages"
          className="flex items-center gap-2 bg-[#0f3d3e] text-white px-5 py-2.5 rounded-full hover:bg-[#0a2e2f] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </Link>
      </div>

      <EditPackageForm packageId={id} />
    </DashboardWrapper>
  );
};

export default EditPackagePage;
