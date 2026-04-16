/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useTransition, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Save, X, ImageIcon } from "lucide-react";
import { createAboutus, updateAboutus } from "@/services/About-us";
import { showErrorToast, showSuccessToast } from "@/utils/toastMessage";
import { uploadImageToCloudinary } from "@/utils/cloudinary/cloudinaryUpload";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export interface AboutUsFormData {
  id?: string;
  title: string;
  description: string;
  featureTitle1: string;
  featureShortDesc1: string;
  featureTitle2: string;
  featureShortDesc2: string;
  featureTitle3: string;
  featureShortDesc3: string;
}

interface MainAboutUsFormProps {
  aboutusData?: Partial<AboutUsFormData> & {
    aboutUsImages?: any[];
    images?: any[];
  };
}

const MainAboutUsForm: React.FC<MainAboutUsFormProps> = ({ aboutusData }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isEditing = !!aboutusData?.id;

  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<AboutUsFormData>({
    defaultValues: {
      title: aboutusData?.title || "",
      description: aboutusData?.description || "",
      featureTitle1: aboutusData?.featureTitle1 || "",
      featureShortDesc1: aboutusData?.featureShortDesc1 || "",
      featureTitle2: aboutusData?.featureTitle2 || "",
      featureShortDesc2: aboutusData?.featureShortDesc2 || "",
      featureTitle3: aboutusData?.featureTitle3 || "",
      featureShortDesc3: aboutusData?.featureShortDesc3 || "",
    },
  });

  useEffect(() => {
    // Determine existing backend images
    const urls: string[] = [];
    const sourceImages =
      aboutusData?.aboutUsImages || aboutusData?.images || [];

    if (Array.isArray(sourceImages)) {
      sourceImages.forEach((img: any) => {
        if (typeof img === "string") {
          urls.push(img);
        } else if (img && typeof img === "object") {
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
  }, [aboutusData]);

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

  const onSubmit = async (data: AboutUsFormData) => {
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
            showErrorToast(
              `Failed to upload image: ${file.name}. Please try again.`,
            );
            setIsUploading(false);
            return;
          }
          imageUrls.push(uploadResult.secure_url);
        }
        showSuccessToast("Images uploaded successfully!");
      }

      const payload = {
        title: data.title,
        description: data.description,
        featureTitle1: data.featureTitle1,
        featureShortDesc1: data.featureShortDesc1,
        featureTitle2: data.featureTitle2,
        featureShortDesc2: data.featureShortDesc2,
        featureTitle3: data.featureTitle3,
        featureShortDesc3: data.featureShortDesc3,
        aboutUsImages: imageUrls,
        images: imageUrls,
      };

      startTransition(async () => {
        let res;
        if (isEditing && aboutusData?.id) {
          res = await updateAboutus(aboutusData.id, payload);
        } else {
          res = await createAboutus(payload);
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
      console.error("Error submitting about us form:", error);
      showErrorToast("An error occurred. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white rounded-2xl p-6 shadow-sm space-y-6"
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {isEditing ? "Edit About Us" : "Create About Us"}
            </h2>
          </div>

          <div className="space-y-4">
            {/* Title */}
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
                      placeholder="write here..."
                      className="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
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
                    <textarea
                      {...field}
                      placeholder="write here..."
                      className="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#0f3d3e] min-h-[80px] transition-colors"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Features */}
            {[
              {
                title: "featureTitle1",
                desc: "featureShortDesc1",
                labelNum: 1,
              },
              {
                title: "featureTitle2",
                desc: "featureShortDesc2",
                labelNum: 2,
              },
              {
                title: "featureTitle3",
                desc: "featureShortDesc3",
                labelNum: 3,
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
              >
                <FormField
                  control={form.control}
                  name={
                    feature.title as
                      | "featureTitle1"
                      | "featureTitle2"
                      | "featureTitle3"
                  }
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Feature Title {feature.labelNum} <span className="text-red-500">*</span>
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

                <FormField
                  control={form.control}
                  name={
                    feature.desc as
                      | "featureShortDesc1"
                      | "featureShortDesc2"
                      | "featureShortDesc3"
                  }
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Feature Short Description {feature.labelNum} <span className="text-red-500">*</span>
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
              </div>
            ))}

            {/* Images */}
            <div className="space-y-4 pt-4">
              <label className="text-sm font-medium text-gray-700">
                Upload Images <span className="text-red-500">*</span>
              </label>
              <div
                className={`w-full border-2 border-dashed ${isUploading ? "border-gray-200 bg-gray-50" : "border-gray-300 hover:border-[#0f3d3e]"} rounded-xl p-6 transition-colors relative min-h-[160px]`}
              >
                {(existingImageUrls.length > 0 || imagePreviews.length > 0) && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full relative z-10 mb-4">
                    {/* Existing Images */}
                    {existingImageUrls.map((url, index) => (
                      <div
                        key={`existing-${index}`}
                        className="relative aspect-square w-full group"
                      >
                        <Image
                          src={url}
                          alt={`Existing Image ${index + 1}`}
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
                            handleRemoveExistingImage(index);
                          }}
                          disabled={isUploading || isPending}
                          className="absolute -top-2 -right-2 w-7 h-7 bg-white text-red-500 rounded-full flex items-center justify-center hover:bg-red-50 hover:scale-110 transition-all shadow-md z-20 border border-red-100 disabled:opacity-50"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    {/* New Previews */}
                    {imagePreviews.map((preview, index) => (
                      <div
                        key={`preview-${index}`}
                        className="relative aspect-square w-full group"
                      >
                        <Image
                          src={preview}
                          alt={`New Preview ${index + 1}`}
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
                            handleRemoveImage(index);
                          }}
                          disabled={isUploading || isPending}
                          className="absolute -top-2 -right-2 w-7 h-7 bg-white text-red-500 rounded-full flex items-center justify-center hover:bg-red-50 hover:scale-110 transition-all shadow-md z-20 border border-red-100 disabled:opacity-50"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}

                    {!isUploading && !isPending && (
                      <div className="relative aspect-square w-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer px-2">
                        <ImageIcon className="w-6 h-6 text-gray-400 mb-1" />
                        <span className="text-[10px] text-center text-gray-500">
                          Upload More
                        </span>
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
                )}

                {existingImageUrls.length === 0 &&
                imagePreviews.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center w-full h-full">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-200">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      Click to upload images
                    </h3>
                    <p className="text-xs text-gray-500">
                      Upload about us preview images
                    </p>
                    {!isUploading && !isPending && (
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
                ) : null}
              </div>
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
                  ? "Uploading Images..."
                  : isPending
                    ? isEditing
                      ? "Updating..."
                      : "Creating..."
                    : isEditing
                      ? "Update About Us"
                      : "Create About Us"}
              </span>
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MainAboutUsForm;
