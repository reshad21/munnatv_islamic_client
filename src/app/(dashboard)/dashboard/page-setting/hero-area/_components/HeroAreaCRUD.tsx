/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useTransition, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Save, X, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { createHeroSection, updateHeroSection } from "@/services/Hero-section";
import { showErrorToast, showSuccessToast } from "@/utils/toastMessage";
import { uploadImageToCloudinary } from "@/utils/cloudinary/cloudinaryUpload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export interface HeroSectionFormData {
  id?: string;
  subtitle: string;
  title: string;
  youtubeUrl: string;
  packageTitle?: string;
  serviceTitle?: string;
}

interface HeroAreaCRUDProps {
  heroData?: Partial<HeroSectionFormData> & { images?: any[]; heroImages?: any[] };
}

const HeroAreaCRUD: React.FC<HeroAreaCRUDProps> = ({ heroData }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isEditing = !!heroData?.id;

  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<HeroSectionFormData>({
    defaultValues: {
      subtitle: heroData?.subtitle || "",
      title: heroData?.title || "",
      youtubeUrl: heroData?.youtubeUrl || "",
      packageTitle: heroData?.packageTitle || "",
      serviceTitle: heroData?.serviceTitle || "",
    },
  });

  useEffect(() => {
    // Determine existing backend images
    const urls: string[] = [];
    const sourceImages = heroData?.images || heroData?.heroImages || [];
    
    if (Array.isArray(sourceImages)) {
      sourceImages.forEach((img: any) => {
        if (typeof img === 'string') {
          urls.push(img);
        } else if (img && typeof img === 'object') {
          if (img.image) urls.push(img.image);
          else if (img.url) urls.push(img.url);
          else if (img.path) urls.push(img.path);
          else if (img.imageUrl) urls.push(img.imageUrl);
        }
      });
    }

    if (urls.length > 0) {
      setExistingImageUrls(urls.filter(Boolean));
    }
  }, [heroData]);

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
    e.target.value = "";
  };

  const handleRemoveExistingImage = (index: number) => {
    setExistingImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveImage = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: HeroSectionFormData) => {
    if (selectedFiles.length === 0 && existingImageUrls.length === 0) {
      showErrorToast("Please provide at least one image.");
      return;
    }

    setIsUploading(true);

    try {
      const imageUrls: string[] = [...existingImageUrls];

      if (selectedFiles.length > 0) {
        showSuccessToast("Uploading new images...");
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
      }

      const payload = {
        title: data.title,
        subtitle: data.subtitle,
        youtubeUrl: data.youtubeUrl,
        packageTitle: data.packageTitle,
        serviceTitle: data.serviceTitle,
        images: imageUrls,
      };
      
      startTransition(async () => {
        let res;
        if (isEditing && heroData?.id) {
          res = await updateHeroSection(heroData.id, payload);
        } else {
          res = await createHeroSection(payload);
        }
        
        if (res.statusCode === (isEditing ? 200 : 201) || res.success) {
          showSuccessToast(res.message);
          
          if (!isEditing) {
            form.reset();
            setSelectedFiles([]);
            setImagePreviews([]);
            setExistingImageUrls([]);
          }
          
          router.refresh();
        } else {
          showErrorToast(res.message || "Something went wrong");
        }
      });
    } catch (error) {
      console.error("Error submitting hero area form:", error);
      showErrorToast("An error occurred. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const totalImages = existingImageUrls.length + imagePreviews.length;

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white rounded-2xl p-6 shadow-sm space-y-6"
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {isEditing ? "Edit Hero Section" : "Create Hero Section"}
            </h2>
          </div>

          <div className="space-y-4">
            {/* Package Title Field */}
            <FormField
              control={form.control}
              name="packageTitle"
              rules={{ required: "Package Title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Package Title <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter package title..."
                      className="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Service Title Field */}
            <FormField
              control={form.control}
              name="serviceTitle"
              rules={{ required: "Service Title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Service Title <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter service title..."
                      className="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              rules={{ 
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters"
                }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Title <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      placeholder="write here..."
                      className="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subtitle Field */}
            <FormField
              control={form.control}
              name="subtitle"
              rules={{ 
                required: "Subtitle is required",
                minLength: {
                  value: 3,
                  message: "Subtitle must be at least 3 characters"
                }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Subtitle <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      placeholder="write here..."
                      className="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* YouTube URL Field */}
            <FormField
              control={form.control}
              name="youtubeUrl"
              rules={{ 
                required: "YouTube URL is required",
                pattern: {
                  value: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
                  message: "Please enter a valid YouTube URL"
                }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    YouTube URL <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Multiple Image Upload Field */}
            <div className="space-y-4 pt-4">
              <label className="text-sm font-medium text-gray-700">
                Upload Images {totalImages > 0 && <span className="text-gray-500">({totalImages} image{totalImages !== 1 ? 's' : ''})</span>} <span className="text-red-500">*</span>
              </label>
              <div className={`w-full border-2 border-dashed ${isUploading ? 'border-gray-200 bg-gray-50' : 'border-gray-300 hover:border-[#0f3d3e]'} rounded-xl p-6 transition-colors relative min-h-[160px]`}>
                {totalImages > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full relative z-10 mb-4">
                    {/* Existing Images from Server */}
                    {existingImageUrls.map((url, index) => (
                      <div key={`existing-${index}`} className="relative aspect-square w-full group">
                        <Image
                          src={url}
                          alt={`Existing ${index + 1}`}
                          fill
                          className="object-cover rounded-lg shadow-sm"
                          unoptimized
                        />
                        <div className="absolute top-2 left-2 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded shadow-sm opacity-90">
                          Existing
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRemoveExistingImage(index);
                          }}
                          disabled={isUploading || isPending}
                          className="absolute -top-2 -right-2 w-7 h-7 bg-white text-red-500 rounded-full flex items-center justify-center hover:bg-red-50 hover:scale-110 transition-all shadow-md z-20 border border-red-100 disabled:opacity-50"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}

                    {/* New Images (Previews) */}
                    {imagePreviews.map((preview, index) => (
                      <div key={`new-${index}`} className="relative aspect-square w-full group">
                        <Image
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          fill
                          className="object-cover rounded-lg shadow-sm"
                          unoptimized
                        />
                        <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded shadow-sm opacity-90">
                          New
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRemoveImage(index);
                          }}
                          disabled={isUploading || isPending}
                          className="absolute -top-2 -right-2 w-7 h-7 bg-white text-red-500 rounded-full flex items-center justify-center hover:bg-red-50 hover:scale-110 transition-all shadow-md z-20 border border-red-100 disabled:opacity-50"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    
                    {/* Add more placeholder */}
                    {!isUploading && !isPending && (
                      <div className="relative aspect-square w-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer px-2">
                        <ImageIcon className="w-6 h-6 text-gray-400 mb-1" />
                        <span className="text-[10px] text-center text-gray-500">Upload More</span>
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
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-200">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      Click to upload images
                    </h3>
                    <p className="text-xs text-gray-500">
                      Upload hero section preview images
                    </p>
                  </div>
                )}
                
                {totalImages === 0 && !isUploading && !isPending && (
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
              {totalImages > 0 && !isUploading && !isPending && (
                 <p className="text-xs text-gray-500 mt-1">
                   💡 You can remove existing images by clicking the X button
                 </p>
              )}
              {totalImages === 0 && (
                  <p className="text-[0.8rem] font-medium text-red-500">
                    Images are required
                  </p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-8 pt-4">
            <button
              type="submit"
              disabled={isPending || isUploading}
              className="cursor-pointer flex items-center gap-2 bg-[#0f3d3e] text-white px-6 py-2.5 rounded-full hover:bg-[#0a2e2f] transition-colors disabled:opacity-70"
            >
              <Save className="w-4 h-4" />
              <span className="font-medium">
                {isUploading 
                  ? "Uploading..." 
                  : isPending
                    ? (isEditing ? "Updating..." : "Creating...")
                    : (isEditing ? "Update Hero Section" : "Create Hero Section")
                }
              </span>
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default HeroAreaCRUD;