import React from "react";
import { DashboardWrapper } from "../../../_components/DashboardWrapper";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import EditServiceForm from "./_components/EditServiceForm";

interface EditServicePageProps {
  params: Promise<{ id: string }>;
}

const EditServicePage = async ({ params }: EditServicePageProps) => {
  const { id } = await params;

  return (
    <DashboardWrapper>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Edit Service</h2>
        <Link
          href="/dashboard/services"
          className="flex items-center gap-2 bg-[#0f3d3e] text-white px-5 py-2.5 rounded-full hover:bg-[#0a2e2f] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </Link>
      </div>
      <EditServiceForm serviceId={id} />
    </DashboardWrapper>
  );
};

export default EditServicePage;
