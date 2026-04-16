"use client";

import { createPackages } from "@/services/package";
import { showErrorToast, showSuccessToast } from "@/utils/toastMessage";
import { ImageIcon, Save, X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { uploadImageToCloudinary } from "@/utils/cloudinary/cloudinaryUpload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const RichTextEditor = dynamic(
  () => import("@/components/shared/RichTextEditor"),
  { ssr: false }
);

interface PackageFormData {
  title: string;
  country: string;
  maxTravelers: string;
  minPax: string;
  duration: string;
  description: string;
  status: boolean;
  travellPlace: string;
}

export default function CreatePackageForm() {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<PackageFormData>({
    defaultValues: {
      title: "",
      country: "",
      maxTravelers: "",
      minPax: "",
      duration: "",
      description: "",
      status: true,
      travellPlace: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setSelectedFiles((prev) => [...prev, ...newFiles]);

      // Generate previews for new files
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
    // Reset input value to allow selecting same file again
    e.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<PackageFormData> = async (data) => {
    try {
      if (selectedFiles.length === 0) {
        showErrorToast("Please select at least one image.");
        return;
      }

      setIsUploading(true);
      showSuccessToast("Uploading images...");

      const imageUrls: string[] = [];

      for (const file of selectedFiles) {
        const uploadResult = await uploadImageToCloudinary(file);
        if (!uploadResult) {
          showErrorToast(`Failed to upload image: ${file.name}. Please try again.`);
          setIsUploading(false);
          return;
        }
        imageUrls.push(uploadResult.secure_url);
      }

      showSuccessToast("Images uploaded successfully!");

      const payload = {
        title: data.title,
        country: data.country,
        maxTravelers: data.maxTravelers,
        minPax: data.minPax,
        duration: data.duration,
        description: data.description,
        travellPlace: data.travellPlace,
        status: String(data.status),
        images: imageUrls,
      };

      const res = await createPackages(payload);
      
      if (res.statusCode === 201 || res.success) {
        showSuccessToast(res.message || "Package created successfully!");
        form.reset();
        setSelectedFiles([]);
        setImagePreviews([]);
        router.push("/dashboard/packages");
      } else {
        showErrorToast(res.message || "Failed to create package");
      }
    } catch (error) {
      console.error("Error creating package:", error);
      showErrorToast("Failed to create package. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    router.push("/dashboard/packages");
  };

  return (
    <div className="bg-[#f8f9fa] rounded-2xl p-6 shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title Field */}
          <FormField
            control={form.control}
            name="title"
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter package title"
                    className="w-full px-4 py-3 bg-transparent border-b border-gray-200 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Travell Place Field */}
          <FormField
            control={form.control}
            name="travellPlace"
            rules={{ required: "Travel place is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Travel Place <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter travel place"
                    className="w-full px-4 py-3 bg-transparent border-b border-gray-200 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country Field */}
          <FormField
            control={form.control}
            name="country"
            rules={{ required: "Country is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Country <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter country"
                    className="w-full px-4 py-3 bg-transparent border-b border-gray-200 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Max Travelers Field */}
          <FormField
            control={form.control}
            name="maxTravelers"
            rules={{ required: "Max travelers is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Max Travelers <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter maximum number of travelers"
                    className="w-full px-4 py-3 bg-transparent border-b border-gray-200 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Min Pax Field */}
          <FormField
            control={form.control}
            name="minPax"
            rules={{ required: "Min pax is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Min Pax <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter minimum pax"
                    className="w-full px-4 py-3 bg-transparent border-b border-gray-200 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Duration Field */}
          <FormField
            control={form.control}
            name="duration"
            rules={{ required: "Duration is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Duration <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter package duration (e.g., 15 days)"
                    className="w-full px-4 py-3 bg-transparent border-b border-gray-200 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Description <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="border border-gray-200 rounded-lg bg-white">
                    <RichTextEditor value={field.value} onChange={field.onChange} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Multiple Image Upload Field */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">
              Upload Images <span className="text-red-500">*</span>
            </label>
            <div className={`w-full border-2 border-dashed ${isUploading ? 'border-gray-200 bg-gray-50' : 'border-[#0f3d3e]/30 bg-[#0f3d3e]/5'} rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[#0f3d3e] transition-colors overflow-hidden relative min-h-[160px] p-6`}>
              {imagePreviews.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full h-full relative z-10">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative aspect-square w-full">
                      <Image
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        fill
                        className="object-cover rounded-xl shadow-sm"
                        unoptimized
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemoveImage(index);
                        }}
                        disabled={isUploading}
                        className="absolute -top-2 -right-2 w-8 h-8 bg-white text-red-500 rounded-full flex items-center justify-center hover:bg-red-50 hover:scale-110 transition-all shadow-md z-20 border border-red-100 disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  {/* Add more placeholder */}
                  {!isUploading && (
                    <div className="relative aspect-square w-full border-2 border-dashed border-[#0f3d3e]/30 rounded-xl flex items-center justify-center hover:bg-[#0f3d3e]/5 transition-colors cursor-pointer">
                      <ImageIcon className="w-8 h-8 text-[#0f3d3e]/50" />
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 border border-gray-100">
                    <ImageIcon className="w-8 h-8 text-[#0f3d3e]" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    Click to upload images
                  </h3>
                  <p className="text-xs text-gray-500">
                    SVG, PNG, JPG or GIF (max. 5MB)
                  </p>
                </div>
              )}
              
              {imagePreviews.length === 0 && !isUploading && (
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  style={{ zIndex: 2 }}
                />
              )}
            </div>
            {selectedFiles.length === 0 && (
                <p className="text-[0.8rem] font-medium text-destructive">
                  Images are required
                </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="submit"
              disabled={isUploading}
              className="flex items-center gap-2 bg-[#0f3d3e] text-white px-5 py-2.5 rounded-full hover:bg-[#0a2e2f] transition-colors cursor-pointer disabled:opacity-70"
            >
              <Save className="w-4 h-4" />
              <span className="font-medium">{isUploading ? 'Uploading...' : 'Save'}</span>
            </button>
            <button
              type="button"
              onClick={handleClose}
              disabled={isUploading}
              className="flex items-center gap-2 bg-red-500 text-white px-5 py-2.5 rounded-full hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-70"
            >
              <X className="w-4 h-4" />
              <span className="font-medium">Close</span>
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
