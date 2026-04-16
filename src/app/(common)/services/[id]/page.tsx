/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ServiceDetails from "./_components/ServiceDetails";
import { getServiceById } from "@/services/service";
import HeroSection from "../../_components/HeroSection";

interface PageProps {
  
  params?: Promise<{ id: string }>;
  searchParams?: Promise<any>;
}
const ServiceDetailspage = async ({ params }: PageProps) => {
  const awaitedParams = params ? await params : { id: "" };
  const { id } = awaitedParams;
  const serviceDetails = await getServiceById(id);
  const serviceData = serviceDetails?.data;
  return (
    <div>
      <HeroSection title="Services" subtitle="Services" />
      <ServiceDetails service={serviceData} key={serviceData.id} />
    </div>
  );
};

export default ServiceDetailspage;
