import React from "react";
import HeroSection from "../_components/HeroSection";
import GalleryHeader from "./_components/GalleryHeader";
import GallerySection from "./_components/GallerySection";
import { getGallery } from "@/services/gallery";

const GalleryPage = async() => {
const galleryData = await getGallery([]);
  return (
    <div>
      <HeroSection title="Gallery" subtitle="Gallery" />
      <GalleryHeader/>
      <GallerySection galleryData={galleryData?.data?.data} />
    </div>
  );
};

export default GalleryPage;
